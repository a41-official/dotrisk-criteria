const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const fs = require("fs");
const path = require("path");

if (process.argv.length < 5) {
    console.error("Usage: node validate_json.js <network_dir> <category_file> <main_schema> <slashing_schema>");
    process.exit(1);
}

const networkDir = process.argv[2];
const categoryFile = process.argv[3];
const mainSchemaFile = process.argv[4];
const slashingSchemaFile = process.argv[5];

console.log("Validating JSON files...");

const ajv = new Ajv({allErrors: true});
addFormats(ajv);

const mainSchema = JSON.parse(fs.readFileSync(mainSchemaFile, "utf8"));
const slashingSchema = JSON.parse(fs.readFileSync(slashingSchemaFile, "utf8"));
const categories = JSON.parse(fs.readFileSync(categoryFile, "utf8")).categories;

const isValidEthereumAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
};

if (!fs.existsSync(networkDir)) {
    console.log(`Network directory ${networkDir} does not exist. Skipping validation.`);
    process.exit(0);
}

const allDirs = fs.readdirSync(networkDir)
    .filter(dir => fs.statSync(path.join(networkDir, dir)).isDirectory());

for (const dir of allDirs) {
    if (!isValidEthereumAddress(dir)) {
        console.error(`Invalid Ethereum address directory found: ${dir}`);
        process.exit(1);
    }
}

const avsDirs = allDirs;

if (avsDirs.length === 0) {
    console.log(`No AVS directories found in ${networkDir}. Skipping validation.`);
    process.exit(0);
}

const mechanismRequiredMetadata = {
    "DETERMINISTIC": ["SUITABILITY", "ENFORCEMENT", "TRANSPARENCY"],
    "CHALLENGE_PERIOD": ["SUITABILITY", "ENFORCEMENT", "TRANSPARENCY", "REWARDS"],
    "COMMITTEE_BASED": ["SUITABILITY", "ENFORCEMENT", "TRANSPARENCY", "REWARDS"]
};

const invalidMetadata = [];
const mainAddresses = new Set();

for (const avsDir of avsDirs) {
    const avsAddress = avsDir;
    const mainJsonPath = path.join(networkDir, avsDir, 'reward_slashing_policy_status.json');
    const slashingJsonPath = path.join(networkDir, avsDir, 'operator_set_slashing_mechanism.json');

    if (fs.existsSync(mainJsonPath)) {
        const mainData = JSON.parse(fs.readFileSync(mainJsonPath, "utf8"));
        const validateMain = ajv.compile(mainSchema);
        const mainValid = validateMain(mainData);

        if (!mainValid) {
            console.error(`Main JSON Schema validation failed for ${avsAddress}:`, validateMain.errors);
            process.exit(1);
        }

        const invalidCategories = Array.isArray(mainData.category)
            ? mainData.category.filter(category => !categories.includes(category))
            : (!categories.includes(mainData.category) ? [mainData.category] : []);

        if (invalidCategories.length > 0) {
            console.error(`Invalid categories found for ${avsAddress}: ${invalidCategories.join(", ")}`);
            process.exit(1);
        }

        mainAddresses.add(avsAddress.toLowerCase());
    }

    if (fs.existsSync(slashingJsonPath)) {
        const slashingData = JSON.parse(fs.readFileSync(slashingJsonPath, "utf8"));
        const validateSlashing = ajv.compile(slashingSchema);
        const slashingValid = validateSlashing(slashingData);

        if (!slashingValid) {
            console.error(`Slashing JSON Schema validation failed for ${avsAddress}:`, validateSlashing.errors);
            process.exit(1);
        }

        slashingData.operator_sets.forEach(set => {
            set.mechanisms.forEach(mechInfo => {
                const mechanism = mechInfo.mechanism;
                const metadata = mechInfo.metadata.map(m => m.name);

                const requiredFields = mechanismRequiredMetadata[mechanism] || [];
                const missingFields = requiredFields.filter(field => !metadata.includes(field));
                const extraFields = metadata.filter(field => !requiredFields.includes(field));

                if (missingFields.length > 0 || extraFields.length > 0) {
                    invalidMetadata.push({
                        avs_address: avsAddress,
                        operatorSet: set.id,
                        mechanism,
                        missingFields,
                        extraFields
                    });
                }
            });
        });
    }
}

if (invalidMetadata.length > 0) {
    console.error("Invalid metadata configuration:");
    invalidMetadata.forEach(error => {
        console.error(`AVS Address: ${error.avs_address}, Operator Set: ${error.operatorSet}, Mechanism: ${error.mechanism}`);
        if (error.missingFields.length > 0) {
            console.error(`Missing required fields: ${error.missingFields.join(", ")}`);
        }
        if (error.extraFields.length > 0) {
            console.error(`Extra fields not allowed: ${error.extraFields.join(", ")}`);
        }
    });
    process.exit(1);
}

console.log("JSON validation successful!");
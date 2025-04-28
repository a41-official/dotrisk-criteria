# Restaking.Risk Metadata Update Guideline

To update the metadata of an AVS (Actively Validated Service), please follow the steps below.

---

## ✅ Steps

### 1. Read the Data Update Guide
📘 [Protocol AVS Page's Data Update Guide](https://narrow-cello-dab.notion.site/Protocol-AVS-Page-s-Data-Update-Guide-1dec62052b8e801d8f6afab80d1a5f0a?pvs=4)

### 2. Copy from Sample JSONs
Copy the sample JSONs below and modify them according to your metadata.

#### 2.1 `reward_slashing_policy_status.json`
📄 [Sample JSON](../eigenlayer/sample/reward_slashing_policy_status.json)

> ⚠️ Notes:
> - The `category` field must match one of the entries listed in [avs_category.json](../eigenlayer/schema/avs_category.json).
> - If your AVS does not fit any of the listed categories, please leave a comment in the PR to suggest a new one.

#### 2.2 `operator_set_slashing_mechanism.json`
📄 [Sample JSON](../eigenlayer/sample/operator_set_slashing_mechanism.json)

> ⚠️ Notes:
> - One operator set **can have multiple slashing mechanisms**.
> - A **deterministic slashing mechanism** does **not** include a `REWARDS` field.

---

### 3. Make Your Own JSON

1. Create a folder under the following path using your AVS address:  
   `/eigenlayer/{network}/{avs_address}`  
   _Example: `/eigenlayer/holesky/0x37b223e9d3dbebf2a08c358b8ef9f024fc134f8f`_

2. Inside the folder, add the appropriate metadata files:
   - `reward_slashing_policy_status.json`
   - `operator_set_slashing_mechanism.json`

> 💡 You can include **either one** of the JSON files or **both**, depending on what needs to be changed.

---

## ✅ Checklist

- [ ] I have read the [Data Update Guide](https://narrow-cello-dab.notion.site/Protocol-AVS-Page-s-Data-Update-Guide-1dec62052b8e801d8f6afab80d1a5f0a?pvs=4)
- [ ] I have copied and customized the sample JSON(s) according to the guideline
- [ ] My files are saved at the correct path: /eigenlayer/{network}/{avs_address}/
- [ ] I followed the schema and naming conventions
- [ ] I added a comment for any new categories or mechanisms (if applicable)
- [ ] My PR includes:
  - [ ] `reward_slashing_policy_status.json` (optional)
  - [ ] `operator_set_slashing_mechanism.json` (optional)
---
# 🛠️ Restaking.risk Metadata Update Guide

Welcome! 👋 This repository exists to help **AVS (Actively Validated Service) providers** contribute metadata about their reward and slashing policies to [Dotrisk](https://restaking.dotrisk.xyz/), a public dashboard powered by A41 restaking insights.

We want to make sure your AVS is accurately represented, and that the wider community can understand and evaluate your protocol’s mechanisms.

> ❓ **First time here?** Don’t worry! This guide walks you through everything you need to know.

---

## 🧭 What Is This For?

This repository is used to collect **structured metadata** from AVS teams. Your submitted data helps populate two key pages in our frontend:

### 1. Protocol Page — *Reward / Slashing Policy Status*

This section shows whether your AVS has clearly defined policies.

For more details, see [Reward / Slashing Policy Status](https://narrow-cello-dab.notion.site/Protocol-AVS-Page-s-Data-Update-Guide-1dec62052b8e801d8f6afab80d1a5f0a#:~:text=3.1.%20Protocol%20Page%20%3E%20Reward%20/%20Slashing%20Policy%20Status%20(Open%20to%20All))

### 2.  AVS Page — *Operator Set Slashing Mechanism*

This section evaluates your AVS’s slashing mechanisms using a standardized framework.

For more details, see [Operator Set Slashing Mechanism](https://narrow-cello-dab.notion.site/Protocol-AVS-Page-s-Data-Update-Guide-1dec62052b8e801d8f6afab80d1a5f0a#:~:text=3.2.%20AVS%20Page%20%3E%20Operator%20Set%20Slashing%20Mechanism%20(Open%20to%20All))

---

## 📦 Repository Structure

```
.
├── eigenlayer/
│   └── {network}/
│       └── {avs_address}/
│           ├── reward_slashing_policy_status.json
│           └── operator_set_slashing_mechanism.json
├── schema/
│   └── avs_category.json
├── sample/
│   ├── reward_slashing_policy_status.json
│   └── operator_set_slashing_mechanism.json
└── .github/
    └── pull_request_template.md
```

> 🛠️ Place your metadata inside `eigenlayer/{network}/{avs_address}/`.

---

## 🚀 How to Contribute

### 1. 🍴 Fork This Repository

Click the **Fork** button at the top of the GitHub page to make your own copy.

---

### 2. 📖 Read the Pull Request Template

Go through the [Pull Request Template](.github/pull_request_template.md).  
It includes essential guidelines and a submission checklist.

---

### 3. ✍️ Choose What to Submit

#### Option A: Policy Status Metadata

Use this file:  
📄 [`reward_slashing_policy_status.json`](eigenlayer/sample/reward_slashing_policy_status.json)

#### Option B: Slashing Mechanism Metadata

Use this file:  
📄 [`operator_set_slashing_mechanism.json`](eigenlayer/sample/operator_set_slashing_mechanism.json)

#### Option C: Submit Both!


---

### 4. 📂 Add Files in the Right Location

Use your AVS address as the folder name:

```
/eigenlayer/{network}/{avs_address}/
```

Place the appropriate JSON(s) inside:
- `reward_slashing_policy_status.json`
- `operator_set_slashing_mechanism.json`

---

### 5. 📬 Open a Pull Request

- From your forked repository, create a PR to the `main` branch of this repository.
- Make sure your metadata adheres to schema and naming rules.
- If introducing a new AVS category, leave a short explanation in the PR comments.

---

## 🙋 Need Help?

Feel free to open an issue or reach out to the Dotrisk team.  
We’re happy to assist with your contribution.

Let’s make AVS metadata transparent and standardized — together! 🚀

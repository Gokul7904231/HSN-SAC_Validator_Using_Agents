# HSN-SAC Validator Using ADK Agents

This project is an intelligent agent built using Google's **Agent Developer Kit (ADK)** and designed to validate and suggest **HSN (Harmonized System of Nomenclature)** and **SAC (Service Accounting Code)** codes using a master dataset.

---
 🚀 Features

- ✅ Validate HSN/SAC codes for correct format and existence
- 🧠 Hierarchical validation for 2, 4, 6, and 8-digit HSN codes
- 🔍 Suggest HSN/SAC codes based on product or service descriptions
- 📊 Uses a master CSV dataset (`SAC_MSTR.csv`)
- ⚙️ Built using [Google's ADK (Agent Developer Kit)](https://google.github.io/adk-docs/)

---

🗂 Project Structure

/project
│
├── SAC_MSTR.csv # Master dataset of HSN/SAC codes and descriptions

├── agent.py # ADK logic for validation and suggestions

├── README.md # Project documentation (this file)

├── requirements.txt # (Optional) List of Python dependencies

└── output_screenshots/ # (Optional) Screenshots of agent in action

---

 📥 Input Format

The agent accepts:
- A numeric HSN/SAC code (e.g., `01011010`)
- A textual description (e.g., `wireless headphones`)

---
 📤 Output Format

Valid Code:
Valid HSN Code: 01011010 – Thoroughbred horses
```bash-Invalid Code:```
Invalid Code: Not found in master data
```bash -Description Input:```

---
 🧠 Technologies Used

- Python
- Pandas
- Google ADK Framework
- CSV Data Processing

---

 🛠 Setup Instructions

1. Clone the repository:
 ```bash
 git clone https://github.com/Gokul7904231/HSN-SAC_Validator_Using_Agents.git
 cd HSN-SAC_Validator_Using_Agents
```
2,(Optional) Create a virtual environment and install dependencies:
```bash
pip install -r requirements.txt
```
3.Use ADK locally as per framework requirements.

OUTPUT:
1.Validation of valid/invalid codes:
![image](https://github.com/user-attachments/assets/312461f5-0e7c-47a9-9278-7ca95d8df86f)
![image](https://github.com/user-attachments/assets/4957343c-1286-4f14-b071-f6f5437c3a95)

2.Suggestions from description input:
![image](https://github.com/user-attachments/assets/df408e9f-79f2-4c87-9f82-ac7f66471f60)



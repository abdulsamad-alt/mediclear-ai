# 🩺 MediClear AI — Patient Lab Report & Jargon Decoder

> **Live Deployed App:**https://mediclear-ai-4sgx.vercel.app
> **Public GitHub Repository:**https://github.com/abdulsamad-alt/mediclear-ai

---

## 🎯 Problem Statement & Target Audience
Patients frequently receive complex laboratory results and pathology reports filled with intimidating medical terminology prior to their follow-up consultations. This causes unnecessary medical anxiety, confusion, and difficulty understanding their own health metrics.

**MediClear AI** is an intelligent medical text summarizer designed for patients, elderly users, and caregivers. It translates dense diagnostic reports into plain, empathetic English while preparing users with targeted questions for their healthcare providers.

---

## ✨ Features List
- **Medical Jargon Translator:** Converts clinical terminology (e.g., *hyperlipidemia*, *thrombocytopenia*, *neutropenia*) into accessible, everyday explanations.
- **Structured Diagnostic Breakdown:** Displays test metrics, reference ranges, and findings in an easy-to-read comparison view.
- **Doctor Consultation Prep:** Automatically generates 3–4 tailored questions for the patient's next clinical visit.
- **Safety-First Architecture:** Integrated clinical disclaimers urging users to consult qualified physicians.

---

## 🤖 AI Feature & System Instructions

Powered by **Google Gemini 2.5 Flash**, the application processes diagnostic text through a tightly controlled prompt instruction set.

### System Prompt / Instructions:
```text
You are MediClear AI, an empathetic patient advocate and clinical communications assistant.
Your task is to take complex, jargon-heavy medical lab results and translate them into accessible, patient-friendly information.

Instructions:
1. Translate all medical terms into plain English (aim for a 6th to 8th-grade reading level).
2. Never provide a formal medical diagnosis or prescribe treatment.
3. Structure your response into 3 sections:
   a. Plain English Summary (What was tested and what the overall results mean).
   b. Key Metrics Explained (Breakdown of findings).
   c. Questions to Ask Your Doctor (3-4 specific questions based on the results).
4. Maintain a supportive, reassuring, and objective tone.


🛠️ Tools & Services Used
App Generation & UI: Google AI Studio

AI Model: Google Gemini 2.5 Flash

Hosting & Deployment: Vercel

Version Control: Git & GitHub


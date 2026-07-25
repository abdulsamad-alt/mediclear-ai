# 🩺 MediClear AI — Patient Lab Report & Jargon Decoder

> **Live Deployed App:*https://mediclear-ai-4sgx.vercel.app?_vercel_share=lE4opVR8Eybw88tyZheiIbsEi9Zu65Rh
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

# 🩺 MediClear AI

MediClear AI is an empathetic patient advocate and clinical communications assistant. It takes complex, jargon-heavy laboratory reports and translates them into a highly readable, structured dashboard. Built with a focus on patient accessibility, it ensures users can understand their health data and arrive at their next doctor's appointment fully prepared.

## ✨ Core Features

*   **Plain English Translation:** Transforms intimidating medical terminology into a clear, 2-3 paragraph summary written at a 6th-grade reading level.
*   **Key Findings & Ranges:** Extracts test results into a clean, color-coded table, clearly separating normal values from high/low flags alongside standard reference intervals.
*   **Doctor Appointment Kit:** Generates tailored, specific questions for the patient to ask their physician based on the lab results, complete with a 1-click printable appointment summary sheet.
*   **Jargon Glossary:** Automatically defines complex medical terms found in the specific report.
*   **Crash-Proof UI Rendering:** Utilizes strict JSON schema enforcement to guarantee type-safe data pipelines directly from the LLM to the React frontend.

## 🏗️ Architecture & Tech Stack

This application utilizes a modern, serverless AI architecture, eliminating the need for a standalone backend router. 

*   **Frontend:** React, TypeScript, Tailwind CSS, Lucide Icons
*   **AI Engine:** Google Gemini 2.5 Flash (`@google/genai` SDK)
*   **Execution Model:** Direct Agentic Execution — The application sends queries directly to the LLM, relying on strict `responseSchema` configurations (Structured Outputs) to guarantee the AI response maps perfectly to the frontend TypeScript interfaces.
*   **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or higher recommended)
*   A Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/mediclear-ai.git](https://github.com/yourusername/mediclear-ai.git)
   cd mediclear-ai

Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory and add your Gemini API key:

Code snippet
VITE_GEMINI_API_KEY=your_api_key_here
Run the development server:

Bash
npm run dev
The application will be available at http://localhost:5173 (or your configured Vite port).

💡 Usage Context
This repository represents an end-to-end original AI application. It is designed to demonstrate how large language models can be tightly integrated with front-end components using enforced JSON schemas to create reliable, consumer-facing tools in the digital health space.


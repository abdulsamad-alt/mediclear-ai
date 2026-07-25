import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API route for lab report analysis
app.post('/api/analyze-lab-report', async (req, res) => {
  try {
    const { reportText, userFocusArea } = req.body;

    if (!reportText || typeof reportText !== 'string' || reportText.trim().length === 0) {
      return res.status(400).json({ error: 'Please provide valid lab report text to analyze.' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are MediClear AI, an empathetic, calm, and highly accurate patient communicator and medical jargon translator.
Your goal is to take a medical lab report or diagnostic text and convert it into a reassuring, plain-English summary written at a 6th-grade reading level that patients can easily understand.

STRICT GUIDELINES:
1. PLAIN ENGLISH SUMMARY:
   - Explain what the test actually checked in simple terms (e.g., "This Complete Blood Count checks your red cells for energy, white cells for infection defense, and platelets for clotting").
   - Maintain a warm, empathetic, and reassuring tone. Emphasize that lab results are just pieces of a puzzle and isolated abnormal flags do NOT automatically mean something serious.
   - Decode all medical jargon immediately (e.g. if the report says 'normocytic normochromic anemia', explain it means 'a slightly lower number of red blood cells, but the cells themselves are normal size and color').

2. KEY FINDINGS TABLE:
   - Extract each specific test/marker name, patient's value, standard reference range, and flag status.
   - Status must strictly be one of: 'normal', 'high', 'low', or 'attention'.
   - Provide a 1-2 sentence plainMeaning for every marker explaining what it does and what this result means.
   - If technical jargon is present (e.g. "eGFR", "RDW", "Anisocytosis", "Hypercholesterolemia"), provide a clear 'jargonDecoded' translation.

3. QUESTIONS FOR YOUR DOCTOR:
   - Provide 3 to 4 actionable, respectful, and empowering questions the patient should bring to their doctor at their next visit.

4. DISCLAIMER & HEALTH CONTEXT:
   - Include a clear disclaimer note and reassuring overall health takeaway.
   - Include 2-3 practical appointment tips.`;

    const userPrompt = `Please analyze the following patient lab report text.
${userFocusArea ? `Patient Note / Specific Concern: "${userFocusArea}"\n` : ''}
LAB REPORT CONTENT:
---
${reportText}
---`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reportTitle: {
              type: Type.STRING,
              description: 'Friendly title of the lab report analyzed',
            },
            plainEnglishSummary: {
              type: Type.STRING,
              description: '2-3 paragraph plain English summary written at a 6th grade reading level translating jargon into calm, accessible explanations',
            },
            keyFindings: {
              type: Type.ARRAY,
              description: 'Breakdown of individual test values',
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  testName: { type: Type.STRING, description: 'Name of test/marker' },
                  value: { type: Type.STRING, description: 'Patient result value with units' },
                  referenceRange: { type: Type.STRING, description: 'Normal reference range' },
                  status: {
                    type: Type.STRING,
                    description: "Strictly 'normal', 'high', 'low', or 'attention'",
                  },
                  plainMeaning: {
                    type: Type.STRING,
                    description: 'Simple 1-2 sentence explanation of what this marker does and what this result means',
                  },
                  jargonDecoded: {
                    type: Type.STRING,
                    description: 'Plain English translation of medical jargon terms if applicable',
                  },
                },
                required: ['testName', 'value', 'referenceRange', 'status', 'plainMeaning'],
              },
            },
            doctorQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3-4 specific questions to ask doctor',
            },
            disclaimerNote: {
              type: Type.STRING,
              description: 'Contextual reminder regarding medical interpretation',
            },
            overallHealthContext: {
              type: Type.STRING,
              description: 'Reassuring closing context paragraph',
            },
            patientTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2-3 practical tips for doctor visit',
            },
          },
          required: [
            'reportTitle',
            'plainEnglishSummary',
            'keyFindings',
            'doctorQuestions',
            'disclaimerNote',
            'overallHealthContext',
            'patientTips',
          ],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Gemini returned an empty response.');
    }

    const parsedData = JSON.parse(responseText);

    // Ensure IDs on findings
    if (Array.isArray(parsedData.keyFindings)) {
      parsedData.keyFindings = parsedData.keyFindings.map((finding: any, idx: number) => ({
        ...finding,
        id: finding.id || `finding-${idx}-${Date.now()}`,
      }));
    }

    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error analyzing lab report:', error);
    return res.status(500).json({
      error: error.message || 'Failed to analyze lab report. Please check your network connection or API settings.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MediClear AI server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

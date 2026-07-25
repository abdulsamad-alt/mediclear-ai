import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { reportText, userFocusArea } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze this lab report:\n${reportText}\nUser focus: ${userFocusArea || 'General'}`,
    });

    return res.status(200).json({ analysis: response.text });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Analysis failed' });
  }
}
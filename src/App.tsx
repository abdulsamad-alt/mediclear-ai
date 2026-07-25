import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

export default function App() {
  const [reportText, setReportText] = useState('');
  const [userFocusArea, setUserFocusArea] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');

    try {
      // Get key safely from Vite environment variables
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("Missing VITE_GEMINI_API_KEY environment variable.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze this lab report:\n${reportText}\nFocus Area: ${userFocusArea}`,
      });

      setAnalysis(response.text || 'No response returned.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to analyze lab report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>MediClear AI - Lab Report Decoder</h1>
      
      <textarea 
        rows={10} 
        cols={50}
        value={reportText} 
        onChange={(e) => setReportText(e.target.value)} 
        placeholder="Paste lab report here..." 
      />
      
      <br /><br />
      
      <input 
        type="text" 
        value={userFocusArea} 
        onChange={(e) => setUserFocusArea(e.target.value)} 
        placeholder="Specific symptoms or questions (optional)" 
      />
      
      <br /><br />
      
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Decode & Analyze Report'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {analysis && <div><h2>Analysis Output:</h2><p>{analysis}</p></div>}
    </div>
  );
}

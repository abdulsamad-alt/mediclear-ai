import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { LabInputSection } from './components/LabInputSection';
import { AnalysisOutput } from './components/AnalysisOutput';
import { JargonGlossary } from './components/JargonGlossary';
import { Footer } from './components/Footer';
import { AnalysisResult } from './types';
import { SAMPLE_REPORTS } from './data/sampleReports';
import { Sparkles, AlertCircle, RefreshCw, Stethoscope, HeartPulse, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  onReset: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class SafeDisplayBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false, errorMessage: '' };

  public static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.toString() };
  }

  public componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.error("Display Render Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 mb-8 text-rose-900 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
          <h4 className="font-bold text-base">UI Crash Detected</h4>
          
          {/* THIS WILL PRINT THE EXACT ERROR ON SCREEN */}
          <div className="bg-white/60 p-3 rounded-lg border border-rose-200 text-left font-mono text-xs text-rose-900 overflow-x-auto">
            {this.state.errorMessage}
          </div>
          
          <p className="text-sm font-semibold">
            Bro, copy the exact red code error above and paste it to me!
          </p>
          
          <button
            onClick={() => {
              this.setState({ hasError: false, errorMessage: '' });
              this.props.onReset();
            }}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset UI
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'decoder' | 'glossary'>('decoder');
  const [reportText, setReportText] = useState('');
  const [userFocusArea, setUserFocusArea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!reportText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("Missing VITE_GEMINI_API_KEY environment variable in Vercel.");
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are MediClear AI, an empathetic patient advocate and clinical communications assistant.
Analyze the following laboratory report.

Lab Report Text:
${reportText}

Patient Focus Area / Questions:
${userFocusArea.trim() || 'None provided'}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: {
                type: Type.STRING,
                description: "A 2-3 paragraph plain English explanation written at a 6th-grade reading level.",
              },
              findings: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    testName: { type: Type.STRING },
                    value: { type: Type.STRING },
                    flag: { type: Type.STRING, description: "HIGH, LOW, or NORMAL" },
                    referenceRange: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                  },
                  required: ["testName", "value", "flag", "referenceRange", "explanation"],
                },
              },
              doctorQuestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              jargonTerms: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    term: { type: Type.STRING },
                    definition: { type: Type.STRING },
                  },
                  required: ["term", "definition"],
                },
              },
            },
            required: ["summary", "findings", "doctorQuestions", "jargonTerms"],
          },
        },
      });

      const responseText = response.text || '';
      
      if (!responseText) {
        throw new Error('No response returned from Gemini.');
      }

      const parsedData = JSON.parse(responseText);

      // Add alias mappings so AnalysisOutput works regardless of parameter naming conventions
      const normalizedResult: any = {
        ...parsedData,
        keyFindings: parsedData.findings || [],
        questionsForDoctor: parsedData.doctorQuestions || [],
        jargonGlossary: parsedData.jargonTerms || [],
      };

      setAnalysisResult(normalizedResult as AnalysisResult);
      window.scrollTo({ top: 220, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'An unexpected error occurred while processing your report.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSamples = () => {
    setActiveTab('decoder');
    if (!reportText) {
      setReportText(SAMPLE_REPORTS[0].text);
    }
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-200">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSamples={handleOpenSamples}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6">
        
        {/* Prominent Medical Disclaimer at Top */}
        <DisclaimerBanner position="top" />

        {/* Tab Content */}
        {activeTab === 'glossary' ? (
          <JargonGlossary />
        ) : (
          <div>
            {/* Input Form */}
            {!analysisResult && (
              <>
                <LabInputSection
                  reportText={reportText}
                  setReportText={setReportText}
                  userFocusArea={userFocusArea}
                  setUserFocusArea={setUserFocusArea}
                  onAnalyze={handleAnalyze}
                  isLoading={isLoading}
                />

                {/* Loading State Animation Card */}
                {isLoading && (
                  <div className="bg-white rounded-2xl border border-sky-200 shadow-xl p-8 mb-8 text-center animate-pulse space-y-4">
                    <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto">
                      <Sparkles className="w-7 h-7 animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Gemini 2.5 Flash is Decoding Your Lab Report...
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Translating medical terminology into 6th-grade plain English, identifying key reference values, and formulating doctor questions.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-2 text-xs font-semibold text-sky-800">
                      <span className="bg-sky-50 px-3 py-1 rounded-full border border-sky-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> Translating Jargon
                      </span>
                      <span className="bg-sky-50 px-3 py-1 rounded-full border border-sky-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> Checking Reference Ranges
                      </span>
                      <span className="bg-sky-50 px-3 py-1 rounded-full border border-sky-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> Preparing Doctor Questions
                      </span>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {error && (
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 mb-8 text-rose-900 flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm sm:text-base">Unable to Complete Analysis</h4>
                      <p className="text-xs sm:text-sm text-rose-800 mt-1">{error}</p>
                      <button
                        onClick={handleAnalyze}
                        className="mt-3 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Retry Analysis
                      </button>
                    </div>
                  </div>
                )}

                {/* Features & Confidence Cards */}
                {!isLoading && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    
                    <div className="bg-white p-5 rounded-2xl border border-sky-100/80 shadow-sm hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3">
                        <HeartPulse className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm mb-1">
                        1. Plain English Translation
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Transforms intimidating medical jargon into clear, 6th-grade level concepts.
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-sky-100/80 shadow-sm hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm mb-1">
                        2. Key Findings &amp; Ranges
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Color-coded table separating normal values from high/low flags, complete with standard reference intervals.
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-sky-100/80 shadow-sm hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm mb-1">
                        3. Doctor Appointment Kit
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Generates 3-4 tailored questions for your physician with a 1-click printable appointment summary sheet.
                      </p>
                    </div>

                  </div>
                )}
              </>
            )}

            {/* Analysis Output Results */}
            {analysisResult && (
              <SafeDisplayBoundary onReset={handleReset}>
                <AnalysisOutput
                  result={analysisResult}
                  onReset={handleReset}
                />
              </SafeDisplayBoundary>
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

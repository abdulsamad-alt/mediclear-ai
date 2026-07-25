import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { PlainEnglishSummary } from './PlainEnglishSummary';
import { KeyFindingsTable } from './KeyFindingsTable';
import { DoctorQuestions } from './DoctorQuestions';
import { DoctorPrepPrintModal } from './DoctorPrepPrintModal';
import { Sparkles, Printer, ArrowUp, RefreshCw } from 'lucide-react';

interface AnalysisOutputProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const AnalysisOutput: React.FC<AnalysisOutputProps> = ({ result, onReset }) => {
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedPrintQuestions, setSelectedPrintQuestions] = useState<string[]>(result.doctorQuestions);

  const handleOpenPrintModal = (questionsToPrint: string[]) => {
    setSelectedPrintQuestions(questionsToPrint);
    setIsPrintModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Quick Section Jump Bar */}
      <div className="sticky top-4 z-20 bg-white/90 backdrop-blur-md rounded-2xl border border-sky-200/80 shadow-lg p-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 overflow-x-auto text-xs font-semibold text-slate-700">
          <span className="text-sky-700 font-bold px-2 flex items-center gap-1 hidden sm:flex">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            Analysis Ready:
          </span>
          <button
            onClick={() => scrollToSection('section-plain-english-summary')}
            className="px-3 py-1.5 rounded-xl hover:bg-sky-50 text-slate-700 hover:text-sky-800 transition-colors cursor-pointer whitespace-nowrap"
          >
            1. Plain English
          </button>
          <button
            onClick={() => scrollToSection('section-key-findings-values')}
            className="px-3 py-1.5 rounded-xl hover:bg-sky-50 text-slate-700 hover:text-sky-800 transition-colors cursor-pointer whitespace-nowrap"
          >
            2. Key Findings &amp; Values
          </button>
          <button
            onClick={() => scrollToSection('section-doctor-questions')}
            className="px-3 py-1.5 rounded-xl hover:bg-sky-50 text-slate-700 hover:text-sky-800 transition-colors cursor-pointer whitespace-nowrap"
          >
            3. Questions for Doctor
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => handleOpenPrintModal(result.doctorQuestions)}
            className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Kit
          </button>
          <button
            onClick={onReset}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
            title="Analyze another report"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            New Analysis
          </button>
        </div>
      </div>

      {/* Section 1: Plain English Summary */}
      <PlainEnglishSummary
        summary={result.plainEnglishSummary}
        reportTitle={result.reportTitle}
        overallHealthContext={result.overallHealthContext}
      />

      {/* Section 2: Key Findings & Values Table */}
      <KeyFindingsTable findings={result.keyFindings} />

      {/* Section 3: Questions for Your Doctor */}
      <DoctorQuestions
        initialQuestions={result.doctorQuestions}
        patientTips={result.patientTips}
        onOpenPrintModal={handleOpenPrintModal}
      />

      {/* Back to top button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs font-semibold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-full border border-sky-200 transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <ArrowUp className="w-4 h-4" />
          Back to Top
        </button>
      </div>

      {/* Printable Appointment Kit Modal */}
      <DoctorPrepPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        result={result}
        selectedQuestions={selectedPrintQuestions}
      />
    </div>
  );
};

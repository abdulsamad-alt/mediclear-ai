import React, { useState } from 'react';
import { HelpCircle, CheckSquare, Square, Plus, Printer, Share2, ClipboardCheck, Lightbulb } from 'lucide-react';

interface DoctorQuestionsProps {
  initialQuestions: string[];
  patientTips: string[];
  onOpenPrintModal: (selectedQuestions: string[]) => void;
}

export const DoctorQuestions: React.FC<DoctorQuestionsProps> = ({
  initialQuestions,
  patientTips,
  onOpenPrintModal,
}) => {
  const [questions, setQuestions] = useState<string[]>(initialQuestions);
  const [selectedIndices, setSelectedIndices] = useState<number[]>(
    initialQuestions.map((_, i) => i)
  );
  const [customQuestion, setCustomQuestion] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleSelect = (index: number) => {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    const newIdx = questions.length;
    setQuestions([...questions, customQuestion.trim()]);
    setSelectedIndices([...selectedIndices, newIdx]);
    setCustomQuestion('');
  };

  const handleCopyQuestions = () => {
    const selectedText = questions
      .filter((_, i) => selectedIndices.includes(i))
      .map((q, idx) => `${idx + 1}. ${q}`)
      .join('\n');

    if (selectedText) {
      navigator.clipboard.writeText(`Questions for My Doctor:\n${selectedText}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div id="section-doctor-questions" className="bg-white rounded-2xl border border-sky-100 shadow-md p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wide bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                Section 3 of 3
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                • Doctor Visit Preparation
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
              Questions for Your Doctor
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            id="btn-copy-doctor-questions"
            onClick={handleCopyQuestions}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <ClipboardCheck className="w-4 h-4 text-sky-600" />
            {copied ? 'Copied to Clipboard!' : 'Copy List'}
          </button>

          <button
            id="btn-print-doctor-checklist"
            onClick={() => onOpenPrintModal(questions.filter((_, i) => selectedIndices.includes(i)))}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print Appointment Kit
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 mb-4">
        Check off the questions you would like to ask during your appointment, or add your own personal questions below:
      </p>

      {/* Interactive Question Cards */}
      <div className="space-y-3 mb-6">
        {questions.map((q, idx) => {
          const isSelected = selectedIndices.includes(idx);
          return (
            <div
              key={idx}
              onClick={() => toggleSelect(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                isSelected
                  ? 'bg-sky-50/80 border-sky-300 shadow-sm text-slate-900'
                  : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100/80'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-sky-600 shrink-0 cursor-pointer"
                aria-label={isSelected ? 'Deselect question' : 'Select question'}
              >
                {isSelected ? (
                  <CheckSquare className="w-5 h-5 text-sky-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isSelected ? 'font-semibold' : ''}`}>
                {q}
              </p>
            </div>
          );
        })}
      </div>

      {/* Add Custom Question Form */}
      <form onSubmit={handleAddQuestion} className="flex gap-2 mb-6">
        <input
          type="text"
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          placeholder="Add your own custom question for your doctor..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-xs sm:text-sm outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!customQuestion.trim()}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center gap-1 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </form>

      {/* Practical Visit Tips */}
      {patientTips && patientTips.length > 0 && (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Practical Tips for Your Visit:
          </h4>
          <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc list-inside">
            {patientTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

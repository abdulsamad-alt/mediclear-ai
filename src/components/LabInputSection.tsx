import React, { useState } from 'react';
import { SAMPLE_REPORTS } from '../data/sampleReports';
import { SampleReport } from '../types';
import { Sparkles, Clipboard, Trash2, ArrowRight, FileCheck, HelpCircle, Loader2 } from 'lucide-react';

interface LabInputSectionProps {
  reportText: string;
  setReportText: (text: string) => void;
  userFocusArea: string;
  setUserFocusArea: (text: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const LabInputSection: React.FC<LabInputSectionProps> = ({
  reportText,
  setReportText,
  userFocusArea,
  setUserFocusArea,
  onAnalyze,
  isLoading,
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

  const handleSelectSample = (sample: SampleReport) => {
    setSelectedSampleId(sample.id);
    setReportText(sample.text);
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setReportText(text);
        setSelectedSampleId(null);
      }
    } catch (err) {
      console.warn('Clipboard read error:', err);
    }
  };

  const handleClear = () => {
    setReportText('');
    setUserFocusArea('');
    setSelectedSampleId(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-sky-100 shadow-xl shadow-sky-900/5 p-5 sm:p-7 mb-8 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-sky-600" />
            Paste Your Lab Report
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Copy and paste text from your patient portal, lab result PDF, or doctor notes.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            id="btn-paste-clipboard"
            type="button"
            onClick={handlePasteClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors cursor-pointer"
            title="Paste from clipboard"
          >
            <Clipboard className="w-3.5 h-3.5" />
            Paste
          </button>
          {reportText && (
            <button
              id="btn-clear-input"
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Clear input"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Sample Reports Bar */}
      <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            Try a Sample Report:
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Click any button below to pre-load a sample lab result
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_REPORTS.map((sample) => (
            <button
              key={sample.id}
              id={`sample-btn-${sample.id}`}
              type="button"
              onClick={() => handleSelectSample(sample)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedSampleId === sample.id
                  ? 'bg-sky-600 text-white shadow-sm font-semibold'
                  : 'bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-800 border border-slate-200 hover:border-sky-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              {sample.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          id="lab-report-input-textarea"
          value={reportText}
          onChange={(e) => {
            setReportText(e.target.value);
            setSelectedSampleId(null);
          }}
          placeholder={`Paste lab results here...\nExample:\nTEST NAME       RESULT   FLAG   REFERENCE RANGE\nHemoglobin      11.1     L      12.0 - 16.0 g/dL\nWBC Count       6.8             4.5 - 11.0 x10E3/uL`}
          rows={7}
          className="w-full p-4 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-slate-800 text-sm font-mono leading-relaxed resize-y outline-none transition-all bg-slate-50/50 focus:bg-white"
        />
        <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
          {reportText.length} chars
        </div>
      </div>

      {/* Optional Specific Concern */}
      <div className="mt-4">
        <label htmlFor="user-focus-area-input" className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
          Optional: Specific symptoms or questions for this report?
        </label>
        <input
          id="user-focus-area-input"
          type="text"
          value={userFocusArea}
          onChange={(e) => setUserFocusArea(e.target.value)}
          placeholder="e.g. 'I feel fatigued lately' or 'Why is my glucose slightly high?'"
          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-xs sm:text-sm text-slate-800 outline-none transition-all"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-500 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Processed securely via Gemini 2.5 Flash on server • No data stored
        </p>

        <button
          id="btn-analyze-lab-report"
          type="button"
          onClick={onAnalyze}
          disabled={isLoading || !reportText.trim()}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all shadow-md cursor-pointer flex items-center justify-center gap-2.5 ${
            isLoading || !reportText.trim()
              ? 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
              : 'bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white shadow-sky-600/25 hover:shadow-lg'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white" />
              <span>Analyzing Lab Report...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-sky-200" />
              <span>Decode &amp; Analyze Report</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

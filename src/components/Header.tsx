import React from 'react';
import { Activity, BookOpen, FileText, Sparkles, Stethoscope } from 'lucide-react';

interface HeaderProps {
  activeTab: 'decoder' | 'glossary';
  setActiveTab: (tab: 'decoder' | 'glossary') => void;
  onOpenSamples?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenSamples }) => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-md border-b border-blue-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 ring-2 ring-white/20">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  MediClear <span className="text-sky-300 font-medium">AI</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-sky-500/20 text-sky-200 px-2 py-0.5 rounded-full border border-sky-400/30">
                  <Sparkles className="w-3 h-3 text-sky-300" /> Gemini 2.5 Flash
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-normal mt-0.5">
                Patient Lab Report &amp; Jargon Decoder
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              id="nav-btn-decoder"
              onClick={() => setActiveTab('decoder')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'decoder'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-900/30 font-semibold'
                  : 'bg-white/10 text-slate-200 hover:bg-white/15 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Report Decoder
            </button>

            <button
              id="nav-btn-glossary"
              onClick={() => setActiveTab('glossary')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'glossary'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-900/30 font-semibold'
                  : 'bg-white/10 text-slate-200 hover:bg-white/15 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Jargon Glossary
            </button>

            {onOpenSamples && (
              <button
                id="nav-btn-samples"
                onClick={onOpenSamples}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-sky-950/60 text-sky-200 border border-sky-700/50 hover:bg-sky-900/60 transition-all cursor-pointer whitespace-nowrap ml-auto sm:ml-0"
              >
                <Stethoscope className="w-3.5 h-3.5 text-sky-400" />
                Sample Reports
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

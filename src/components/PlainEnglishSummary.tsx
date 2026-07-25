import React from 'react';
import { BookOpen, CheckCircle2, Sparkles, MessageSquareHeart } from 'lucide-react';

interface PlainEnglishSummaryProps {
  summary: string;
  reportTitle: string;
  overallHealthContext: string;
}

export const PlainEnglishSummary: React.FC<PlainEnglishSummaryProps> = ({
  summary,
  reportTitle,
  overallHealthContext,
}) => {
  // Split summary into readable paragraphs
  const paragraphs = summary.split('\n\n').filter((p) => p.trim().length > 0);

  return (
    <div id="section-plain-english-summary" className="bg-white rounded-2xl border border-sky-100 shadow-md p-6 sm:p-8 mb-8">
      {/* Header Badge */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wide bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                Section 1 of 3
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                • 6th-Grade Reading Level Translation
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
              Plain English Summary
            </h3>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Jargon-Free &amp; Empathetic
        </div>
      </div>

      {/* Report Title Tag */}
      {reportTitle && (
        <div className="mb-5 p-3 bg-sky-50/80 rounded-xl border border-sky-200/80 flex items-center gap-2.5 text-sky-900 text-sm font-semibold">
          <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
          <span>Report Categorized as: <strong className="text-sky-950 font-bold">{reportTitle}</strong></span>
        </div>
      )}

      {/* Main Plain English Text */}
      <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
        {paragraphs.length > 0 ? (
          paragraphs.map((para, idx) => (
            <p key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 text-slate-800">
              {para}
            </p>
          ))
        ) : (
          <p className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 text-slate-800">
            {summary}
          </p>
        )}
      </div>

      {/* Overall Health Context Callout */}
      {overallHealthContext && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-sky-200/90 flex items-start gap-3">
          <MessageSquareHeart className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 mb-1">
              Empathetic Takeaway
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {overallHealthContext}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

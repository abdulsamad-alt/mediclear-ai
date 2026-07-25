import React, { useState } from 'react';
import { ShieldAlert, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface DisclaimerBannerProps {
  position?: 'top' | 'bottom';
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ position = 'top' }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      id={`disclaimer-banner-${position}`}
      className={`w-full bg-amber-500/10 border-amber-300/40 border-y sm:border-x sm:rounded-xl p-3 sm:p-4 text-slate-800 transition-all ${
        position === 'top' ? 'mb-6 shadow-sm' : 'mt-8'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5 sm:mt-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-amber-900 leading-snug">
              Important Medical Disclaimer:
            </p>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              MediClear AI is an informational tool, not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>

        <button
          id={`btn-disclaimer-toggle-${position}`}
          onClick={() => setShowDetails(!showDetails)}
          className="self-end sm:self-center text-xs font-medium text-amber-900 hover:text-amber-950 underline underline-offset-2 flex items-center gap-1 cursor-pointer shrink-0 py-1 px-2 rounded hover:bg-amber-100/50 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          {showDetails ? 'Hide details' : 'Why this matters'}
          {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {showDetails && (
        <div className="max-w-6xl mx-auto mt-3 pt-3 border-t border-amber-200/60 text-xs text-slate-600 leading-relaxed space-y-1.5 animate-fadeIn">
          <p>
            • <strong>Context matters:</strong> Blood values vary based on age, sex, hydration, time of day, and laboratory equipment. A single &quot;out of range&quot; number is very common and often completely normal in your overall health context.
          </p>
          <p>
            • <strong>Never delay medical care:</strong> Always consult your licensed healthcare provider or physician before making changes to medications, diet, or treatment plans based on lab results.
          </p>
          <p>
            • <strong>Urgent issues:</strong> If you are experiencing severe symptoms, chest pain, shortness of breath, or emergency health issues, call emergency services (911) immediately.
          </p>
        </div>
      )}
    </div>
  );
};

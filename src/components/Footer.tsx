import React from 'react';
import { DisclaimerBanner } from './DisclaimerBanner';
import { Activity, ShieldCheck, HeartPulse, PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300 border-t border-slate-800 pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Prominent Medical Disclaimer at Bottom */}
        <DisclaimerBanner position="bottom" />

        <div className="mt-8 pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-2">
              <Activity className="w-5 h-5 text-sky-400" />
              MediClear AI
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering patients with plain-English lab report translations, jargon decoding, and proactive doctor visit preparation.
            </p>
          </div>

          {/* Privacy & Safety */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Privacy &amp; Data Ethics
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your lab report text is sent to Gemini AI for real-time analysis and is never stored, sold, or tied to your identity.
            </p>
          </div>

          {/* Emergency Helplines */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-sky-400" />
              Urgent Medical Emergency
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              If you are experiencing severe physical symptoms, chest pain, or a medical crisis:
            </p>
            <div className="flex items-center gap-3 text-xs font-semibold text-white">
              <span className="bg-red-500/20 text-red-300 px-2.5 py-1 rounded-lg border border-red-500/30">
                Medical Crisis: Call 911
              </span>
              <span className="bg-sky-500/20 text-sky-300 px-2.5 py-1 rounded-lg border border-sky-500/30">
                Mental Health: Call 988
              </span>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} MediClear AI. Created for patient health literacy.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Powered by Gemini 2.5 Flash <HeartPulse className="w-3.5 h-3.5 text-rose-400 inline" />
          </p>
        </div>

      </div>
    </footer>
  );
};

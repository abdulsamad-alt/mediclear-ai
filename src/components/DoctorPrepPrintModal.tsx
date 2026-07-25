import React from 'react';
import { AnalysisResult } from '../types';
import { X, Printer, ShieldAlert, CheckSquare, Activity, Stethoscope } from 'lucide-react';

interface DoctorPrepPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult;
  selectedQuestions: string[];
}

export const DoctorPrepPrintModal: React.FC<DoctorPrepPrintModalProps> = ({
  isOpen,
  onClose,
  result,
  selectedQuestions,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const abnormalFindings = result.keyFindings.filter(
    (f) => f.status === 'high' || f.status === 'low' || f.status === 'attention'
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8 border border-slate-200">
        
        {/* Modal Controls Bar (Hidden in print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-sm sm:text-base">Doctor Visit Appointment Sheet</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 text-slate-800 font-sans print:p-0 print:m-0 print:text-black">
          
          {/* Print Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 text-sky-700 font-bold text-xl">
                <Activity className="w-6 h-6 text-sky-600" />
                MediClear AI — Patient Doctor Companion
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Report Title: <strong>{result.reportTitle}</strong> • Generated for Patient Appointment
              </p>
            </div>
            <div className="text-right text-xs text-slate-400">
              Date: {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-950 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Notice for Medical Provider:</strong> MediClear AI is a patient health-literacy tool meant to assist patients in organizing questions for their visit. It is not a clinical diagnostic tool.
            </p>
          </div>

          {/* Plain English Summary */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">
              1. Patient Lab Summary
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
              {result.plainEnglishSummary}
            </p>
          </div>

          {/* Key Abnormal / Flagged Values */}
          {abnormalFindings.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">
                2. Flagged Lab Values for Discussion
              </h4>
              <div className="border border-slate-200 rounded overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 font-semibold text-slate-700">
                    <tr>
                      <th className="p-2 border-b">Test Name</th>
                      <th className="p-2 border-b">Result</th>
                      <th className="p-2 border-b">Normal Range</th>
                      <th className="p-2 border-b">Flag</th>
                      <th className="p-2 border-b">Plain Explanation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {abnormalFindings.map((f, idx) => (
                      <tr key={idx}>
                        <td className="p-2 font-bold">{f.testName}</td>
                        <td className="p-2 font-mono font-bold">{f.value}</td>
                        <td className="p-2 font-mono">{f.referenceRange}</td>
                        <td className="p-2 uppercase font-bold text-amber-800">{f.status}</td>
                        <td className="p-2 text-slate-600">{f.plainMeaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Doctor Questions Checklist */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">
              3. Questions to Ask My Doctor
            </h4>
            <div className="space-y-2">
              {selectedQuestions.map((q, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                  <div className="w-4 h-4 border-2 border-slate-400 rounded shrink-0 mt-0.5"></div>
                  <span className="font-medium">{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Notes Section */}
          <div className="pt-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">
              4. Doctor Notes &amp; Next Steps
            </h4>
            <div className="border border-dashed border-slate-300 rounded p-4 h-28 text-xs text-slate-400 italic">
              Use this space to write down your doctor&apos;s recommendations, medication updates, or follow-up test dates...
            </div>
          </div>

          {/* Print Footer */}
          <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-500">
            MediClear AI is an informational tool, not a substitute for professional medical advice.
          </div>

        </div>

      </div>
    </div>
  );
};

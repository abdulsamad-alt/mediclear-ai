import React, { useState } from 'react';
import { COMMON_JARGON } from '../data/jargonGlossary';
import { BookOpen, Search, Sparkles, HelpCircle } from 'lucide-react';

export const JargonGlossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(COMMON_JARGON.map((j) => j.category)))];

  const filteredJargon = COMMON_JARGON.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (searchTerm.trim().length > 0) {
      const term = searchTerm.toLowerCase();
      return (
        item.term.toLowerCase().includes(term) ||
        item.definition.toLowerCase().includes(term) ||
        item.plainAnalogy.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div id="section-jargon-glossary" className="bg-white rounded-2xl border border-sky-100 shadow-xl p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Medical Lab Jargon Glossary
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Clear definitions and real-world analogies for common medical lab tests and acronyms.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search medical terms (e.g. 'eGFR', 'Platelets', 'TSH', 'Hemoglobin')..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-xs sm:text-sm text-slate-800 outline-none transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer capitalize whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJargon.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-sky-300 transition-all shadow-xs space-y-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {item.term}
              </h3>
              <span className="text-[10px] font-semibold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full border border-sky-200 shrink-0">
                {item.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {item.definition}
            </p>

            <div className="p-3 bg-indigo-50/70 rounded-lg border border-indigo-100 text-xs text-indigo-950 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-indigo-900 font-semibold block mb-0.5">
                  Real-World Analogy:
                </strong>
                {item.plainAnalogy}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredJargon.length === 0 && (
        <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-500 text-sm">
          No glossary terms match your search. Try typing another term or select &quot;all&quot; categories.
        </div>
      )}
    </div>
  );
};

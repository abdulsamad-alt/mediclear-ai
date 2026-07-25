import React, { useState } from 'react';
import { LabFinding, FindingStatus } from '../types';
import { Table, Search, Filter, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, Info, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface KeyFindingsTableProps {
  findings: LabFinding[];
}

export const KeyFindingsTable: React.FC<KeyFindingsTableProps> = ({ findings }) => {
  const [filter, setFilter] = useState<'all' | 'abnormal' | 'normal'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const abnormalCount = findings.filter(
    (f) => f.status === 'high' || f.status === 'low' || f.status === 'attention'
  ).length;
  const normalCount = findings.filter((f) => f.status === 'normal').length;

  const filteredFindings = findings.filter((finding) => {
    // Status filter
    if (filter === 'abnormal') {
      if (finding.status === 'normal') return false;
    } else if (filter === 'normal') {
      if (finding.status !== 'normal') return false;
    }

    // Search filter
    if (searchTerm.trim().length > 0) {
      const term = searchTerm.toLowerCase();
      const matchName = finding.testName.toLowerCase().includes(term);
      const matchMeaning = finding.plainMeaning.toLowerCase().includes(term);
      const matchJargon = finding.jargonDecoded?.toLowerCase().includes(term);
      return matchName || matchMeaning || matchJargon;
    }

    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  const renderStatusBadge = (status: FindingStatus) => {
    switch (status) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full border border-amber-300">
            <ArrowUpRight className="w-3.5 h-3.5" /> High
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full border border-blue-300">
            <ArrowDownRight className="w-3.5 h-3.5" /> Low
          </span>
        );
      case 'attention':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-orange-100 text-orange-900 px-2.5 py-1 rounded-full border border-orange-300">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-600" /> Attention
          </span>
        );
      case 'normal':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Normal
          </span>
        );
    }
  };

  return (
    <div id="section-key-findings-values" className="bg-white rounded-2xl border border-sky-100 shadow-md p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wide bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                Section 2 of 3
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                • Values &amp; Reference Breakdown
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
              Key Findings &amp; Lab Values
            </h3>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold">
          <button
            id="btn-filter-all"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filter === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({findings.length})
          </button>
          <button
            id="btn-filter-abnormal"
            onClick={() => setFilter('abnormal')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              filter === 'abnormal' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-amber-800'
            }`}
          >
            Abnormal / Flags ({abnormalCount})
          </button>
          <button
            id="btn-filter-normal"
            onClick={() => setFilter('normal')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              filter === 'normal' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-emerald-800'
            }`}
          >
            Normal ({normalCount})
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="mb-4 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search test name or term (e.g., 'Hemoglobin', 'Glucose', 'Kidney')..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-xs sm:text-sm text-slate-800 outline-none transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Findings List / Table */}
      {filteredFindings.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-sm">
          No lab values found matching current filter or search criteria.
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3.5 px-4">Test Marker</th>
                <th className="py-3.5 px-4">Your Value</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">Standard Normal Range</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-800">
              {filteredFindings.map((finding) => {
                const isExpanded = expandedRowId === finding.id;
                const isAbnormal = finding.status !== 'normal';

                return (
                  <React.Fragment key={finding.id}>
                    <tr
                      onClick={() => toggleExpand(finding.id)}
                      className={`hover:bg-sky-50/50 cursor-pointer transition-colors ${
                        isAbnormal ? 'bg-amber-50/20' : ''
                      } ${isExpanded ? 'bg-sky-50/80' : ''}`}
                    >
                      {/* Marker Name */}
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span>{finding.testName}</span>
                          {finding.jargonDecoded && (
                            <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-mono hidden md:inline">
                              Jargon Decoded
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Result Value */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">
                        {finding.value}
                      </td>

                      {/* Reference Range */}
                      <td className="py-3.5 px-4 text-slate-500 hidden sm:table-cell font-mono text-xs">
                        {finding.referenceRange || 'N/A'}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4">
                        {renderStatusBadge(finding.status)}
                      </td>

                      {/* Details Toggle Button */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          className="text-xs font-semibold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 cursor-pointer"
                        >
                          {isExpanded ? 'Hide' : 'Explain'}
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <tr className="bg-sky-50/40 border-b border-sky-100">
                        <td colSpan={5} className="p-4 sm:p-5">
                          <div className="space-y-3 bg-white p-4 rounded-xl border border-sky-200/80 shadow-inner">
                            {/* Plain Meaning */}
                            <div className="flex items-start gap-2.5">
                              <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                              <div>
                                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                  What this value means in plain English:
                                </h5>
                                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed mt-0.5 font-medium">
                                  {finding.plainMeaning}
                                </p>
                              </div>
                            </div>

                            {/* Reference Range for mobile view */}
                            <div className="sm:hidden text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                              <strong>Standard Reference Range:</strong> {finding.referenceRange || 'N/A'}
                            </div>

                            {/* Jargon Decoded */}
                            {finding.jargonDecoded && (
                              <div className="flex items-start gap-2.5 p-3 bg-indigo-50/60 rounded-lg border border-indigo-100">
                                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                                <div>
                                  <h5 className="text-xs font-bold text-indigo-900 uppercase tracking-wide">
                                    Medical Jargon Translator:
                                  </h5>
                                  <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed mt-0.5">
                                    {finding.jargonDecoded}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

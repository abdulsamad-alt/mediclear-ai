export type FindingStatus = 'normal' | 'high' | 'low' | 'attention';

export interface LabFinding {
  id: string;
  testName: string;
  value: string;
  referenceRange: string;
  status: FindingStatus;
  plainMeaning: string;
  jargonDecoded?: string;
}

export interface AnalysisResult {
  reportTitle: string;
  plainEnglishSummary: string;
  keyFindings: LabFinding[];
  doctorQuestions: string[];
  disclaimerNote: string;
  overallHealthContext: string;
  patientTips: string[];
}

export interface SampleReport {
  id: string;
  name: string;
  category: string;
  description: string;
  text: string;
}

export interface CommonJargonTerm {
  term: string;
  category: string;
  definition: string;
  plainAnalogy: string;
}

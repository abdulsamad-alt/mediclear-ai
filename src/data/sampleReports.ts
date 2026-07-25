import { SampleReport } from '../types';

export const SAMPLE_REPORTS: SampleReport[] = [
  {
    id: 'cbc-anemia',
    name: 'Complete Blood Count (CBC)',
    category: 'Hematology',
    description: 'Shows mild anemia indicator with slightly low hemoglobin and hematocrit.',
    text: `LABORATORY REPORT - METRO DIAGNOSTICS
Patient ID: #98421
Order: Complete Blood Count (CBC) w/ Automated Differential

TEST NAME                  RESULT      FLAG    REFERENCE INTERVAL    UNITS
-------------------------------------------------------------------------
WBC Count                  6.8                 4.5 - 11.0            x10E3/uL
RBC Count                  3.91        L       4.20 - 5.40           x10E6/uL
Hemoglobin                 11.1        L       12.0 - 16.0           g/dL
Hematocrit                 34.2        L       37.0 - 48.0           %
MCV                        87.5                80.0 - 100.0          fL
MCH                        28.4                27.0 - 33.0           pg
MCHC                       32.5                32.0 - 36.0           g/dL
RDW                        14.8        H       11.5 - 14.5           %
Platelet Count             245                 150 - 450             x10E3/uL
Neutrophils %              62.0                40.0 - 70.0           %
Lymphocytes %              28.0                20.0 - 40.0           %
Monocytes %                7.0                 2.0 - 8.0             %
Eosinophils %              2.5                 1.0 - 4.0             %
Basophils %                0.5                 0.0 - 2.0             %

IMPRESSION: Mild normocytic normochromic anemia with subtle anisocytosis. No blasts or abnormal leukocyte morphologic flags detected.`
  },
  {
    id: 'cmp-prediabetes',
    name: 'Comprehensive Metabolic Panel (CMP)',
    category: 'Chemistry',
    description: 'Checks liver, kidney function, electrolytes, and slightly elevated glucose.',
    text: `LABORATORY REPORT - CITY HEALTH LABS
Order: Comprehensive Metabolic Panel (CMP)

TEST NAME                  RESULT      FLAG    REFERENCE INTERVAL    UNITS
-------------------------------------------------------------------------
Glucose, Fasting           108         H       70 - 99               mg/dL
BUN (Blood Urea Nitrogen)  18                  7 - 20                mg/dL
Creatinine                 0.88                0.57 - 1.00           mg/dL
eGFR Serum                 92                  >60                   mL/min/1.73
Sodium                     139                 135 - 145             mmol/L
Potassium                  4.2                 3.5 - 5.1             mmol/L
Chloride                   102                 96 - 106              mmol/L
Carbon Dioxide (CO2)       24                  20 - 29               mmol/L
Calcium                    9.5                 8.6 - 10.2            mg/dL
Protein, Total             7.1                 6.0 - 8.3             g/dL
Albumin                    4.4                 3.5 - 5.0             g/dL
Bilirubin, Total           0.7                 0.2 - 1.2             mg/dL
Alkaline Phosphatase (ALP) 68                  44 - 121              IU/L
AST (SGOT)                 22                  10 - 40               U/L
ALT (SGPT)                 38                  7 - 56                U/L

NOTE: Fasting status confirmed (10 hours). Elevated fasting blood sugar may warrant HbA1c correlation to evaluate prediabetes status.`
  },
  {
    id: 'lipid-cholesterol',
    name: 'Lipid & Cholesterol Panel',
    category: 'Cardiovascular',
    description: 'Measures HDL, LDL, and triglycerides with slightly elevated LDL.',
    text: `LABORATORY REPORT - ADVANCED DIAGNOSTIC SOLUTIONS
Order: Lipid Panel with Ratios

TEST NAME                  RESULT      FLAG    REFERENCE INTERVAL    UNITS
-------------------------------------------------------------------------
Cholesterol, Total         215         H       <200                  mg/dL
Triglycerides              142                 <150                  mg/dL
HDL Cholesterol ("Good")    54                  >40 (Optimal)         mg/dL
LDL Cholesterol ("Bad")    133         H       <100 (Optimal)        mg/dL
Non-HDL Cholesterol        161         H       <130                  mg/dL
TC / HDL Ratio             4.0                 <5.0                  ratio

CLINICAL IMPRESSION: Mild hypercholesterolemia with optimal HDL buffer. Consider lifestyle modifications, dietary fiber increase, and cardiac risk assessment.`
  },
  {
    id: 'thyroid-panel',
    name: 'Thyroid Function Panel (TSH, Free T4)',
    category: 'Endocrinology',
    description: 'Evaluates thyroid hormone production with mildly elevated TSH.',
    text: `LABORATORY REPORT - ENDO LAB SERVICES
Order: Thyroid Function Panel

TEST NAME                  RESULT      FLAG    REFERENCE INTERVAL    UNITS
-------------------------------------------------------------------------
TSH (Thyroid Stimulating)  5.42        H       0.45 - 4.50           uIU/mL
Free T4 (Thyroxine)        1.12                0.82 - 1.77           ng/dL
Free T3 (Triiodothyronine) 2.9                 2.0 - 4.4             pg/mL

CLINICAL IMPRESSION: Subclinical hypothyroidism pattern (mildly elevated TSH with normal free thyroxine levels). Patient denies overt fatigue or cold intolerance.`
  }
];

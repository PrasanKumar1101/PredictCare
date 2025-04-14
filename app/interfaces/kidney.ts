// Kidney Disease prediction model interface
export interface KidneyInput {
  age: number;
  bp: number; // blood pressure
  sg: number; // specific gravity
  al: number; // albumin
  su: number; // sugar
  rbc: string; // red blood cells (normal/abnormal)
  pc: string; // pus cell (normal/abnormal)
  pcc: string; // pus cell clumps (present/notpresent)
  ba: string; // bacteria (present/notpresent)
  bgr: number; // blood glucose random
  bu: number; // blood urea
  sc: number; // serum creatinine
  sod: number; // sodium
  pot: number; // potassium
  hemo: number; // hemoglobin
  pcv: number; // packed cell volume
  wc: number; // white blood cell count
  rc: number; // red blood cell count
  htn: string; // hypertension (yes/no)
  dm: string; // diabetes mellitus (yes/no)
  cad: string; // coronary artery disease (yes/no)
  appet: string; // appetite (good/poor)
  pe: string; // pedal edema (yes/no)
  ane: string; // anemia (yes/no)
}

export interface KidneyPrediction {
  prediction: string; // "ckd" or "notckd"
  probability: number; // Probability score
  risk: 'Low' | 'Medium' | 'High';
  isMockPrediction?: boolean; // Indicates if this is a simulated prediction
}

export interface KidneyResult {
  input: KidneyInput;
  result: KidneyPrediction;
} 
// Export all model interfaces
export * from './diabetes';
export * from './heart';
export * from './kidney';

// Common interfaces for the application
export interface PredictionResponse {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

export type ModelType = 'diabetes' | 'heart' | 'kidney'; 
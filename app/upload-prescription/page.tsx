'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface ParsedResult {
  medications?: string[];
  diagnoses?: string[];
  patientInfo?: {
    name?: string;
    age?: string;
    gender?: string;
  };
  doctorInfo?: {
    name?: string;
    specialization?: string;
  };
  tests?: string[];
  recommendations?: string[];
}

export default function UploadPrescriptionPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [parsedResult, setParsedResult] = useState<ParsedResult | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFile(selectedFile);
    }
  };

  const handleFile = (selectedFile: File) => {
    // Check if file is PDF
    if (selectedFile.type !== 'application/pdf') {
      setUploadError('Please upload a PDF file.');
      setFile(null);
      return;
    }
    
    // Check if file size is less than 10MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      setUploadError('File size must be less than 10MB.');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    setUploadError('');
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadError('');
    setParsedResult(null);
    
    try {
      // Simulate API call to parse the PDF
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock parsed result - in a real app, this would come from backend
      setParsedResult({
        medications: [
          'Amoxicillin 500mg - 1 tablet three times daily for 7 days',
          'Ibuprofen 400mg - 1 tablet as needed for pain (maximum 3 per day)',
          'Loratadine 10mg - 1 tablet daily for allergies'
        ],
        diagnoses: [
          'Acute bacterial sinusitis',
          'Seasonal allergic rhinitis'
        ],
        patientInfo: {
          name: 'John Doe',
          age: '42',
          gender: 'Male'
        },
        doctorInfo: {
          name: 'Dr. Sarah Johnson',
          specialization: 'ENT Specialist'
        },
        tests: [
          'Complete Blood Count (CBC)',
          'Sinus X-ray if symptoms persist'
        ],
        recommendations: [
          'Rest and adequate hydration',
          'Steam inhalation twice daily',
          'Follow-up in 10 days if symptoms don\'t improve'
        ]
      });
    } catch {
      setUploadError('Failed to parse the prescription. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleReset = () => {
    setFile(null);
    setParsedResult(null);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Prescription Analyzer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Upload your prescription or medical report and our AI will analyze and organize the information for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Upload Document
              </h2>
              
              {!file ? (
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
                    isDragging 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <UploadCloud 
                      size={48} 
                      className={`mb-4 ${
                        isDragging 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-400 dark:text-gray-500'
                      }`} 
                    />
                    <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                      Drag and drop your file here
                    </p>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      or <button 
                        type="button" 
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium" 
                        onClick={handleBrowseClick}
                      >
                        browse
                      </button> to choose a file
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF files only (max. 10MB)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center">
                    <FileText size={32} className="text-blue-600 dark:text-blue-400 mr-3" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(file.size / 1024).toFixed(2)} KB • PDF
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="ml-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      aria-label="Remove file"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                </div>
              )}
              
              {uploadError && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded text-red-700 dark:text-red-400 text-sm">
                  {uploadError}
                </div>
              )}
              
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Prescription
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Results Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 h-full">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Analysis Results
              </h2>
              
              {isUploading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Processing your document...
                  </p>
                </div>
              ) : parsedResult ? (
                <div className="space-y-6">
                  {parsedResult.patientInfo && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Patient Information
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Name:</span> {parsedResult.patientInfo.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Age:</span> {parsedResult.patientInfo.age}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Gender:</span> {parsedResult.patientInfo.gender}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {parsedResult.doctorInfo && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Doctor Information
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Name:</span> {parsedResult.doctorInfo.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Specialization:</span> {parsedResult.doctorInfo.specialization}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {parsedResult.diagnoses && parsedResult.diagnoses.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Diagnoses
                      </h3>
                      <ul className="bg-gray-50 dark:bg-gray-700 rounded p-3 space-y-2">
                        {parsedResult.diagnoses.map((diagnosis, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                            <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {diagnosis}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {parsedResult.medications && parsedResult.medications.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Medications
                      </h3>
                      <ul className="bg-gray-50 dark:bg-gray-700 rounded p-3 space-y-2">
                        {parsedResult.medications.map((medication, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                            <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {medication}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {parsedResult.tests && parsedResult.tests.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Tests
                      </h3>
                      <ul className="bg-gray-50 dark:bg-gray-700 rounded p-3 space-y-2">
                        {parsedResult.tests.map((test, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                            <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {test}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {parsedResult.recommendations && parsedResult.recommendations.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Recommendations
                      </h3>
                      <ul className="bg-gray-50 dark:bg-gray-700 rounded p-3 space-y-2">
                        {parsedResult.recommendations.map((recommendation, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                            <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {recommendation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  <FileText size={48} className="mb-4 opacity-40" />
                  <p className="text-center">
                    Upload a prescription or medical report<br />to see the analysis results here.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-sm text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            How It Works
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our AI uses advanced OCR and natural language processing to extract and organize information from your prescriptions. 
            This helps you keep track of medications, diagnoses, and follow-up instructions in a structured format.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Note: This tool is for informational purposes only and does not replace professional medical advice.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 
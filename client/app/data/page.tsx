"use client";

import { useState } from "react";
import { TopNav } from "@/components/nav/top-nav";
import { Button } from "@/components/ui/button";
import { CSVFormatWarning } from "@/components/data/csv-format-warning";
import { FileUploadZone } from "@/components/data/file-upload-zone";
import { UploadStats } from "@/components/data/upload-stats";
import { ValidationResults, ValidationError } from "@/components/data/validation-results";
import { 
  Upload, 
  Download, 
  FileText, 
  Users, 
  Database,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { ProfileIcon } from "@/components/profile/icon";
import LanguageSelector from "@/components/ui/language-selector";
import { useLanguage } from "@/components/ui/language-context";

interface CSVRecord {
  uid: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'counselor';
}

interface UploadStatistics {
  totalRecords: number;
  studentsCount: number;
  counselorsCount: number;
  validRecords: number;
  invalidRecords: number;
}

export default function DataUploadPage() {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadStats, setUploadStats] = useState<UploadStatistics | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateCSVRecord = (record: any, rowIndex: number): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    // Check required fields
    if (!record.uid?.trim()) {
      errors.push({
        row: rowIndex,
        field: 'uid',
        value: record.uid || '',
        message: 'UID is required and cannot be empty'
      });
    }
    
    if (!record.name?.trim()) {
      errors.push({
        row: rowIndex,
        field: 'name',
        value: record.name || '',
        message: 'Name is required and cannot be empty'
      });
    }
    
    if (!record.email?.trim()) {
      errors.push({
        row: rowIndex,
        field: 'email',
        value: record.email || '',
        message: 'Email is required and cannot be empty'
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email)) {
      errors.push({
        row: rowIndex,
        field: 'email',
        value: record.email,
        message: 'Invalid email format'
      });
    }
    
    if (!record.role?.trim()) {
      errors.push({
        row: rowIndex,
        field: 'role',
        value: record.role || '',
        message: 'Role is required'
      });
    } else if (!['student', 'counselor'].includes(record.role.toLowerCase())) {
      errors.push({
        row: rowIndex,
        field: 'role',
        value: record.role,
        message: 'Role must be either "student" or "counselor"'
      });
    }
    
    return errors;
  };

  const parseCSV = (csvText: string): { records: CSVRecord[], errors: ValidationError[] } => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    // Validate headers
    const requiredHeaders = ['uid', 'name', 'email', 'phone', 'role'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
    }
    
    const records: CSVRecord[] = [];
    const errors: ValidationError[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const record: any = {};
      
      headers.forEach((header, index) => {
        record[header] = values[index] || '';
      });
      
      const rowErrors = validateCSVRecord(record, i + 1);
      errors.push(...rowErrors);
      
      if (rowErrors.length === 0) {
        records.push({
          uid: record.uid,
          name: record.name,
          email: record.email,
          phone: record.phone,
          role: record.role.toLowerCase() as 'student' | 'counselor'
        });
      }
    }
    
    return { records, errors };
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setUploadStatus('idle');
    setUploadStats(null);
    setValidationErrors([]);
    setErrorMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadStatus('idle');
    setErrorMessage("");
    
    try {
      const fileContent = await selectedFile.text();
      const { records, errors } = parseCSV(fileContent);
      
      const studentsCount = records.filter(r => r.role === 'student').length;
      const counselorsCount = records.filter(r => r.role === 'counselor').length;
      
      const stats: UploadStatistics = {
        totalRecords: records.length + errors.length,
        studentsCount,
        counselorsCount,
        validRecords: records.length,
        invalidRecords: errors.length
      };
      
      setUploadStats(stats);
      setValidationErrors(errors);
      
      if (errors.length === 0) {
        // Simulate API call for successful upload
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUploadStatus('success');
      } else {
        setUploadStatus('error');
        setErrorMessage(`Found ${errors.length} validation error(s). Please fix them and try again.`);
      }
      
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to parse CSV file');
    } finally {
      setIsUploading(false);
    }
  };

  const downloadSampleCSV = () => {
    const sampleData = [
      'uid,name,email,phone,role',
      'USR001,John Doe,john.doe@university.edu,+1234567890,student',
      'USR002,Jane Smith,jane.smith@university.edu,+1234567891,student',
      'USR003,Dr. Sarah Johnson,sarah.johnson@university.edu,+1234567892,counselor',
      'USR004,Dr. Michael Brown,michael.brown@university.edu,,counselor'
    ].join('\n');
    
    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_users.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-black pt-6 sm:pt-8">
      {/* White Spotlight Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgba(255, 255, 255, 0.08) 0%,
              rgba(255, 255, 255, 0.04) 20%,
              rgba(0, 0, 0, 0.0) 60%
            )
          `,
        }}
      />

      <TopNav />
      <div className="px-4 sm:px-4 min-h-screen pl-2 sm:pl-16 relative z-10">
        <div className="mx-auto max-w-4xl pb-8 sm:pb-12">
          
          {/* Header with Profile and Language Selector */}
          <div className="hidden lg:flex absolute right-5 top-1 items-center gap-3 z-50">
            <LanguageSelector />
            <ProfileIcon />
          </div>

          {/* Page Header */}
          <div className="mt-16 sm:mt-0 flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/college">
                <Button
                  variant="outline" 
                  size="sm"
                  className="rounded-full border-white/20 bg-white/5 text-slate-300 hover:bg-white/10 p-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100">
                  Data Upload
                </h1>
                <p className="text-slate-500 mt-1 text-sm sm:text-base">
                  Upload CSV files to import students and counselors data
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={downloadSampleCSV}
                variant="outline"
                className="rounded-full border-white/20 bg-white/5 text-slate-100 hover:bg-white/10 text-sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Sample CSV
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <FileText className="h-4 w-4" />
                <span>Accepted format: .csv files only</span>
              </div>
            </div>
          </div>

          {/* CSV Format Warning */}
          <CSVFormatWarning className="mt-6 sm:mt-8" />

          {/* File Upload Zone */}
          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">
              Select CSV File
            </h2>
            <FileUploadZone
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              isUploading={isUploading}
              uploadStatus={uploadStatus}
              errorMessage={errorMessage}
            />
          </div>

          {/* Upload Button */}
          {selectedFile && uploadStatus !== 'success' && (
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="rounded-full bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] hover:opacity-90 text-slate-900 px-8"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-700 border-t-transparent mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload & Validate
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Upload Statistics */}
          {uploadStats && (
            <UploadStats
              totalRecords={uploadStats.totalRecords}
              studentsCount={uploadStats.studentsCount}
              counselorsCount={uploadStats.counselorsCount}
              validRecords={uploadStats.validRecords}
              invalidRecords={uploadStats.invalidRecords}
              className="mt-6 sm:mt-8"
            />
          )}

          {/* Validation Results */}
          <ValidationResults
            errors={validationErrors}
            isVisible={validationErrors.length > 0}
            className="mt-6 sm:mt-8"
          />

          {/* Success State */}
          {uploadStatus === 'success' && uploadStats && (
            <div className="mt-6 sm:mt-8 rounded-xl border border-green-500/20 bg-green-500/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-green-400" />
                <h3 className="text-lg font-medium text-green-200">
                  Upload Successful!
                </h3>
              </div>
              
              <div className="text-sm text-green-100/90 space-y-2">
                <p>
                  Successfully imported <strong>{uploadStats.validRecords}</strong> records:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>{uploadStats.studentsCount} students</li>
                  <li>{uploadStats.counselorsCount} counselors</li>
                </ul>
              </div>
              
              <div className="mt-4 flex gap-3">
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="rounded-full border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20 text-sm"
                  >
                    Return to Dashboard
                  </Button>
                </Link>
                
                <Button
                  onClick={() => {
                    setSelectedFile(null);
                    setUploadStatus('idle');
                    setUploadStats(null);
                    setValidationErrors([]);
                  }}
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/5 text-slate-300 hover:bg-white/10 text-sm"
                >
                  Upload Another File
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

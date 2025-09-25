"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadZoneProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  isUploading?: boolean;
  uploadStatus?: 'idle' | 'success' | 'error';
  errorMessage?: string;
  className?: string;
}

export function FileUploadZone({ 
  onFileSelect, 
  selectedFile, 
  isUploading = false,
  uploadStatus = 'idle',
  errorMessage,
  className = "" 
}: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    
    if (csvFile) {
      onFileSelect(csvFile);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      onFileSelect(file);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const removeFile = () => {
    onFileSelect(null);
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Upload className="h-8 w-8 text-slate-400" />;
    }
  };

  const getStatusColor = () => {
    switch (uploadStatus) {
      case 'success':
        return 'border-green-500/30 bg-green-500/10';
      case 'error':
        return 'border-red-500/30 bg-red-500/10';
      default:
        return isDragOver ? 'border-blue-400/50 bg-blue-500/10' : 'border-white/20 bg-black';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200
            ${getStatusColor()}
            ${isDragOver ? 'scale-102' : ''}
          `}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="absolute inset-0 cursor-pointer opacity-0"
            disabled={isUploading}
          />
          
          <div className="flex flex-col items-center gap-4">
            {getStatusIcon()}
            
            <div>
              <h3 className="text-lg font-medium text-slate-100 mb-2">
                {uploadStatus === 'success' ? 'Upload Successful!' :
                 uploadStatus === 'error' ? 'Upload Failed' :
                 isDragOver ? 'Drop your CSV file here' : 'Upload CSV File'}
              </h3>
              
              {uploadStatus === 'error' && errorMessage && (
                <p className="text-sm text-red-400 mb-2">{errorMessage}</p>
              )}
              
              {uploadStatus !== 'success' && (
                <div className="text-sm text-slate-400 space-y-1">
                  <p>Drag and drop your CSV file here, or click to browse</p>
                  <p className="text-xs">Only .csv files are accepted</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={`rounded-xl border p-4 ${getStatusColor()}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-400" />
              <div>
                <p className="font-medium text-slate-100">{selectedFile.name}</p>
                <p className="text-sm text-slate-400">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              {uploadStatus === 'success' && (
                <CheckCircle className="h-5 w-5 text-green-400 ml-2" />
              )}
              {uploadStatus === 'error' && (
                <AlertCircle className="h-5 w-5 text-red-400 ml-2" />
              )}
            </div>
            
            {!isUploading && uploadStatus !== 'success' && (
              <Button
                variant="outline"
                size="sm"
                onClick={removeFile}
                className="rounded-full border-white/20 bg-white/5 text-slate-300 hover:bg-white/10 p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {uploadStatus === 'error' && errorMessage && (
            <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{errorMessage}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
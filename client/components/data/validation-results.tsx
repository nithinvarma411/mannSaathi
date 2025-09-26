"use client";

import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

export interface ValidationError {
  row: number;
  field: string;
  value: string;
  message: string;
}

interface ValidationResultsProps {
  errors: ValidationError[];
  isVisible: boolean;
  className?: string;
}

export function ValidationResults({ errors, isVisible, className = "" }: ValidationResultsProps) {
  if (!isVisible) return null;

  const groupedErrors = errors.reduce((acc, error) => {
    if (!acc[error.row]) {
      acc[error.row] = [];
    }
    acc[error.row].push(error);
    return acc;
  }, {} as Record<number, ValidationError[]>);

  const errorRows = Object.keys(groupedErrors).length;

  return (
    <div className={`rounded-xl border border-red-500/20 bg-red-500/5 p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <XCircle className="h-5 w-5 text-red-400" />
        <h3 className="text-lg font-medium text-red-200">
          Validation Errors ({errorRows} rows affected)
        </h3>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {Object.entries(groupedErrors).map(([row, rowErrors]) => (
          <div key={row} className="rounded-lg border border-red-500/20 bg-black/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="font-medium text-red-200">Row {row}</span>
            </div>
            
            <div className="space-y-2">
              {rowErrors.map((error, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="text-red-300 font-medium min-w-0 flex-shrink-0">
                    {error.field}:
                  </div>
                  <div className="text-red-100">
                    "{error.value}" - {error.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
        <p className="text-sm text-red-300">
          Please fix these errors in your CSV file and try uploading again. 
          Only rows without errors will be imported.
        </p>
      </div>
    </div>
  );
}
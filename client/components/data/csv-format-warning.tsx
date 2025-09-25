"use client";

import { AlertTriangle, Info } from "lucide-react";

interface CSVFormatWarningProps {
  className?: string;
}

export function CSVFormatWarning({ className = "" }: CSVFormatWarningProps) {
  return (
    <div className={`rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-yellow-200 mb-2">
            Important: CSV Format Requirements
          </h3>
          <div className="text-sm text-yellow-100/90 space-y-2">
            <p className="font-medium">Your CSV file must follow this exact format:</p>
            <div className="bg-black/30 rounded-lg p-3 font-mono text-xs">
              <div className="text-yellow-300 mb-1">Header row (required):</div>
              <div className="text-white">uid,name,email,phone,role</div>
              <div className="text-yellow-300 mt-3 mb-1">Example data rows:</div>
              <div className="text-slate-200 space-y-1">
                <div>USR001,John Doe,john.doe@university.edu,+1234567890,student</div>
                <div>USR002,Dr. Sarah Smith,sarah.smith@university.edu,+1234567891,counselor</div>
              </div>
            </div>
            <div className="mt-3">
              <p className="font-medium text-yellow-200 mb-1">Field Requirements:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>uid:</strong> Unique identifier (required)</li>
                <li><strong>name:</strong> Full name (required)</li>
                <li><strong>email:</strong> Valid email address (required)</li>
                <li><strong>phone:</strong> Phone number (optional, can be empty)</li>
                <li><strong>role:</strong> Must be either "student" or "counselor" (required)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
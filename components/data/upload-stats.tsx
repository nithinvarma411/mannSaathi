"use client";

interface UploadStatsProps {
  totalRecords: number;
  studentsCount: number;
  counselorsCount: number;
  validRecords: number;
  invalidRecords: number;
  className?: string;
}

export function UploadStats({ 
  totalRecords, 
  studentsCount, 
  counselorsCount, 
  validRecords, 
  invalidRecords,
  className = "" 
}: UploadStatsProps) {
  const stats = [
    { label: "Total Records", value: totalRecords, color: "text-slate-100" },
    { label: "Students", value: studentsCount, color: "text-blue-400" },
    { label: "Counselors", value: counselorsCount, color: "text-green-400" },
    { label: "Valid Records", value: validRecords, color: "text-green-400" },
    { label: "Invalid Records", value: invalidRecords, color: invalidRecords > 0 ? "text-red-400" : "text-slate-400" },
  ];

  return (
    <div className={`rounded-xl border border-white/20 bg-black p-6 ${className}`}>
      <h3 className="text-lg font-medium text-slate-100 mb-4">Upload Summary</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-2xl font-semibold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {invalidRecords > 0 && (
        <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-400">
            <strong>Warning:</strong> {invalidRecords} record(s) have validation errors and will be skipped during import.
          </p>
        </div>
      )}
    </div>
  );
}
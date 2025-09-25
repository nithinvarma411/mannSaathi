"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function MetricsCard({
  title,
  value,
  delta,
  suffix,
  primary,
  accent,
}: {
  title: string;
  value: number;
  delta: number;
  suffix?: string;
  primary: string;
  accent: string;
}) {
  const isUp = delta >= 0;
  const arrow = isUp ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-white/5 p-4 transition-all hover:bg-white/10 hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-xs uppercase tracking-wide text-slate-500">
          {title}
        </p>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs",
            "border border-white/20 bg-black",
          )}
          style={{ color: isUp ? primary : accent }}
          aria-label={`Change ${isUp ? "up" : "down"} ${Math.abs(delta)}%`}
        >
          {isUp ? (
            <ArrowUpRight className="size-3.5" />
          ) : (
            <ArrowDownRight className="size-3.5" />
          )}
          <span>{Math.abs(delta).toFixed(1)}%</span>
        </span>
      </div>
      <div className="mt-3">
        <div className="text-lg sm:text-2xl font-semibold text-[#E5E7EB]">
          {value.toLocaleString()}
          {suffix ? (
            <span className="text-slate-300 text-base align-middle ml-1">
              {suffix}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

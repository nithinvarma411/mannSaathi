"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/ui/language-context"

export type SortKey = "latest" | "mostLiked" | "mostDiscussed"

export function SortControls({
  value,
  onChange,
}: {
  value: SortKey
  onChange: (v: SortKey) => void
}) {
  const { t } = useLanguage();
  
  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortKey)}>
      <SelectTrigger className="h-7 w-full sm:w-[140px] md:w-[180px] border-white/10 bg-white/5 text-slate-100 text-xs md:text-sm">
        <SelectValue placeholder={t("sort_by")} />
      </SelectTrigger>
      <SelectContent className="border-white/10 bg-slate-900 text-slate-100">
        <SelectItem value="latest" className="text-xs md:text-sm">{t("sort_latest")}</SelectItem>
        <SelectItem value="mostLiked" className="text-xs md:text-sm">{t("sort_most_liked")}</SelectItem>
        <SelectItem value="mostDiscussed" className="text-xs md:text-sm">{t("sort_most_discussed")}</SelectItem>
      </SelectContent>
    </Select>
  )
}

import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: ReactNode;
  variant?: "default" | "primary" | "muted";
}

export default function StatCard({
  label,
  value,
  sublabel,
  icon,
  variant = "default",
}: StatCardProps) {
  const variantStyles = {
    default: "bg-white border border-ink/8",
    primary: "bg-lilac-deep text-paper border border-lilac-deep",
    muted: "bg-ink/[0.03] border border-ink/8",
  };

  const labelColor = variant === "primary" ? "text-paper/70" : "text-ink/45";
  const valueColor = variant === "primary" ? "text-paper" : "text-ink";
  const sublabelColor = variant === "primary" ? "text-paper/60" : "text-ink/40";

  return (
    <div
      className={`rounded-xl p-3.5 transition-all duration-300 hover:shadow-[0_8px_24px_-8px_rgba(106,86,176,0.25)] hover:-translate-y-0.5 ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <p className={`text-[11px] font-medium ${labelColor}`}>{label}</p>
        {icon && (
          <div className={`shrink-0 ${variant === "primary" ? "text-paper/70" : "text-ink/35"}`}>
            {icon}
          </div>
        )}
      </div>
      <p className={`font-display font-semibold text-xl ${valueColor}`}>{value}</p>
      {sublabel && <p className={`text-[11px] mt-0.5 ${sublabelColor}`}>{sublabel}</p>}
    </div>
  );
}
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-lg border border-border bg-card shadow-sm", className)}>{children}</div>;
}
export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between border-b border-border px-4 py-3">
      <div>
        <h3 className="text-[13px] font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="mt-0.5 text-[11.5px] text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
export function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-4", className)}>{children}</div>;
}

export function KpiCard({
  label, value, delta, deltaPositive, hint, accent,
}: { label: string; value: string; delta?: string; deltaPositive?: boolean; hint?: string; accent?: "success" | "warning" | "critical" | "teal" }) {
  const accentBar =
    accent === "success" ? "bg-success" :
    accent === "warning" ? "bg-warning" :
    accent === "critical" ? "bg-critical" :
    accent === "teal" ? "bg-teal" : "bg-primary";
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className={cn("absolute left-0 top-0 h-full w-1", accentBar)} />
      <div className="text-[11.5px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <div className="metric-num text-[26px] font-bold text-foreground">{value}</div>
        {delta && (
          <span className={cn(
            "flex items-center gap-0.5 text-[11px] font-semibold",
            deltaPositive ? "text-success" : "text-critical"
          )}>
            {deltaPositive ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
            {delta}
          </span>
        )}
      </div>
      {hint && <div className="mt-1 text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function PageTitle({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-[22px] font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-[13px] text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Btn({
  variant = "primary", size = "md", className, children, ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "teal" | "danger" | "outline"; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "h-7 px-2.5 text-[12px]" : "h-9 px-3.5 text-[13px]";
  const v =
    variant === "primary" ? "bg-primary text-primary-foreground hover:bg-primary/90" :
    variant === "teal" ? "bg-teal text-teal-foreground hover:bg-teal/90" :
    variant === "secondary" ? "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border" :
    variant === "outline" ? "border border-border bg-background hover:bg-panel" :
    variant === "danger" ? "bg-critical text-critical-foreground hover:bg-critical/90" :
    "hover:bg-panel";
  return (
    <button className={cn("inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors disabled:opacity-50", sz, v, className)} {...rest}>
      {children}
    </button>
  );
}

import { useMemo, useState } from "react";
import { PLANTS, WAREHOUSES, DEALER_HUBS, LANES, type LaneStatus } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const statusColor = (s: string) =>
  s === "healthy" || s === "flowing" ? "var(--success)"
  : s === "warning" || s === "delayed" ? "var(--warning)"
  : "var(--critical)";

type Props = {
  height?: number;
  showLegend?: boolean;
  showLabels?: boolean;
  laneOverride?: Record<string, LaneStatus>;
  highlightNode?: string | null;
  onNodeClick?: (id: string, kind: "plant" | "warehouse" | "hub") => void;
  onLaneClick?: (from: string, to: string) => void;
  compact?: boolean;
};

export function NetworkMap({
  height = 560,
  showLegend = true,
  showLabels = true,
  laneOverride,
  highlightNode,
  onNodeClick,
  onLaneClick,
  compact = false,
}: Props) {
  const allNodes = useMemo(
    () => [
      ...PLANTS.map((p) => ({ ...p, kind: "plant" as const })),
      ...WAREHOUSES.map((w) => ({ ...w, kind: "warehouse" as const })),
      ...DEALER_HUBS.map((h) => ({ ...h, kind: "hub" as const, health: "healthy" as const })),
    ],
    []
  );
  const byId = useMemo(() => Object.fromEntries(allNodes.map((n) => [n.id, n])), [allNodes]);

  return (
    <div className="relative w-full overflow-hidden rounded-md border border-border bg-[#f6f8fb]" style={{ height }}>
      {/* faint India-ish silhouette via stylised grid */}
      <svg viewBox="0 0 700 600" className="h-full w-full">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e3e8ef" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="bg-land" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#eaf0f7" />
            <stop offset="100%" stopColor="#f6f8fb" />
          </radialGradient>
        </defs>
        <rect width="700" height="600" fill="url(#bg-land)" />
        <rect width="700" height="600" fill="url(#grid)" />
        {/* stylised land mass */}
        <path
          d="M 250 80 Q 330 60 410 95 Q 500 130 540 220 Q 600 240 620 290 Q 605 350 560 360 Q 520 380 470 430 Q 410 530 380 555 Q 340 575 320 545 Q 270 500 240 440 Q 200 380 200 310 Q 195 220 220 160 Q 230 110 250 80 Z"
          fill="#dde6f0"
          stroke="#c5d1e0"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Lanes */}
        {LANES.map((lane, i) => {
          const a = byId[lane.from];
          const b = byId[lane.to];
          if (!a || !b) return null;
          const status = laneOverride?.[`${lane.from}-${lane.to}`] ?? lane.status;
          const color = statusColor(status);
          return (
            <g key={i} className="cursor-pointer" onClick={() => onLaneClick?.(lane.from, lane.to)}>
              <line
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={color}
                strokeWidth={status === "disrupted" ? 2.5 : 2}
                strokeDasharray={status === "flowing" ? "0" : "5,4"}
                opacity={0.85}
              >
                {status === "flowing" && (
                  <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.5s" repeatCount="indefinite" />
                )}
              </line>
            </g>
          );
        })}

        {/* Warehouses */}
        {WAREHOUSES.map((w) => {
          const isHL = highlightNode === w.id;
          return (
            <g key={w.id} className="cursor-pointer" onClick={() => onNodeClick?.(w.id, "warehouse")}>
              <rect x={w.x - 7} y={w.y - 7} width="14" height="14" rx="2"
                fill={statusColor(w.health)} stroke="#fff" strokeWidth={isHL ? 3 : 1.5} />
              {showLabels && !compact && (
                <text x={w.x + 10} y={w.y + 3} fontSize="10" fill="#34495e" fontWeight={500}>{w.name.replace(" DC","")}</text>
              )}
            </g>
          );
        })}

        {/* Dealer hubs */}
        {DEALER_HUBS.map((h) => (
          <g key={h.id} className="cursor-pointer" onClick={() => onNodeClick?.(h.id, "hub")}>
            <circle cx={h.x} cy={h.y} r="5" fill="#94a3b8" stroke="#fff" strokeWidth="1.5" />
            {showLabels && !compact && (
              <text x={h.x + 8} y={h.y + 3} fontSize="9" fill="#64748b">{h.count} dealers</text>
            )}
          </g>
        ))}

        {/* Plants */}
        {PLANTS.map((p) => {
          const isHL = highlightNode === p.id;
          return (
            <g key={p.id} className="cursor-pointer" onClick={() => onNodeClick?.(p.id, "plant")}>
              <circle cx={p.x} cy={p.y} r={isHL ? 12 : 10} fill={statusColor(p.health)} stroke="#fff" strokeWidth={isHL ? 3 : 2} />
              <circle cx={p.x} cy={p.y} r="4" fill="#fff" opacity="0.9" />
              {showLabels && (
                <text x={p.x} y={p.y - 13} fontSize="10" fill="#1B2E4B" fontWeight={600} textAnchor="middle">
                  {p.name.replace(" Plant","").replace(" Unit","")}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {showLegend && (
        <div className="absolute bottom-3 left-3 rounded-md border border-border bg-background/95 p-2.5 text-[11px] shadow-sm backdrop-blur">
          <div className="mb-1.5 font-semibold text-foreground">Legend</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <Legend dot="circle" color="var(--success)" label="Plant · Healthy" />
            <Legend dot="square" color="var(--warning)" label="Warehouse · Watch" />
            <Legend dot="circle" color="var(--critical)" label="Critical" />
            <Legend dot="dot" color="#94a3b8" label="Dealer hub" />
            <Legend dot="line" color="var(--success)" label="Lane flowing" />
            <Legend dot="line-dash" color="var(--warning)" label="Lane delayed" />
            <Legend dot="line-dash" color="var(--critical)" label="Lane disrupted" />
          </div>
        </div>
      )}
    </div>
  );
}

function Legend({ dot, color, label }: { dot: string; color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {dot === "circle" && <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} />}
      {dot === "square" && <span className="inline-block h-2.5 w-2.5 rounded-[2px]" style={{ background: color }} />}
      {dot === "dot" && <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />}
      {dot === "line" && <span className="inline-block h-[2px] w-5" style={{ background: color }} />}
      {dot === "line-dash" && <span className="inline-block h-[2px] w-5" style={{ background: `repeating-linear-gradient(to right, ${color} 0 4px, transparent 4px 7px)` }} />}
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

export function StatusBadge({ status, children }: { status: "healthy" | "warning" | "critical" | "info" | "neutral"; children: React.ReactNode }) {
  const styles =
    status === "healthy" ? "bg-success/10 text-success border-success/20" :
    status === "warning" ? "bg-warning/15 text-warning border-warning/30" :
    status === "critical" ? "bg-critical/10 text-critical border-critical/20" :
    status === "info" ? "bg-teal/10 text-teal border-teal/20" :
    "bg-muted text-muted-foreground border-border";
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium", styles)}>
      {children}
    </span>
  );
}

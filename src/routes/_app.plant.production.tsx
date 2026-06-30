import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PRODUCTION } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, Btn } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";
import { List, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/_app/plant/production")({
  component: ProductionPage,
});

const CATEGORY_COLOR: Record<string, string> = {
  Spring: "#1B2E4B",
  Foam: "#00B894",
  Coir: "#F39C12",
};

function ProductionPage() {
  const [view, setView] = useState<"list" | "gantt">("gantt");
  const [horizon, setHorizon] = useState(30);

  const lines = Array.from(new Set(PRODUCTION.map((p) => `${p.plant} / ${p.line}`)));

  // Real calendar dates for the time axis (D0 = today).
  const today = new Date();
  const dateLabel = (dayOffset: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + dayOffset);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };
  const tickStep = horizon <= 30 ? 5 : horizon <= 60 ? 10 : 15;
  const ticks = Array.from({ length: Math.floor(horizon / tickStep) + 1 }, (_, i) => i * tickStep);

  return (
    <div>
      <PageTitle title="Production Schedule" subtitle="Manufacturing plan across all plants & production lines"
        actions={
          <div className="flex gap-2">
            <div className="flex rounded-md border border-border bg-background p-0.5 text-[12px]">
              {[30, 60, 90].map((d) => (
                <button key={d} onClick={() => setHorizon(d)}
                  className={`rounded px-2.5 py-1 ${horizon === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{d}d</button>
              ))}
            </div>
            <div className="flex rounded-md border border-border bg-background p-0.5 text-[12px]">
              <button onClick={() => setView("gantt")} className={`flex items-center gap-1 rounded px-2.5 py-1 ${view === "gantt" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}><BarChart3 size={12}/>Gantt</button>
              <button onClick={() => setView("list")} className={`flex items-center gap-1 rounded px-2.5 py-1 ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}><List size={12}/>List</button>
            </div>
          </div>
        }
      />

      {view === "gantt" ? (
        <Card>
          <CardHeader
            title={`Production Gantt · next ${horizon} days`}
            subtitle="Each row is a production line · each bar is a scheduled work order (bar length = build duration) · color = product category"
          />
          <CardBody className="p-0">
            {/* Legend + how-to-read explainer, always visible */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border px-4 py-2.5 text-[11.5px]">
              <span className="font-medium text-muted-foreground">Product category:</span>
              {Object.entries(CATEGORY_COLOR).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded" style={{ background: v }} /> {k}
                </div>
              ))}
              <span className="ml-auto inline-flex items-center gap-1.5 text-muted-foreground">
                <span className="inline-block h-3 w-0.5 rounded bg-teal" /> Today
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[1100px] p-4">
                {/* Date axis */}
                <div className="grid" style={{ gridTemplateColumns: "200px 1fr" }}>
                  <div className="self-end pb-1 text-[11px] font-semibold text-muted-foreground">Plant / Line</div>
                  <div className="relative mb-1 h-5">
                    {ticks.map((t) => (
                      <div
                        key={t}
                        className="absolute top-0 whitespace-nowrap text-[10.5px] font-medium text-muted-foreground"
                        style={{ left: `${(t / horizon) * 100}%`, transform: t === 0 ? "none" : "translateX(-50%)" }}
                      >
                        {dateLabel(t)}
                      </div>
                    ))}
                  </div>
                </div>
                {lines.map((ln) => {
                  const ops = PRODUCTION.filter((p) => `${p.plant} / ${p.line}` === ln);
                  return (
                    <div key={ln} className="grid items-center border-t border-border/60 py-1.5" style={{ gridTemplateColumns: "200px 1fr" }}>
                      <div className="pr-3 text-[12px] font-medium">{ln}</div>
                      <div className="relative h-9 rounded bg-panel/60">
                        {/* vertical gridlines aligned to the date ticks */}
                        {ticks.map((t) => (
                          <div key={t} className="absolute bottom-0 top-0 w-px bg-border/70" style={{ left: `${(t / horizon) * 100}%` }} />
                        ))}
                        {/* today marker */}
                        <div className="absolute bottom-0 top-0 z-10 w-0.5 bg-teal/80" style={{ left: 0 }} />
                        {ops.map((op) => {
                          if (op.start >= horizon) return null;
                          const w = Math.min(op.duration, horizon - op.start);
                          const widthPct = (w / horizon) * 100;
                          const sku = op.product.split(" - ")[1];
                          return (
                            <div
                              key={op.id}
                              title={`${op.id} · ${op.product} · ${op.batch} units · ${dateLabel(op.start)} → ${dateLabel(op.start + op.duration)} (${op.duration}d) · ${op.status}`}
                              className="absolute top-1 z-20 flex h-7 cursor-pointer flex-col justify-center overflow-hidden rounded px-2 leading-tight text-white shadow-sm ring-1 ring-black/5 hover:opacity-90"
                              style={{
                                left: `${(op.start / horizon) * 100}%`,
                                width: `${widthPct}%`,
                                background: CATEGORY_COLOR[op.category],
                              }}
                            >
                              <span className="truncate text-[10.5px] font-semibold">{sku}</span>
                              {widthPct > 9 && (
                                <span className="truncate text-[9px] font-medium opacity-80">{op.batch}u · {op.duration}d</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody className="p-0">
            <table className="w-full text-[12.5px]">
              <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left">WO</th>
                  <th className="px-3 py-2 text-left">Product</th>
                  <th className="px-3 py-2 text-left">Plant</th>
                  <th className="px-3 py-2 text-left">Line</th>
                  <th className="px-3 py-2 text-right">Batch</th>
                  <th className="px-3 py-2 text-left">Start</th>
                  <th className="px-3 py-2 text-left">End</th>
                  <th className="px-3 py-2 text-left">Material</th>
                  <th className="px-3 py-2 text-left">Equipment</th>
                  <th className="px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTION.map((p) => (
                  <tr key={p.id} className="border-t border-border hover:bg-panel/60">
                    <td className="px-3 py-2 font-mono text-[11.5px]">{p.id}</td>
                    <td className="px-3 py-2 font-medium">{p.product}</td>
                    <td className="px-3 py-2">{p.plant}</td>
                    <td className="px-3 py-2 text-muted-foreground">{p.line}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{p.batch}</td>
                    <td className="px-3 py-2 text-muted-foreground">D+{p.start}</td>
                    <td className="px-3 py-2 text-muted-foreground">D+{p.start + p.duration}</td>
                    <td className="px-3 py-2"><StatusBadge status={p.materialStatus === "Ready" ? "healthy" : p.materialStatus === "Partial" ? "warning" : "critical"}>{p.materialStatus}</StatusBadge></td>
                    <td className="px-3 py-2"><StatusBadge status={p.equipmentStatus === "OK" ? "healthy" : "warning"}>{p.equipmentStatus}</StatusBadge></td>
                    <td className="px-3 py-2 text-muted-foreground">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

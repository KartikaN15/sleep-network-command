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
          <CardHeader title={`Production Gantt · next ${horizon} days`} subtitle="Color = product category · hover for details" />
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[1000px] p-4">
                <div className="grid" style={{ gridTemplateColumns: "180px 1fr" }}>
                  <div></div>
                  <div className="mb-2 grid text-[10px] text-muted-foreground" style={{ gridTemplateColumns: `repeat(${horizon}, minmax(0,1fr))` }}>
                    {Array.from({ length: horizon }, (_, i) => (
                      <div key={i} className={`text-center ${i % 5 === 0 ? "" : "opacity-40"}`}>{i % 5 === 0 ? `D${i + 1}` : "·"}</div>
                    ))}
                  </div>
                </div>
                {lines.map((ln) => {
                  const ops = PRODUCTION.filter((p) => `${p.plant} / ${p.line}` === ln);
                  return (
                    <div key={ln} className="grid items-center border-t border-border/60 py-2" style={{ gridTemplateColumns: "180px 1fr" }}>
                      <div className="pr-3 text-[12px] font-medium">{ln}</div>
                      <div className="relative h-8 rounded bg-panel" style={{}}>
                        {ops.map((op) => {
                          if (op.start >= horizon) return null;
                          const w = Math.min(op.duration, horizon - op.start);
                          return (
                            <div key={op.id} title={`${op.id} · ${op.product} · ${op.batch} units`}
                              className="absolute top-1 flex h-6 cursor-pointer items-center overflow-hidden rounded px-2 text-[10.5px] font-medium text-white shadow-sm hover:opacity-90"
                              style={{
                                left: `${(op.start / horizon) * 100}%`,
                                width: `${(w / horizon) * 100}%`,
                                background: CATEGORY_COLOR[op.category],
                              }}>
                              <span className="truncate">{op.product.split(" - ")[1]}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                <div className="mt-4 flex items-center gap-4 text-[11.5px]">
                  {Object.entries(CATEGORY_COLOR).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded" style={{ background: v }} /> {k}</div>
                  ))}
                </div>
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

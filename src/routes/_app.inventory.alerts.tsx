import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SKUS } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, Btn } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/inventory/alerts")({
  component: AlertsPage,
});

type Row = { level: "Critical" | "High" | "Overstock"; material: string; location: string; stock: number; daily: number; days: number; reqBy: string; action: string };

function build(): Row[] {
  const locs = ["Bengaluru DC","Chennai DC","Mumbai DC","Pune DC","Delhi DC","Jaipur DC","Kolkata DC","Guwahati DC"];
  const rows: Row[] = [];
  SKUS.slice(0, 31).forEach((s, i) => {
    let level: Row["level"] = "Critical";
    let days = 2;
    if (i < 6) { level = "Critical"; days = 1 + i * 0.3; }
    else if (i < 17) { level = "High"; days = 3 + (i - 6) * 0.4; }
    else { level = "Overstock"; days = 60 + (i - 17) * 6; }
    const daily = 10 + (i % 8) * 4;
    rows.push({
      level, material: s.name, location: locs[i % locs.length],
      stock: Math.round(daily * days),
      daily, days: +days.toFixed(1),
      reqBy: new Date(Date.now() + days * 86400000).toISOString().slice(0, 10),
      action: level === "Overstock" ? "Markdown / channel push" : level === "Critical" ? "Inter-DC transfer" : "Production order",
    });
  });
  return rows;
}
const ALERTS = build();

function AlertsPage() {
  const [tab, setTab] = useState<"All" | "Critical" | "High" | "Overstock">("All");
  const counts = {
    All: ALERTS.length,
    Critical: ALERTS.filter((r) => r.level === "Critical").length,
    High: ALERTS.filter((r) => r.level === "High").length,
    Overstock: ALERTS.filter((r) => r.level === "Overstock").length,
  };
  const rows = useMemo(() => tab === "All" ? ALERTS : ALERTS.filter((r) => r.level === tab), [tab]);

  return (
    <div>
      <PageTitle title="Stockout & Overstock Alerts" subtitle="Real-time pre-alerts before stock crises happen" />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <TabPill label="Critical (<3d cover)" count={counts.Critical} active={tab === "Critical"} onClick={() => setTab("Critical")} color="critical" />
        <TabPill label="High (3-7d cover)" count={counts.High} active={tab === "High"} onClick={() => setTab("High")} color="warning" />
        <TabPill label="Overstock (>60d cover)" count={counts.Overstock} active={tab === "Overstock"} onClick={() => setTab("Overstock")} color="info" />
        <TabPill label="All active alerts" count={counts.All} active={tab === "All"} onClick={() => setTab("All")} color="primary" />
      </div>

      <Card>
        <CardHeader title={`${rows.length} alerts`} subtitle={tab === "All" ? "All active inventory alerts" : `Filtered: ${tab}`} />
        <CardBody className="p-0">
          <table className="w-full text-[12.5px]">
            <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left">Level</th>
                <th className="px-3 py-2 text-left">Material</th>
                <th className="px-3 py-2 text-left">Location</th>
                <th className="px-3 py-2 text-right">Current stock</th>
                <th className="px-3 py-2 text-right">Daily consumption</th>
                <th className="px-3 py-2 text-right">Days coverage</th>
                <th className="px-3 py-2 text-left">Required by</th>
                <th className="px-3 py-2 text-left">Suggested action</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-border hover:bg-panel/60">
                  <td className="px-3 py-2"><StatusBadge status={r.level === "Critical" ? "critical" : r.level === "High" ? "warning" : "info"}>{r.level}</StatusBadge></td>
                  <td className="px-3 py-2 font-medium">{r.material}</td>
                  <td className="px-3 py-2">{r.location}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.stock}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.daily}/day</td>
                  <td className={`px-3 py-2 text-right font-medium tabular-nums ${r.level === "Critical" ? "text-critical" : r.level === "Overstock" ? "text-teal" : "text-warning"}`}>{r.days}d</td>
                  <td className="px-3 py-2 text-muted-foreground">{r.reqBy}</td>
                  <td className="px-3 py-2">{r.action}</td>
                  <td className="px-3 py-2 text-right">
                    <Btn size="sm" variant="outline" onClick={() => toast.success(`Action queued: ${r.action} for ${r.material}`)}>Action</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

function TabPill({ label, count, active, onClick, color }: any) {
  const bar =
    color === "critical" ? "bg-critical" :
    color === "warning" ? "bg-warning" :
    color === "info" ? "bg-teal" : "bg-primary";
  return (
    <button onClick={onClick}
      className={`relative overflow-hidden rounded-lg border bg-card p-3 text-left transition ${active ? "border-teal ring-1 ring-teal" : "border-border hover:bg-panel"}`}>
      <div className={`absolute left-0 top-0 h-full w-1 ${bar}`} />
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="metric-num mt-0.5 text-[22px] font-bold">{count}</div>
    </button>
  );
}

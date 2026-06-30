import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SAVED_SCENARIOS } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, Btn } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from "recharts";

export const Route = createFileRoute("/_app/network/compare")({
  component: CompareScenarios,
});

function CompareScenarios() {
  const [selected, setSelected] = useState<string[]>(SAVED_SCENARIOS.slice(0, 3).map((s) => s.id));
  const items = SAVED_SCENARIOS.filter((s) => selected.includes(s.id));

  const chartData = [
    { name: "Baseline", fulfillment: 94.2, cost: 312 },
    ...items.map((s) => ({
      name: s.name.split(",")[0],
      fulfillment: +(94.2 + s.fulfillImpact).toFixed(1),
      cost: 312 + (s.costImpact / 38) * 30,
    })),
  ];

  return (
    <div>
      <PageTitle title="Scenario Comparison" subtitle="Stack saved scenarios side-by-side against the current network baseline" />

      <Card className="mb-4">
        <CardHeader title="Select scenarios" subtitle="Multi-select to compare up to 4 scenarios" />
        <CardBody>
          <div className="flex flex-wrap gap-2">
            {SAVED_SCENARIOS.map((s) => {
              const on = selected.includes(s.id);
              return (
                <button key={s.id}
                  onClick={() => setSelected((prev) => prev.includes(s.id) ? prev.filter((x) => x !== s.id) : [...prev, s.id])}
                  className={`rounded-full border px-3 py-1.5 text-[12.5px] ${on ? "border-teal bg-teal/10 text-teal" : "border-border bg-background hover:bg-panel"}`}>
                  {s.name}
                </button>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader title="Side-by-side metrics" />
          <CardBody className="p-0 overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead className="bg-panel text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left">Scenario</th>
                  <th className="px-3 py-2 text-right">Fulfillment impact</th>
                  <th className="px-3 py-2 text-right">Cost impact (₹L)</th>
                  <th className="px-3 py-2 text-right">Orders affected</th>
                  <th className="px-3 py-2 text-right">Recovery (days)</th>
                  <th className="px-3 py-2 text-left">Risk</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border bg-panel/40 font-medium">
                  <td className="px-3 py-2">Current baseline</td>
                  <td className="px-3 py-2 text-right">94.2%</td>
                  <td className="px-3 py-2 text-right">₹312/order</td>
                  <td className="px-3 py-2 text-right">—</td>
                  <td className="px-3 py-2 text-right">—</td>
                  <td className="px-3 py-2"><StatusBadge status="info">Baseline</StatusBadge></td>
                </tr>
                {items.map((s) => (
                  <tr key={s.id} className="border-t border-border hover:bg-panel/60">
                    <td className="px-3 py-2 font-medium">{s.name}</td>
                    <td className={`px-3 py-2 text-right tabular-nums ${s.fulfillImpact >= 0 ? "text-success" : "text-critical"}`}>{s.fulfillImpact > 0 ? "+" : ""}{s.fulfillImpact} pts</td>
                    <td className={`px-3 py-2 text-right tabular-nums ${s.costImpact <= 0 ? "text-success" : "text-critical"}`}>{s.costImpact > 0 ? "+" : ""}₹{Math.abs(s.costImpact)}L</td>
                    <td className="px-3 py-2 text-right tabular-nums">{s.orders ? s.orders.toLocaleString() : "—"}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{s.recoveryDays || "—"}</td>
                    <td className="px-3 py-2"><StatusBadge status={s.risk === "High" ? "critical" : s.risk === "Medium" ? "warning" : "healthy"}>{s.risk}</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Fulfillment & cost · grouped" />
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 5, right: 8, left: -20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} angle={-15} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="fulfillment" name="Fulfillment %" fill="#00B894" />
                <Bar dataKey="cost" name="Cost/order ₹" fill="#1B2E4B" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader title="Resilience recommendation" subtitle="Generated from the comparison data" />
        <CardBody>
          <p className="text-[13px] leading-relaxed">
            Pairing <span className="font-semibold">Add Pune Warehouse</span> with <span className="font-semibold">Switch Bhiwandi→Delhi to Rail</span> is the most resilient combination:
            it improves fulfillment by +2.6 pts, reduces cost-to-serve by ₹113L/yr, and adds redundancy that absorbs the Hosur foam line disruption with 38% lower order impact.
            Suggested rollout: commission Pune DC in Q3, switch rail lane in Q4.
          </p>
          <div className="mt-3 flex gap-2">
            <Btn variant="teal" size="sm">Export comparison</Btn>
            <Btn variant="outline" size="sm">Share with finance</Btn>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

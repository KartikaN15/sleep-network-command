import { createFileRoute } from "@tanstack/react-router";
import { CARRIER_SCORECARD, LANE_COST_TREND } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, KpiCard } from "@/components/ui-bits";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from "recharts";

export const Route = createFileRoute("/_app/logistics/carriers")({ component: Page });

const DAMAGE_MATRIX = [
  { carrier: "In-house Fleet", spring: 0.2, foam: 0.3, coir: 0.4, pillow: 0.1 },
  { carrier: "Delhivery", spring: 0.6, foam: 0.9, coir: 1.1, pillow: 0.4 },
  { carrier: "Blue Dart", spring: 0.4, foam: 0.5, coir: 0.8, pillow: 0.2 },
  { carrier: "DTDC", spring: 0.9, foam: 1.2, coir: 1.6, pillow: 0.5 },
  { carrier: "Safexpress", spring: 1.1, foam: 1.5, coir: 1.8, pillow: 0.6 },
];

function heatColor(v: number) {
  if (v < 0.5) return "bg-success/15 text-success";
  if (v < 1.0) return "bg-warning/15 text-warning";
  return "bg-critical/15 text-critical";
}

function Page() {
  return (
    <div>
      <PageTitle title="Carrier & Lane Performance" subtitle="Freight and 3PL performance analytics across the national network" />
      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Avg. transit vs SLA" value="+0.4 days" accent="warning" />
        <KpiCard label="On-time (weighted)" value="89.4%" delta="1.2%" deltaPositive accent="success" />
        <KpiCard label="Cost per shipment" value="₹3,180" delta="2.4%" deltaPositive={false} accent="warning" />
        <KpiCard label="Damage / claim rate" value="0.86%" delta="0.18%" deltaPositive accent="success" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Carrier on-time comparison" />
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={CARRIER_SCORECARD} layout="vertical" margin={{ left: 60, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" horizontal={false} />
                <XAxis type="number" domain={[70, 100]} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} width={110} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="onTime" fill="#00B894" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Lane cost trend · top 4 lanes · ₹/kg" />
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={LANE_COST_TREND} margin={{ left: -20, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line dataKey="Hosur_Bengaluru" stroke="#1B2E4B" strokeWidth={2} dot={false} />
                <Line dataKey="Bhiwandi_Delhi" stroke="#00B894" strokeWidth={2} dot={false} />
                <Line dataKey="Hyderabad_Chennai" stroke="#F39C12" strokeWidth={2} dot={false} />
                <Line dataKey="Indore_Mumbai" stroke="#E74C3C" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader title="Carrier scorecard" />
        <CardBody className="p-0">
          <table className="w-full text-[12.5px]">
            <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-3 py-2 text-left">Carrier</th><th className="px-3 py-2 text-right">Volume</th><th className="px-3 py-2 text-right">On-time %</th><th className="px-3 py-2 text-right">Cost/shipment (₹K)</th><th className="px-3 py-2 text-right">Damage %</th><th className="px-3 py-2 text-right">Composite</th></tr>
            </thead>
            <tbody>
              {CARRIER_SCORECARD.map((c) => (
                <tr key={c.name} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{c.name}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{c.volume.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{c.onTime}%</td>
                  <td className="px-3 py-2 text-right tabular-nums">₹{c.cost}K</td>
                  <td className="px-3 py-2 text-right tabular-nums">{c.damage}%</td>
                  <td className="px-3 py-2 text-right font-semibold tabular-nums">{c.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="mt-4">
        <CardHeader title="Damage rate · carrier × product category" subtitle="% of shipments with damage claim" />
        <CardBody className="p-0">
          <table className="w-full text-[12.5px]">
            <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-3 py-2 text-left">Carrier</th><th className="px-3 py-2 text-center">Spring</th><th className="px-3 py-2 text-center">Foam</th><th className="px-3 py-2 text-center">Coir</th><th className="px-3 py-2 text-center">Pillow / Accy</th></tr>
            </thead>
            <tbody>
              {DAMAGE_MATRIX.map((r) => (
                <tr key={r.carrier} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{r.carrier}</td>
                  {(["spring","foam","coir","pillow"] as const).map((k) => (
                    <td key={k} className="px-3 py-2 text-center">
                      <span className={`inline-block rounded px-2 py-0.5 text-[11.5px] font-medium tabular-nums ${heatColor((r as any)[k])}`}>{(r as any)[k]}%</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

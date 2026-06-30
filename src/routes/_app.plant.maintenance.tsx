import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MAINTENANCE_QUEUE, MACHINE_TREND } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, KpiCard, Btn } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import { toast } from "sonner";
import { Wrench } from "lucide-react";

export const Route = createFileRoute("/_app/plant/maintenance")({
  component: MaintPage,
});

function MaintPage() {
  const [sel, setSel] = useState(MAINTENANCE_QUEUE[0]);

  return (
    <div>
      <PageTitle title="Predictive Maintenance Queue" subtitle="AI-generated maintenance work before failures happen" />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Open predictions" value="5" hint="2 within 7 days" accent="warning" />
        <KpiCard label="Downtime avoided · Q2" value="248 hrs" accent="success" />
        <KpiCard label="Cost avoided · Q2" value="₹74L" accent="teal" />
        <KpiCard label="MTBF trend" value="612 hrs" delta="+8.2%" deltaPositive accent="success" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader title="Queue" subtitle="Ordered by predicted failure window" />
          <CardBody className="p-0">
            <table className="w-full text-[12.5px]">
              <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left">WO ID</th>
                  <th className="px-3 py-2 text-left">Machine</th>
                  <th className="px-3 py-2 text-left">Plant</th>
                  <th className="px-3 py-2 text-left">Failure window</th>
                  <th className="px-3 py-2 text-right">Conf.</th>
                  <th className="px-3 py-2 text-left">Failure mode</th>
                  <th className="px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {MAINTENANCE_QUEUE.map((m) => (
                  <tr key={m.id} className={`cursor-pointer border-t border-border hover:bg-panel/60 ${sel.id === m.id ? "bg-teal/5" : ""}`} onClick={() => setSel(m)}>
                    <td className="px-3 py-2 font-mono text-[11.5px]">{m.id}</td>
                    <td className="px-3 py-2 font-medium">{m.machine}</td>
                    <td className="px-3 py-2 text-muted-foreground">{m.plant}</td>
                    <td className="px-3 py-2">
                      <StatusBadge status={m.confidence >= 90 ? "critical" : m.confidence >= 80 ? "warning" : "info"}>{m.window}</StatusBadge>
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">{m.confidence}%</td>
                    <td className="px-3 py-2 text-[11.5px]">{m.mode}</td>
                    <td className="px-3 py-2 text-muted-foreground">{m.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2 h-fit">
          <CardHeader title={sel.machine} subtitle={`${sel.plant} · ${sel.mode}`}
            action={<Btn variant="teal" size="sm" onClick={() => toast.success(`CMMS work order created for ${sel.machine}`)}><Wrench size={11}/> Create CMMS WO</Btn>}
          />
          <CardBody className="space-y-3 text-[12.5px]">
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={MACHINE_TREND.slice(-15)} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
                <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#64748b" }} interval={2} />
                <YAxis tick={{ fontSize: 10, fill: "#64748b" }} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Line dataKey="vibration" stroke="#1B2E4B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <Row label="Predicted failure" value={sel.window} />
            <Row label="Confidence" value={`${sel.confidence}%`} />
            <Row label="Likely mode" value={sel.mode} />
            <Row label="Recommended action" value={sel.action} />
            <Row label="Est. downtime if unaddressed" value={`${parseInt(sel.downtime) * 4} hrs`} />
            <div className="border-t border-border pt-3">
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Parts & technician</div>
              <ul className="mt-1 space-y-1 text-[12px]">
                <li>• Bearing assembly part #BR-4470 — 2 in stock at Hosur</li>
                <li>• Drive belt #DB-220 — order needed (3-day lead)</li>
                <li>• Technician skill: <span className="font-medium">L2 Mechanical</span> · est. 4-6 hrs</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between border-b border-border/60 pb-2"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>;
}

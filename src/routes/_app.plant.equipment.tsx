import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MACHINES, MACHINE_TREND } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceDot, Legend } from "recharts";
import { Thermometer, Activity, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/plant/equipment")({
  component: EquipmentPage,
});

const PLANTS_TABS = ["All Plants", "Hosur", "Karimangalam", "Hyderabad", "Bhiwandi", "Indore"];

function EquipmentPage() {
  const [plant, setPlant] = useState("All Plants");
  const [selected, setSelected] = useState(MACHINES[0]);
  const list = plant === "All Plants" ? MACHINES : MACHINES.filter((m) => m.plant === plant);

  return (
    <div>
      <PageTitle title="Equipment Health Monitor" subtitle="Live signal & health view of plant machinery, powered by IoT telemetry" />

      <div className="mb-4 flex flex-wrap gap-1 border-b border-border">
        {PLANTS_TABS.map((p) => (
          <button key={p} onClick={() => setPlant(p)}
            className={`-mb-px border-b-2 px-3 py-2 text-[12.5px] ${plant === p ? "border-teal text-teal font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((m) => (
              <button key={m.id} onClick={() => setSelected(m)}
                className={`rounded-lg border bg-card p-3 text-left transition ${selected.id === m.id ? "border-teal ring-1 ring-teal" : "border-border hover:bg-panel"}`}>
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold">{m.name}</div>
                    <div className="text-[11px] text-muted-foreground">{m.plant} · {m.type}</div>
                  </div>
                  <StatusBadge status={m.status}>{m.status === "critical" ? "At Risk" : m.status === "warning" ? "Watch" : "Healthy"}</StatusBadge>
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="metric-num text-[24px] font-bold">{m.health}</span>
                  <span className="text-[11px] text-muted-foreground">/ 100 health</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full ${m.health >= 80 ? "bg-success" : m.health >= 65 ? "bg-warning" : "bg-critical"}`} style={{ width: `${m.health}%` }} />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-1"><Activity size={11}/> {m.vibration}</div>
                  <div className="flex items-center gap-1"><Thermometer size={11}/> {m.temp}°C</div>
                  <div className="flex items-center gap-1"><Clock size={11}/> {m.runtime}h</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <Card className="lg:col-span-2 h-fit">
          <CardHeader title={`${selected.name} · ${selected.plant}`} subtitle="Vibration & temperature trend · last 30 days" />
          <CardBody>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={MACHINE_TREND} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#64748b" }} interval={3} />
                <YAxis yAxisId="v" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis yAxisId="t" orientation="right" tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line yAxisId="v" dataKey="vibration" name="Vibration (mm/s)" stroke="#1B2E4B" strokeWidth={2} dot={false} />
                <Line yAxisId="t" dataKey="temperature" name="Temp (°C)" stroke="#E74C3C" strokeWidth={2} dot={false} />
                <ReferenceDot yAxisId="v" x="D-3" y={MACHINE_TREND[27].vibration} r={5} fill="#F39C12" stroke="white" strokeWidth={2} />
                <ReferenceDot yAxisId="v" x="D-1" y={MACHINE_TREND[29].vibration} r={5} fill="#E74C3C" stroke="white" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-3 rounded-md border border-warning/30 bg-warning/10 p-2.5 text-[11.5px]">
              <span className="font-semibold text-warning">2 anomalies detected</span> in last 5 days — vibration trending above 5.5 mm/s baseline. Predictive model confidence: <span className="font-semibold">{selected.health < 70 ? 92 : 78}%</span>.
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

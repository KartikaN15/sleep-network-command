import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NetworkMap } from "@/components/NetworkMap";
import { Card, CardHeader, CardBody, PageTitle, Btn } from "@/components/ui-bits";
import { Factory, TrendingUp, Building2, Truck, ExpandIcon, Play, Save, Download } from "lucide-react";
import { toast } from "sonner";
import type { LaneStatus } from "@/lib/mockData";

export const Route = createFileRoute("/_app/network/scenarios")({
  component: ScenarioBuilder,
});

const SCENARIO_TYPES = [
  { id: "plant", title: "Plant Disruption", icon: Factory, desc: "Simulate partial or full plant outage" },
  { id: "demand", title: "Demand Spike", icon: TrendingUp, desc: "Regional surge in order volume" },
  { id: "warehouse", title: "New Warehouse", icon: Building2, desc: "Add a new DC to the network" },
  { id: "carrier", title: "Carrier Change", icon: Truck, desc: "Swap carrier on selected lanes" },
  { id: "capacity", title: "Capacity Expansion", icon: ExpandIcon, desc: "Increase line capacity at a plant" },
];

function ScenarioBuilder() {
  const [type, setType] = useState("plant");
  const [plant, setPlant] = useState("Hosur");
  const [duration, setDuration] = useState(3);
  const [capacityLost, setCapacityLost] = useState(100);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ranScenario, setRan] = useState(false);

  function run() {
    setRunning(true);
    setProgress(0);
    setRan(false);
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(t); setRunning(false); setRan(true); return 100; }
        return p + 6;
      });
    }, 180);
  }

  const laneOverride: Record<string, LaneStatus> = ranScenario
    ? {
        "hosur-dc-bengaluru": "disrupted",
        "hosur-dc-chennai": "disrupted",
        "karimangalam-dc-bengaluru": "delayed",
        "hyderabad-dc-bengaluru": "delayed",
        "hyderabad-dc-chennai": "delayed",
      }
    : {};

  return (
    <div>
      <PageTitle title="Scenario Builder" subtitle="Model network changes before committing capital — see the cascading impact across all locations" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Setup */}
        <Card className="lg:col-span-4">
          <CardHeader title="Scenario setup" subtitle="Choose a scenario type and parameters" />
          <CardBody>
            <div className="space-y-2">
              {SCENARIO_TYPES.map((t) => {
                const Icon = t.icon;
                const on = type === t.id;
                return (
                  <button key={t.id} onClick={() => setType(t.id)}
                    className={`flex w-full items-start gap-3 rounded-md border p-3 text-left transition-colors ${on ? "border-teal bg-teal/5" : "border-border hover:bg-panel"}`}>
                    <div className={`flex h-9 w-9 items-center justify-center rounded-md ${on ? "bg-teal text-teal-foreground" : "bg-secondary text-muted-foreground"}`}>
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold">{t.title}</div>
                      <div className="text-[11px] text-muted-foreground">{t.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 space-y-3 border-t border-border pt-4">
              <div className="text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Parameters</div>
              <Field label="Plant">
                <select value={plant} onChange={(e) => setPlant(e.target.value)} className="select">
                  <option>Hosur</option><option>Karimangalam</option><option>Hyderabad</option><option>Bhiwandi</option><option>Indore</option>
                </select>
              </Field>
              <Field label="Affected line">
                <select className="select"><option>Foam Line #2</option><option>Spring Coiler #5</option><option>Entire plant</option></select>
              </Field>
              <Field label="Duration (days)">
                <input type="number" value={duration} onChange={(e) => setDuration(+e.target.value)} className="input" />
              </Field>
              <Field label={`Capacity lost: ${capacityLost}%`}>
                <input type="range" min={10} max={100} value={capacityLost} onChange={(e) => setCapacityLost(+e.target.value)} className="w-full accent-teal" />
              </Field>
            </div>

            <div className="mt-5 rounded-md border border-warning/30 bg-warning/10 p-3 text-[12px]">
              <div className="font-semibold text-warning">Pre-run impact estimate</div>
              <ul className="mt-1.5 space-y-1 text-[11.5px] text-foreground/80">
                <li>• 14% of national foam supply affected</li>
                <li>• 6 regional warehouses drop below safety stock in 5 days</li>
                <li>• Est. 2,200 delayed orders</li>
                <li>• Est. cost impact ₹38L (expedited freight + lost sales)</li>
              </ul>
            </div>

            <Btn variant="teal" className="mt-4 w-full" onClick={run} disabled={running}>
              <Play size={13} /> {running ? `Running… ${progress}%` : "Run Simulation"}
            </Btn>
            {running && (
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-teal transition-all" style={{ width: `${progress}%` }} />
              </div>
            )}
          </CardBody>
        </Card>

        {/* Results */}
        <div className="space-y-4 lg:col-span-8">
          <Card>
            <CardHeader
              title={ranScenario ? `Results · Hosur Foam Line Down, ${duration} Days` : "Results"}
              subtitle={ranScenario ? "Network state if disruption played out today" : "Run a simulation to see network impact"}
              action={ranScenario && (
                <div className="flex gap-2">
                  <Btn size="sm" variant="outline" onClick={() => toast.success("Scenario saved")}><Save size={11}/> Save</Btn>
                  <Btn size="sm" variant="outline" onClick={() => toast.success("Summary exported")}><Download size={11}/> Export</Btn>
                </div>
              )}
            />
            <CardBody>
              {!ranScenario ? (
                <div className="flex h-64 items-center justify-center rounded-md border border-dashed border-border text-[12.5px] text-muted-foreground">
                  Configure parameters on the left and click <span className="mx-1 font-medium">Run Simulation</span> to see the cascading network impact.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <DeltaTile label="Fulfillment rate" before="94.2%" after="85.8%" delta="-8.4 pts" bad />
                    <DeltaTile label="Cost to serve" before="₹312/order" after="₹389/order" delta="+₹77" bad />
                    <DeltaTile label="Avg. delivery time" before="3.4d" after="5.2d" delta="+1.8d" bad />
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <div className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">Cascading network state</div>
                      <NetworkMap height={280} laneOverride={laneOverride} highlightNode="hosur" showLabels={false} showLegend={false} />
                    </div>
                    <div>
                      <div className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">Recommended mitigations</div>
                      <ol className="space-y-2 text-[12.5px]">
                        <Mitigation rank={1} title="Reroute 40% of South region foam orders to Karimangalam" detail="Adds 1.2 days transit but avoids stockout in Bengaluru and Chennai hubs" />
                        <Mitigation rank={2} title="Pull-in scheduled run on Bhiwandi Foam Line #3 by 36 hours" detail="Covers projected Mumbai & Pune demand for the disruption window" />
                        <Mitigation rank={3} title="Expedite 12 truckloads via Blue Dart on Hyderabad → Chennai" detail="Cost +₹6.2L, recovers 410 dealer orders in promise window" />
                        <Mitigation rank={4} title="Temporarily hold Online channel allocations on top 4 SKUs" detail="Prioritises Experience Centre orders within 48h of promise date" />
                      </ol>
                    </div>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      <style>{`
        .select, .input { width: 100%; height: 34px; padding: 0 0.6rem; font-size: 12.5px; border: 1px solid var(--input); border-radius: 6px; background: white; }
        .select:focus, .input:focus { outline: none; border-color: var(--ring); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-[11.5px] font-medium text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

function DeltaTile({ label, before, after, delta, bad }: { label: string; before: string; after: string; delta: string; bad?: boolean }) {
  return (
    <div className="rounded-md border border-border bg-panel p-3">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5 text-[14px]">
        <span className="text-muted-foreground line-through">{before}</span>
        <span className="font-semibold">{after}</span>
      </div>
      <div className={`mt-0.5 text-[11.5px] font-semibold ${bad ? "text-critical" : "text-success"}`}>{delta}</div>
    </div>
  );
}

function Mitigation({ rank, title, detail }: { rank: number; title: string; detail: string }) {
  return (
    <li className="rounded-md border border-border bg-panel p-2.5">
      <div className="flex items-start gap-2">
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-[10px] font-bold text-teal-foreground">{rank}</div>
        <div className="min-w-0">
          <div className="font-medium">{title}</div>
          <div className="text-[11.5px] text-muted-foreground">{detail}</div>
        </div>
      </div>
    </li>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NetworkMap } from "@/components/NetworkMap";
import { Card, CardHeader, CardBody, PageTitle, Btn } from "@/components/ui-bits";
import { PLANTS, WAREHOUSES, LANES, DEALER_HUBS } from "@/lib/mockData";
import { Layers, Clock, Plus, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/network/map")({
  component: NetworkMapPage,
});

const LAYERS = ["Inventory levels", "Shipment flow", "Equipment alerts", "Demand heat"];

function NetworkMapPage() {
  const [activeLayers, setActiveLayers] = useState<string[]>(["Shipment flow"]);
  const [selected, setSelected] = useState<{ id: string; kind: "plant" | "warehouse" | "hub" } | null>(null);
  const [selectedLane, setSelectedLane] = useState<{ from: string; to: string } | null>(null);
  const [scrub, setScrub] = useState(100);

  const plant = selected?.kind === "plant" ? PLANTS.find((p) => p.id === selected.id) : null;
  const wh = selected?.kind === "warehouse" ? WAREHOUSES.find((w) => w.id === selected.id) : null;
  const hub = selected?.kind === "hub" ? DEALER_HUBS.find((h) => h.id === selected.id) : null;
  const lane = selectedLane ? LANES.find((l) => l.from === selectedLane.from && l.to === selectedLane.to) : null;
  const laneNodes = lane
    ? {
        from: [...PLANTS, ...WAREHOUSES].find((n) => n.id === lane.from)?.name,
        to: [...PLANTS, ...WAREHOUSES].find((n) => n.id === lane.to)?.name,
      }
    : null;

  return (
    <div>
      <PageTitle
        title="Live Network Map"
        subtitle="Real-time view of plants, distribution centres, dealer hubs and freight lanes"
        actions={<Btn variant="teal" size="sm" onClick={() => toast.success("Scenario draft created")}><Plus size={12} /> New Scenario</Btn>}
      />

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-border bg-panel px-4 py-2.5 text-[12px]">
          <div className="flex items-center gap-1.5 text-muted-foreground"><Layers size={13} /> Layers:</div>
          {LAYERS.map((l) => {
            const on = activeLayers.includes(l);
            return (
              <button
                key={l}
                onClick={() => setActiveLayers((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]))}
                className={`rounded-md border px-2 py-1 transition-colors ${on ? "border-teal bg-teal/10 text-teal" : "border-border bg-background hover:bg-secondary"}`}
              >
                {l}
              </button>
            );
          })}
          <div className="ml-auto flex items-center gap-2">
            <Clock size={13} className="text-muted-foreground" />
            <span className="text-muted-foreground">Time scrub:</span>
            <input type="range" min={0} max={100} value={scrub} onChange={(e) => setScrub(+e.target.value)} className="h-1 w-40 accent-teal" />
            <span className="w-12 text-right tabular-nums">{scrub === 100 ? "Live" : `-${100 - scrub}d`}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <NetworkMap
              height={620}
              onNodeClick={(id, kind) => { setSelected({ id, kind }); setSelectedLane(null); }}
              onLaneClick={(from, to) => { setSelectedLane({ from, to }); setSelected(null); }}
              highlightNode={selected?.id ?? null}
            />
          </div>

          <aside className="border-t border-border bg-background lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="text-[13px] font-semibold">Detail</div>
              {(selected || selectedLane) && (
                <button onClick={() => { setSelected(null); setSelectedLane(null); }} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
              )}
            </div>
            <div className="p-4 text-[12.5px]">
              {!selected && !selectedLane && (
                <div className="text-muted-foreground">Click any node or lane on the map to see throughput, inventory, in-flight shipments and active alerts.</div>
              )}
              {plant && (
                <div className="space-y-3">
                  <div>
                    <div className="text-[15px] font-semibold">{plant.name}</div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wide">{plant.region} region · plant</div>
                  </div>
                  <Stat label="Daily throughput" value={`${plant.throughput.toLocaleString()} units`} />
                  <Stat label="Rated capacity" value={`${plant.capacity.toLocaleString()} units`} />
                  <Stat label="Utilization" value={`${Math.round((plant.throughput / plant.capacity) * 100)}%`} />
                  <Stat label="Inbound shipments" value="14 in transit" />
                  <Stat label="Outbound shipments" value="32 dispatched today" />
                  <Stat label="Active alerts" value={plant.health === "warning" ? "2 equipment · 1 quality" : "None"} />
                </div>
              )}
              {wh && (
                <div className="space-y-3">
                  <div>
                    <div className="text-[15px] font-semibold">{wh.name}</div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wide">{wh.region} region · distribution centre</div>
                  </div>
                  <Stat label="Stock value" value={`₹${wh.stockValue}L`} />
                  <Stat label="Days of cover" value={`${wh.daysCover} days`} />
                  <Stat label="Inbound" value="9 shipments" />
                  <Stat label="Outbound" value="18 dispatches today" />
                  <Stat label="Status" value={wh.health === "critical" ? "Stockout risk in 4 days" : wh.health === "warning" ? "Below reorder on 6 SKUs" : "Healthy"} />
                </div>
              )}
              {hub && (
                <div className="space-y-3">
                  <div>
                    <div className="text-[15px] font-semibold">{hub.name}</div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wide">Dealer cluster</div>
                  </div>
                  <Stat label="Active dealers" value={`${hub.count}`} />
                  <Stat label="Open orders" value={`${(hub.count * 4).toLocaleString()}`} />
                  <Stat label="Avg. lead time" value="3.2 days" />
                </div>
              )}
              {lane && laneNodes && (
                <div className="space-y-3">
                  <div>
                    <div className="text-[15px] font-semibold">{laneNodes.from} → {laneNodes.to}</div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Freight lane</div>
                  </div>
                  <Stat label="Carrier" value={lane.carrier} />
                  <Stat label="Avg. transit" value={`${lane.transitDays} day${lane.transitDays > 1 ? "s" : ""}`} />
                  <Stat label="Shipments in motion" value={`${lane.shipments}`} />
                  <Stat label="On-time performance" value={`${lane.onTime}%`} />
                  <Stat label="Status" value={lane.status} />
                </div>
              )}
            </div>
          </aside>
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium capitalize">{value}</span>
    </div>
  );
}

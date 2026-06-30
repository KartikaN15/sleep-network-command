import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SHIPMENTS } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, Btn } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";
import { CheckCircle2, Circle, Clock, X } from "lucide-react";
import { Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/logistics/shipments")({
  component: ShipmentsPage,
});

const TABS = ["All","Dispatched","In Transit","Out for Delivery","Delivered","Delayed","Exception"];

function ShipmentsPage() {
  const [tab, setTab] = useState("All");
  const [sel, setSel] = useState<typeof SHIPMENTS[number] | null>(null);
  const filtered = tab === "All" ? SHIPMENTS : SHIPMENTS.filter((s) => s.status === tab);

  return (
    <div>
      <PageTitle title="Shipment Tracking" subtitle="Live status of all shipments from plants & warehouses to dealers, experience centres and customers"
        actions={<Btn size="sm" variant="outline" onClick={() => toast.success("Shipment manifest exported")}><Download size={12}/> Export</Btn>}
      />

      <div className="mb-4 flex flex-wrap gap-1 border-b border-border">
        {TABS.map((t) => {
          const count = t === "All" ? SHIPMENTS.length : SHIPMENTS.filter((s) => s.status === t).length;
          return (
            <button key={t} onClick={() => setTab(t)}
              className={`-mb-px border-b-2 px-3 py-2 text-[12.5px] ${tab === t ? "border-teal text-teal font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {t} <span className="ml-1 text-[10.5px] text-muted-foreground">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className={sel ? "lg:col-span-3" : "lg:col-span-5"}>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-[12.5px]">
                <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left">Shipment</th>
                    <th className="px-3 py-2 text-left">Origin</th>
                    <th className="px-3 py-2 text-left">Destination</th>
                    <th className="px-3 py-2 text-left">Carrier</th>
                    <th className="px-3 py-2 text-left">Dispatched</th>
                    <th className="px-3 py-2 text-left">ETA</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Last scan</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} onClick={() => setSel(s)}
                      className={`cursor-pointer border-t border-border hover:bg-panel/60 ${sel?.id === s.id ? "bg-teal/5" : ""}`}>
                      <td className="px-3 py-2 font-mono text-[11.5px]">{s.id}</td>
                      <td className="px-3 py-2">{s.origin}</td>
                      <td className="px-3 py-2">{s.dest}</td>
                      <td className="px-3 py-2 text-muted-foreground">{s.carrier}</td>
                      <td className="px-3 py-2 text-muted-foreground">{s.dispatched}</td>
                      <td className="px-3 py-2">{s.eta}</td>
                      <td className="px-3 py-2"><StatusBadge status={s.status === "Delivered" ? "healthy" : s.status === "Delayed" || s.status === "Exception" ? "critical" : "info"}>{s.status}</StatusBadge></td>
                      <td className="px-3 py-2 text-[11.5px] text-muted-foreground">{s.lastScan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        {sel && (
          <Card className="lg:col-span-2 h-fit">
            <CardHeader title={sel.id} subtitle={`${sel.origin} → ${sel.dest}`}
              action={<button onClick={() => setSel(null)} className="text-muted-foreground hover:text-foreground"><X size={14}/></button>} />
            <CardBody>
              <div className="mb-3 rounded-md border border-border bg-panel p-3 text-[12px]">
                <Stat label="Carrier" value={sel.carrier} />
                <Stat label="Status" value={sel.status} />
                <Stat label="Dispatched" value={sel.dispatched} />
                <Stat label="ETA" value={sel.eta} />
                {sel.delayReason && <Stat label="Delay reason" value={sel.delayReason} />}
              </div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Tracking timeline</div>
              <ol className="mt-2 space-y-3">
                <TLine done label="Dispatched" detail={`${sel.origin} · ${sel.dispatched}`} />
                <TLine done label="In-transit scan" detail={sel.lastScan} />
                <TLine current label="Out for delivery" detail={`Hub · ${sel.dest}`} />
                <TLine pending label="Delivered" detail={`ETA ${sel.eta}`} />
              </ol>
              <div className="mt-3 h-24 rounded-md border border-border bg-[linear-gradient(135deg,#eaf0f7,#f6f8fb)] p-2 text-[11px] text-muted-foreground">
                <div className="flex h-full items-center justify-center">Route map · {sel.origin} → {sel.dest}</div>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between py-1"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>;
}
function TLine({ done, current, pending, label, detail }: any) {
  return (
    <li className="flex items-start gap-2.5 text-[12px]">
      <div className="mt-0.5">
        {done && <CheckCircle2 size={14} className="text-success" />}
        {current && <Clock size={14} className="text-teal animate-pulse" />}
        {pending && <Circle size={14} className="text-muted-foreground" />}
      </div>
      <div>
        <div className={pending ? "text-muted-foreground" : "font-medium"}>{label}</div>
        <div className="text-[11px] text-muted-foreground">{detail}</div>
      </div>
    </li>
  );
}

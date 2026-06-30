import { createFileRoute } from "@tanstack/react-router";
import { ORDERS } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, KpiCard, Btn } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";
import { Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/inventory/orders")({
  component: OrdersPage,
});

const RETURNS = [
  { id: "RET-3120", channel: "Online", reason: "Damaged in transit", product: "MemoryFlex King", status: "Pickup scheduled" },
  { id: "RET-3121", channel: "Dealer", reason: "Size exchange", product: "OrthoCloud Queen", status: "Replacement dispatched" },
  { id: "RET-3122", channel: "Online", reason: "Quality issue", product: "EcoRest Single", status: "QA review" },
  { id: "RET-3123", channel: "Experience Centre", reason: "Damaged in transit", product: "CoolGel King", status: "Refund initiated" },
];

function OrdersPage() {
  return (
    <div>
      <PageTitle title="Omnichannel Order Sync" subtitle="Unified order fulfillment across Experience Centre, Dealer Network and Online channels"
        actions={<Btn size="sm" variant="outline" onClick={() => toast.success("Orders exported to Excel")}><Download size={12}/> Export</Btn>}
      />

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <KpiCard label="Experience Centre" value="412 open" hint="96% on-time · ₹2.1 Cr value" accent="success" />
        <KpiCard label="Dealer Network" value="1,840 open" hint="89% on-time · ₹6.4 Cr value" accent="warning" />
        <KpiCard label="Online / D2C" value="980 open" hint="91% on-time · ₹2.8 Cr value" accent="teal" />
      </div>

      <Card className="mb-4">
        <CardHeader title="Order queue" subtitle="Live view of open orders awaiting fulfillment" />
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left">Order ID</th>
                  <th className="px-3 py-2 text-left">Channel</th>
                  <th className="px-3 py-2 text-left">Product</th>
                  <th className="px-3 py-2 text-right">Qty</th>
                  <th className="px-3 py-2 text-left">Source</th>
                  <th className="px-3 py-2 text-left">Customer city</th>
                  <th className="px-3 py-2 text-left">Promised</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-right">Days to promise</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.slice(0, 24).map((o) => (
                  <tr key={o.id} className="border-t border-border hover:bg-panel/60">
                    <td className="px-3 py-2 font-mono text-[11.5px]">{o.id}</td>
                    <td className="px-3 py-2">
                      <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${
                        o.channel === "Experience Centre" ? "bg-primary/10 text-primary" :
                        o.channel === "Dealer" ? "bg-teal/10 text-teal" : "bg-warning/10 text-warning"
                      }`}>{o.channel}</span>
                    </td>
                    <td className="px-3 py-2">{o.product}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{o.qty}</td>
                    <td className="px-3 py-2 text-muted-foreground">{o.source}</td>
                    <td className="px-3 py-2">{o.city}</td>
                    <td className="px-3 py-2 text-muted-foreground">{o.promised}</td>
                    <td className="px-3 py-2">
                      <StatusBadge status={o.status === "Delivered" ? "healthy" : o.status === "Delayed" ? "critical" : o.status === "In Transit" ? "info" : "warning"}>{o.status}</StatusBadge>
                    </td>
                    <td className={`px-3 py-2 text-right tabular-nums font-medium ${o.daysToPromise < 0 ? "text-critical" : o.daysToPromise <= 2 ? "text-warning" : ""}`}>
                      {o.daysToPromise < 0 ? `${Math.abs(o.daysToPromise)}d overdue` : `${o.daysToPromise}d`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Fulfillment conflicts" subtitle="Orders competing for the same constrained stock" />
          <CardBody>
            <ul className="space-y-3 text-[12.5px]">
              <li className="rounded-md border border-warning/30 bg-warning/5 p-3">
                <div className="font-semibold">OrthoCloud Spring Queen · Bengaluru DC</div>
                <div className="text-[11.5px] text-muted-foreground">38 units available · 24 EC + 64 Dealer + 19 Online demand</div>
                <div className="mt-1.5">Recommended allocation: <span className="font-medium">EC first (within 48h of promise), then split 60/40 Dealer/Online</span></div>
              </li>
              <li className="rounded-md border border-warning/30 bg-warning/5 p-3">
                <div className="font-semibold">MemoryFlex King · Mumbai DC</div>
                <div className="text-[11.5px] text-muted-foreground">22 units available · 18 EC + 41 Dealer demand</div>
                <div className="mt-1.5">Recommended allocation: <span className="font-medium">Fulfill EC fully, partial Dealer with Bhiwandi production order top-up</span></div>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Active returns" subtitle="By channel and reason code" />
          <CardBody className="p-0">
            <table className="w-full text-[12.5px]">
              <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
                <tr><th className="px-3 py-2 text-left">ID</th><th className="px-3 py-2 text-left">Channel</th><th className="px-3 py-2 text-left">Reason</th><th className="px-3 py-2 text-left">Product</th><th className="px-3 py-2 text-left">Status</th></tr>
              </thead>
              <tbody>
                {RETURNS.map((r) => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="px-3 py-2 font-mono text-[11.5px]">{r.id}</td>
                    <td className="px-3 py-2">{r.channel}</td>
                    <td className="px-3 py-2 text-muted-foreground">{r.reason}</td>
                    <td className="px-3 py-2">{r.product}</td>
                    <td className="px-3 py-2"><StatusBadge status="info">{r.status}</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

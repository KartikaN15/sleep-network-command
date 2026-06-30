import { createFileRoute, Link } from "@tanstack/react-router";
import { KPI, FULFILLMENT_TREND, EQUIPMENT_ALERTS, INVENTORY_ALERTS, ACTIVE_DISRUPTIONS } from "@/lib/mockData";
import { NetworkMap, StatusBadge } from "@/components/NetworkMap";
import { Card, CardHeader, CardBody, KpiCard, PageTitle, Btn } from "@/components/ui-bits";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { ArrowRight, Wrench, Repeat, Activity } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div>
      <PageTitle
        title="Network Overview"
        subtitle="Live supply chain health across all plants, warehouses and dealer channels — Tuesday, 30 Jun 2026"
        actions={
          <>
            <Btn variant="outline" size="sm" onClick={() => toast.success("Snapshot exported to PDF")}>Export snapshot</Btn>
            <Link to="/network/scenarios"><Btn variant="teal" size="sm">New scenario</Btn></Link>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <KpiCard label="Network Fulfillment Rate" value={`${KPI.fulfillmentRate}%`} delta={`${KPI.fulfillmentDelta}%`} deltaPositive hint="Target 95% · 7-day avg" accent="success" />
        <KpiCard label="Locations at Inventory Risk" value={`${KPI.inventoryRisk}`} hint="6 critical · 5 warning" accent="warning" />
        <KpiCard label="Equipment Health Score" value={`${KPI.equipmentHealth} / 100`} hint="Across 112 monitored machines" accent="success" />
        <KpiCard label="Open Shipments in Transit" value={`${KPI.shipmentsInTransit.toLocaleString()}`} hint={`₹${KPI.shipmentsValueCr} Cr in flight`} accent="teal" />
        <KpiCard label="On-Time Delivery Rate" value={`${KPI.onTimeDelivery}%`} delta="3.4%" deltaPositive={false} hint={`Below ${KPI.onTimeTarget}% target`} accent="warning" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader
            title="Live Network"
            subtitle="Plants, warehouses, dealer hubs · color-coded by health"
            action={<Link to="/network/map"><Btn size="sm" variant="outline">Open simulator <ArrowRight size={12} /></Btn></Link>}
          />
          <CardBody className="p-0">
            <NetworkMap height={360} showLabels={false} />
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Fulfillment Trend · 12 weeks" subtitle="On-time orders by channel" />
          <CardBody>
            <ResponsiveContainer width="100%" height={310}>
              <LineChart data={FULFILLMENT_TREND} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="Experience Centre" stroke="#1B2E4B" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Dealer" stroke="#00B894" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Online" stroke="#F39C12" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Equipment Alerts" subtitle="Top 5 machines flagged for predictive maintenance" />
          <CardBody className="p-0">
            <ul className="divide-y divide-border">
              {EQUIPMENT_ALERTS.map((a) => (
                <li key={a.machine} className="flex items-start justify-between gap-2 p-3 text-[12.5px]">
                  <div className="min-w-0">
                    <div className="font-medium">{a.machine}</div>
                    <div className="text-[11px] text-muted-foreground">{a.plant} · {a.mode}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <StatusBadge status={a.days <= 5 ? "critical" : a.days <= 10 ? "warning" : "info"}>
                        ~{a.days}d to failure
                      </StatusBadge>
                      <span className="text-[11px] text-muted-foreground">Conf {a.confidence}%</span>
                    </div>
                  </div>
                  <Btn size="sm" variant="outline" onClick={() => toast.success(`Work order created for ${a.machine}`)}>
                    <Wrench size={11} /> Create WO
                  </Btn>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Inventory Alerts" subtitle="Top 7 SKU · location combinations at risk" />
          <CardBody className="p-0">
            <ul className="divide-y divide-border">
              {INVENTORY_ALERTS.map((a) => (
                <li key={a.sku + a.location} className="flex items-start justify-between gap-2 p-3 text-[12.5px]">
                  <div className="min-w-0">
                    <div className="font-medium">{a.name}</div>
                    <div className="text-[11px] text-muted-foreground">{a.location} · {a.sku}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <StatusBadge status={a.type === "critical" ? "critical" : a.type === "overstock" ? "info" : "warning"}>
                        {a.type === "overstock" ? `${a.daysCover}d overstock` : `${a.daysCover}d cover`}
                      </StatusBadge>
                    </div>
                  </div>
                  <Btn size="sm" variant="outline" onClick={() => toast.success(`Transfer suggested: ${a.action}`)}>
                    <Repeat size={11} /> Transfer
                  </Btn>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Active Disruptions" subtitle="Live network incidents and impact" />
          <CardBody className="p-0">
            <ul className="divide-y divide-border">
              {ACTIVE_DISRUPTIONS.map((d) => (
                <li key={d.id} className="p-3 text-[12.5px]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium">{d.title}</div>
                    <StatusBadge status={d.severity}>{d.severity}</StatusBadge>
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{d.cause}</div>
                  <div className="mt-1 text-[11.5px]">{d.impact}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    <Activity size={10} className="mr-1 inline" />
                    {d.affectedOrders} orders affected
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

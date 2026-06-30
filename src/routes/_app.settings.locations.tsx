import { createFileRoute } from "@tanstack/react-router";
import { PLANTS, WAREHOUSES, DEALER_HUBS } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, KpiCard } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";

export const Route = createFileRoute("/_app/settings/locations")({ component: Page });

function Page() {
  return (
    <div>
      <PageTitle title="Locations & Network Nodes" subtitle="All physical nodes in the SleepNet supply network" />
      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Manufacturing plants" value={`${PLANTS.length}`} accent="teal" />
        <KpiCard label="Distribution centres" value={`${WAREHOUSES.length}`} accent="teal" />
        <KpiCard label="Dealer hub clusters" value={`${DEALER_HUBS.length}`} accent="warning" />
        <KpiCard label="Active dealers" value={`${DEALER_HUBS.reduce((s,h)=>s+h.count,0)}`} accent="success" />
      </div>

      <Card className="mb-4">
        <CardHeader title="Plants" />
        <CardBody className="p-0">
          <table className="w-full text-[12.5px]">
            <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-3 py-2 text-left">Name</th><th className="px-3 py-2 text-left">Region</th><th className="px-3 py-2 text-right">Rated capacity</th><th className="px-3 py-2 text-right">Current throughput</th><th className="px-3 py-2 text-left">Status</th></tr>
            </thead>
            <tbody>
              {PLANTS.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{p.name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{p.region}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{p.capacity.toLocaleString()} units/day</td>
                  <td className="px-3 py-2 text-right tabular-nums">{p.throughput.toLocaleString()} units/day</td>
                  <td className="px-3 py-2"><StatusBadge status={p.health}>{p.health}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Distribution centres" />
        <CardBody className="p-0">
          <table className="w-full text-[12.5px]">
            <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-3 py-2 text-left">Name</th><th className="px-3 py-2 text-left">Region</th><th className="px-3 py-2 text-right">Stock value</th><th className="px-3 py-2 text-right">Days cover</th><th className="px-3 py-2 text-left">Status</th></tr>
            </thead>
            <tbody>
              {WAREHOUSES.map((w) => (
                <tr key={w.id} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{w.name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{w.region}</td>
                  <td className="px-3 py-2 text-right tabular-nums">₹{w.stockValue}L</td>
                  <td className="px-3 py-2 text-right tabular-nums">{w.daysCover}d</td>
                  <td className="px-3 py-2"><StatusBadge status={w.health}>{w.health}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

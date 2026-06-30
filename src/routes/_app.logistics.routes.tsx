import { createFileRoute } from "@tanstack/react-router";
import { ROUTE_RECS } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, Btn, KpiCard } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/logistics/routes")({ component: Page });

const CONSOL = [
  { route: "Mumbai → Pune + Nashik", current: "62% utilization", recommended: "Combine → 88% utilization", save: "₹3.2L/month" },
  { route: "Delhi → Jaipur + Agra", current: "58% utilization", recommended: "Combine → 81% utilization", save: "₹2.7L/month" },
  { route: "Bengaluru → Mysuru + Hosur", current: "49% utilization", recommended: "Combine → 84% utilization", save: "₹2.1L/month" },
];

function Page() {
  return (
    <div>
      <PageTitle title="Route Optimization" subtitle="Lane and routing changes recommended to reduce cost and transit time" />
      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Approved recommendations YTD" value="14" accent="success" />
        <KpiCard label="Annualized savings (approved)" value="₹1.84 Cr" accent="teal" />
        <KpiCard label="Open recommendations" value="11" accent="warning" />
        <KpiCard label="Avg. transit improvement" value="-0.6 d" accent="success" />
      </div>

      <Card className="mb-4">
        <CardHeader title="Lane recommendations" />
        <CardBody className="p-0">
          <table className="w-full text-[12.5px]">
            <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-3 py-2 text-left">Lane</th><th className="px-3 py-2 text-left">Current</th><th className="px-3 py-2 text-left">Recommended</th><th className="px-3 py-2 text-right">Saving</th><th className="px-3 py-2 text-right">Transit Δ</th><th className="px-3 py-2 text-right">Confidence</th><th className="px-3 py-2 text-left">Status</th><th></th></tr>
            </thead>
            <tbody>
              {ROUTE_RECS.map((r) => (
                <tr key={r.lane} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{r.lane}</td>
                  <td className="px-3 py-2 text-muted-foreground">{r.current}</td>
                  <td className="px-3 py-2">{r.recommended}</td>
                  <td className="px-3 py-2 text-right font-medium text-success">{r.save}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.transit}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.confidence}%</td>
                  <td className="px-3 py-2"><StatusBadge status={r.status === "Approved" ? "healthy" : r.status === "Rejected" ? "critical" : r.status === "Under Review" ? "warning" : "info"}>{r.status}</StatusBadge></td>
                  <td className="px-3 py-2 text-right">
                    {r.status === "New" && <Btn size="sm" variant="outline" onClick={() => toast.success("Sent for review")}>Review</Btn>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Load consolidation opportunities" subtitle="Combine partial loads on adjacent destinations into fuller truckloads" />
        <CardBody className="p-0">
          <table className="w-full text-[12.5px]">
            <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-3 py-2 text-left">Route</th><th className="px-3 py-2 text-left">Current</th><th className="px-3 py-2 text-left">Recommended</th><th className="px-3 py-2 text-right">Saving</th></tr>
            </thead>
            <tbody>
              {CONSOL.map((c) => (
                <tr key={c.route} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{c.route}</td>
                  <td className="px-3 py-2 text-muted-foreground">{c.current}</td>
                  <td className="px-3 py-2">{c.recommended}</td>
                  <td className="px-3 py-2 text-right font-medium text-success">{c.save}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, CardBody, PageTitle, Btn } from "@/components/ui-bits";
import { FileText, Download, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/analytics/reports")({ component: Page });

const REPORTS = [
  { name: "Monthly fulfillment scorecard", schedule: "1st of each month", last: "01 Jun 2026", format: "PDF + Excel", owner: "SC Head" },
  { name: "Weekly stockout & overstock summary", schedule: "Every Monday 8 AM", last: "30 Jun 2026", format: "Excel", owner: "Warehouse Mgmt" },
  { name: "Carrier performance scorecard", schedule: "Every 14 days", last: "25 Jun 2026", format: "PDF", owner: "Logistics" },
  { name: "Predictive maintenance summary", schedule: "Weekly", last: "29 Jun 2026", format: "PDF", owner: "Plant Operations" },
  { name: "Quality defect breakdown", schedule: "Daily 9 PM", last: "Today", format: "Excel", owner: "QA Head" },
  { name: "Network cost-to-serve · channel mix", schedule: "Monthly", last: "01 Jun 2026", format: "PDF", owner: "Finance" },
  { name: "Dealer fill-rate by region", schedule: "Bi-weekly", last: "22 Jun 2026", format: "Excel", owner: "Sales Ops" },
  { name: "Equipment downtime · root cause", schedule: "Monthly", last: "01 Jun 2026", format: "PDF", owner: "Plant Operations" },
];

function Page() {
  return (
    <div>
      <PageTitle title="Custom Reports" subtitle="Scheduled and on-demand reports across the supply chain"
        actions={<Btn size="sm" variant="teal">+ New report</Btn>}
      />

      <Card>
        <CardHeader title="Active reports" subtitle={`${REPORTS.length} scheduled reports`} />
        <CardBody className="p-0">
          <table className="w-full text-[12.5px]">
            <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-3 py-2 text-left">Report</th><th className="px-3 py-2 text-left">Schedule</th><th className="px-3 py-2 text-left">Last run</th><th className="px-3 py-2 text-left">Format</th><th className="px-3 py-2 text-left">Owner</th><th></th></tr>
            </thead>
            <tbody>
              {REPORTS.map((r) => (
                <tr key={r.name} className="border-t border-border hover:bg-panel/60">
                  <td className="px-3 py-2"><div className="flex items-center gap-2 font-medium"><FileText size={13} className="text-teal"/> {r.name}</div></td>
                  <td className="px-3 py-2 text-muted-foreground"><span className="inline-flex items-center gap-1"><Calendar size={11}/>{r.schedule}</span></td>
                  <td className="px-3 py-2 text-muted-foreground"><span className="inline-flex items-center gap-1"><Clock size={11}/>{r.last}</span></td>
                  <td className="px-3 py-2">{r.format}</td>
                  <td className="px-3 py-2 text-muted-foreground">{r.owner}</td>
                  <td className="px-3 py-2 text-right">
                    <Btn size="sm" variant="outline" onClick={() => toast.success(`${r.name} downloaded`)}><Download size={11}/></Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

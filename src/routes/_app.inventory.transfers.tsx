import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TRANSFERS, IN_TRANSIT_TRANSFERS } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, Btn } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";
import { toast } from "sonner";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_app/inventory/transfers")({
  component: TransfersPage,
});

function TransfersPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const toggle = (i: number) => setSelected((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i]);

  return (
    <div>
      <PageTitle title="Transfer Recommendations" subtitle="System-recommended stock transfers to prevent stockouts without overproducing"
        actions={
          <Btn variant="teal" size="sm" disabled={selected.length === 0}
            onClick={() => { toast.success(`${selected.length} transfer order${selected.length > 1 ? "s" : ""} approved and dispatched`); setSelected([]); }}>
            <Check size={12}/> Approve {selected.length > 0 ? `(${selected.length})` : "transfers"}
          </Btn>
        }
      />

      <Card className="mb-4">
        <CardHeader title="Recommended transfers" subtitle={`${TRANSFERS.length} suggestions · sorted by priority`} />
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="w-10 px-3 py-2"><input type="checkbox"
                    checked={selected.length === TRANSFERS.length}
                    onChange={(e) => setSelected(e.target.checked ? TRANSFERS.map((_, i) => i) : [])} /></th>
                  <th className="px-3 py-2 text-left">Material</th>
                  <th className="px-3 py-2 text-left">Source</th>
                  <th className="px-3 py-2 text-left">Destination</th>
                  <th className="px-3 py-2 text-right">Qty</th>
                  <th className="px-3 py-2 text-left">Reason</th>
                  <th className="px-3 py-2 text-left">Transit</th>
                  <th className="px-3 py-2 text-right">Net saving</th>
                  <th className="px-3 py-2 text-left">Priority</th>
                </tr>
              </thead>
              <tbody>
                {TRANSFERS.map((t, i) => (
                  <tr key={i} className="border-t border-border hover:bg-panel/60">
                    <td className="px-3 py-2"><input type="checkbox" checked={selected.includes(i)} onChange={() => toggle(i)} /></td>
                    <td className="px-3 py-2 font-medium">{t.material}</td>
                    <td className="px-3 py-2 text-muted-foreground">{t.from}</td>
                    <td className="px-3 py-2 text-muted-foreground">{t.to}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{t.qty}</td>
                    <td className="px-3 py-2 text-[11.5px] text-muted-foreground">{t.reason}</td>
                    <td className="px-3 py-2">{t.transit}</td>
                    <td className="px-3 py-2 text-right font-medium text-success">{t.costSave}</td>
                    <td className="px-3 py-2"><StatusBadge status={t.priority === "Critical" ? "critical" : t.priority === "High" ? "warning" : "info"}>{t.priority}</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="In-transit transfers" subtitle="Stock currently moving between locations" />
        <CardBody className="p-0">
          <table className="w-full text-[12.5px]">
            <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left">Material</th>
                <th className="px-3 py-2 text-left">From</th>
                <th className="px-3 py-2 text-left">To</th>
                <th className="px-3 py-2 text-right">Qty</th>
                <th className="px-3 py-2 text-left">Dispatched</th>
                <th className="px-3 py-2 text-left">ETA</th>
                <th className="px-3 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {IN_TRANSIT_TRANSFERS.map((t, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{t.material}</td>
                  <td className="px-3 py-2">{t.from}</td>
                  <td className="px-3 py-2">{t.to}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{t.qty}</td>
                  <td className="px-3 py-2 text-muted-foreground">{t.dispatch}</td>
                  <td className="px-3 py-2">{t.eta}</td>
                  <td className="px-3 py-2"><StatusBadge status="info">In transit</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

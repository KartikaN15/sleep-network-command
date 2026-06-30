import { createFileRoute } from "@tanstack/react-router";
import { QUALITY_DEFECTS, QUALITY_FEED, SUPPLIER_SCORECARD } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, KpiCard } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { ImageIcon, AlertCircle, TrendingDown, TrendingUp, Minus } from "lucide-react";

export const Route = createFileRoute("/_app/plant/quality")({
  component: QualityPage,
});

function QualityPage() {
  return (
    <div>
      <PageTitle title="Quality Inspection" subtitle="AI-assisted visual inspection at in-line and pre-dispatch stages" />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Units inspected today" value="4,820" accent="teal" />
        <KpiCard label="Defects caught" value="96" hint="2.0% defect rate" accent="warning" />
        <KpiCard label="Auto-pass rate" value="94.6%" delta="0.8%" deltaPositive accent="success" />
        <KpiCard label="AI confidence (avg)" value="92.4%" accent="success" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Defects by type · today" />
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={QUALITY_DEFECTS} layout="vertical" margin={{ top: 5, right: 16, left: 60, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis type="category" dataKey="type" tick={{ fontSize: 11, fill: "#64748b" }} width={140} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="count" fill="#1B2E4B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Inspection feed · streaming" subtitle="Newest entries at top · auto-updates from CV pipeline" />
          <CardBody className="p-0">
            <div className="max-h-[300px] overflow-y-auto">
              <table className="w-full text-[12.5px]">
                <thead className="sticky top-0 bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left">Time</th>
                    <th className="px-3 py-2 text-left">Batch</th>
                    <th className="px-3 py-2 text-left">Product</th>
                    <th className="px-3 py-2 text-left">Plant</th>
                    <th className="px-3 py-2 text-left">Stage</th>
                    <th className="px-3 py-2 text-left">Defect</th>
                    <th className="px-3 py-2 text-right">Confidence</th>
                    <th className="px-3 py-2 text-left">Disposition</th>
                    <th className="px-3 py-2 text-left">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {QUALITY_FEED.map((q, i) => (
                    <tr key={q.batch + i} className={`border-t border-border ${q.defect ? "bg-warning/5" : ""}`}>
                      <td className="px-3 py-2 font-mono text-[11px] text-muted-foreground">{q.time}</td>
                      <td className="px-3 py-2 font-mono text-[11px]">{q.batch}</td>
                      <td className="px-3 py-2 font-medium">{q.product}</td>
                      <td className="px-3 py-2 text-muted-foreground">{q.plant}</td>
                      <td className="px-3 py-2 text-[11.5px]">{q.stage}</td>
                      <td className="px-3 py-2 text-[11.5px]">{q.defect ? <span className="text-critical">{q.defectType}</span> : <span className="text-muted-foreground">—</span>}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{q.confidence}%</td>
                      <td className="px-3 py-2">
                        <StatusBadge status={q.disposition === "Pass" ? "healthy" : q.disposition === "Reject" ? "critical" : "warning"}>{q.disposition}</StatusBadge>
                      </td>
                      <td className="px-3 py-2">
                        <div className={`flex h-8 w-12 items-center justify-center rounded border ${q.defect ? "border-critical/30 bg-critical/5 text-critical" : "border-border bg-panel text-muted-foreground"}`}>
                          <ImageIcon size={12} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader title="Supplier quality scorecard" subtitle="Inbound raw material inspection · fabric, foam chemicals, springs, coir" />
        <CardBody className="p-0">
          <table className="w-full text-[12.5px]">
            <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left">Supplier</th>
                <th className="px-3 py-2 text-left">Item supplied</th>
                <th className="px-3 py-2 text-right">Score</th>
                <th className="px-3 py-2 text-right">Defect rate</th>
                <th className="px-3 py-2 text-left">Trend</th>
                <th className="px-3 py-2 text-left">Flag</th>
              </tr>
            </thead>
            <tbody>
              {SUPPLIER_SCORECARD.map((s) => (
                <tr key={s.name} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{s.name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{s.item}</td>
                  <td className="px-3 py-2 text-right tabular-nums font-semibold">{s.score}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{s.defectRate}%</td>
                  <td className="px-3 py-2">
                    {s.trend === "up" ? <span className="inline-flex items-center gap-1 text-success"><TrendingUp size={12}/> Improving</span> :
                     s.trend === "down" ? <span className="inline-flex items-center gap-1 text-critical"><TrendingDown size={12}/> Declining</span> :
                     <span className="inline-flex items-center gap-1 text-muted-foreground"><Minus size={12}/> Stable</span>}
                  </td>
                  <td className="px-3 py-2">
                    {(s as any).flag ? <span className="inline-flex items-center gap-1 text-warning"><AlertCircle size={12}/> Vendor review</span> : <span className="text-muted-foreground">—</span>}
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

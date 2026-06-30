import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { QUALITY_DEFECTS, QUALITY_FEED, SUPPLIER_SCORECARD } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, KpiCard, Btn } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { ImageIcon, AlertCircle, TrendingDown, TrendingUp, Minus, Upload } from "lucide-react";

export const Route = createFileRoute("/_app/plant/quality")({
  component: QualityPage,
});

type FeedRow = (typeof QUALITY_FEED)[number] & { image?: string | null };

// Clickable image cell: uploads / replaces an inspection image and previews it.
function ImageCell({ defect, image, onUpload }: { defect: boolean; image?: string | null; onUpload: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onUpload(URL.createObjectURL(f));
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        title={image ? "Replace inspection image" : "Upload inspection image"}
        className={`flex h-8 w-12 items-center justify-center overflow-hidden rounded border transition hover:ring-2 hover:ring-primary/30 ${
          image
            ? "border-border"
            : defect
              ? "border-critical/30 bg-critical/5 text-critical"
              : "border-border bg-panel text-muted-foreground"
        }`}
      >
        {image ? <img src={image} alt="inspection" className="h-full w-full object-cover" /> : <ImageIcon size={12} />}
      </button>
    </>
  );
}

function QualityPage() {
  const [rows, setRows] = useState<FeedRow[]>(() => QUALITY_FEED.map((q) => ({ ...q, image: null })));
  const addInputRef = useRef<HTMLInputElement>(null);

  const setRowImage = (idx: number, url: string) =>
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, image: url } : r)));

  const addEntryFromFile = (file: File) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const newRow: FeedRow = {
      time,
      batch: `B-${Math.floor(56230 + Math.random() * 70)}`,
      product: "Manual upload",
      plant: "—",
      stage: "Pre-dispatch",
      defect: false,
      defectType: "—",
      confidence: 0,
      disposition: "Hold for Review",
      inspector: "Human override",
      image: URL.createObjectURL(file),
    };
    setRows((prev) => [newRow, ...prev]);
  };

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
          <CardHeader
            title="Inspection feed · streaming"
            subtitle="Newest entries at top · auto-updates from CV pipeline"
            action={
              <>
                <input
                  ref={addInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) addEntryFromFile(f);
                    e.target.value = "";
                  }}
                />
                <Btn variant="outline" size="sm" onClick={() => addInputRef.current?.click()}>
                  <Upload size={12} className="mr-1" /> Upload image
                </Btn>
              </>
            }
          />
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
                  {rows.map((q, i) => (
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
                        <ImageCell defect={q.defect} image={q.image} onUpload={(url) => setRowImage(i, url)} />
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

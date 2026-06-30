import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SKUS } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, KpiCard, Btn } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";
import { Download, Filter, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/inventory/stock")({
  component: StockPage,
});

const LOCATIONS = ["All Locations", "Hosur Plant", "Karimangalam Plant", "Hyderabad Unit", "Bhiwandi Unit", "Indore Plant", "South DC", "West DC", "North DC", "East DC"];

function StockPage() {
  const [loc, setLoc] = useState("All Locations");
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "value", dir: "desc" });
  const [filter, setFilter] = useState("");

  const rows = useMemo(() => {
    let r = SKUS;
    if (filter) r = r.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()) || x.sku.toLowerCase().includes(filter.toLowerCase()));
    r = [...r].sort((a: any, b: any) => {
      const v = a[sort.key] > b[sort.key] ? 1 : a[sort.key] < b[sort.key] ? -1 : 0;
      return sort.dir === "asc" ? v : -v;
    });
    return r;
  }, [filter, sort]);

  const sumValue = SKUS.reduce((s, r) => s + r.value, 0);
  const belowReorder = SKUS.filter((r) => r.total < r.reorder).length;

  function setSortKey(k: string) {
    setSort((s) => s.key === k ? { key: k, dir: s.dir === "asc" ? "desc" : "asc" } : { key: k, dir: "desc" });
  }

  return (
    <div>
      <PageTitle title="Multi-Location Stock" subtitle="Real-time inventory across all plants and regional distribution centres"
        actions={<Btn size="sm" variant="outline" onClick={() => toast.success("Stock report exported to Excel")}><Download size={12}/> Export</Btn>}
      />

      <div className="mb-4 flex flex-wrap gap-1 border-b border-border">
        {LOCATIONS.map((l) => (
          <button key={l} onClick={() => setLoc(l)}
            className={`-mb-px border-b-2 px-3 py-2 text-[12.5px] transition-colors ${loc === l ? "border-teal text-teal font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Total SKUs" value={`${SKUS.length}`} hint={`Across ${loc}`} accent="teal" />
        <KpiCard label="Total stock value" value={`₹${(sumValue / 10000000).toFixed(2)} Cr`} accent="success" />
        <KpiCard label="Below reorder point" value={`${belowReorder}`} hint="Trigger transfer or production" accent="warning" />
        <KpiCard label="Dead stock (>90d no movement)" value="31 SKUs" hint="₹0.9 Cr blocked" accent="critical" />
      </div>

      <Card>
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2 text-[12.5px]">
            <Filter size={13} className="text-muted-foreground" />
            <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter by SKU code or name…"
              className="h-8 w-72 rounded-md border border-input bg-background px-2.5 text-[12.5px] outline-none focus:border-ring" />
          </div>
          <div className="text-[11.5px] text-muted-foreground">{rows.length} of {SKUS.length} SKUs</div>
        </div>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <Th label="SKU" k="sku" sort={sort} onClick={setSortKey} />
                  <Th label="Product" k="name" sort={sort} onClick={setSortKey} />
                  <Th label="Category" k="category" sort={sort} onClick={setSortKey} />
                  <th className="px-3 py-2 text-left">UOM</th>
                  <Th label="Plant stock" k="plantStock" sort={sort} onClick={setSortKey} right />
                  <Th label="DC stock" k="dcStock" sort={sort} onClick={setSortKey} right />
                  <Th label="Total" k="total" sort={sort} onClick={setSortKey} right />
                  <Th label="Reorder" k="reorder" sort={sort} onClick={setSortKey} right />
                  <Th label="Safety" k="safety" sort={sort} onClick={setSortKey} right />
                  <Th label="Avg. cost" k="cost" sort={sort} onClick={setSortKey} right />
                  <Th label="Value (₹)" k="value" sort={sort} onClick={setSortKey} right />
                  <th className="px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 22).map((r) => (
                  <tr key={r.sku} className="border-t border-border hover:bg-panel/60">
                    <td className="px-3 py-2 font-mono text-[11.5px]">{r.sku}</td>
                    <td className="px-3 py-2 font-medium">{r.name}</td>
                    <td className="px-3 py-2 text-muted-foreground">{r.category}</td>
                    <td className="px-3 py-2 text-muted-foreground">{r.uom}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{r.plantStock}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{r.dcStock}</td>
                    <td className="px-3 py-2 text-right font-semibold tabular-nums">{r.total}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{r.reorder}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{r.safety}</td>
                    <td className="px-3 py-2 text-right tabular-nums">₹{r.cost.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right tabular-nums font-medium">₹{(r.value / 100000).toFixed(2)}L</td>
                    <td className="px-3 py-2"><StatusBadge status={r.status}>{r.status === "healthy" ? "OK" : r.status === "warning" ? "Below reorder" : "Below safety"}</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function Th({ label, k, sort, onClick, right }: any) {
  const active = sort.key === k;
  return (
    <th className={`px-3 py-2 ${right ? "text-right" : "text-left"} cursor-pointer select-none`} onClick={() => onClick(k)}>
      <span className={`inline-flex items-center gap-1 ${active ? "text-foreground" : ""}`}>
        {label}
        {active && (sort.dir === "asc" ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}
      </span>
    </th>
  );
}

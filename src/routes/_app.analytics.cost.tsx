import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, CardBody, PageTitle, KpiCard } from "@/components/ui-bits";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from "recharts";

export const Route = createFileRoute("/_app/analytics/cost")({ component: Page });

const DATA = [
  { name: "Mfg cost", EC: 168, Dealer: 142, Online: 152 },
  { name: "Inbound freight", EC: 28, Dealer: 24, Online: 26 },
  { name: "Warehousing", EC: 42, Dealer: 28, Online: 38 },
  { name: "Outbound freight", EC: 92, Dealer: 56, Online: 88 },
  { name: "Last-mile", EC: 48, Dealer: 22, Online: 38 },
  { name: "Returns", EC: 12, Dealer: 8, Online: 24 },
  { name: "Channel fees", EC: 22, Dealer: 6, Online: 32 },
];

function Page() {
  return (
    <div>
      <PageTitle title="Cost-to-Serve Analysis" subtitle="Breakdown of total cost to fulfill an order, by channel" />
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <KpiCard label="Experience Centre · ₹/order" value="₹412" accent="teal" />
        <KpiCard label="Dealer · ₹/order" value="₹286" accent="teal" />
        <KpiCard label="Online · ₹/order" value="₹398" accent="warning" />
      </div>

      <Card>
        <CardHeader title="Cost stack · ₹ per order" subtitle="Stacked by cost component across channels" />
        <CardBody>
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={DATA} margin={{ left: -10, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} angle={-15} textAnchor="end" height={70} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="EC" name="Experience Centre" fill="#1B2E4B" />
              <Bar dataKey="Dealer" fill="#00B894" />
              <Bar dataKey="Online" fill="#F39C12" />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <Card className="mt-4">
        <CardHeader title="Key findings" />
        <CardBody>
          <ul className="space-y-2 text-[13px]">
            <li>• Online cost-to-serve runs <span className="font-semibold text-critical">+₹112/order vs Dealer</span>, driven primarily by returns (+₹16) and last-mile (+₹16).</li>
            <li>• Experience Centre commands the highest manufacturing input mix (premium SKUs) — limit further discounts to protect margin.</li>
            <li>• Dealer channel's outbound freight is 39% lower per order because of bulk-load consolidation — opportunity to extend to Online via lockers in Tier-1 cities.</li>
            <li>• Switching Bhiwandi → Kolkata to multi-modal rail unlocks ~₹61L/year, reducing Online cost-to-serve by ₹14/order.</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

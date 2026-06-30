import { createFileRoute } from "@tanstack/react-router";
import { FULFILL_REGION, COST_BY_CHANNEL, RESILIENCE_TREND, CARRIER_SCORECARD } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, Btn } from "@/components/ui-bits";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from "recharts";
import { Download, Maximize2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/analytics/intelligence")({ component: Page });

const INV_TURN = [
  { cat: "Spring", turn: 6.4 }, { cat: "Foam", turn: 7.8 }, { cat: "Coir", turn: 4.2 },
  { cat: "Pillow", turn: 11.2 }, { cat: "Protector", turn: 9.6 }, { cat: "Topper", turn: 5.1 },
];
const PLANT_UPTIME = [
  { plant: "Hosur", up: 96.2 }, { plant: "Karimangalam", up: 94.8 },
  { plant: "Hyderabad", up: 91.3 }, { plant: "Bhiwandi", up: 95.7 }, { plant: "Indore", up: 89.6 },
];

function Section({ title, children, expandable = true }: any) {
  return (
    <Card>
      <CardHeader title={title}
        action={expandable && (
          <div className="flex gap-1.5">
            <Btn size="sm" variant="ghost" onClick={() => toast.success(`${title} CSV downloaded`)}><Download size={11}/></Btn>
            <Btn size="sm" variant="ghost"><Maximize2 size={11}/></Btn>
          </div>
        )}
      />
      <CardBody>{children}</CardBody>
    </Card>
  );
}

function Page() {
  return (
    <div>
      <PageTitle title="Network Intelligence Dashboard" subtitle="Modular analytics command centre — drill any chart, download or expand" />

      <div className="mb-3 text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Network Health</div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Section title="Fulfillment by region">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={FULFILL_REGION} dataKey="value" innerRadius={50} outerRadius={80} label={(d:any)=>`${d.name} ${d.value}%`}>
                {FULFILL_REGION.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Cost-to-serve by channel · ₹/order">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={COST_BY_CHANNEL} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
              <XAxis dataKey="channel" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="cost" fill="#1B2E4B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Network resilience score · 12 mo">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={RESILIENCE_TREND} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Line dataKey="score" stroke="#00B894" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <div className="mb-3 text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Inventory Efficiency</div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Section title="Inventory turnover by category">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={INV_TURN} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
              <XAxis dataKey="cat" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="turn" fill="#00B894" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Stockout frequency by location · last 90 days">
          <ul className="space-y-2 text-[12.5px]">
            {[
              ["Jaipur DC", 9], ["Guwahati DC", 8], ["Pune DC", 5], ["Bengaluru DC", 4], ["Chennai DC", 3], ["Mumbai DC", 2], ["Delhi DC", 2], ["Kolkata DC", 1],
            ].map(([l, n]) => (
              <li key={l as string} className="flex items-center gap-3">
                <span className="w-28 text-muted-foreground">{l}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-critical" style={{ width: `${(n as number) * 11}%` }} />
                </div>
                <span className="w-6 text-right tabular-nums">{n as number}</span>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Dead stock value · 12 mo">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={RESILIENCE_TREND.map((r, i) => ({ month: r.month, value: 1.4 - i * 0.02 + Math.sin(i)*0.05 }))} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Line dataKey="value" name="₹ Cr" stroke="#F39C12" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <div className="mb-3 text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Operations Performance</div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Section title="Equipment uptime by plant">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={PLANT_UPTIME} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" horizontal={false} />
              <XAxis type="number" domain={[80, 100]} tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis type="category" dataKey="plant" tick={{ fontSize: 11, fill: "#64748b" }} width={90} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="up" fill="#1B2E4B" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Quality defect rate · 12 mo">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={RESILIENCE_TREND.map((r, i) => ({ month: r.month, defects: 3.4 - i * 0.08 + Math.sin(i) * 0.15 }))} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Line dataKey="defects" name="Defect %" stroke="#E74C3C" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Section>
        <Section title="On-time production completion">
          <div className="flex h-full flex-col items-center justify-center py-4">
            <div className="metric-num text-[42px] font-bold text-foreground">92.4%</div>
            <div className="text-[11.5px] text-muted-foreground">YTD · vs 88.1% prior year</div>
            <div className="mt-4 w-full">
              {["Spring","Foam","Coir"].map((c, i) => (
                <div key={c} className="mb-2 flex items-center gap-2 text-[11.5px]">
                  <span className="w-12 text-muted-foreground">{c}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-teal" style={{ width: `${88 + i*3}%` }} />
                  </div>
                  <span className="w-10 text-right tabular-nums">{88 + i*3}%</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <div className="mb-3 text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Logistics Performance</div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Section title="Spend by carrier · ₹L">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CARRIER_SCORECARD.map((c) => ({ name: c.name, spend: (c.volume * c.cost) / 1000 }))} layout="vertical" margin={{ left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} width={110} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="spend" fill="#1B2E4B" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Section>
        <Section title="On-time delivery · 12 mo">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={RESILIENCE_TREND.map((r, i) => ({ month: r.month, otd: 84 + i * 0.5 + Math.sin(i) * 1.2 }))} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis domain={[80, 95]} tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Line dataKey="otd" name="OTD %" stroke="#00B894" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Cost savings YTD · route optimization">
          <div className="flex h-full flex-col items-center justify-center py-6">
            <div className="metric-num text-[44px] font-bold text-success">₹1.84 Cr</div>
            <div className="mt-1 text-[11.5px] text-muted-foreground">Across 14 approved recommendations</div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center text-[12px]">
              <div className="rounded-md bg-panel p-2"><div className="font-bold text-success">₹61L</div><div className="text-[10.5px] text-muted-foreground">Rail switch (Bhi→Kol)</div></div>
              <div className="rounded-md bg-panel p-2"><div className="font-bold text-success">₹38L</div><div className="text-[10.5px] text-muted-foreground">In-house (Hos→Che)</div></div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

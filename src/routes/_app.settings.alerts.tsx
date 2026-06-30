import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ALERT_CONFIGS } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle } from "@/components/ui-bits";

export const Route = createFileRoute("/_app/settings/alerts")({ component: Page });

function Page() {
  const [rules, setRules] = useState(ALERT_CONFIGS);
  return (
    <div>
      <PageTitle title="Alert Configuration" subtitle="Configure who gets notified, how, and at what thresholds" />
      <Card>
        <CardHeader title="Alert rules" />
        <CardBody className="p-0">
          <table className="w-full text-[12.5px]">
            <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-3 py-2 text-left">Event</th><th className="px-3 py-2 text-left">Channels</th><th className="px-3 py-2 text-left">Recipients</th><th className="px-3 py-2 text-right">Enabled</th></tr>
            </thead>
            <tbody>
              {rules.map((r, i) => (
                <tr key={r.event} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{r.event}</td>
                  <td className="px-3 py-2 text-muted-foreground">{r.channel}</td>
                  <td className="px-3 py-2">{r.recipients}</td>
                  <td className="px-3 py-2 text-right">
                    <label className="inline-flex cursor-pointer items-center gap-2">
                      <span className={`relative inline-block h-5 w-9 rounded-full transition-colors ${r.enabled ? "bg-teal" : "bg-secondary"}`}>
                        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${r.enabled ? "left-[18px]" : "left-0.5"}`} />
                      </span>
                      <input type="checkbox" className="hidden" checked={r.enabled}
                        onChange={() => setRules((p) => p.map((x, j) => j === i ? { ...x, enabled: !x.enabled } : x))} />
                    </label>
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

import { createFileRoute } from "@tanstack/react-router";
import { INTEGRATIONS } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";
import { CheckCircle2, AlertTriangle, Plug } from "lucide-react";

export const Route = createFileRoute("/_app/settings/integrations")({ component: Page });

function Page() {
  return (
    <div>
      <PageTitle title="Integrations" subtitle="Connected systems and sync health" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {INTEGRATIONS.map((i) => {
          const ok = i.status === "Active";
          return (
            <Card key={i.name}>
              <CardBody>
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-md ${ok ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                      <Plug size={16} />
                    </div>
                    <div>
                      <div className="text-[13.5px] font-semibold">{i.name}</div>
                      <div className="text-[11px] text-muted-foreground">{i.purpose}</div>
                    </div>
                  </div>
                  <StatusBadge status={ok ? "healthy" : "warning"}>{i.status}</StatusBadge>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-[11.5px]">
                  <span className="text-muted-foreground">Last sync</span>
                  <span className="font-medium">{i.last}</span>
                </div>
                {i.warning && (
                  <div className="mt-2 flex items-start gap-1.5 rounded-md border border-warning/30 bg-warning/10 p-2 text-[11.5px] text-warning">
                    <AlertTriangle size={12} className="mt-0.5"/> {i.warning}
                  </div>
                )}
                {ok && !i.warning && (
                  <div className="mt-2 flex items-center gap-1.5 text-[11.5px] text-success">
                    <CheckCircle2 size={12}/> All records syncing normally
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

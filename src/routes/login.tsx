import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Btn } from "@/components/ui-bits";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/login")({ component: Login });

const ROLES = [
  { id: "sc", label: "Supply Chain Head", desc: "Full visibility · simulator, inventory, fulfillment, analytics" },
  { id: "po", label: "Plant Operations", desc: "Production schedule, equipment health, quality inspection" },
  { id: "wm", label: "Warehouse Manager", desc: "Inventory, transfers, dispatch, fulfillment" },
];

function Login() {
  const nav = useNavigate();
  const [role, setRole] = useState("sc");

  return (
    <div className="flex min-h-screen items-stretch bg-panel">
      <div className="relative hidden flex-1 overflow-hidden bg-primary text-primary-foreground lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(at_30%_20%,rgba(0,184,148,0.25),transparent_55%)]" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-teal text-teal-foreground font-bold">S</div>
            <div>
              <div className="text-[15px] font-semibold">SleepNet Command</div>
              <div className="text-[11.5px] text-white/60">Logistics Network Simulator</div>
            </div>
          </div>
          <div>
            <h1 className="text-[34px] font-bold leading-tight">Run your national network<br/>on a single canvas.</h1>
            <p className="mt-4 max-w-md text-[14px] text-white/70">5 plants · 8 distribution centres · 590+ dealers · 600+ active SKUs. Simulate disruptions, predict equipment failures, catch defects before dispatch.</p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-[12px] text-white/80">
              <div><div className="text-[22px] font-bold text-teal">94.2%</div>Network fulfillment</div>
              <div><div className="text-[22px] font-bold text-teal">₹1.84 Cr</div>Savings YTD</div>
              <div><div className="text-[22px] font-bold text-teal">248 hrs</div>Downtime avoided</div>
            </div>
          </div>
          <div className="text-[11px] text-white/40">SleepNet Industries Pvt Ltd · v4.2.1</div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-teal text-teal-foreground font-bold">S</div>
            <div className="text-[16px] font-semibold">SleepNet Command</div>
          </div>
          <h2 className="text-[22px] font-bold">Sign in</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">Continue to your supply chain control tower.</p>

          <div className="mt-5 space-y-3">
            <div>
              <label className="text-[12px] font-medium">Email</label>
              <input defaultValue="cs.head@sleepnet.in" className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-[13px]" />
            </div>
            <div>
              <label className="text-[12px] font-medium">Password</label>
              <input type="password" defaultValue="••••••••" className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-[13px]" />
            </div>
            <div>
              <label className="text-[12px] font-medium">Sign in as (demo)</label>
              <div className="mt-1 space-y-2">
                {ROLES.map((r) => (
                  <button key={r.id} onClick={() => setRole(r.id)}
                    className={`flex w-full items-start gap-3 rounded-md border p-2.5 text-left transition ${role === r.id ? "border-teal bg-teal/5" : "border-border hover:bg-panel"}`}>
                    <div className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 ${role === r.id ? "border-teal bg-teal" : "border-border"}`} />
                    <div>
                      <div className="text-[13px] font-medium">{r.label}</div>
                      <div className="text-[11.5px] text-muted-foreground">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Btn variant="primary" className="mt-2 w-full" onClick={() => nav({ to: "/" })}>
              <ShieldCheck size={14} /> Sign in securely
            </Btn>
            <div className="text-center text-[11.5px] text-muted-foreground">SSO via Okta available · Help: it.support@sleepnet.in</div>
          </div>
        </div>
      </div>
    </div>
  );
}

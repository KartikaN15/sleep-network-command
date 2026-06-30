import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Network, GitBranch, Scale, History, Boxes, Repeat, AlertTriangle,
  ShoppingCart, Cog, Wrench, Calendar, Camera, Truck, Gauge, Route as RouteIcon,
  BarChart3, FileText, MapPin, Users, PlugZap, BellRing, ChevronLeft, ChevronRight,
  ChevronDown, Search, Bell, Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: any; badge?: number };
type NavGroup = { label: string; icon: any; items: NavItem[] };

const NAV: NavGroup[] = [
  { label: "Dashboard", icon: LayoutDashboard, items: [
    { to: "/", label: "Network Overview", icon: LayoutDashboard },
  ]},
  { label: "Network Simulator", icon: Network, items: [
    { to: "/network/map", label: "Live Network Map", icon: Network },
    { to: "/network/scenarios", label: "Scenario Builder", icon: GitBranch },
    { to: "/network/compare", label: "Scenario Comparison", icon: Scale },
    { to: "/network/playback", label: "Disruption Playback", icon: History },
  ]},
  { label: "Inventory & Fulfillment", icon: Boxes, items: [
    { to: "/inventory/stock", label: "Multi-Location Stock", icon: Boxes },
    { to: "/inventory/orders", label: "Omnichannel Order Sync", icon: ShoppingCart },
    { to: "/inventory/transfers", label: "Transfer Recommendations", icon: Repeat },
    { to: "/inventory/alerts", label: "Stockout & Overstock Alerts", icon: AlertTriangle, badge: 11 },
  ]},
  { label: "Plant Operations", icon: Cog, items: [
    { to: "/plant/equipment", label: "Equipment Health Monitor", icon: Gauge },
    { to: "/plant/maintenance", label: "Predictive Maintenance Queue", icon: Wrench, badge: 5 },
    { to: "/plant/production", label: "Production Schedule", icon: Calendar },
    { to: "/plant/quality", label: "Quality Inspection", icon: Camera },
  ]},
  { label: "Logistics & Freight", icon: Truck, items: [
    { to: "/logistics/shipments", label: "Shipment Tracking", icon: Truck },
    { to: "/logistics/carriers", label: "Carrier & Lane Performance", icon: Gauge },
    { to: "/logistics/routes", label: "Route Optimization", icon: RouteIcon },
  ]},
  { label: "Analytics & Reports", icon: BarChart3, items: [
    { to: "/analytics/intelligence", label: "Network Intelligence", icon: BarChart3 },
    { to: "/analytics/cost", label: "Cost-to-Serve Analysis", icon: BarChart3 },
    { to: "/analytics/reports", label: "Custom Reports", icon: FileText },
  ]},
  { label: "Settings", icon: Cog, items: [
    { to: "/settings/locations", label: "Locations & Nodes", icon: MapPin },
    { to: "/settings/users", label: "Users & Roles", icon: Users },
    { to: "/settings/integrations", label: "Integrations", icon: PlugZap },
    { to: "/settings/alerts", label: "Alert Configuration", icon: BellRing },
  ]},
];

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(NAV.map((g) => [g.label, true]))
  );

  return (
    <aside
      className={cn(
        "flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-teal text-teal-foreground font-bold">
          S
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">SleepNet Command</div>
            <div className="truncate text-[10px] text-sidebar-muted">Logistics Network Simulator</div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="rounded p-1 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {NAV.map((group) => {
          const isOpen = openGroups[group.label];
          return (
            <div key={group.label} className="mb-1">
              {!collapsed && (
                <button
                  onClick={() => setOpenGroups((p) => ({ ...p, [group.label]: !p[group.label] }))}
                  className="flex w-full items-center justify-between px-2 py-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-sidebar-muted hover:text-sidebar-foreground"
                >
                  <span>{group.label}</span>
                  <ChevronDown size={12} className={cn("transition-transform", !isOpen && "-rotate-90")} />
                </button>
              )}
              {(isOpen || collapsed) && (
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = pathname === item.to;
                    const Icon = item.icon;
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className={cn(
                            "group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition-colors",
                            active
                              ? "bg-teal text-teal-foreground font-medium"
                              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                          )}
                          title={collapsed ? item.label : undefined}
                        >
                          <Icon size={16} className="shrink-0" />
                          {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                          {!collapsed && item.badge !== undefined && (
                            <span className={cn(
                              "rounded-full px-1.5 text-[10px] font-bold leading-[18px]",
                              active ? "bg-white/25 text-white" : "bg-critical text-critical-foreground"
                            )}>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="border-t border-sidebar-border p-3 text-[10px] text-sidebar-muted">
          <div className="flex items-center gap-2">
            <Building2 size={12} />
            <span>SleepNet Industries Pvt Ltd</span>
          </div>
          <div className="mt-1">v4.2.1 · 5 plants · 8 DCs</div>
        </div>
      )}
    </aside>
  );
}

function buildCrumbs(pathname: string) {
  if (pathname === "/") return [{ label: "Network Overview" }];
  const parts = pathname.split("/").filter(Boolean);
  const map: Record<string, string> = {
    network: "Network Simulator", map: "Live Network Map", scenarios: "Scenario Builder",
    compare: "Scenario Comparison", playback: "Disruption Playback",
    inventory: "Inventory & Fulfillment", stock: "Multi-Location Stock",
    orders: "Omnichannel Order Sync", transfers: "Transfer Recommendations",
    alerts: "Stockout & Overstock Alerts", plant: "Plant Operations",
    equipment: "Equipment Health Monitor", maintenance: "Predictive Maintenance Queue",
    production: "Production Schedule", quality: "Quality Inspection",
    logistics: "Logistics & Freight", shipments: "Shipment Tracking",
    carriers: "Carrier & Lane Performance", routes: "Route Optimization",
    analytics: "Analytics & Reports", intelligence: "Network Intelligence",
    cost: "Cost-to-Serve Analysis", reports: "Custom Reports",
    settings: "Settings", locations: "Locations & Nodes", users: "Users & Roles",
    integrations: "Integrations",
  };
  return parts.map((p) => ({ label: map[p] || p }));
}

export function AppHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const crumbs = buildCrumbs(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-border bg-background px-6">
      <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
        <span className="text-primary font-medium">SleepNet</span>
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="text-muted-foreground/50">/</span>
            <span className={i === crumbs.length - 1 ? "text-foreground font-medium" : ""}>{c.label}</span>
          </span>
        ))}
      </div>

      <div className="relative ml-auto hidden md:block">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search SKU, order, machine, lane…"
          className="h-9 w-80 rounded-md border border-input bg-panel pl-8 pr-3 text-[13px] outline-none focus:border-ring"
        />
      </div>

      <button className="relative rounded-md p-2 hover:bg-panel" aria-label="Notifications">
        <Bell size={16} />
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-critical" />
      </button>

      <div className="flex items-center gap-2.5 rounded-md border border-border bg-panel py-1 pl-1 pr-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-[11px] font-semibold">CR</div>
        <div className="leading-tight">
          <div className="text-[12.5px] font-medium">Chandrashekar R.</div>
          <div className="text-[10px] text-muted-foreground">Supply Chain Head</div>
        </div>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-panel">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1500px] p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

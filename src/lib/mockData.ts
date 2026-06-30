// Logistic Command — mock dataset for the prototype.
// All values are illustrative for a national mattress & sleep-solutions manufacturer.

export type Status = "healthy" | "warning" | "critical";

export const PLANTS = [
  { id: "hosur", name: "Hosur Plant", region: "South", x: 360, y: 470, capacity: 2400, throughput: 2210, health: "healthy" as Status },
  { id: "karimangalam", name: "Karimangalam Plant", region: "South", x: 380, y: 445, capacity: 1800, throughput: 1690, health: "healthy" as Status },
  { id: "hyderabad", name: "Hyderabad Unit", region: "South", x: 360, y: 360, capacity: 1500, throughput: 1320, health: "warning" as Status },
  { id: "bhiwandi", name: "Bhiwandi Unit", region: "West", x: 245, y: 350, capacity: 2100, throughput: 1985, health: "healthy" as Status },
  { id: "indore", name: "Indore Plant", region: "Central", x: 310, y: 280, capacity: 1600, throughput: 1180, health: "warning" as Status },
];

export const WAREHOUSES = [
  { id: "dc-bengaluru", name: "Bengaluru DC", region: "South", x: 365, y: 500, stockValue: 182, daysCover: 9, health: "warning" as Status },
  { id: "dc-chennai", name: "Chennai DC", region: "South", x: 420, y: 490, stockValue: 154, daysCover: 12, health: "healthy" as Status },
  { id: "dc-mumbai", name: "Mumbai DC", region: "West", x: 240, y: 360, stockValue: 221, daysCover: 14, health: "healthy" as Status },
  { id: "dc-pune", name: "Pune DC", region: "West", x: 270, y: 380, stockValue: 138, daysCover: 7, health: "warning" as Status },
  { id: "dc-delhi", name: "Delhi DC", region: "North", x: 330, y: 175, stockValue: 246, daysCover: 11, health: "healthy" as Status },
  { id: "dc-jaipur", name: "Jaipur DC", region: "North", x: 295, y: 210, stockValue: 96, daysCover: 5, health: "critical" as Status },
  { id: "dc-kolkata", name: "Kolkata DC", region: "East", x: 525, y: 290, stockValue: 132, daysCover: 10, health: "healthy" as Status },
  { id: "dc-guwahati", name: "Guwahati DC", region: "East", x: 600, y: 245, stockValue: 64, daysCover: 4, health: "critical" as Status },
];

export const DEALER_HUBS = [
  { id: "hub-south", name: "South Dealer Hub", x: 410, y: 530, count: 184 },
  { id: "hub-west", name: "West Dealer Hub", x: 215, y: 395, count: 142 },
  { id: "hub-north", name: "North Dealer Hub", x: 355, y: 150, count: 168 },
  { id: "hub-east", name: "East Dealer Hub", x: 560, y: 320, count: 96 },
];

export type LaneStatus = "flowing" | "delayed" | "disrupted";
export const LANES: { from: string; to: string; status: LaneStatus; carrier: string; transitDays: number; onTime: number; shipments: number }[] = [
  { from: "hosur", to: "dc-bengaluru", status: "flowing", carrier: "In-house Fleet", transitDays: 1, onTime: 96, shipments: 42 },
  { from: "hosur", to: "dc-chennai", status: "delayed", carrier: "Delhivery", transitDays: 2, onTime: 84, shipments: 31 },
  { from: "karimangalam", to: "dc-bengaluru", status: "flowing", carrier: "In-house Fleet", transitDays: 1, onTime: 94, shipments: 28 },
  { from: "hyderabad", to: "dc-chennai", status: "flowing", carrier: "Safexpress", transitDays: 2, onTime: 91, shipments: 24 },
  { from: "hyderabad", to: "dc-bengaluru", status: "flowing", carrier: "DTDC", transitDays: 2, onTime: 89, shipments: 19 },
  { from: "bhiwandi", to: "dc-mumbai", status: "flowing", carrier: "In-house Fleet", transitDays: 1, onTime: 97, shipments: 56 },
  { from: "bhiwandi", to: "dc-pune", status: "flowing", carrier: "Blue Dart", transitDays: 1, onTime: 95, shipments: 33 },
  { from: "indore", to: "dc-jaipur", status: "disrupted", carrier: "Safexpress", transitDays: 3, onTime: 62, shipments: 14 },
  { from: "indore", to: "dc-delhi", status: "delayed", carrier: "Delhivery", transitDays: 3, onTime: 78, shipments: 22 },
  { from: "bhiwandi", to: "dc-delhi", status: "flowing", carrier: "Safexpress", transitDays: 4, onTime: 90, shipments: 18 },
  { from: "hyderabad", to: "dc-kolkata", status: "flowing", carrier: "DTDC", transitDays: 5, onTime: 86, shipments: 11 },
  { from: "dc-kolkata", to: "dc-guwahati", status: "disrupted", carrier: "Blue Dart", transitDays: 3, onTime: 58, shipments: 7 },
];

export const KPI = {
  fulfillmentRate: 94.2,
  fulfillmentDelta: 1.1,
  inventoryRisk: 11,
  equipmentHealth: 82,
  shipmentsInTransit: 1340,
  shipmentsValueCr: 6.8,
  onTimeDelivery: 88.6,
  onTimeTarget: 92,
};

export const FULFILLMENT_TREND = [
  { week: "W1", "Experience Centre": 96, Dealer: 89, Online: 91, total: 92 },
  { week: "W2", "Experience Centre": 95, Dealer: 88, Online: 90, total: 91 },
  { week: "W3", "Experience Centre": 97, Dealer: 90, Online: 92, total: 93 },
  { week: "W4", "Experience Centre": 96, Dealer: 87, Online: 89, total: 91 },
  { week: "W5", "Experience Centre": 95, Dealer: 88, Online: 90, total: 91 },
  { week: "W6", "Experience Centre": 97, Dealer: 91, Online: 93, total: 94 },
  { week: "W7", "Experience Centre": 98, Dealer: 92, Online: 94, total: 95 },
  { week: "W8", "Experience Centre": 96, Dealer: 90, Online: 92, total: 93 },
  { week: "W9", "Experience Centre": 95, Dealer: 89, Online: 91, total: 92 },
  { week: "W10", "Experience Centre": 96, Dealer: 88, Online: 90, total: 91 },
  { week: "W11", "Experience Centre": 97, Dealer: 89, Online: 92, total: 93 },
  { week: "W12", "Experience Centre": 96, Dealer: 89, Online: 91, total: 94 },
];

export const EQUIPMENT_ALERTS = [
  { machine: "Foaming Line #2", plant: "Hosur", days: 4, confidence: 92, mode: "Mixer bearing wear" },
  { machine: "Spring Coiler #5", plant: "Karimangalam", days: 7, confidence: 88, mode: "Drive belt fatigue" },
  { machine: "Quilting Machine #3", plant: "Bhiwandi", days: 9, confidence: 81, mode: "Needle plate misalignment" },
  { machine: "Cutting Table #1", plant: "Hyderabad", days: 12, confidence: 76, mode: "Blade deflection" },
  { machine: "Foaming Line #4", plant: "Indore", days: 14, confidence: 73, mode: "Temperature controller drift" },
];

export const INVENTORY_ALERTS = [
  { sku: "SPR-Q-7500", name: "OrthoCloud Spring Queen", location: "Jaipur DC", daysCover: 2.1, type: "critical" as const, action: "Transfer 60 units from Delhi DC" },
  { sku: "FM-K-3200", name: "MemoryFlex King", location: "Guwahati DC", daysCover: 2.8, type: "critical" as const, action: "Transfer 40 units from Kolkata DC" },
  { sku: "CR-S-1100", name: "EcoRest Coir Single", location: "Pune DC", daysCover: 4.0, type: "warning" as const, action: "Production order at Bhiwandi" },
  { sku: "PL-MF-001", name: "Cervical Memory Foam Pillow", location: "Bengaluru DC", daysCover: 5.2, type: "warning" as const, action: "Transfer 200 units from Hosur" },
  { sku: "MT-PR-Q", name: "Mattress Protector Queen", location: "Chennai DC", daysCover: 6.0, type: "warning" as const, action: "Top-up production run" },
  { sku: "FM-Q-2100", name: "DreamSoft Foam Queen", location: "Mumbai DC", daysCover: 84, type: "overstock" as const, action: "Markdown promo / channel push" },
  { sku: "TP-K-001", name: "Premium Topper King", location: "Delhi DC", daysCover: 96, type: "overstock" as const, action: "Reroute next production batch" },
];

export const ACTIVE_DISRUPTIONS = [
  { id: "d-1", title: "Hosur → Bengaluru lane delayed", cause: "Heavy rainfall, NH-44", impact: "42 shipments delayed avg 6h", affectedOrders: 218, severity: "warning" as Status },
  { id: "d-2", title: "Indore → Jaipur disrupted", cause: "Carrier truck breakdown", impact: "Lane on-time dropped to 62%", affectedOrders: 84, severity: "critical" as Status },
  { id: "d-3", title: "Kolkata → Guwahati halted", cause: "Bridge inspection NH-27", impact: "DC stock-out risk in 4 days", affectedOrders: 61, severity: "critical" as Status },
];

// ---- Inventory SKUs ----
const sizes = ["Single", "Queen", "King"] as const;
const categories = [
  { code: "SPR", name: "Spring Mattress", series: ["OrthoCloud", "PostureLine", "EuroTop"] },
  { code: "FM", name: "Foam Mattress", series: ["DreamSoft", "MemoryFlex", "CoolGel"] },
  { code: "CR", name: "Coir Mattress", series: ["EcoRest", "NaturalFirm"] },
  { code: "PL", name: "Pillow", series: ["Cervical MF", "Microfiber", "Latex"] },
  { code: "MT", name: "Protector", series: ["Waterproof", "Terry"] },
  { code: "TP", name: "Topper", series: ["Premium", "Plush"] },
];

function rand(seed: number) {
  // deterministic pseudo-random
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const SKUS = (() => {
  const rows: {
    sku: string; name: string; category: string; uom: string;
    plantStock: number; dcStock: number; total: number;
    reorder: number; safety: number; cost: number; value: number;
    status: Status; location: string;
  }[] = [];
  let i = 0;
  categories.forEach((c) => {
    c.series.forEach((s) => {
      sizes.forEach((sz) => {
        i++;
        const plantStock = Math.floor(rand(i) * 220 + 30);
        const dcStock = Math.floor(rand(i + 100) * 180 + 20);
        const total = plantStock + dcStock;
        const reorder = 80 + Math.floor(rand(i + 200) * 60);
        const safety = 40 + Math.floor(rand(i + 300) * 40);
        const cost = Math.floor((c.code === "SPR" ? 9500 : c.code === "FM" ? 7800 : c.code === "CR" ? 5200 : c.code === "PL" ? 480 : c.code === "MT" ? 620 : 2100) * (sz === "King" ? 1.4 : sz === "Queen" ? 1.15 : 1));
        const value = total * cost;
        const status: Status = total < safety ? "critical" : total < reorder ? "warning" : "healthy";
        rows.push({
          sku: `${c.code}-${sz[0]}-${(7000 + i).toString().slice(-4)}`,
          name: `${s} ${c.name} ${sz}`,
          category: c.name,
          uom: c.code === "PL" || c.code === "MT" ? "PCS" : "UNIT",
          plantStock, dcStock, total, reorder, safety, cost, value, status,
          location: ["Hosur", "Karimangalam", "Bhiwandi", "Indore", "Hyderabad"][i % 5] + " Plant",
        });
      });
    });
  });
  return rows;
})();

// ---- Orders ----
const channels = ["Experience Centre", "Dealer", "Online"] as const;
const cities = ["Bengaluru","Chennai","Hyderabad","Mumbai","Pune","Delhi","Jaipur","Kolkata","Guwahati","Ahmedabad","Lucknow","Surat","Indore","Coimbatore","Kochi"];
const orderStatuses = ["Processing","Dispatched","In Transit","Delivered","Delayed"] as const;
export const ORDERS = Array.from({ length: 60 }, (_, i) => {
  const ch = channels[i % 3];
  const st = orderStatuses[(i * 3) % orderStatuses.length];
  const sku = SKUS[i % SKUS.length];
  const qty = ch === "Dealer" ? 8 + (i % 24) : 1 + (i % 3);
  const dueIn = ((i * 7) % 12) - 4;
  return {
    id: `SO-${(28400 + i).toString()}`,
    channel: ch,
    product: sku.name,
    qty,
    source: ["Hosur Plant","Bhiwandi Unit","Karimangalam Plant","Bengaluru DC","Mumbai DC","Delhi DC"][i % 6],
    city: cities[i % cities.length],
    promised: new Date(Date.now() + dueIn * 86400000).toISOString().slice(0,10),
    status: st,
    daysToPromise: dueIn,
    value: sku.cost * qty,
  };
});

// ---- Transfer recommendations ----
export const TRANSFERS = [
  { material: "OrthoCloud Spring Queen", from: "Delhi DC", to: "Jaipur DC", qty: 60, reason: "Destination below safety in 4 days", transit: "1 day", costSave: "₹38,000", priority: "High" },
  { material: "MemoryFlex King", from: "Kolkata DC", to: "Guwahati DC", qty: 40, reason: "Destination below safety in 3 days", transit: "2 days", costSave: "₹52,000", priority: "Critical" },
  { material: "Cervical MF Pillow", from: "Hosur Plant", to: "Bengaluru DC", qty: 200, reason: "Stockout in 5 days", transit: "1 day", costSave: "₹14,500", priority: "Medium" },
  { material: "EcoRest Coir Single", from: "Bhiwandi Unit", to: "Pune DC", qty: 80, reason: "Below reorder, demand spike", transit: "1 day", costSave: "₹9,800", priority: "Medium" },
  { material: "Waterproof Protector Q", from: "Karimangalam", to: "Chennai DC", qty: 150, reason: "Below safety stock in 6 days", transit: "2 days", costSave: "₹6,200", priority: "Medium" },
  { material: "PostureLine Spring King", from: "Hosur Plant", to: "Mumbai DC", qty: 30, reason: "Festive demand projection", transit: "3 days", costSave: "₹21,000", priority: "Low" },
];

export const IN_TRANSIT_TRANSFERS = [
  { material: "DreamSoft Foam Queen", from: "Bhiwandi", to: "Delhi DC", qty: 120, dispatch: "2026-06-27", eta: "2026-07-01" },
  { material: "CoolGel Foam King", from: "Hosur", to: "Chennai DC", qty: 70, dispatch: "2026-06-28", eta: "2026-06-30" },
  { material: "Microfiber Pillow", from: "Karimangalam", to: "Bengaluru DC", qty: 480, dispatch: "2026-06-29", eta: "2026-06-30" },
];

// ---- Equipment ----
export const MACHINES = [
  { id: "FL-H-2", name: "Foaming Line #2", plant: "Hosur", type: "Foaming", health: 58, vibration: 7.2, temp: 78, runtime: 1240, status: "critical" as Status },
  { id: "SC-K-5", name: "Spring Coiler #5", plant: "Karimangalam", type: "Coiling", health: 67, vibration: 5.8, temp: 64, runtime: 980, status: "warning" as Status },
  { id: "QM-B-3", name: "Quilting Machine #3", plant: "Bhiwandi", type: "Quilting", health: 71, vibration: 4.4, temp: 58, runtime: 720, status: "warning" as Status },
  { id: "CT-Hy-1", name: "Cutting Table #1", plant: "Hyderabad", type: "Cutting", health: 74, vibration: 3.9, temp: 52, runtime: 640, status: "warning" as Status },
  { id: "FL-I-4", name: "Foaming Line #4", plant: "Indore", type: "Foaming", health: 78, vibration: 3.6, temp: 61, runtime: 1080, status: "warning" as Status },
  { id: "FL-H-1", name: "Foaming Line #1", plant: "Hosur", type: "Foaming", health: 92, vibration: 2.1, temp: 54, runtime: 410, status: "healthy" as Status },
  { id: "SC-K-3", name: "Spring Coiler #3", plant: "Karimangalam", type: "Coiling", health: 89, vibration: 2.4, temp: 56, runtime: 520, status: "healthy" as Status },
  { id: "QM-B-1", name: "Quilting Machine #1", plant: "Bhiwandi", type: "Quilting", health: 95, vibration: 1.8, temp: 49, runtime: 280, status: "healthy" as Status },
  { id: "CT-Hy-3", name: "Cutting Table #3", plant: "Hyderabad", type: "Cutting", health: 86, vibration: 2.6, temp: 53, runtime: 590, status: "healthy" as Status },
  { id: "FL-I-2", name: "Foaming Line #2", plant: "Indore", type: "Foaming", health: 81, vibration: 3.2, temp: 60, runtime: 890, status: "healthy" as Status },
  { id: "QM-H-2", name: "Quilting Machine #2", plant: "Hosur", type: "Quilting", health: 84, vibration: 2.9, temp: 55, runtime: 510, status: "healthy" as Status },
  { id: "SC-Hy-1", name: "Spring Coiler #1", plant: "Hyderabad", type: "Coiling", health: 88, vibration: 2.3, temp: 57, runtime: 460, status: "healthy" as Status },
];

export const MACHINE_TREND = Array.from({ length: 30 }, (_, i) => ({
  day: `D-${30 - i}`,
  vibration: +(2 + Math.sin(i / 3) * 0.8 + (i > 22 ? (i - 22) * 0.6 : 0) + rand(i) * 0.4).toFixed(2),
  temperature: +(50 + Math.cos(i / 4) * 3 + (i > 24 ? (i - 24) * 2.5 : 0) + rand(i + 9) * 1.2).toFixed(1),
}));

export const MAINTENANCE_QUEUE = [
  { id: "WO-PM-2041", machine: "Foaming Line #2", plant: "Hosur", window: "Within 4 days", confidence: 92, mode: "Mixer bearing wear", action: "Replace shaft bearing assembly", downtime: "14 hrs", status: "New" },
  { id: "WO-PM-2042", machine: "Spring Coiler #5", plant: "Karimangalam", window: "Within 7 days", confidence: 88, mode: "Drive belt fatigue", action: "Replace primary drive belt", downtime: "6 hrs", status: "Work Order Created" },
  { id: "WO-PM-2043", machine: "Quilting Machine #3", plant: "Bhiwandi", window: "Within 9 days", confidence: 81, mode: "Needle plate misalignment", action: "Realign + recalibrate", downtime: "4 hrs", status: "Scheduled" },
  { id: "WO-PM-2044", machine: "Cutting Table #1", plant: "Hyderabad", window: "Within 12 days", confidence: 76, mode: "Blade deflection", action: "Replace blade + tension recheck", downtime: "3 hrs", status: "New" },
  { id: "WO-PM-2045", machine: "Foaming Line #4", plant: "Indore", window: "Within 14 days", confidence: 73, mode: "Temperature controller drift", action: "Recalibrate PID controller", downtime: "5 hrs", status: "New" },
];

// ---- Production schedule ----
export const PRODUCTION = (() => {
  const cats = ["Spring", "Foam", "Coir"] as const;
  const plants = ["Hosur", "Karimangalam", "Bhiwandi", "Hyderabad", "Indore"];
  const linesPerPlant = 4;
  const skuByCat: Record<string, string[]> = {
    Spring: ["OrthoCloud", "PostureSpring", "BackCare"],
    Foam: ["MemoryFlex", "CoolGel", "DreamSoft"],
    Coir: ["EcoRest", "NatureCoir", "FirmCore"],
  };
  const sizes = ["Queen", "King", "Single", "Double"];
  const matStatuses = ["Ready", "Ready", "Ready", "Partial", "Awaiting"] as const;
  const eqStatuses = ["OK", "OK", "OK", "Watch"] as const;
  const statuses = ["Scheduled", "In Progress", "Queued"] as const;

  const out: Array<{
    id: string; product: string; plant: string; line: string;
    batch: number; start: number; duration: number; category: string;
    materialStatus: (typeof matStatuses)[number];
    equipmentStatus: (typeof eqStatuses)[number];
    status: (typeof statuses)[number];
  }> = [];

  let wo = 40120;
  let k = 0;
  plants.forEach((plant, pi) => {
    for (let l = 1; l <= linesPerPlant; l++) {
      // Each line gets a back-to-back chain of work orders across ~90 days.
      let day = (pi + l) % 4; // small per-line stagger so starts don't all align
      while (day < 90) {
        const cat = cats[k % 3];
        const skus = skuByCat[cat];
        const duration = 3 + (k % 5); // 3-7 days
        out.push({
          id: `WO-${wo++}`,
          product: `${cat} ${sizes[k % sizes.length]} - ${skus[k % skus.length]}`,
          plant,
          line: `Line ${l}`,
          batch: 120 + ((k * 37) % 320),
          start: day,
          duration,
          category: cat,
          materialStatus: matStatuses[k % matStatuses.length],
          equipmentStatus: eqStatuses[k % eqStatuses.length],
          status: statuses[k % statuses.length],
        });
        const gap = 1; // fixed 1-day changeover gap between runs — keeps lines near-continuous & easy to read
        day += duration + gap;
        k++;
      }
    }
  });
  return out;
})();

// ---- Quality ----
export const QUALITY_DEFECTS = [
  { type: "Foam density inconsistency", count: 38 },
  { type: "Stitching defect", count: 27 },
  { type: "Fabric flaw", count: 18 },
  { type: "Spring assembly fault", count: 9 },
  { type: "Label/packaging", count: 4 },
];

export const QUALITY_FEED = Array.from({ length: 18 }, (_, i) => ({
  batch: `B-${(56210 + i)}`,
  product: ["OrthoCloud Q","MemoryFlex K","DreamSoft Q","EcoRest S","CoolGel K"][i % 5],
  plant: ["Hosur","Karimangalam","Bhiwandi","Hyderabad","Indore"][i % 5],
  stage: i % 3 === 0 ? "Pre-dispatch" : "In-line",
  defect: i % 5 === 0,
  defectType: i % 5 === 0 ? ["Foam density","Stitching","Fabric flaw","Spring fault"][i % 4] : "—",
  confidence: 88 + (i % 11),
  disposition: i % 5 === 0 ? (i % 10 === 0 ? "Reject" : "Hold for Review") : "Pass",
  inspector: i % 7 === 0 ? "Human override" : "AI",
  time: `${10 + (i % 8)}:${(i * 7) % 60 < 10 ? "0" + ((i * 7) % 60) : (i * 7) % 60}`,
}));

export const SUPPLIER_SCORECARD = [
  { name: "Sleepwell Fabrics", item: "Knit Fabric", score: 94, defectRate: 0.6, trend: "stable" },
  { name: "Polyurethane Industries", item: "Foam Chemicals (TDI)", score: 88, defectRate: 1.4, trend: "down" },
  { name: "Bharat Springs Co.", item: "Bonnell Springs", score: 91, defectRate: 0.9, trend: "up" },
  { name: "Coimbatore Coir Mills", item: "Coir Sheets", score: 79, defectRate: 2.8, trend: "down", flag: true },
  { name: "Royal Textiles", item: "Quilting Thread", score: 96, defectRate: 0.3, trend: "stable" },
];

// ---- Shipments ----
const carriers = ["Delhivery", "Blue Dart", "DTDC", "Safexpress", "In-house Fleet"];
const shipmentStatuses = ["Dispatched","In Transit","Out for Delivery","Delivered","Delayed","Exception"] as const;
export const SHIPMENTS = Array.from({ length: 40 }, (_, i) => {
  const orig = ["Hosur Plant","Bhiwandi Unit","Karimangalam Plant","Indore Plant","Hyderabad Unit"][i % 5];
  const dest = ["Bengaluru DC","Chennai DC","Mumbai DC","Pune DC","Delhi DC","Jaipur DC","Kolkata DC","Guwahati DC"][i % 8];
  return {
    id: `SH-${(91200 + i)}`,
    origin: orig,
    dest,
    carrier: carriers[i % carriers.length],
    dispatched: `2026-06-${22 + (i % 8)}`,
    eta: `2026-07-${1 + (i % 6)}`,
    status: shipmentStatuses[i % shipmentStatuses.length],
    lastScan: ["NH-44 Toll, Hosur","Pune Bypass","Delhi Hub","Bengaluru Hub","Indore Loading","Kolkata Hub"][i % 6],
    delayReason: shipmentStatuses[i % shipmentStatuses.length] === "Delayed" ? "Weather / traffic" : "",
  };
});

// ---- Carrier perf ----
export const CARRIER_SCORECARD = [
  { name: "In-house Fleet", volume: 1840, onTime: 96.4, cost: 2.8, damage: 0.3, score: 95 },
  { name: "Delhivery", volume: 1320, onTime: 89.2, cost: 3.4, damage: 0.9, score: 87 },
  { name: "Blue Dart", volume: 980, onTime: 92.1, cost: 4.1, damage: 0.6, score: 90 },
  { name: "DTDC", volume: 740, onTime: 86.5, cost: 3.0, damage: 1.2, score: 82 },
  { name: "Safexpress", volume: 1110, onTime: 84.2, cost: 2.6, damage: 1.5, score: 79 },
];

export const LANE_COST_TREND = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun"][i],
  Hosur_Bengaluru: 3.2 + Math.sin(i / 2) * 0.2,
  Bhiwandi_Delhi: 4.8 + Math.cos(i / 3) * 0.3,
  Hyderabad_Chennai: 3.6 + Math.sin(i / 4) * 0.15,
  Indore_Mumbai: 4.1 + Math.cos(i / 2) * 0.25,
}));

// ---- Route opt ----
export const ROUTE_RECS = [
  { lane: "Hosur → Chennai", current: "Delhivery, road", recommended: "In-house, road", save: "₹38L/yr", transit: "-0.4 days", confidence: 88, status: "New" },
  { lane: "Indore → Delhi", current: "Delhivery", recommended: "Safexpress", save: "₹22L/yr", transit: "+0.2 days", confidence: 81, status: "Under Review" },
  { lane: "Bhiwandi → Kolkata", current: "DTDC", recommended: "Multi-modal (rail+road)", save: "₹61L/yr", transit: "-0.8 days", confidence: 92, status: "Approved" },
  { lane: "Karimangalam → Bengaluru", current: "Blue Dart", recommended: "In-house Fleet", save: "₹16L/yr", transit: "0", confidence: 84, status: "New" },
  { lane: "Hyderabad → Mumbai", current: "Safexpress", recommended: "Blue Dart", save: "₹9L/yr", transit: "-0.3 days", confidence: 76, status: "Rejected" },
];

// ---- Analytics dashboards ----
export const FULFILL_REGION = [
  { name: "South", value: 96, fill: "var(--success)" },
  { name: "West", value: 93, fill: "var(--teal)" },
  { name: "North", value: 91, fill: "var(--warning)" },
  { name: "East", value: 87, fill: "var(--critical)" },
];
export const COST_BY_CHANNEL = [
  { channel: "Experience Centre", cost: 412 },
  { channel: "Dealer", cost: 286 },
  { channel: "Online", cost: 358 },
];
export const RESILIENCE_TREND = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun"][i],
  score: 68 + i * 1.6 + Math.sin(i) * 1.5,
}));

export const SAVED_SCENARIOS = [
  { id: "sc-1", name: "Hosur Foam Line Down, 3 Days", fulfillImpact: -8.4, costImpact: 38, orders: 2200, recoveryDays: 6, risk: "High" },
  { id: "sc-2", name: "Add Pune Warehouse", fulfillImpact: +2.1, costImpact: -52, orders: 0, recoveryDays: 0, risk: "Low" },
  { id: "sc-3", name: "Festive Demand +40% West", fulfillImpact: -3.2, costImpact: 27, orders: 1400, recoveryDays: 4, risk: "Medium" },
  { id: "sc-4", name: "Switch Bhiwandi→Delhi to Rail", fulfillImpact: +0.5, costImpact: -61, orders: 0, recoveryDays: 0, risk: "Low" },
];

export const PAST_DISRUPTIONS = [
  { id: "pd-1", title: "Monsoon flooding, Bhiwandi unit, Jul 2025", days: 7 },
  { id: "pd-2", title: "Karimangalam machine failure, Feb 2026", days: 4 },
  { id: "pd-3", title: "Truckers' strike, North corridor, Sep 2025", days: 5 },
];

export const INTEGRATIONS = [
  { name: "SAP ERP", purpose: "Production, inventory & finance sync", status: "Active", last: "8 min ago" },
  { name: "Tally Prime", purpose: "Accounting sync", status: "Active", last: "15 min ago" },
  { name: "Carrier APIs (Delhivery, Blue Dart, DTDC, In-house)", purpose: "Shipment tracking sync", status: "Active", last: "3 min ago" },
  { name: "E-commerce Platform", purpose: "Online order intake", status: "Active", last: "5 min ago" },
  { name: "IoT/Sensor Gateway", purpose: "Vibration & temperature telemetry", status: "Active", last: "Real-time" },
  { name: "QMS", purpose: "Computer vision inspection results", status: "Active", last: "Real-time" },
  { name: "Dealer Portal", purpose: "Channel partner order intake", status: "Degraded", last: "2 hours ago", warning: "9 records pending validation" },
  { name: "Email/SMS Gateway", purpose: "Alert notifications", status: "Active", last: "1 min ago" },
];

export const USERS_DATA = [
  { name: "Chandrashekar R.", role: "Supply Chain Head", email: "cs.head@logistics.in", status: "Active", lastLogin: "Just now" },
  { name: "Priya Menon", role: "Plant Operations", email: "priya.m@logistics.in", status: "Active", lastLogin: "12 min ago" },
  { name: "Arjun Iyer", role: "Warehouse Manager", email: "arjun.i@logistics.in", status: "Active", lastLogin: "1 hr ago" },
  { name: "Neha Sharma", role: "Warehouse Manager", email: "neha.s@logistics.in", status: "Active", lastLogin: "Yesterday" },
  { name: "Rakesh Patel", role: "Plant Operations", email: "rakesh.p@logistics.in", status: "Active", lastLogin: "Yesterday" },
  { name: "Vikram Singh", role: "Supply Chain Head", email: "vikram.s@logistics.in", status: "Inactive", lastLogin: "12 days ago" },
];

export const ALERT_CONFIGS = [
  { event: "Stockout risk < 3 days", channel: "Email + SMS", recipients: "SC Head, Warehouse Manager", enabled: true },
  { event: "Equipment health < 70", channel: "Email + In-app", recipients: "Plant Operations", enabled: true },
  { event: "Lane disruption", channel: "In-app + SMS", recipients: "SC Head, Logistics", enabled: true },
  { event: "Quality defect rate > 3%", channel: "Email", recipients: "Plant Operations, QA Head", enabled: true },
  { event: "Overstock > 60 days cover", channel: "Email (weekly)", recipients: "SC Head", enabled: false },
  { event: "Carrier on-time < 80%", channel: "Email", recipients: "Logistics", enabled: true },
];

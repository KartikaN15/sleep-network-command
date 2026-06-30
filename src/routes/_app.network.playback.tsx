import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NetworkMap } from "@/components/NetworkMap";
import { Card, CardHeader, CardBody, PageTitle, Btn } from "@/components/ui-bits";
import { PAST_DISRUPTIONS } from "@/lib/mockData";
import { Play, Pause, RotateCcw } from "lucide-react";
import type { LaneStatus } from "@/lib/mockData";

export const Route = createFileRoute("/_app/network/playback")({
  component: PlaybackPage,
});

function PlaybackPage() {
  const [chosen, setChosen] = useState(PAST_DISRUPTIONS[0]);
  const [day, setDay] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setDay((d) => {
        if (d >= chosen.days) { setPlaying(false); return d; }
        return d + 1;
      });
    }, 700);
    return () => clearInterval(t);
  }, [playing, chosen]);

  // Stronger lane disruption as days progress
  const intensity = day / chosen.days;
  const laneOverride: Record<string, LaneStatus> = {
    "bhiwandi-dc-mumbai": intensity > 0.2 ? "disrupted" : "delayed",
    "bhiwandi-dc-pune": intensity > 0.2 ? "disrupted" : "delayed",
    "bhiwandi-dc-delhi": intensity > 0.4 ? "disrupted" : "delayed",
    "indore-dc-delhi": intensity > 0.5 ? "delayed" : "flowing",
    "hosur-dc-bengaluru": intensity > 0.7 ? "delayed" : "flowing",
  };

  return (
    <div>
      <PageTitle title="Disruption Playback" subtitle="Replay how a past real disruption cascaded across the network — day by day" />

      <Card className="mb-4">
        <CardBody>
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-[12.5px] font-medium">Disruption:</div>
            <select
              value={chosen.id}
              onChange={(e) => { setChosen(PAST_DISRUPTIONS.find((d) => d.id === e.target.value)!); setDay(0); setPlaying(false); }}
              className="h-9 rounded-md border border-input bg-background px-2 text-[12.5px]"
            >
              {PAST_DISRUPTIONS.map((d) => <option key={d.id} value={d.id}>{d.title}</option>)}
            </select>
            <Btn size="sm" variant="outline" onClick={() => setDay(0)}><RotateCcw size={12}/> Reset</Btn>
            <Btn size="sm" variant={playing ? "secondary" : "teal"} onClick={() => setPlaying((p) => !p)}>
              {playing ? <><Pause size={12}/> Pause</> : <><Play size={12}/> Play</>}
            </Btn>
            <div className="ml-2 flex flex-1 items-center gap-3">
              <span className="text-[11.5px] text-muted-foreground">Day</span>
              <input type="range" min={0} max={chosen.days} value={day} onChange={(e) => setDay(+e.target.value)} className="flex-1 accent-teal" />
              <span className="w-16 text-right text-[12px] tabular-nums">Day {day} / {chosen.days}</span>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Network state on day " subtitle={`Showing cascading effect as of day ${day} of the event`} />
          <CardBody className="p-0">
            <NetworkMap height={460} laneOverride={laneOverride} highlightNode={chosen.id === "pd-1" ? "bhiwandi" : chosen.id === "pd-2" ? "karimangalam" : "indore"} showLabels={false} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Outcome vs. simulator recommendation" />
          <CardBody className="space-y-3 text-[12.5px]">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">What actually happened</div>
              <ul className="mt-1 space-y-1">
                <li>• Orders delayed: <span className="font-semibold">3,140</span></li>
                <li>• Customer SLA misses: <span className="font-semibold">14%</span></li>
                <li>• Recovery time: <span className="font-semibold">{chosen.days + 4} days</span></li>
                <li>• Cost incurred: <span className="font-semibold">₹62L</span> (expedited freight + lost sales)</li>
              </ul>
            </div>
            <div className="border-t border-border pt-3">
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Simulator-recommended action at time of event</div>
              <p className="mt-1">Reroute South & West outbound to alternate plant within 12h, hold online channel allocation on top 6 SKUs, pre-position 14 truckloads from Hyderabad to Mumbai DC.</p>
            </div>
            <div className="rounded-md border border-success/30 bg-success/10 p-3">
              <div className="font-semibold text-success">Avoidable impact</div>
              <p className="mt-1 text-foreground/80">Simulator-recommended reroute would have reduced delayed orders by <span className="font-semibold">31%</span> and cost by <span className="font-semibold">₹19L</span>.</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

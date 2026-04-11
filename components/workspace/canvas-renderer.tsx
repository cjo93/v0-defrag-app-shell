"use client";

type Artifact = {
  id: string;
  kind:
    | "relational_map"
    | "family_system"
    | "timing_view"
    | "simulation"
    | "brief"
    | "educational"
    | "video_explainer";
  status: "queued" | "generating" | "ready" | "failed";
  title?: string;
  payload: any;
};

export function CanvasRenderer({ artifact }: { artifact: Artifact | null }) {
  if (!artifact) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Select or generate an artifact to view the relational field.
      </div>
    );
  }

  if (artifact.status === "queued" || artifact.status === "generating") {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        {artifact.status === "queued" ? "Queued…" : "Generating…"}
      </div>
    );
  }

  if (artifact.status === "failed") {
    return (
      <div className="flex h-full items-center justify-center text-sm text-destructive">
        Artifact failed to generate.
      </div>
    );
  }

  switch (artifact.kind) {
    case "relational_map":
      return <RelationalMap payload={artifact.payload} />;
    case "family_system":
      return <FamilySystemView payload={artifact.payload} />;
    case "timing_view":
      return <TimingView payload={artifact.payload} />;
    case "educational":
      return <EducationalView payload={artifact.payload} />;
    default:
      return <GenericArtifactView payload={artifact.payload} title={artifact.title} />;
  }
}

function RelationalMap({ payload }: { payload: any }) {
  const nodes = payload.nodes ?? [];
  const edges = payload.edges ?? [];

  return (
    <svg viewBox="0 0 600 300" className="h-full w-full">
      {edges.map((edge: any, i: number) => {
        const from = nodes.find((n: any) => n.id === edge.from);
        const to = nodes.find((n: any) => n.id === edge.to);
        if (!from || !to) return null;

        return (
          <g key={i}>
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              opacity="0.3"
            />
            <text
              x={(from.x + to.x) / 2}
              y={(from.y + to.y) / 2 - 8}
              textAnchor="middle"
              className="fill-current text-[10px]"
            >
              {edge.label}
            </text>
          </g>
        );
      })}
      {nodes.map((node: any) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r="28" fill="currentColor" opacity="0.08" />
          <circle cx={node.x} cy={node.y} r="18" fill="currentColor" opacity="0.2" />
          <text x={node.x} y={node.y + 44} textAnchor="middle" className="fill-current text-xs">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function FamilySystemView({ payload }: { payload: any }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">{payload.title ?? "Family system"}</h3>
      {(payload.members ?? []).map((m: any) => (
        <div key={m.id} className="rounded-xl border p-3 text-sm">
          {m.label}
        </div>
      ))}
    </div>
  );
}

function TimingView({ payload }: { payload: any }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">{payload.title ?? "Timing view"}</h3>
      {(payload.items ?? []).map((item: any, i: number) => (
        <div key={i} className="rounded-xl border p-3 text-sm">
          <div className="font-medium">{item.label}</div>
          <div className="text-muted-foreground">{item.level}</div>
        </div>
      ))}
    </div>
  );
}

function EducationalView({ payload }: { payload: any }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">{payload.title}</h3>
      <p className="text-sm text-muted-foreground">{payload.summary}</p>
    </div>
  );
}

function GenericArtifactView({
  payload,
  title,
}: {
  payload: any;
  title?: string;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">{title ?? "Artifact"}</h3>
      <pre className="overflow-auto rounded-xl border p-3 text-xs">
        {JSON.stringify(payload, null, 2)}
      </pre>
    </div>
  );
}



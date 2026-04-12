// Shared canvas types — single source of truth for workspace page and AICanvas component

export type CanvasKind = "chart" | "diagram" | "timeline" | "network" | "bowen" | "split-read" | "audio" | "educational" | "timing";

export type CanvasPayload = {
  title: string;
  content?: string;
  audioUrl?: string;
  slides?: { title: string; body: string }[];
  graphData?: {
    nodes: { id: string; label: string; pressure: "open" | "sensitive" | "elevated" }[];
    edges: { source: string; target: string; label?: string }[];
  };
  splitRead?: { userSide: string; theirSide: string; gap: string };
  timingState?: "open" | "sensitive" | "elevated";
  timingLabel?: string;
};

export type CanvasData = {
  type: CanvasKind;
  data: CanvasPayload;
};
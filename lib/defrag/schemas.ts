import { z } from "zod";

export const RationaleBlockSchema = z.object({
  label: z.string(),
  summary: z.string(),
  details: z.array(z.string()).default([]),
});

export const DefragStructuredResponseSchema = z.object({
  responseText: z.string(),
  relationalStatus: z.enum(["aligned", "diverging", "uncertain"]),
  // Core relational architecture fields (Event → Filter → Distortion → Defense → Outcome → Repair lever)
  event: z
    .object({
      description: z.string(),
      quote: z.string().optional(),
    })
    .optional(),
  filters: z.array(z.string()).default([]),
  distortions: z.array(z.string()).default([]),
  defenses: z.array(z.string()).default([]),
  outcome: z.string().optional(),
  repairLever: z.string().optional(),
  suggestedNextStep: z.string(),
  shouldOpenBranch: z.boolean().default(false),
  suggestedArtifact: z.enum([
    "none",
    "relational_map",
    "simulation",
    "timing_view",
    "family_system",
    "educational",
    "brief",
  ]),
  rationale: z.array(RationaleBlockSchema).default([]),
  rewrite: z.string().optional(),
  educationalLayer: z
    .object({
      title: z.string(),
      summary: z.string(),
      kind: z.enum([
        "psychological_dynamics",
        "coping",
        "emotional_processing",
        "healing",
        "generational_patterns",
        "communication_under_pressure",
      ]),
    })
    .nullable()
    .default(null),
});

export type DefragStructuredResponse = z.infer<
  typeof DefragStructuredResponseSchema
>;

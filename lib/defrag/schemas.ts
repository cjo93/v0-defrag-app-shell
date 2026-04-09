import { z } from "zod";

export const RationaleBlockSchema = z.object({
  label: z.string(),
  summary: z.string(),
  details: z.array(z.string()).default([]),
});

export const DefragStructuredResponseSchema = z.object({
  responseText: z.string(),
  relationalStatus: z.enum(["aligned", "diverging", "uncertain"]),
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

# Structured Output Schemas

## Workspace shared session-analysis schema (conceptual)
- summary: string
- spine:
  - event: string
  - filter: string
  - distortion: string
  - defense: string
  - outcome: string
  - repairLever: string
- branchSuggestion: nullable object
- rationaleBlocks: list

## Persistence coupling
Analyses persist the shared session-analysis state, and center modes consume that state as alternate renderers.

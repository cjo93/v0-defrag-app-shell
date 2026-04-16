# Baseline Design Notes

## Baseline design boundary
Baseline-design synthesis can inform internal reasoning but does not replace the shared structured session-analysis object used by workspace renderers.

## Workspace rendering rule
Center renderers consume shared session state only. They must not fork into mode-specific reasoning engines.

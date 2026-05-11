# NeuroQuest — Source Materials

Raw NMA content that powers the Ilya RAG chat. One file per day/workshop.

## Structure

```
sources/
  world0/
    W0D0-neuro-video-series.md     ← 12 neuro videos
    W0D1-python-workshop-1.md      ← LIF Neuron Part I
    W0D2-python-workshop-2.md      ← LIF Neuron Part II
    W0D3-linear-algebra.md         ← Vectors, Matrices, Dynamical Systems
    W0D4-calculus.md               ← Differentiation, DiffEQ, Numerical
  world1/                          ← (future)
  world2/                          ← (future)
```

## How to add content

1. Open the relevant .md file
2. Paste the transcript or notes under the correct `##` section header
3. Run `npm run embed` to re-index into Supabase (once that script is built)

## Chunking strategy

The embedding script splits each file on `---` dividers (one chunk per `##` section).
Each chunk includes the file title and section header as metadata.

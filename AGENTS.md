# Architecture
- Artist and release catalogues live in `src/data`; profile release links and homepage highlights derive from those catalogues to remain consistent.
- Release artwork uses `ReleaseArtwork`, supporting announcements without an invented cover.
- Downloaded artwork is referenced through imported Lovable asset pointers, keeping raw downloads out of source.
- Catalogue rule tests run with `bun test src/data/releases.test.ts`; its runner types are isolated from the application TypeScript configuration.
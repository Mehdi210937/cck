# Architecture
- Artist and release catalogues live in `src/data`; profile release links and homepage highlights derive from those catalogues to remain consistent.
- Export the release catalogue sorted by date descending, with undated announcements last, so all views share the same chronology.
- Release artwork uses `ReleaseArtwork`, supporting announcements without an invented cover.
- Downloaded artwork is referenced through imported Lovable asset pointers, keeping raw downloads out of source.
- Catalogue rule tests run with `bun test src/data/releases.test.js`; JavaScript test files keep the runner separate from application TypeScript types.
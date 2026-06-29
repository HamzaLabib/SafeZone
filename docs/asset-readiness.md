# Asset Readiness Notes

Phase 2 cleanup renamed public training images with spaces or trailing spaces to web-safe kebab-case filenames:

- `Security on Street.png` -> `security-on-street.png`
- `Security indoor.png` -> `security-indoor.png`
- `Securities on Camera .png` -> `securities-on-camera.png`
- `Securities indoor.png` -> `securities-indoor.png`
- `Security outdoor.png` -> `security-outdoor.png`

No real product photos are available in the current repo, so store products still use the Safe Zone shield placeholder. Replace those placeholders with real product photos before public launch or before presenting the store as a finalized catalog.

Large image files should still be compressed with a trusted image workflow before public launch. Recommended targets:

- Convert large PNG training images to optimized JPEG or WebP where transparency is not needed.
- Keep hero/course images visually clear at their displayed sizes.
- Preserve alt text and update references whenever filenames change.
- Confirm image licensing/source rights for every public image.

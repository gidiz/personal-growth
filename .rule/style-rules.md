# Style Rules

## Purpose

Define styling rules for the Expo / React Native / Web application.

## Styling System

Use NativeWind as the primary shared styling approach.

Do not introduce a parallel CSS/component styling framework without an ADR.

## Design Tokens

Centralize shared:
- spacing;
- typography;
- radius;
- semantic colors;
- elevation/shadow conventions where cross-platform behavior permits.

Prefer semantic tokens over scattered literal values.

## RTL / LTR

Hebrew RTL and English LTR are first-class requirements.

- Do not hard-code left/right when start/end semantics are appropriate.
- Verify layout mirroring for navigation, icons, spacing and text alignment.
- Do not assume all icons should mirror automatically.
- Test both directions for shared components.

## Web

Use web-specific CSS only where React Native/NativeWind cannot express the required behavior cleanly.

Avoid a global `main.css` architecture unless the actual Expo Web setup requires it.

## Maintainability

- Keep component styles close to the component/feature.
- Reuse primitives/tokens.
- Avoid large one-off class strings when a reusable variant/component is warranted.
- Do not optimize prematurely into a complex design-system abstraction.

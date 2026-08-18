# UI Rules

## Purpose

Define shared UI behavior for Expo Web/iOS/Android.

## UI System

Use project UI primitives under `components/ui/`.

Expected primitives may include:
- Button
- Input
- Card
- Badge
- Slider / rating control
- Modal/sheet
- loading/error/empty states

Do not bypass primitives repeatedly for the same interaction pattern.

## Icons

Use an Expo/React-Native-compatible icon solution approved by the project.

Do **not** assume `lucide-react` is suitable for native code. If Lucide is selected, use the React Native-compatible package/configuration.

Keep icon semantics consistent.

## Toasts / Notifications

Use a cross-platform notification/toast solution approved by the project.

Do **not** assume web-only `sonner` is valid for iOS/Android.

Until a library is selected, call the shared notification abstraction rather than importing a new toast package ad hoc.

## Accessibility

- Every interactive control needs an accessible label/role where required.
- Maintain touch target sizes appropriate for mobile.
- Support keyboard interaction on Web.
- Do not encode meaning only through color.

## Daily Pulse UX

The normal Daily Pulse path should remain lightweight and target completion in under 30 seconds.

Avoid unnecessary confirmation screens or modal chains.

## Quick Capture

- global and easy to reach;
- preserve source when processing fails;
- AI classification must be reversible/correctable;
- processing state must be visible when not immediate.

## RTL / LTR

All shared UI must consider Hebrew RTL and English LTR.

Follow `.rule/style-rules.md`.

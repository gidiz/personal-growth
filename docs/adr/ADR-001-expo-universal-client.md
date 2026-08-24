# ADR-001 — Expo universal client

## Status
Accepted

## Decision
Use Expo + React Native + Expo Router + TypeScript for a universal Web/iOS/Android codebase.

## Rationale
The product requires all three platforms and benefits from shared domain/UI logic.

## Consequences
Platform-specific behavior must be isolated behind adapters and tested.

/// <reference types="nativewind/types" />

// global.css is a side-effect import. expo-env.d.ts declares this too, but it is gitignored,
// so CI would not see it.
declare module '*.css';

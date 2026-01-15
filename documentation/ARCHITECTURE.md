# Architecture

This document describes the architecture and structure of the Music Be Simple application.

## Overview

Music Be Simple is a React-based single-page application built with modern web technologies. The application uses a component-based architecture with React Context API for state management and TanStack Router for type-safe routing.

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── buttons/        # Button components (TopButton, TransposeButton, UseFlatsButton)
│   ├── displays/       # Display components for instruments and modes
│   │   ├── instruments/ # Instrument-specific display components
│   │   └── modes/      # Mode display components
│   ├── nav/            # Navigation components
├── context/            # React Context providers
│   ├── Chords/         # Chords context and provider
│   ├── Globals/        # Global application context
│   ├── InstrumentNotes/# Instrument notes context
│   ├── Play/           # Play functionality context
│   ├── Scales/         # Scales context and provider
│   └── shared/         # Shared context utilities
├── hooks/              # Custom React hooks
├── pages/              # Page-level components
│   ├── Chords/         # Chords page components
│   ├── Play/           # Play page components
│   └── Scales/         # Scales page components
├── routes/             # TanStack Router route definitions
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
    ├── borders.ts      # Border utility functions
    ├── chords.ts       # Chord calculation utilities
    ├── notes.ts        # Note-related utilities
    └── scales.ts       # Scale calculation utilities
```

## State Management

The application uses a hybrid state management approach combining **Zustand stores** and **React Context API**:

### Zustand Stores

Zustand stores manage tonic and variant state for scales and chords, with sessionStorage persistence:

1. **chordsStore** (`src/stores/chordsStore.ts`)
   - Manages `tonic` and `variant` for chords
   - Persists to sessionStorage (clears on page refresh)
   - Validates data with Zod schemas on load and save
   - Provides `setTonic`, `setVariant`, and `reset` methods

2. **scalesStore** (`src/stores/scalesStore.ts`)
   - Manages `tonic` and `variant` for scales
   - Persists to sessionStorage (clears on page refresh)
   - Validates data with Zod schemas on load and save
   - Provides `setTonic`, `setVariant`, and `reset` methods

3. **playStore** (`src/stores/playStore.ts`)
   - Placeholder store for play functionality
   - Uses sessionStorage for persistence

**Store Features**:
- **sessionStorage persistence**: State persists during navigation but clears on page refresh/reload
- **Zod validation**: All data is validated using Zod schemas before loading and saving
- **Automatic cleanup**: Stores detect page refresh and clear sessionStorage automatically
- **Type safety**: Full TypeScript support with typed stores

### Context Providers

React Context API provides additional state and computed values:

1. **GlobalsContext** - Global application state
   - Note display preferences (flats/sharps) - persisted to localStorage
   - Selected instrument displays - persisted to localStorage
   - Audio context for note playback
   - Global UI preferences

2. **ScalesContext** - Scales-specific state
   - Uses `scalesStore` for tonic and variant
   - Calculated scale notes
   - Note label visibility - persisted to localStorage
   - Mode-related calculations

3. **ChordsContext** - Chords-specific state
   - Uses `chordsStore` for tonic and variant
   - Calculated chord notes
   - Chord name and note count
   - Nerd mode toggle - persisted to localStorage

4. **PlayContext** - Play functionality state
   - Play-related state and functionality

5. **InstrumentNotesContext** - Instrument notes display
   - Instrument-specific note display state

### State Persistence

State persistence uses two strategies:

**sessionStorage (via Zustand stores)**:
- Tonic and variant for scales and chords
- Persists during navigation, clears on page refresh
- Validated with Zod schemas

**localStorage (via useLocalStorage hook)**:
- `useLocalStorage` - Generic localStorage hook with Zod validation
- Persists: `usingFlats`, `selectedDisplays`, `showNoteLabels`, `showNerdMode`
- Survives page refresh

## Routing

The application uses TanStack Router for type-safe routing:

- `/` - Home/Index route
- `/scales` - Scales page
- `/chords` - Chords page
- `/play` - Play page

Routes are defined in `src/routes/` and automatically generated via the TanStack Router plugin.

## Component Architecture

### Component Hierarchy

```
RootRoute
├── Navbar
│   └── NavTab (multiple)
├── Outlet (page content)
│   ├── Scales Page
│   │   ├── Tonic selector
│   │   ├── Variant selector
│   │   ├── Display components
│   │   └── Instrument displays
│   ├── Chords Page
│   │   ├── Tonic selector
│   │   ├── Variant selector
│   │   ├── Chord display
│   │   └── Instrument displays
│   └── Play Page
│       └── Play interface
└── Footer
```

### Component Patterns

- **Container Components**: Page-level components that manage state and layout
- **Presentational Components**: Reusable UI components that receive props
- **Context Consumers**: Components that consume context via custom hooks

## Instrument System

The application supports multiple instruments with a shared component architecture:

### Supported Instruments

- Piano
- Guitar
- Banjo
- Ukulele
- Mandolin

### Instrument Components

Each instrument has its own display component in `src/components/displays/instruments/`:
- Base `Instrument` component provides common functionality
- Instrument-specific components (Guitar, Piano, etc.) extend base functionality
- Shared fretboard components (Fret, FretString, Nut, etc.) for stringed instruments

## Utilities

### Note Utilities (`utils/notes.ts`)

- Note name conversion (flats/sharps)
- Interval calculations
- Note index mapping

### Scale Utilities (`utils/scales.ts`)

- Scale calculation from intervals
- Mode generation
- Scale note extraction

### Chord Utilities (`utils/chords.ts`)

- Chord construction from intervals
- Chord name generation
- Chord data structures

### Border Utilities (`utils/borders.ts`)

- Border calculation for visual displays
- Fretboard border logic

## Type System

TypeScript types are organized in `src/types/`:

- `index.ts` - Main type exports
- `chords.ts` - Chord-related types
- `globals.ts` - Global types
- `play.ts` - Play-related types
- `scales.ts` - Scale-related types

### Type Guards

Type guard functions provide runtime type narrowing and are located in `src/utils/`:

- **`isValidNoteIndex(value: number): value is NoteIndex`** (in `utils/notes.ts`)
  - Validates that a number is between 0 and 11 (inclusive)
  - Used for note index validation

- **`isValidScaleType(value: string): value is ScaleType`** (in `utils/notes.ts`)
  - Validates that a string is a valid scale type key in the INTERVALS object
  - Used for scale variant validation

- **`isValidChordVariant(value: string): value is Chord_Variant`** (in `utils/chords.ts`)
  - Validates that a string is a valid chord variant key in the CHORDS structure
  - Used for chord variant validation

**Type Guard Pattern**: Always combine Zod schema validation with type guard functions:

```typescript
// ✅ Correct pattern: Zod safeParse() + type guard
const result = ScaleTypeSchema.safeParse(e.target.value);
if (result.success && isValidScaleType(result.data)) {
  // result.data is properly typed as ScaleType (no type assertion needed)
  handleVariantChange(result.data);
}

// ❌ Avoid: Type assertions
const result = ScaleTypeSchema.safeParse(e.target.value);
if (result.success) {
  handleVariantChange(result.data as ScaleType); // ❌ Type assertion
}
```

All type guard functions are exported from `src/utils/index.ts` for convenient importing.

## Schema Validation System

The application uses **Zod** for runtime type validation and schema definition:

### Schema Organization

All Zod schemas are defined in `src/schemas.ts`:

- **Basic schemas**: Primitive types and enums (NoteIndex, AccidentalType, ScaleType, ScaleMode, ChordVariant)
- **UI schemas**: UI-related types (Border, InstrumentType, IconType, TabType, PositionType)
- **Button schemas**: Button icon types (NerdModeButtonIcon, NoteLabelsButtonIcon)
- **Storage schemas**: localStorage data structures (GlobalsStorageSchema, ScalesStorageSchema, ChordsStorageSchema) - used for combined data validation in context providers via `useEffect` hooks (fields are also validated individually)
- **Data schemas**: Complex data structures (ChordInfo, ChordData, ChordGroup)

### Validation Usage

1. **localStorage Validation**: All data loaded from localStorage is validated using Zod schemas via the `useLocalStorage` hook (individual field validation)
2. **Combined Data Validation**: Context providers validate combined storage data using storage schemas (`GlobalsStorageSchema`, `ScalesStorageSchema`, `ChordsStorageSchema`) in `useEffect` hooks for monitoring and debugging
3. **Input Validation**: User inputs (form selections, user interactions) are validated using `safeParse()` followed by type guard functions before state updates
4. **Runtime Safety**: Zod provides runtime type checking beyond TypeScript's compile-time checks
5. **Type Narrowing**: Type guard functions (`isValidNoteIndex`, `isValidScaleType`, `isValidChordVariant`) are used with Zod validation to properly narrow types without type assertions

### Schema Examples

```typescript
// Basic schema (infers 'number' type - use for validation where number is acceptable)
export const NoteIndexSchema = z.number().int().min(0).max(11);

// NoteIndex union schema (infers 'NoteIndex' union type - use for useLocalStorage and storage schemas)
// This ensures exact type matching when used with useLocalStorage hook
export const NoteIndexZodSchema = z.union([
  z.literal(0), z.literal(1), z.literal(2), z.literal(3),
  z.literal(4), z.literal(5), z.literal(6), z.literal(7),
  z.literal(8), z.literal(9), z.literal(10), z.literal(11),
]);

// Enum schema
export const ScaleTypeSchema = z.enum(SCALE_TYPES as [string, ...string[]]);

// Refined schema (for complex validation)
export const ChordVariantSchema = z.string().refine(
  (val) => chordVariantArray.includes(val),
  (val) => ({ message: `Invalid chord variant: ${val}` })
);

// Storage schema (uses NoteIndexZodSchema for exact type matching)
export const ScalesStorageSchema = z.object({
  tonic: NoteIndexZodSchema, // Uses union schema, not NoteIndexSchema
  variant: ScaleTypeSchema,
  showNoteLabels: z.boolean(),
});
```

**Important**: When creating schemas for use with `useLocalStorage` that contain `NoteIndex` fields, use `NoteIndexZodSchema` (union of literals) instead of `NoteIndexSchema` (number). This ensures TypeScript infers the exact `NoteIndex` union type (`0 | 1 | 2 | ... | 11`) rather than just `number`, which is required for proper type matching with the `useLocalStorage` hook.

### Input Validation Pattern

When validating user inputs, combine Zod's `safeParse()` with type guard functions:

```typescript
// ✅ Correct: Zod validation + type guard (no type assertions)
import { ScaleTypeSchema } from '@/schemas';
import { isValidScaleType } from '@/utils';

const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
  const result = ScaleTypeSchema.safeParse(e.target.value);
  if (result.success && isValidScaleType(result.data)) {
    // result.data is properly typed as ScaleType
    handleVariantChange(result.data);
  }
};

// ❌ Avoid: Type assertions
const result = ScaleTypeSchema.safeParse(e.target.value);
if (result.success) {
  handleVariantChange(result.data as ScaleType); // ❌ Type assertion
}
```

### Integration with Context and Stores

Context providers and Zustand stores use Zod schemas for persistence:

**localStorage (via useLocalStorage hook)**:
- `GlobalsContext` validates `usingFlats` (with `z.boolean()`) and `selectedDisplays` (with `z.array(IconTypeSchema)`) individually
- `ScalesContext` validates `showNoteLabels` (with `z.boolean()`) individually
- `ChordsContext` validates `showNerdMode` (with `z.boolean()`) individually
- Context providers also validate combined storage data using storage schemas (`GlobalsStorageSchema`, `ScalesStorageSchema`, `ChordsStorageSchema`) in `useEffect` hooks for monitoring and debugging

**sessionStorage (via Zustand stores)**:
- `scalesStore` validates `tonic` (with `NoteIndexSchema`) and `variant` (with `ScaleTypeSchema`)
- `chordsStore` validates `tonic` (with `NoteIndexSchema`) and `variant` (with `ChordVariantSchema`)

**Validation Strategy**:
- Individual fields are validated when loaded/saved via `useLocalStorage` hook
- Combined storage data is validated using storage schemas in `useEffect` hooks for runtime monitoring
- Both validation approaches work together to ensure data integrity

## Styling

The application uses Tailwind CSS for styling:
- Utility-first CSS framework
- Custom configuration in `tailwind.config.js`
- Global styles in `src/globals.css`

## Testing Infrastructure

The application uses a comprehensive testing setup with multiple testing strategies:

### Testing Stack

- **Vitest** - Unit and component testing framework
- **React Testing Library** - Component testing utilities
- **Playwright** - End-to-end testing framework
- **Vitest Coverage (v8)** - Code coverage reporting

### Test Organization

```
src/
├── utils/__tests__/        # Unit tests for utility functions
├── components/__tests__/   # Component tests
├── hooks/__tests__/       # Hook tests
└── test/
    ├── setup.ts           # Test setup and mocks
    └── test-utils.tsx     # Testing utilities and helpers

e2e/
├── scales.spec.ts         # E2E tests for scales page
├── chords.spec.ts         # E2E tests for chords page
├── play.spec.ts           # E2E tests for play page
└── navigation.spec.ts     # E2E tests for navigation
```

### Test Configuration

**Vitest** (`vitest.config.ts`):
- Environment: jsdom for DOM testing
- Setup file: `src/test/setup.ts` for global mocks and configuration
- Coverage: v8 provider with HTML, JSON, and text reporters
- Path aliases: `@/` alias configured for imports

**Playwright** (`playwright.config.ts`):
- Test directory: `e2e/`
- Browsers: Chromium, Firefox, WebKit
- Base URL: `http://localhost:5173`
- Web server: Automatically starts dev server before tests

### Test Utilities

**test-utils.tsx**:
- Custom `render` function that includes TanStack Router context
- Wraps components with necessary providers for testing

**setup.ts**:
- Configures `@testing-library/jest-dom` matchers
- Mocks `window.matchMedia` for responsive design testing
- Mocks `IntersectionObserver` for intersection-based features
- Mocks `AudioContext` and related Web Audio API for audio testing
- Automatic cleanup after each test

### Testing Patterns

1. **Unit Tests**: Test pure functions and utilities in isolation
2. **Component Tests**: Test React components with React Testing Library
3. **E2E Tests**: Test complete user flows with Playwright
4. **Coverage**: Track code coverage to ensure comprehensive testing

## Build System

- **Vite** - Build tool and dev server
- **TypeScript** - Type checking and compilation
- **Zod** - Runtime type validation and schema definition
- **Zustand** - State management for tonic/variant state
- **Biome** - Linting and formatting
- **TanStack Router Plugin** - Route generation
- **Vitest** - Unit and component testing
- **Playwright** - End-to-end testing

## Development Workflow

1. Development server runs on `http://localhost:5173`
2. Hot Module Replacement (HMR) for instant updates
3. TypeScript strict mode for type safety
4. Biome for code quality and formatting

## Key Design Decisions

1. **Context API over Redux**: Simpler state management for the application's needs
2. **TanStack Router**: Type-safe routing with excellent TypeScript support
3. **Component composition**: Reusable components with clear separation of concerns
4. **TypeScript strict mode**: Maximum type safety
5. **Bun**: Fast package management and runtime
6. **Vite**: Fast development experience and optimized builds

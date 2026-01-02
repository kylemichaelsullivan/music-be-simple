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
│   └── notes/          # Note-related components
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

The application uses React Context API for state management, organized by feature domain:

### Context Providers

1. **GlobalsContext** - Global application state
   - Note display preferences (flats/sharps)
   - Selected instrument displays
   - Audio context for note playback
   - Global UI state

2. **ScalesContext** - Scales-specific state
   - Selected tonic note
   - Scale variant/type
   - Scale notes
   - Note label visibility

3. **ChordsContext** - Chords-specific state
   - Selected tonic note
   - Chord variant/type
   - Chord notes
   - Chord name
   - Note count
   - Nerd mode toggle

4. **PlayContext** - Play functionality state
   - Play-related state and functionality

5. **InstrumentNotesContext** - Instrument notes display
   - Instrument-specific note display state

### State Persistence

State is persisted to localStorage using custom hooks:
- `useLocalStorage` - Generic localStorage hook
- `useScaleState` - Scales state persistence
- `useChordState` - Chords state persistence

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

## Schema Validation System

The application uses **Zod** for runtime type validation and schema definition:

### Schema Organization

All Zod schemas are defined in `src/schemas.ts`:

- **Basic schemas**: Primitive types and enums (NoteIndex, AccidentalType, ScaleType, ScaleMode, ChordVariant)
- **UI schemas**: UI-related types (Border, InstrumentType, IconType, TabType, PositionType)
- **Button schemas**: Button icon types (NerdModeButtonIcon, NoteLabelsButtonIcon)
- **Storage schemas**: localStorage data structures (GlobalsStorageSchema, ScalesStorageSchema, ChordsStorageSchema) - defined but not currently used; fields are validated individually
- **Data schemas**: Complex data structures (ChordInfo, ChordData, ChordGroup)

### Validation Usage

1. **localStorage Validation**: All data loaded from localStorage is validated using Zod schemas via the `useLocalStorage` hook
2. **Input Validation**: User inputs (form selections, user interactions) are validated using `safeParse()` before state updates
3. **Runtime Safety**: Zod provides runtime type checking beyond TypeScript's compile-time checks

### Schema Examples

```typescript
// Basic schema
export const NoteIndexSchema = z.number().int().min(0).max(11);

// Enum schema
export const ScaleTypeSchema = z.enum(SCALE_TYPES as [string, ...string[]]);

// Storage schema
export const ScalesStorageSchema = z.object({
  tonic: NoteIndexSchema,
  variant: ScaleTypeSchema,
  showNoteLabels: z.boolean(),
});
```

### Integration with Context

Context providers use Zod schemas for localStorage persistence. Each field is validated individually:

- `GlobalsContext` validates `usingFlats` (with `z.boolean()`) and `selectedDisplays` (with `z.array(IconTypeSchema)`)
- `ScalesContext` validates `showNoteLabels` (with `z.boolean()`)
- `ChordsContext` validates `showNerdMode` (with `z.boolean()`)

**Note**: Tonic and variant are managed via `useScaleState` and `useChordState` hooks and are not persisted to localStorage. The storage schemas (`GlobalsStorageSchema`, `ScalesStorageSchema`, `ChordsStorageSchema`) are defined but not currently used - each field is validated individually rather than as a complete storage object.

## Styling

The application uses Tailwind CSS for styling:
- Utility-first CSS framework
- Custom configuration in `tailwind.config.js`
- Global styles in `src/globals.css`

## Build System

- **Vite** - Build tool and dev server
- **TypeScript** - Type checking and compilation
- **Zod** - Runtime type validation and schema definition
- **Biome** - Linting and formatting
- **TanStack Router Plugin** - Route generation

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

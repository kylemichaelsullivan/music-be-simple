# Context API Documentation

This document describes the React Context API usage and state management in the Music Be Simple application.

## Overview

The application uses a hybrid state management approach combining **Zustand stores** and **React Context API**. Zustand stores manage tonic and variant state (persisted in sessionStorage), while React Context provides computed values, UI state, and additional functionality. **AppProviders** (`@/context/AppProviders`) composes all providers in order: Globals → Tunings → Scales → Chords → Play. `InstrumentNotesProvider` is used in `Displays` when rendering instrument components. Each context provides a custom hook for easy consumption.

## Context Providers

### GlobalsContext

Global application state and preferences.

**Location**: `@/context/Globals`

**Provider**: `GlobalsContextProvider`

**Hook**: `useGlobals()`

**State**:
- `selectedDisplays` - Array of selected instrument displays
- `usingFlats` - Boolean for flats vs sharps display
- `audioContext` - Web Audio API context for note playback
- Global UI preferences

**Usage**:
```typescript
import { useGlobals } from '@/hooks';

function MyComponent() {
  const { selectedDisplays, usingFlats, setUsingFlats } = useGlobals();
  // Component logic
}
```

**Persistence**: Selected displays and flats/sharps preference are persisted to localStorage with Zod schema validation.

**Schema Validation**:
- `usingFlats` is validated using `z.boolean()` (individual field validation)
- `selectedDisplays` is validated using `z.array(IconTypeSchema)` (individual field validation)
- Combined data is validated using `GlobalsStorageSchema` in a `useEffect` hook for monitoring

### ScalesContext

Scales-specific state and functionality.

**Location**: `@/context/Scales`

**Provider**: `ScalesContextProvider`

**Hook**: `useScales()`

**State**:
- `tonic` - Selected tonic note (NoteIndex) - from `scalesStore`
- `variant` - Selected scale variant/type (ScaleType) - from `scalesStore`
- `notes` - Calculated scale notes
- `showNoteLabels` - Boolean for note label visibility - persisted to localStorage

**Methods**:
- `handleTonicChange(tonic: NoteIndex)` - Set the tonic note (updates store)
- `handleVariantChange(variant: ScaleType)` - Set the scale variant (updates store)
- `toggleNoteLabels()` - Toggle note labels
- `makeScale(tonic: NoteIndex, variant: ScaleType)` - Set both tonic and variant
- `reset()` - Reset tonic and variant to defaults
- `getRelativeMajor(mode: ScaleMode)` - Get relative major for a mode
- `getRelativeMinor(mode: ScaleMode)` - Get relative minor for a mode

**Usage**:
```typescript
import { useScales } from '@/hooks';

function ScalesComponent() {
  const { tonic, variant, notes, handleTonicChange, handleVariantChange } = useScales();
  // Component logic
}
```

**Persistence**: 
- `showNoteLabels` is persisted to localStorage with Zod schema validation
- `tonic` and `variant` are persisted to sessionStorage via `scalesStore` (Zustand) - persists during navigation but clears on page refresh

**Schema Validation**:
- `showNoteLabels` is validated using `z.boolean()` (localStorage - individual field validation)
- `tonic` and `variant` are validated using `NoteIndexSchema` and `ScaleTypeSchema` in the store (sessionStorage)
- Combined data (tonic, variant, showNoteLabels) is validated using `ScalesStorageSchema` in a `useEffect` hook for monitoring

### ChordsContext

Chords-specific state and functionality.

**Location**: `@/context/Chords`

**Provider**: `ChordsContextProvider`

**Hook**: `useChords()`

**State**:
- `tonic` - Selected tonic note (NoteIndex) - from `chordsStore`
- `variant` - Selected chord variant/type (Chord_Variant) - from `chordsStore`
- `notes` - Calculated chord notes
- `chordName` - Generated chord name
- `noteCount` - Number of notes in chord
- `showNerdMode` - Boolean for nerd mode display - persisted to localStorage

**Methods**:
- `handleTonicChange(tonic: Chord_Tonic)` - Set the tonic note (updates store)
- `handleVariantChange(variant: Chord_Variant)` - Set the chord variant (updates store)
- `toggleNerdMode()` - Toggle nerd mode
- `makeScale(tonic: Chord_Tonic, variant: Chord_Variant)` - Set both tonic and variant
- `getBorderStyle(note: NoteIndex)` - Get border style for a note
- `reset()` - Reset tonic and variant to defaults

**Usage**:
```typescript
import { useChords } from '@/hooks';

function ChordsComponent() {
  const { tonic, variant, chordName, notes, handleTonicChange } = useChords();
  // Component logic
}
```

**Persistence**: 
- `showNerdMode` is persisted to localStorage with Zod schema validation
- `tonic` and `variant` are persisted to sessionStorage via `chordsStore` (Zustand) - persists during navigation but clears on page refresh

**Schema Validation**:
- `showNerdMode` is validated using `z.boolean()` (localStorage - individual field validation)
- `tonic` and `variant` are validated using `NoteIndexSchema` and `ChordVariantSchema` in the store (sessionStorage)
- Combined data (tonic, variant, showNerdMode) is validated using `ChordsStorageSchema` in a `useEffect` hook for monitoring

### TuningsContext

Custom instrument tunings and TuningModal.

**Location**: `@/context/Tunings`

**Provider**: `TuningsContextProvider`

**Hook**: `useTunings()`

**State**:
- `getTuning(instrument)` - Get tuning for a tunable instrument (Banjo, Guitar, Mandolin, Ukulele)
- `setTuning(instrument, notes)` - Set tuning
- `resetTuning(instrument)` - Reset to default
- `openTuningModal(instrument)`, `closeTuningModal()` - TuningModal visibility
- `tuningModalInstrument` - Which instrument’s modal is open, or null

**Persistence**: `instrumentTunings` in localStorage via `TuningsStorageSchema`.

**Usage**:
```typescript
import { useTunings } from '@/hooks';

function InstrumentHeader() {
  const { getTuning, openTuningModal } = useTunings();
  // ...
}
```

### PlayContext

Play functionality state (Chord Bin, Notepad, Save/Import/Export, note playback).

**Location**: `@/context/Play`

**Provider**: `PlayContextProvider`

**Hook**: `usePlay()`

**State**:
- Play-related state and functionality
- Note playback controls

**Usage**:
```typescript
import { usePlay } from '@/hooks';

function PlayComponent() {
  const { playNote, stopNote } = usePlay();
  // Component logic
}
```

### InstrumentNotesContext

Instrument notes display context. **Used in** `Displays` (`@/components/displays/Displays`) when rendering instrument components (Piano, Guitar, Banjo, Ukulele, Mandolin) for scales, chords, and play. Not in the root AppProviders stack.

**Location**: `@/context/InstrumentNotes`

**Provider**: `InstrumentNotesProvider`

**Hook**: `useInstrumentNotes()`

**State**:
- `notes`, `tonic`, `showNoteLabels`, `getBorderStyle?`, `showNerdMode?` — passed into the provider; consumed by `AllowedNote` and instrument components

**Usage**:
```typescript
import { useInstrumentNotes } from '@/hooks';

function InstrumentComponent() {
  const { getNotesForInstrument } = useInstrumentNotes();
  // Component logic
}
```

## Zustand Stores

The application uses Zustand stores for managing tonic and variant state, with sessionStorage persistence that clears on page refresh.

### chordsStore

Manages tonic and variant state for chords.

**Location**: `@/stores/chordsStore`

**Hook**: `useChordsStore()`

**State**:
- `tonic` - Selected tonic note (Chord_Tonic)
- `variant` - Selected chord variant (Chord_Variant)

**Methods**:
- `setTonic(tonic: Chord_Tonic)` - Set the tonic note
- `setVariant(variant: Chord_Variant)` - Set the chord variant
- `reset()` - Reset to initial values

**Persistence**: Uses sessionStorage (persists during navigation, clears on page refresh)

**Validation**: Validates data with `NoteIndexSchema` and `ChordVariantSchema` on load and save

**Usage**:
```typescript
import { useChordsStore } from '@/stores/chordsStore';

function MyComponent() {
  const { tonic, variant, setTonic, setVariant } = useChordsStore();
  // Component logic
}
```

### scalesStore

Manages tonic and variant state for scales.

**Location**: `@/stores/scalesStore`

**Hook**: `useScalesStore()`

**State**:
- `tonic` - Selected tonic note (NoteIndex)
- `variant` - Selected scale variant (ScaleType)

**Methods**:
- `setTonic(tonic: NoteIndex)` - Set the tonic note
- `setVariant(variant: ScaleType)` - Set the scale variant
- `reset()` - Reset to initial values

**Persistence**: Uses sessionStorage (persists during navigation, clears on page refresh)

**Validation**: Validates data with `NoteIndexSchema` and `ScaleTypeSchema` on load and save

**Usage**:
```typescript
import { useScalesStore } from '@/stores/scalesStore';

function MyComponent() {
  const { tonic, variant, setTonic, setVariant } = useScalesStore();
  // Component logic
}
```

### playStore

Placeholder store for play functionality.

**Location**: `@/stores/playStore`

**Hook**: `usePlayStore()`

**Persistence**: Uses sessionStorage

## Shared Context Utilities

### useLocalStorage

Generic hook for localStorage persistence with Zod schema validation.

**Location**: `@/context/shared/useLocalStorage`

**Signature**:
```typescript
function useLocalStorage<T>(
  key: string,
  schema: z.ZodType<T>,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void]
```

**Features**:
- Validates data loaded from localStorage using Zod schemas
- Validates data before saving to localStorage
- Falls back to `initialValue` if validation fails
- Logs validation errors to console for debugging

**Usage**:
```typescript
import { useLocalStorage } from '@/context/shared/useLocalStorage';
import { IconTypeSchema } from '@/schemas';
import { z } from 'zod';

function MyComponent() {
  // Basic type validation
  const [usingFlats, setUsingFlats] = useLocalStorage(
    'usingFlats',
    z.boolean(),
    true
  );

  // Array validation
  const [displays, setDisplays] = useLocalStorage(
    'selectedDisplays',
    z.array(IconTypeSchema),
    initialDisplays
  );

  // Boolean validation
  const [showNoteLabels, setShowNoteLabels] = useLocalStorage(
    'showNoteLabels',
    z.boolean(),
    true
  );
}
```


### useEscapeReset

Hook for resetting state on Escape key press.

**Location**: `@/context/shared/useEscapeReset`

**Usage**:
```typescript
import { useEscapeReset } from '@/context/shared/useEscapeReset';

function MyComponent() {
  useEscapeReset(() => {
    // Reset logic
  });
}
```

### useRequireGlobals

Hook to ensure GlobalsContext is available.

**Location**: `@/context/shared/useRequireGlobals`

**Usage**: Internal use by components that require global context.

## Context Provider Hierarchy

`AppProviders` composes the following order. `InstrumentNotesProvider` is used in `Displays` when rendering instruments, not in the root stack.

```
GlobalsContextProvider (root)
└── TuningsContextProvider
    └── ScalesContextProvider
        └── ChordsContextProvider
            └── PlayContextProvider
                └── (InstrumentNotesProvider in Displays when rendering instruments)
```

## State Persistence

The application uses two persistence strategies:

### sessionStorage (Zustand Stores)

**Storage Keys**:
- `chords-store` - Chords tonic and variant
- `scales-store` - Scales tonic and variant
- `play-store` - Play functionality state

**Persistence Behavior**:
- Persists during navigation (client-side routing)
- Clears on page refresh/reload (F5, Ctrl+R, etc.)
- Automatically detects page refresh and clears storage

**Validation**: All data is validated using Zod schemas (`NoteIndexSchema`, `ChordVariantSchema`, `ScaleTypeSchema`) before loading and saving

### localStorage (useLocalStorage Hook)

**Storage Keys**:
- `usingFlats` - Global flats/sharps preference
- `selectedDisplays` - Selected instrument displays
- `showNoteLabels` - Scales note label visibility
- `showNerdMode` - Chords nerd mode toggle
- `instrumentTunings` - Custom instrument tunings (TuningsContext)

**Persistence Behavior**:
- Persists across page refreshes
- Survives browser restarts (until cleared)

**Validation**: All data is validated using Zod schemas before loading and saving:
- `usingFlats` - validated with `z.boolean()` (individual field validation)
- `selectedDisplays` - validated with `z.array(IconTypeSchema)` (individual field validation)
- `showNoteLabels` - validated with `z.boolean()` (individual field validation)
- `showNerdMode` - validated with `z.boolean()` (individual field validation)
- Combined storage data is also validated using storage schemas (`GlobalsStorageSchema`, `ScalesStorageSchema`, `ChordsStorageSchema`) in context providers via `useEffect` hooks for monitoring and debugging

### Persistence Strategy

1. **Zustand stores**: Tonic and variant are saved to sessionStorage on changes, loaded on mount
2. **localStorage hook**: UI preferences are saved to localStorage on changes, loaded on mount
3. **Zod schema validation**: All data is validated using Zod schemas before use
4. **Error handling**: Errors are handled gracefully (falls back to defaults)
5. **Validation errors**: Validation errors are logged to console for debugging
6. **State migration**: Can be handled in context providers or stores if needed

The `useLocalStorage` hook and Zustand stores automatically validate data on load and before save, ensuring data integrity and type safety at runtime.

## Custom Hooks

All contexts expose custom hooks for consumption:

- `useGlobals()` - Access global context
- `useTunings()` - Access tunings context
- `useScales()` - Access scales context
- `useChords()` - Access chords context
- `usePlay()` - Access play context
- `useInstrumentNotes()` - Access instrument notes context

## Best Practices

### Context Usage

1. **Use Custom Hooks**: Always use the provided custom hooks instead of `useContext()` directly
2. **Avoid Over-nesting**: Don't nest contexts unnecessarily
3. **Split Contexts**: Keep contexts focused on specific domains
4. **Performance**: Consider splitting contexts if re-renders become an issue

### State Updates

1. **Immutable Updates**: Always create new state objects/arrays
2. **Functional Updates**: Use functional updates when state depends on previous state
3. **Batch Updates**: React automatically batches state updates

### Error Handling

1. **localStorage Errors**: Handle localStorage errors gracefully
2. **Default Values**: Always provide sensible defaults
3. **Type Safety**: Use TypeScript to ensure type safety

## Type Definitions

Context types are defined in `src/types/`:

- `GlobalsContextType` - Global context type
- `ScalesContextType` - Scales context type
- `ChordsContextType` - Chords context type
- `PlayContextType` - Play context type

## Example: Creating a New Context

```typescript
// 1. Create context file: src/context/MyFeature/MyFeatureContext.tsx
import { createContext, useContext } from 'react';

interface MyFeatureContextType {
  value: string;
  setValue: (value: string) => void;
}

const MyFeatureContext = createContext<MyFeatureContextType | undefined>(undefined);

// 2. Create provider: src/context/MyFeature/index.tsx
export function MyFeatureContextProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState('default');
  
  return (
    <MyFeatureContext.Provider value={{ value, setValue }}>
      {children}
    </MyFeatureContext.Provider>
  );
}

// 3. Create custom hook: src/hooks/useMyFeature.ts
export function useMyFeature() {
  const context = useContext(MyFeatureContext);
  if (!context) {
    throw new Error('useMyFeature must be used within MyFeatureContextProvider');
  }
  return context;
}
```

# Context API Documentation

This document describes the React Context API usage and state management in the Music Be Simple application.

## Overview

The application uses React Context API for state management, organized by feature domain. Each context provides a custom hook for easy consumption and includes state persistence where appropriate.

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
import { useGlobals } from '@/hooks/useGlobals';

function MyComponent() {
  const { selectedDisplays, usingFlats, setUsingFlats } = useGlobals();
  // Component logic
}
```

**Persistence**: Selected displays and flats/sharps preference are persisted to localStorage.

### ScalesContext

Scales-specific state and functionality.

**Location**: `@/context/Scales`

**Provider**: `ScalesContextProvider`

**Hook**: `useScales()`

**State**:
- `tonic` - Selected tonic note (NoteIndex)
- `variant` - Selected scale variant/type (ScaleType)
- `notes` - Calculated scale notes
- `showNoteLabels` - Boolean for note label visibility

**Methods**:
- `setTonic(tonic: NoteIndex)` - Set the tonic note
- `setVariant(variant: ScaleType)` - Set the scale variant
- `setShowNoteLabels(show: boolean)` - Toggle note labels
- `transpose(direction: 'up' | 'down')` - Transpose by a fifth

**Usage**:
```typescript
import { useScales } from '@/hooks/useScales';

function ScalesComponent() {
  const { tonic, variant, notes, setTonic, setVariant } = useScales();
  // Component logic
}
```

**Persistence**: Tonic, variant, and note label visibility are persisted to localStorage.

### ChordsContext

Chords-specific state and functionality.

**Location**: `@/context/Chords`

**Provider**: `ChordsContextProvider`

**Hook**: `useChords()`

**State**:
- `tonic` - Selected tonic note (NoteIndex)
- `variant` - Selected chord variant/type (Chord_Variant)
- `notes` - Calculated chord notes
- `chordName` - Generated chord name
- `noteCount` - Number of notes in chord
- `showNerdMode` - Boolean for nerd mode display

**Methods**:
- `setTonic(tonic: NoteIndex)` - Set the tonic note
- `setVariant(variant: Chord_Variant)` - Set the chord variant
- `setNoteCount(count: number)` - Set the note count
- `setShowNerdMode(show: boolean)` - Toggle nerd mode

**Usage**:
```typescript
import { useChords } from '@/hooks/useChords';

function ChordsComponent() {
  const { tonic, variant, chordName, notes, setTonic } = useChords();
  // Component logic
}
```

**Persistence**: Tonic, variant, note count, and nerd mode are persisted to localStorage.

### PlayContext

Play functionality state.

**Location**: `@/context/Play`

**Provider**: `PlayContextProvider`

**Hook**: `usePlay()`

**State**:
- Play-related state and functionality
- Note playback controls

**Usage**:
```typescript
import { usePlay } from '@/hooks/usePlay';

function PlayComponent() {
  const { playNote, stopNote } = usePlay();
  // Component logic
}
```

### InstrumentNotesContext

Instrument notes display context.

**Location**: `@/context/InstrumentNotes`

**Provider**: `InstrumentNotesContextProvider`

**Hook**: `useInstrumentNotes()`

**State**:
- Instrument-specific note display state
- Note mapping for instruments

**Usage**:
```typescript
import { useInstrumentNotes } from '@/hooks/useInstrumentNotes';

function InstrumentComponent() {
  const { getNotesForInstrument } = useInstrumentNotes();
  // Component logic
}
```

## Shared Context Utilities

### useLocalStorage

Generic hook for localStorage persistence.

**Location**: `@/context/shared/useLocalStorage`

**Usage**:
```typescript
import { useLocalStorage } from '@/context/shared/useLocalStorage';

function MyComponent() {
  const [value, setValue] = useLocalStorage('key', defaultValue);
  // Component logic
}
```

### useScaleState

Scales state persistence hook.

**Location**: `@/context/shared/useScaleState`

**Usage**: Internal use by ScalesContext.

### useChordState

Chords state persistence hook.

**Location**: `@/context/shared/useChordState`

**Usage**: Internal use by ChordsContext.

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

The context providers are organized in the following hierarchy:

```
GlobalsContextProvider (root)
├── ScalesContextProvider (for /scales route)
├── ChordsContextProvider (for /chords route)
├── PlayContextProvider (for /play route)
└── InstrumentNotesContextProvider (where needed)
```

## State Persistence

### localStorage Keys

- `music-be-simple-globals` - Global preferences
- `music-be-simple-scales` - Scales state
- `music-be-simple-chords` - Chords state

### Persistence Strategy

1. State is saved to localStorage on changes
2. State is loaded from localStorage on mount
3. Errors are handled gracefully (falls back to defaults)
4. State migration can be handled in context providers

## Custom Hooks

All contexts expose custom hooks for consumption:

- `useGlobals()` - Access global context
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

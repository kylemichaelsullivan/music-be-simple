# Component Documentation

This document provides detailed documentation for the components in the Music Be Simple application.

## Component Organization

Components are organized by functionality:

- `components/buttons/` - Button components (AddButton, CloseButton, EditButton, IconButton, InstrumentButton, RemoveButton, SaveSectionButton, ToggleSaveSectionButton, TopButton, TransposeButton, UseFlatsButton)
- `components/displays/` - Display components (Displays, DisplaySelector, DisplaysSelector; modes/; instruments/)
- `components/icons/` - ActionIcon, Icon, InstrumentIcon, NavIcon
- `components/nav/` - Navbar, NavTab
- Root-level: AllowedNote, Footer, Main, PageLayout, SkipLink, Title, Tonic, TuningModal, Variant

## Button Components

### TopButton

Button component for top-level actions.

**Location**: `@/components/buttons/TopButton`

**Props**:
- `title` - Button title text (string)
- `icon` - Icon content (string | ReactNode)
- `position` - Position on screen (`XPositionType`: 'left' | 'right')
- `onFxn` - Click handler function (() => void)

**Features**:
- Positioned absolutely at top corners
- Uses `useButtonHandler` hook for click and keyboard handling
- Supports emoji icons or ReactNode for icon content

### TransposeButton

Button for transposing scales up or down by a fifth.

**Location**: `@/components/buttons/TransposeButton`

**Props**:
- `direction` - `YDirectionType` ('up' | 'down')

**Features**:
- Self-contained component that handles transposition internally
- Uses `useScales` hook to access and update tonic
- Automatically validates transposed note index

### UseFlatsButton

Button to toggle between flats and sharps for note display.

**Location**: `@/components/buttons/UseFlatsButton`

**Props**:
- `position` - Optional `XPositionType` ('left' | 'right'), defaults to 'right'

**Features**:
- Self-contained component that uses `TopButton` internally
- Uses `useGlobals` hook to access and toggle `usingFlats` state
- Displays ♭ when using flats, ♯ when using sharps

### Other Button Components

- **AddButton** - Add items (e.g. Chord Bin, Notepad)
- **CloseButton** - Close modals or panels (e.g. TuningModal)
- **EditButton** - Enter edit mode
- **IconButton** - Icon-only button
- **InstrumentButton** - Instrument selector on Play page
- **RemoveButton** - Remove items
- **SaveSectionButton**, **ToggleSaveSectionButton** - SaveSection (Import/Export) on Play page

## Display Components

### Displays

Container component for instrument displays.

**Location**: `@/components/displays/Displays`

**Props**:
- `children` - Display components

### DisplaySelector

Individual display selector component.

**Location**: `@/components/displays/DisplaySelector`

**Props**:
- `icon` - Icon name (IconName)
- `text` - Display text (string)
- `isActive` - Boolean indicating if selected
- `onFxn` - Selection handler ((icon: IconName) => void)

### DisplaysSelector

Container for multiple display selectors.

**Location**: `@/components/displays/DisplaysSelector`

**Props**:
- `displays` - Array of display options
- `selectedDisplays` - Array of selected displays
- `onToggle` - Toggle handler

## Instrument Components

### Instrument

Base instrument display component wrapper.

**Location**: `@/components/displays/instruments/Instrument`

**Props**:
- `instrument` - Instrument type
- `notes` - Notes to display
- `showNoteLabels` - Boolean for note label visibility

### Guitar

Guitar-specific display component.

**Location**: `@/components/displays/instruments/Guitar/Guitar`

**Props**:
- `notes` - Notes to display on fretboard
- `showNoteLabels` - Show/hide note labels

### Piano

Piano keyboard display component.

**Location**: `@/components/displays/instruments/Piano/Piano`

**Props**:
- `notes` - Notes to highlight
- `showNoteLabels` - Show/hide note labels

### Banjo

Banjo-specific display component with drone string support.

**Location**: `@/components/displays/instruments/Banjo/Banjo`

**Props**:
- `notes` - Notes to display
- `showNoteLabels` - Show/hide note labels

### Ukulele

Ukulele-specific display component.

**Location**: `@/components/displays/instruments/Ukulele/Ukulele`

**Props**:
- `notes` - Notes to display
- `showNoteLabels` - Show/hide note labels

### Mandolin

Mandolin-specific display component.

**Location**: `@/components/displays/instruments/Mandolin/Mandolin`

**Props**:
- `notes` - Notes to display
- `showNoteLabels` - Show/hide note labels

## Shared Instrument Components

### Fret

Individual fret component for stringed instruments.

**Location**: `@/components/displays/instruments/Fret`

**Props**:
- `fretNumber` - Fret number
- `isActive` - Boolean indicating if fret is active
- Additional styling props

### FretString

String component for fretboard display.

**Location**: `@/components/displays/instruments/FretString`

**Props**:
- `stringNumber` - String number/index
- `notes` - Notes on this string
- `showNoteLabels` - Show/hide note labels

### FretNumbers

Component for displaying fret numbers.

**Location**: `@/components/displays/instruments/FretNumbers`

**Props**:
- `fretCount` - Number of frets to display

### Nut

Nut component (the "zero fret" at the top of the fretboard).

**Location**: `@/components/displays/instruments/Nut`

**Props**:
- `stringCount` - Number of strings

### Label

Label component for instrument displays.

**Location**: `@/components/displays/instruments/Label`

**Props**:
- `text` - Label text
- `position` - Position type ('left' | 'right' | 'top' | 'bottom')

### LabelContent

Content for instrument labels (e.g. note names, tuning). Used with `Label`.

**Location**: `@/components/displays/instruments/LabelContent`

## Mode Components

### Modes

Container for mode displays.

**Location**: `@/components/displays/modes/Modes`

**Props**:
- `modes` - Array of mode data
- `tonic` - Tonic note

### Mode

Individual mode display component.

**Location**: `@/components/displays/modes/Mode`

**Props**:
- `modeName` - Name of the mode
- `notes` - Notes in the mode
- `tonic` - Tonic note

### ModesHeading

Heading component for modes section.

**Location**: `@/components/displays/modes/ModesHeading`

**Props**:
- `text` - Heading text

## Navigation Components

### Navbar

Main navigation bar component.

**Location**: `@/components/nav/Navbar`

**Props**:
- `currentTab` - Current active tab (TabType)
- `onTabChange` - Handler function for tab changes ((tab: TabType) => void)

### NavTab

Individual navigation tab component.

**Location**: `@/components/nav/NavTab`

**Props**:
- `title` - Tab title (TabType: 'Scales' | 'Chords' | 'Play')
- `isActive` - Boolean indicating if tab is currently active
- `onFxn` - Click handler function (() => void)

**Features**:
- Uses button element with onFxn handler for navigation
- Supports active state styling via `isActive` prop
- Includes keyboard navigation support via `useButtonHandler` hook
- Memoized component for performance optimization


## Root-Level Components

### SkipLink

Skip-to-main-content link for accessibility. Rendered at the top of the page.

**Location**: `@/components/SkipLink`

### TuningModal

Modal to edit custom instrument tunings. Opened via `useTunings().openTuningModal(instrument)`. Rendered by `TuningsContextProvider` when `tuningModalInstrument` is set.

**Location**: `@/components/TuningModal`

### PageLayout

Layout wrapper for page content (e.g. Play page with Chord Bin, Notepad, SaveSection).

**Location**: `@/components/PageLayout`

### AllowedNote

Component for displaying allowed/selected notes on instruments.

**Location**: `@/components/AllowedNote`

**Props**:
- `note` - Note name to display (string)
- `isTonic` - Boolean indicating if note is the tonic
- `borderStyle` - Border style type (border)
- `isPiano` - Optional boolean for piano-specific positioning (default: false)

**Features**:
- Displays note labels when `showNoteLabels` is enabled (from InstrumentNotesContext)
- Different styling for tonic vs non-tonic notes
- Supports flats (♭) and sharps (♯) with special styling
- Responsive sizing (smaller on mobile, larger on desktop)

### Footer

Application footer component.

**Location**: `@/components/Footer`

**Props**: None

### Icons

Icon components live in `components/icons/`: **Icon** (SVG by name), **ActionIcon**, **InstrumentIcon**, **NavIcon**. Use `@/components/icons` or the specific component.

### Main

Main content wrapper component.

**Location**: `@/components/Main`

**Props**:
- `componentName` - Name of the component/page
- `children` - Content

### Title

Title component for pages.

**Location**: `@/components/Title`

**Props**:
- `text` - Title text

### Tonic

Tonic note selector component.

**Location**: `@/components/Tonic`

**Props**:
- `tonic` - Current tonic note
- `onChange` - Tonic change handler
- `usingFlats` - Boolean for flats/sharps display

### Variant

Variant/type selector component (for scales or chords).

**Location**: `@/components/Variant`

**Props**:
- `variant` - Current variant
- `variants` - Available variants
- `onChange` - Variant change handler

## Page Components

### Scales Page

Main scales page component.

**Location**: `@/pages/Scales/index.tsx`

**Features**:
- Tonic selection
- Scale variant selection
- Instrument displays
- Mode displays
- Transposition controls

### Chords Page

Main chords page component.

**Location**: `@/pages/Chords` (Chords, Chord, ChordName, ChordNote, ChordNotes, Notes)

**Features**:
- Tonic selection
- Chord variant selection
- Chord name display
- Instrument displays
- Note count selection

### Play Page

Main play page component.

**Location**: `@/pages/Play` (Play, InstrumentSelector, ChordBin, Notepad, SaveSection)

**Features**:
- **Instrument selector** - Choose which instrument to display
- **Chord Bin** - Add, edit (per-instrument ChordBinEditor), and remove chord items; build custom chord sequences
- **Notepad** - Add, reorder (react-dnd), and remove text lines
- **SaveSection** - Import and Export JSON (chord bin, notepad, tunings) via Imports and Exports components
- Interactive instrument exploration and note playback

## Component Patterns

### Context Consumption

Components consume context via custom hooks:

```typescript
const { state, setState } = useGlobals();
```

### State Updates

State updates are handled through context hooks:

```typescript
const { setTonic } = useScales();
setTonic(newTonic);
```

### Event Handlers

Event handlers are typically defined in components or passed as props:

```typescript
const handleClick = () => {
  // Handler logic
};
```

## Component Best Practices

1. **Props Interface**: Always define TypeScript interfaces for props
2. **Default Props**: Use default parameters for optional props
3. **Composition**: Compose smaller components for complex UIs
4. **Reusability**: Extract reusable logic into custom hooks
5. **Accessibility**: Use semantic HTML and ARIA attributes
6. **Performance**: Use React.memo() for expensive components when appropriate

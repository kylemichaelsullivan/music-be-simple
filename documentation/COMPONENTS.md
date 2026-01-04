# Component Documentation

This document provides detailed documentation for the components in the Music Be Simple application.

## Component Organization

Components are organized by functionality:

- `components/buttons/` - Button components
- `components/displays/` - Display components
- `components/nav/` - Navigation components
- Root-level components (AllowedNote, Footer, Icon, Main, Title, Tonic, Variant)

## Button Components

### TopButton

Button component for top-level actions.

**Location**: `@/components/buttons/TopButton`

**Props**:
- `children` - Button content
- `onClick` - Click handler
- Additional props passed to button element

### TransposeButton

Button for transposing scales up or down by a fifth.

**Location**: `@/components/buttons/TransposeButton`

**Props**:
- `direction` - 'up' | 'down'
- `onClick` - Transpose handler

### UseFlatsButton

Button to toggle between flats and sharps for note display.

**Location**: `@/components/buttons/UseFlatsButton`

**Props**:
- `usingFlats` - Boolean indicating if flats are currently used
- `onClick` - Toggle handler

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
- `icon` - Icon name
- `selected` - Boolean indicating if selected
- `onClick` - Selection handler

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

**Props**: None (uses context/hooks internally)

### NavTab

Individual navigation tab component.

**Location**: `@/components/nav/NavTab`

**Props**:
- `to` - Route path
- `label` - Tab label
- `icon` - Optional icon

## Root-Level Components

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

### Icon

Icon component for displaying SVG icons.

**Location**: `@/components/Icon`

**Props**:
- `name` - Icon name (instrument type or 'Modes')
- `className` - Optional CSS classes

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

**Location**: `@/pages/Chords/index.tsx`

**Features**:
- Tonic selection
- Chord variant selection
- Chord name display
- Instrument displays
- Note count selection

### Play Page

Main play page component.

**Location**: `@/pages/Play/index.tsx`

**Features**:
- Interactive instrument exploration
- Note playback
- Instrument selection

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

# Development Guide

This guide covers development practices, coding standards, and workflow for the Music Be Simple project.

## Development Environment Setup

### Prerequisites

- **Bun** (v1.0 or later) - Required for package management
- **Node.js** - Not required (Bun includes Node.js compatibility)
- **Git** - Version control

### Initial Setup

1. Clone the repository
2. Install dependencies: `bun install`
3. Start dev server: `bun dev`
4. Open `http://localhost:5173` in your browser

## Coding Standards

### TypeScript

- Use **strict mode** TypeScript configuration
- Define types in `src/types/` directory
- Use type inference where appropriate, but be explicit for public APIs
- Avoid `any` type - use `unknown` if type is truly unknown
- **Avoid type assertions**: Use type guards with Zod schema validation instead of `as Type` assertions
- **Type guards**: Create type guard functions in `utils/` files for runtime type narrowing

### Zod Schema Validation

- **Schema location**: Define all Zod schemas in `src/schemas.ts`
- **Runtime validation**: Use Zod for runtime type validation beyond TypeScript compile-time checks
- **localStorage validation**: Always use Zod schemas with `useLocalStorage` hook (individual field validation)
- **Combined data validation**: Context providers validate combined storage data using storage schemas (`GlobalsStorageSchema`, `ScalesStorageSchema`, `ChordsStorageSchema`) in `useEffect` hooks for monitoring
- **Input validation**: Validate user inputs using `safeParse()` before state updates
- **Error handling**: Handle validation errors gracefully with fallback to defaults

#### Schema Usage

```typescript
// ✅ Define schemas in schemas.ts
export const NoteIndexSchema = z.number().int().min(0).max(11);
export const ScaleTypeSchema = z.enum(SCALE_TYPES as [string, ...string[]]);

// ✅ Use schemas with useLocalStorage (individual field validation)
// Important: For types that are union types (like NoteIndex), use schemas that infer the exact union type
import { useLocalStorage } from '@/context/shared/useLocalStorage';
import { IconTypeSchema, NoteIndexZodSchema } from '@/schemas';
import { z } from 'zod';

const [usingFlats, setUsingFlats] = useLocalStorage('usingFlats', z.boolean(), true);
const [displays, setDisplays] = useLocalStorage(
  'selectedDisplays',
  z.array(IconTypeSchema),
  initialDisplays
);

// ✅ For schemas used with useLocalStorage that contain NoteIndex, use NoteIndexZodSchema
// This ensures the schema infers the exact NoteIndex union type, not just 'number'
const [chordBinItems, setChordBinItems] = useLocalStorage<ChordBinItemData[]>(
  'chordBinItems',
  ChordBinStorageSchema, // Uses NoteIndexZodSchema internally
  []
);

// ✅ Validate combined storage data (for monitoring/debugging)
import { GlobalsStorageSchema } from '@/schemas';
import { useEffect } from 'react';

useEffect(() => {
  const combinedData = {
    usingFlats,
    selectedDisplays: displays,
  };
  const result = GlobalsStorageSchema.safeParse(combinedData);
  if (!result.success) {
    console.warn('Globals storage data validation failed:', result.error.format());
  }
}, [usingFlats, displays]);

// ✅ Validate user inputs with Zod + type guards (no type assertions)
import { NoteIndexSchema, ScaleTypeSchema, ChordVariantSchema } from '@/schemas';
import { isValidNoteIndex, isValidScaleType, isValidChordVariant } from '@/utils';

// Pattern: Zod safeParse() + type guard function for proper type narrowing
const handleTonicChange = (e: ChangeEvent<HTMLSelectElement>) => {
  const value = Number.parseInt(e.target.value, 10);
  const result = NoteIndexSchema.safeParse(value);
  if (result.success && isValidNoteIndex(result.data)) {
    handleTonicChange(result.data); // Properly typed as NoteIndex (no 'as' needed)
  }
};

const handleScaleVariantChange = (e: ChangeEvent<HTMLSelectElement>) => {
  const result = ScaleTypeSchema.safeParse(e.target.value);
  if (result.success && isValidScaleType(result.data)) {
    handleVariantChange(result.data); // Properly typed as ScaleType
  }
};

const handleChordVariantChange = (e: ChangeEvent<HTMLSelectElement>) => {
  const result = ChordVariantSchema.safeParse(e.target.value);
  if (result.success && isValidChordVariant(result.data)) {
    handleVariantChange(result.data); // Properly typed as Chord_Variant
  }
};
```

### React

- Use **React 19** features and patterns
- Prefer function components with hooks
- Use TypeScript for component props (prefer `type` over `interface`)
- Follow component naming conventions (PascalCase)
- Use named exports only (NO default exports)

### Component Structure

```typescript
// Component file structure
import { ... } from '@/...';

type ComponentProps = {
  // Props definition
};

export function Component({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### JSX Attribute Ordering

**Important**: The attributes `ref`, `key`, and `id` must be the last three attributes (in that order) when present. If only some of them are present, they should still be in that order and be last.

#### Attribute Order Rules

1. All other attributes (type, className, event handlers, ARIA attributes, data attributes, etc.) come first
2. `ref` - React ref (third to last)
3. `key` - React key (second to last)
4. `id` - Element identifier (always last)

#### Examples

```typescript
// ✅ Correct - ref, key, id in correct order at the end
<div
	className='ComponentName base-classes'
	onClick={handleClick}
	ref={nodeRef}
	key={item.id}
	id={`item-${item.id}`}
>
	{/* Content */}
</div>

// ✅ Correct - only ref and id present, in correct order
<input
	type='file'
	accept='application/json,.json'
	onChange={handleChange}
	className='hidden'
	ref={fileInputRef}
	id='file-input'
/>

// ✅ Correct - only key present, at the end
<NotepadLine
	line={line}
	index={index}
	onRemove={() => removeNotepadLine(line.id)}
	onReorder={reorderNotepadLines}
	key={line.id}
/>

// ❌ Incorrect - ref should come before className
<div
	ref={nodeRef}
	className='ComponentName'
	id='item-1'
>
	{/* Content */}
</div>

// ❌ Incorrect - key should come after ref
<div
	className='ComponentName'
	key={item.id}
	ref={nodeRef}
>
	{/* Content */}
</div>
```

### File Naming

- Components: PascalCase (e.g., `Guitar.tsx`)
- Utilities: camelCase (e.g., `notes.ts`)
- Types: camelCase (e.g., `chords.ts`)

### Import Organization

Imports should be ordered as follows (alphabetically within each group):

1. **Internal project imports with `@/` alias** (alphabetically by path: components, context, hooks, instruments, navigation, schemas, stores, utils)
2. **Type imports from `@/types` and other `@/` paths** (alphabetically)
3. **React value imports** (from 'react')
4. **Third-party libraries** (alphabetically by source: clsx, zod, etc.)
5. **Relative imports** (siblings, direct children, direct parents)
6. **Type imports from React** (import type from 'react') - comes last

**Separate code and type imports**: If importing both code and types from the same file, use separate import statements.

Example:
```typescript
import { Main } from '@/components/Main';
import { useGlobals } from '@/hooks';
import type { ChordData } from '@/types';
import { useState } from 'react';
import clsx from 'clsx';
import { IconButton } from './IconButton';
import type { ReactNode } from 'react';
```

### Index Files (index.ts)

All `index.ts` files MUST use direct export statements (NOT import-then-export pattern).

#### Pattern

**Standard Format**:
```typescript
// ✅ Correct - Direct export pattern
export { ComponentA } from './ComponentA';
export { ComponentB } from './ComponentB';
export { NamedExport } from './NamedExport';
```

**Key Rules**:
- ✅ **Always use direct exports** - `export { X } from './X'` pattern
- ❌ **Never use import-then-export pattern** - Do not import then export separately
- ❌ **Never use `export { default as ... }` syntax** - This pattern is not allowed
- ✅ **Group related exports** - Organize exports logically with comments (defaults, shared, contexts, etc.) - optional
- ✅ **Alphabetize exports** - Keep exports in alphabetical order within each group
- ✅ **One export per line** - Format exports on separate lines for clarity

#### Examples

**Simple Component Directory**:
```typescript
// src/components/buttons/index.ts
export { AddButton } from './AddButton';
export { EditButton } from './EditButton';
export { IconButton } from './IconButton';
export { RemoveButton } from './RemoveButton';
```

**Multiple Groups with Comments**:
```typescript
// src/context/index.ts
// Defaults
export { initialTonic, initialVariant, initialUsingFlats } from './defaults';

// Shared
export { useChordState } from './shared/useChordState';
export { useScaleState } from './shared/useScaleState';

// Contexts
export { ChordsContext, ChordsContextProvider } from './Chords';
export { GlobalsContext, GlobalsContextProvider } from './Globals';
```

**Multiple Exports from Same File**:
```typescript
// ✅ Correct - Multiple exports from same file
export { Button, Icon, Label } from './Button';
```

**Exports with Aliases**:
```typescript
// ✅ Correct - Export with alias
export { ScalesIndex as Scales } from './Scales';
```

**Type Exports**:
```typescript
// src/types/index.ts
export type { ChordData, ChordGroup, ChordInfo } from './chords';
export type { Notes_Flats, Notes_Sharps } from './notes';
```

#### When to Create Index Files

- ✅ **Create `index.ts`** in directories with multiple related files that should be consumed together
- ✅ **Create `index.ts`** for directories that export functionality used by other parts of the application
- ❌ **Do NOT create `index.ts`** if a directory already has `index.tsx` (e.g., page components)
- ❌ **Do NOT create `index.ts`** in test directories (`__tests__`, `__test__`)

#### Benefits

1. **Consistency**: All index files follow the same pattern, making them easy to understand and maintain
2. **Clarity**: Import-then-export pattern makes it clear what's being exported
3. **Flexibility**: Easy to add re-exports, aliases, or transformations if needed
4. **Maintainability**: Changes to source files don't require changes to index file syntax

#### Important Notes

- **Use direct exports only**: Always use `export { X } from './X'` pattern (NOT import-then-export)
- Keep index files simple - they are re-export files, not implementation files
- If a component's export name changes, update it in the index file
- Use consistent formatting across all index files
- Group related exports with comments only when it adds clarity
- One export per line for better readability

## State Management

The application uses a hybrid approach combining Zustand stores and React Context API.

### Zustand Stores

- Create stores in `src/stores/` directory
- Use Zustand for managing tonic and variant state
- Persist to sessionStorage (clears on page refresh)
- Validate data with Zod schemas on load and save
- Export hooks from `src/stores/index.ts`

**Store Pattern**:
```typescript
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { NoteIndexSchema, ScaleTypeSchema } from '@/schemas';

type ScalesStore = {
  tonic: NoteIndex;
  variant: ScaleType;
  setTonic: (tonic: NoteIndex) => void;
  setVariant: (variant: ScaleType) => void;
  reset: () => void;
};

export const useScalesStore = create<ScalesStore>()(
  persist(
    (set) => ({
      tonic: 0,
      variant: 'major',
      setTonic: (tonic) => set({ tonic }),
      setVariant: (variant) => set({ variant }),
      reset: () => set({ tonic: 0, variant: 'major' }),
    }),
    {
      name: 'scales-store',
      storage: createJSONStorage(() => customSessionStorage),
    }
  )
);
```

### Context API Usage

- **AppProviders** (`@/context/AppProviders`) composes all context providers in order: Globals → Tunings → Scales → Chords → Play. Use `AppProviders` in `App.tsx`; do not nest individual providers at the root.
- Create context in `src/context/[Feature]/`
- Export provider and custom hook
- Use custom hooks (e.g., `useGlobals()`, `useTunings()`) instead of `useContext()` directly
- Context providers can use Zustand stores for state management
- Context provides computed values and additional functionality

### State Persistence

**sessionStorage (Zustand stores)**:
- Use for tonic and variant state (persists during navigation, clears on refresh)
- Validate with Zod schemas in custom storage implementation
- Automatically detect page refresh and clear storage

**localStorage (useLocalStorage hook)**:
- Use `useLocalStorage` hook for UI preferences that should persist across refreshes
- Always provide a Zod schema when using `useLocalStorage`
- Handle localStorage errors gracefully (validation errors fall back to defaults)
- Log validation errors to console for debugging

### State Updates

- Keep state updates pure and predictable
- Use functional updates when state depends on previous state
- Avoid unnecessary re-renders

## Component Development

### Component Guidelines

1. **Single Responsibility**: Each component should have one clear purpose
2. **Composition**: Prefer composition over complex prop drilling
3. **Reusability**: Extract reusable logic into custom hooks
4. **Accessibility**: Use semantic HTML and ARIA attributes where appropriate

### Props Interface

- Always define TypeScript interfaces for props
- Use descriptive prop names
- Document complex props with JSDoc comments

### Custom Hooks

- Extract reusable logic into custom hooks
- Place hooks in `src/hooks/`
- Prefix hook names with `use`
- Return objects for multiple values, not arrays (for better destructuring)

## Styling

### Tailwind CSS

- Use utility classes for styling
- The project uses `tailwind.config.js` for content and theme; extend there or in `@tailwindcss/postcss` / CSS as needed (Tailwind v4)
- Use responsive prefixes (`sm:`, `md:`, `lg:`, etc.)
- Follow mobile-first approach
- Use `clsx` for conditional className construction

### CSS Organization

- Global styles in `src/globals.css`
- Component-specific styles via Tailwind classes
- Avoid inline styles (use Tailwind utilities)

## Testing

The project uses a comprehensive testing setup with Vitest and Playwright. See [TESTING.md](../TESTING.md) for detailed documentation.

### Test Commands

```bash
# Run unit and component tests once (CI mode) (Vitest)
bun run test

# Run tests in watch mode (development)
bun run test:watch

# Run tests with Vitest UI
bun run test:ui

# Run tests with coverage report
bun run test:coverage

# Run E2E tests with Playwright
bun run test:e2e

# Run E2E tests with Playwright UI
bun run test:e2e:ui

# Run E2E tests in headed mode (visible browser)
bun run test:e2e:headed

# Run both unit and E2E tests
bun run test:all
```

**Note**: Use `bun run test` (not `bun test`) to run Vitest. Bun's built-in test runner (`bun test`) is not recommended for this project due to compatibility issues with Testing Library.

### Test Structure

```
src/
├── utils/
│   └── __tests__/          # Unit tests for utility functions
├── components/
│   └── __tests__/          # Component tests
├── hooks/
│   └── __tests__/          # Hook tests
└── test/
    ├── setup.ts            # Test setup and mocks
    └── test-utils.tsx      # Testing utilities and helpers

e2e/
├── scales.spec.ts          # E2E tests for scales page
├── chords.spec.ts          # E2E tests for chords page
├── play.spec.ts            # E2E tests for play page
├── navigation.spec.ts      # E2E tests for navigation
└── fixtures/               # e.g. import-all.json for Import E2E tests
```

Other: `src/__tests__/` (e.g. schemas), `src/context/__tests__/`, `src/context/shared/__tests__/`, `src/stores/__tests__/`, `src/components/displays/instruments/__tests__/` (including `Piano/`).

### Writing Tests

#### Unit Tests

Unit tests are for pure functions and utilities:

```typescript
import { describe, expect, it } from 'vitest';
import { getNote } from '../notes';

describe('getNote', () => {
  it('should return correct note using sharps', () => {
    expect(getNote(0, false)).toBe('C');
  });
});
```

#### Component Tests

Component tests use React Testing Library:

```typescript
import { render, screen } from '../../test/test-utils';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

#### E2E Tests

E2E tests use Playwright:

```typescript
import { test, expect } from '@playwright/test';

test('should navigate to scales page', async ({ page }) => {
  await page.goto('/scales');
  await expect(page).toHaveURL(/.*scales/);
});
```

### Test Utilities

- **test-utils.tsx**: Provides a custom `render` function that includes context providers
- **setup.ts**: Configures `@testing-library/jest-dom` matchers, mocks browser APIs (matchMedia, IntersectionObserver, AudioContext), and cleanup after each test

### Testing Best Practices

1. **Test behavior, not implementation**: Focus on what users see and do
2. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Keep tests isolated**: Each test should be independent
4. **Write descriptive test names**: Use clear descriptions of what is being tested
5. **Test user interactions**: Use `@testing-library/user-event` for interactions
6. **Mock external dependencies**: Mock APIs, localStorage, etc.
7. **Keep E2E tests focused**: Test critical user flows, not every detail

### Code Quality

### Running Linter

```bash
bun lint
```

### Formatting Code

```bash
bun format
```

## Git Workflow

### Commit Messages

Follow the format outlined in [GIT_COMMITS.md](./GIT_COMMITS.md):

```
TYPE: Commit Message in Title Case
```

Valid types: `ADD`, `FIX`, `UPDATE`, `REFACTOR`, `REMOVE`, `REVERT`, `MERGE`, `BRANCH`, `DEPLOY`

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/refactor-description` - Code refactoring
- `update/update-description` - Updates to existing features

## Code Quality

### Linting

- Biome is configured for linting
- Run `bun lint` before committing
- Fix all linting errors

### Formatting

- Biome handles code formatting
- Run `bun format` to auto-format code
- Format on save is recommended

### Type Checking

- TypeScript compiler checks types
- Fix all type errors before committing
- **Avoid type assertions**: Use type guards with Zod validation instead of `as Type`
- **Type guard functions**: Create in `utils/` files (e.g., `isValidNoteIndex`, `isValidScaleType`, `isValidChordVariant`)
- **Pattern**: Always combine Zod's `safeParse()` with type guard functions for runtime validation and type narrowing

## Performance Considerations

### React Performance

- Use `React.memo()` for expensive components
- Avoid unnecessary re-renders
- Optimize context usage (split contexts when appropriate)

### Bundle Size

- Use dynamic imports for code splitting if needed
- Avoid large dependencies
- Tree-shaking is automatic with Vite

## Debugging

### Development Tools

- React DevTools for component inspection
- Browser DevTools for network and performance
- TypeScript compiler for type errors

### Common Issues

1. **Type Errors**: Check TypeScript compiler output
2. **Context Issues**: Verify context provider hierarchy in `App.tsx`
3. **Routing Issues**: Check tab state management and URL synchronization in `App.tsx`
4. **State Issues**: Use React DevTools to inspect state

## Best Practices

### Do's

✅ Use TypeScript for all code  
✅ Use Zod schemas for runtime validation  
✅ Follow the established component structure  
✅ Use custom hooks for reusable logic  
✅ Use Zustand stores for tonic/variant state (sessionStorage)  
✅ Use localStorage for UI preferences that should persist across refreshes  
✅ Persist important state with Zod validation  
✅ Use semantic HTML  
✅ Write descriptive commit messages  
✅ Format code before committing  

### Don'ts

❌ Use `any` type  
❌ Skip Zod schema validation for localStorage or sessionStorage  
❌ Create deeply nested component structures  
❌ Mutate state directly  
❌ Use inline styles (use Tailwind)  
❌ Commit without linting/formatting  
❌ Use straight apostrophes in user-facing text (use typographic apostrophe ')  

## User-Facing Text

**Important**: All user-facing text MUST use the typographic apostrophe (') instead of the straight apostrophe (').

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Vite Documentation](https://vitejs.dev)

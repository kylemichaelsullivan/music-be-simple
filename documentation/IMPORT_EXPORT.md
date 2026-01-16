# Import and Export Rules

This document defines the standardized rules for imports and exports throughout the application.

## Import Rules

### 1. All Imports at Top
- **All imports must be at the top of the file**
- **No blank lines between import groups** (allows automatic sorting)
- Imports should be grouped and sorted automatically by the formatter

### 2. Import Path Rules

#### Use Relative Imports For:
- **Siblings**: Files in the same directory
  ```tsx
  // ✅ Correct - Same directory
  import { IconButton } from './IconButton';
  ```
- **Direct Child**: One level down
  ```tsx
  // ✅ Correct - Direct child
  import { Key } from './Key';
  ```
- **Direct Parent**: One level up (but NOT root level)
  ```tsx
  // ✅ Correct - Direct parent
  import { Fret } from '../Fret';
  ```

#### Use `@/` Alias For:
- **Cross-directory imports**: Anything that's not a sibling, direct child, or direct parent
- **Root level imports**: Imports from root-level files (e.g., `@/navigation`, `@/instruments`)
- **Deep imports**: More than one level away

```tsx
// ✅ Correct - Cross-directory
import { Main } from '@/components/Main';
import { useScales } from '@/hooks';
import { TABS } from '@/navigation';

// ❌ Incorrect - Should use relative for sibling
import { IconButton } from '@/components/buttons/IconButton';
```

### 3. Import Order

Imports should be ordered as follows (alphabetically within each group):

1. **Internal project imports with `@/` alias** (alphabetically by path: components, context, hooks, instruments, navigation, schemas, stores, utils)
   ```tsx
   import { Main } from '@/components/Main';
   import { useScales } from '@/hooks';
   import { TABS } from '@/navigation';
   ```

2. **Type imports from `@/types` and other `@/` paths** (alphabetically)
   ```tsx
   import type { TabType } from '@/types';
   import type { IconType } from '@/instruments';
   ```

3. **React value imports**
   ```tsx
   import { useState } from 'react';
   import { memo } from 'react';
   ```

4. **Third-party libraries** (alphabetically by source)
   ```tsx
   import clsx from 'clsx';
   import { z } from 'zod';
   ```

5. **Relative imports** (alphabetically)
   ```tsx
   import { IconButton } from './IconButton';
   import { Key } from './Key';
   ```

6. **Type imports from React** (comes last)
   ```tsx
   import type { ReactNode } from 'react';
   import type { ChangeEvent } from 'react';
   ```

### 4. Separate Code and Type Imports

**If importing both code and types from the same file, use separate import statements:**

```tsx
// ✅ Correct - Separate imports
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';

// ❌ Incorrect - Combined import
import { type RenderOptions, render } from '@testing-library/react';
```

### Example

```tsx
import { Main } from '@/components/Main';
import { useScales } from '@/hooks';
import type { NoteIndex } from '@/types';
import { memo } from 'react';
import clsx from 'clsx';
import { IconButton } from './IconButton';
import type { ReactNode } from 'react';
```

## Export Rules

### 1. Named Exports Only
- **Always use named exports** - NO default exports
- Export components as: `export function ComponentName() { ... }`
- Export constants/utilities as: `export const ConstantName = ...`

```tsx
// ✅ Correct
export function ComponentName() { ... }

// ❌ Incorrect
export default function ComponentName() { ... }
```

### 2. Index Files (index.ts)

- **Each folder should have an `index.ts` that does direct exports**
- **Use direct export statements** (NOT import-then-export pattern)

```tsx
// ✅ Correct - Direct exports
export { ComponentA } from './ComponentA';
export { ComponentB } from './ComponentB';
export { NamedExport } from './NamedExport';

// ❌ Incorrect - Import-then-export
import { ComponentA } from './ComponentA';
export { ComponentA };
```

#### Multiple Exports from Same File
```tsx
// ✅ Correct
export { Button, Icon, Label } from './Button';
```

#### Exports with Aliases
```tsx
// ✅ Correct
export { ScalesIndex as Scales } from './Scales';
```

### 3. Memoized Components

- **Memoized components should have their export at the bottom of the file as a named export**

```tsx
// ✅ Correct - Export at bottom
import { memo } from 'react';

function ComponentName() {
  // ... component code
}

export const ComponentName = memo(ComponentName);
```

```tsx
// ✅ Also correct - Inline memo with named export at bottom
import { memo } from 'react';

const ComponentName = memo(function ComponentName() {
  // ... component code
});

export { ComponentName };
```

## Examples

### Component File
```tsx
import { Main } from '@/components/Main';
import { useScales } from '@/hooks';
import type { NoteIndex } from '@/types';
import { memo } from 'react';
import clsx from 'clsx';
import { IconButton } from './IconButton';
import type { ReactNode } from 'react';

type ComponentProps = {
  note: NoteIndex;
};

function ComponentName({ note }: ComponentProps) {
  const { tonic } = useScales();
  
  return (
    <Main componentName='ComponentName'>
      <IconButton />
    </Main>
  );
}

export const ComponentName = memo(ComponentName);
```

### Index File
```tsx
export { ComponentA } from './ComponentA';
export { ComponentB } from './ComponentB';
export { ComponentC } from './ComponentC';
```

## Enforcement

These rules are enforced through:
1. **Documentation**: This file and `.cursor/rules.mdc`
2. **Code Review**: Manual review during PRs
3. **Biome**: Automatic import organization (when configured)
4. **Linting**: TypeScript and Biome linting rules

## Common Violations

### ❌ Using `@/` for Siblings
```tsx
// ❌ Incorrect
import { IconButton } from '@/components/buttons/IconButton';

// ✅ Correct
import { IconButton } from './IconButton';
```

### ❌ Using Relative for Cross-Directory
```tsx
// ❌ Incorrect
import { Main } from '../../components/Main';

// ✅ Correct
import { Main } from '@/components/Main';
```

### ❌ Default Exports
```tsx
// ❌ Incorrect
export default function Component() { ... }

// ✅ Correct
export function Component() { ... }
```

### ❌ Import-Then-Export in Index Files
```tsx
// ❌ Incorrect
import { Component } from './Component';
export { Component };

// ✅ Correct
export { Component } from './Component';
```

### ❌ Memoized Component Export at Top
```tsx
// ❌ Incorrect
export const Component = memo(function Component() { ... });

// ✅ Correct
function Component() { ... }
export const Component = memo(Component);
```

### ❌ Combined Code and Type Imports
```tsx
// ❌ Incorrect - Combined import from same file
import { type RenderOptions, render } from '@testing-library/react';

// ✅ Correct - Separate imports
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
```

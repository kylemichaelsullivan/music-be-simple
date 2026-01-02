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

### React

- Use **React 19** features and patterns
- Prefer function components with hooks
- Use TypeScript for component props
- Follow component naming conventions (PascalCase)

### Component Structure

```typescript
// Component file structure
import { ... } from '@/...';

interface ComponentProps {
  // Props definition
}

export default function Component({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### File Naming

- Components: PascalCase (e.g., `Guitar.tsx`)
- Utilities: camelCase (e.g., `notes.ts`)
- Types: camelCase (e.g., `chords.ts`)
- Routes: camelCase (e.g., `chords.tsx`)

### Import Organization

1. External dependencies
2. Internal imports from `@/` alias
3. Relative imports
4. Type imports (use `import type`)

Example:
```typescript
import { useState } from 'react';
import { useGlobals } from '@/hooks/useGlobals';
import { NoteIndex } from '@/types';
import type { ChordData } from '@/types/chords';
```

## State Management

### Context API Usage

- Create context in `src/context/[Feature]/`
- Export provider and custom hook
- Use custom hooks (e.g., `useGlobals()`) instead of `useContext()` directly

### State Persistence

- Use `useLocalStorage` hook for persistent state
- Implement persistence in context providers
- Handle localStorage errors gracefully

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
- Create custom utilities in `tailwind.config.js` if needed
- Use responsive prefixes (`sm:`, `md:`, `lg:`, etc.)
- Follow mobile-first approach

### CSS Organization

- Global styles in `src/globals.css`
- Component-specific styles via Tailwind classes
- Avoid inline styles (use Tailwind utilities)

## Testing

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
- Use type assertions sparingly

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
2. **Context Issues**: Verify context provider hierarchy
3. **Routing Issues**: Check route definitions and navigation
4. **State Issues**: Use React DevTools to inspect state

## Best Practices

### Do's

✅ Use TypeScript for all code  
✅ Follow the established component structure  
✅ Use custom hooks for reusable logic  
✅ Persist important state to localStorage  
✅ Use semantic HTML  
✅ Write descriptive commit messages  
✅ Format code before committing  

### Don'ts

❌ Use `any` type  
❌ Create deeply nested component structures  
❌ Mutate state directly  
❌ Use inline styles (use Tailwind)  
❌ Commit without linting/formatting  
❌ Use straight apostrophes in user-facing text (use typographic apostrophe ')  

## User-Facing Text

**Important**: All user-facing text MUST use the typographic apostrophe (') instead of the straight apostrophe (').

## Resources

- [React Documentation](https://react.dev)
- [TanStack Router Documentation](https://tanstack.com/router)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Vite Documentation](https://vitejs.dev)

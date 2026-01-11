# Testing Guide

This project uses a comprehensive testing setup with multiple testing strategies:

## Testing Stack

- **Unit Tests**: Vitest + React Testing Library
- **Component Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright
- **Coverage**: Vitest Coverage (v8)

## Running Tests

### Unit & Component Tests (Vitest)

```bash
# Run tests once (CI mode)
bun run test

# Run tests in watch mode (development)
bun run test:watch

# Run tests with UI
bun run test:ui

# Run tests with coverage
bun run test:coverage
```

**Note**: Use `bun run test` (not `bun test`) to run Vitest. Bun's built-in test runner (`bun test`) is not recommended for this project due to compatibility issues with Testing Library.

### E2E Tests (Playwright)

```bash
# Run all E2E tests
bun run test:e2e

# Run E2E tests with UI
bun run test:e2e:ui

# Run E2E tests in headed mode (see browser)
bun run test:e2e:headed
```

### Run All Tests

```bash
# Run both unit and E2E tests
bun run test:all
```

## Test Structure

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
└── navigation.spec.ts      # E2E tests for navigation
```

## Writing Tests

### Unit Tests

Unit tests are for pure functions and utilities. Example:

```typescript
import { describe, expect, it } from 'vitest';
import { getNote } from '../notes';

describe('getNote', () => {
  it('should return correct note using sharps', () => {
    expect(getNote(0, false)).toBe('C');
  });
});
```

### Component Tests

Component tests use React Testing Library. Example:

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

### E2E Tests

E2E tests use Playwright. Example:

```typescript
import { test, expect } from '@playwright/test';

test('should navigate to scales page', async ({ page }) => {
  await page.goto('/scales');
  await expect(page).toHaveURL(/.*scales/);
});
```

## Test Utilities

### `test-utils.tsx`

Provides a custom `render` function that includes router context and other providers:

```typescript
import { render } from '@/test/test-utils';

render(<MyComponent />);
```

### Test Setup

The `setup.ts` file configures:
- `@testing-library/jest-dom` matchers
- Mock implementations for browser APIs (matchMedia, IntersectionObserver, AudioContext)
- Cleanup after each test

## Coverage

Coverage reports are generated in the `coverage/` directory. To view:

```bash
bun run test:coverage
# Then open coverage/index.html in your browser
```

## Best Practices

1. **Test behavior, not implementation**: Focus on what users see and do
2. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Keep tests isolated**: Each test should be independent
4. **Write descriptive test names**: Use clear descriptions of what is being tested
5. **Test user interactions**: Use `@testing-library/user-event` for interactions
6. **Mock external dependencies**: Mock APIs, localStorage, etc.
7. **Keep E2E tests focused**: Test critical user flows, not every detail

## CI/CD Integration

Tests can be run in CI/CD pipelines:

```bash
# In CI, run tests without watch mode
bun run test
bun run test:e2e
```

## Troubleshooting

### Tests failing with router errors

Make sure to use the `render` function from `test-utils.tsx` which includes router context.

### E2E tests timing out

Check that the dev server is running or that `webServer` is configured correctly in `playwright.config.ts`.

### Coverage not generating

Ensure `@vitest/coverage-v8` is installed and the `--coverage` flag is used.

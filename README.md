# Music Be Simple

A simple and intuitive web application for learning and exploring music theory. Music Be Simple provides interactive visualizations of scales and chords across multiple instruments (Piano, Guitar, Banjo, Ukulele, Mandolin), allowing users to understand music theory concepts through visual representation and audio playback.

## Features

- **Scales**: Explore musical scales and modes with interactive visualizations
- **Chords**: Visualize chord construction and relationships
- **Play**: Interactive instrument exploration with audio playback
- **Multi-Instrument Support**: Piano, Guitar, Banjo, Ukulele, and Mandolin
- **Transposition**: Transpose scales and chords up or down by fifths
- **Note Display Options**: Toggle between flats and sharps, show/hide note labels

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TanStack Router** - Type-safe routing
- **React Context API** - State management
- **Zod** - Runtime type validation and schema definition
- **Tailwind CSS** - Utility-first styling
- **Biome** - Fast linter and formatter
- **Vitest** - Unit and component testing
- **React Testing Library** - Component testing utilities
- **Playwright** - End-to-end testing

## Getting Started

### Prerequisites

- **Bun** (v1.0 or later) - Package manager and runtime

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd music-be-simple
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `bun dev` - Start development server with hot module replacement
- `bun run build` - Build for production
- `bun lint` - Run Biome linter
- `bun format` - Format code with Biome
- `bun run test` - Run unit and component tests once (CI mode) (Vitest)
- `bun run test:watch` - Run tests in watch mode (Vitest)
- `bun run test:ui` - Run tests with Vitest UI
- `bun run test:coverage` - Run tests with coverage report
- `bun run test:e2e` - Run end-to-end tests with Playwright
- `bun run test:e2e:ui` - Run E2E tests with Playwright UI
- `bun run test:e2e:headed` - Run E2E tests in headed mode (visible browser)
- `bun run test:all` - Run both unit and E2E tests

## Project Structure

```
src/
├── components/     # React components
│   └── __tests__/  # Component tests
├── context/        # React Context providers
├── hooks/          # Custom React hooks
│   └── __tests__/  # Hook tests
├── pages/          # Page components
├── routes/         # TanStack Router route definitions
├── schemas.ts      # Zod schema definitions
├── test/           # Test utilities and setup
│   ├── setup.ts    # Test setup and mocks
│   └── test-utils.tsx # Testing utilities
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
    └── __tests__/  # Unit tests

e2e/                # End-to-end tests
├── scales.spec.ts
├── chords.spec.ts
├── play.spec.ts
└── navigation.spec.ts
```

For detailed architecture information, see [ARCHITECTURE.md](./documentation/ARCHITECTURE.md).

## Schema Validation

The application uses **Zod** for runtime type validation, providing an additional layer of type safety beyond TypeScript's compile-time checks. All localStorage data and user inputs are validated using Zod schemas defined in `src/schemas.ts`. This ensures data integrity and prevents runtime errors from invalid data.

For more information about schema validation, see [ARCHITECTURE.md](./documentation/ARCHITECTURE.md#schema-validation-system).

## Testing

The project uses a comprehensive testing setup with multiple testing strategies:

- **Unit Tests**: Vitest + React Testing Library for utility functions and hooks
- **Component Tests**: Vitest + React Testing Library for React components
- **E2E Tests**: Playwright for end-to-end user flow testing
- **Coverage**: Vitest Coverage (v8) for code coverage reports

See [TESTING.md](./documentation/TESTING.md) for detailed testing documentation.

### Quick Test Commands

```bash
# Run unit and component tests once (CI mode)
bun run test

# Run tests in watch mode (development)
bun run test:watch

# Run E2E tests
bun run test:e2e

# Run all tests
bun run test:all
```

## Development

See [DEVELOPMENT.md](./documentation/DEVELOPMENT.md) for development guidelines and best practices.

## Contributing

When contributing to this project, please follow the commit message format outlined in [GIT_COMMITS.md](./documentation/GIT_COMMITS.md).

## Documentation

- [ARCHITECTURE.md](./documentation/ARCHITECTURE.md) - Project structure and architecture
- [DEVELOPMENT.md](./documentation/DEVELOPMENT.md) - Development guidelines
- [COMPONENTS.md](./documentation/COMPONENTS.md) - Component documentation
- [CONTEXT.md](./documentation/CONTEXT.md) - Context API and state management
- [GIT_COMMITS.md](./documentation/GIT_COMMITS.md) - Commit message guidelines
- [TESTING.md](./documentation/TESTING.md) - Testing guide and best practices

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

The MIT License is a permissive open-source license that allows:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

The only requirement is that the license and copyright notice are included in copies of the software.

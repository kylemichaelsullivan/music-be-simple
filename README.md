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
- **Tailwind CSS** - Utility-first styling
- **Biome** - Fast linter and formatter

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

## Project Structure

```
src/
├── components/     # React components
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── routes/         # TanStack Router route definitions
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

For detailed architecture information, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Development

See [DEVELOPMENT.md](./DEVELOPMENT.md) for development guidelines and best practices.

## Contributing

When contributing to this project, please follow the commit message format outlined in [GIT_COMMITS.md](./GIT_COMMITS.md).

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Project structure and architecture
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development guidelines
- [COMPONENTS.md](./COMPONENTS.md) - Component documentation
- [CONTEXT.md](./CONTEXT.md) - Context API and state management
- [GIT_COMMITS.md](./GIT_COMMITS.md) - Commit message guidelines

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

The MIT License is a permissive open-source license that allows:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

The only requirement is that the license and copyright notice are included in copies of the software.

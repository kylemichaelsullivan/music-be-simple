import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		rollupOptions: {
			output: {
				// Keep barrel files and their re-exported modules in the same chunk
				// so Rollup doesn't warn about circular dependencies between chunks.
				// Do not put hooks in a separate chunk: the hooks chunk pulls in react-dnd,
				// which uses React.createContext, and can see React as undefined at load time on Vercel.
				// If circular dependency warnings reappear (context ↔ hooks barrel), fix by having
				// context providers import from specific hook files (e.g. @/hooks/useGlobals) instead of @/hooks.
				manualChunks(id) {
					if (id.includes('/src/components/icons/')) return 'icons';
					if (id.includes('/src/components/buttons/')) return 'buttons';
				},
			},
		},
	},
});

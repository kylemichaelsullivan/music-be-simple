import { App } from './App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';

const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}

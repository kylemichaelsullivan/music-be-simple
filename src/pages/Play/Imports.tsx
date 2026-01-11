import { usePlay } from '@/hooks';
import type { SaveActionType } from '@/types';
import { useRef } from 'react';
import { SaveSectionButtons } from './';

export function Imports() {
	const { importChordBin, importNotepad, importAll } = usePlay();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const importTypeRef = useRef<'chordBin' | 'notepad' | 'all'>('all');

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const content = e.target?.result as string;
				const data = JSON.parse(content);

				if (importTypeRef.current === 'chordBin') {
					if (Array.isArray(data.chordBin)) {
						importChordBin(data.chordBin);
					} else {
						alert('Invalid Chord Bin data format');
					}
				} else if (importTypeRef.current === 'notepad') {
					if (Array.isArray(data.notepad)) {
						importNotepad(data.notepad);
					} else {
						alert('Invalid Notepad data format');
					}
				} else if (importTypeRef.current === 'all') {
					if (Array.isArray(data.chordBin) && Array.isArray(data.notepad)) {
						importAll(data);
					} else {
						alert('Invalid data format');
					}
				}
			} catch (error) {
				alert('Failed to parse JSON file');
				console.error('Import error:', error);
			}
		};
		reader.readAsText(file);

		// Reset the input so the same file can be selected again
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleImportChordBin = () => {
		importTypeRef.current = 'chordBin';
		fileInputRef.current?.click();
	};

	const handleImportNotepad = () => {
		importTypeRef.current = 'notepad';
		fileInputRef.current?.click();
	};

	const handleImportAll = () => {
		importTypeRef.current = 'all';
		fileInputRef.current?.click();
	};

	const saves = {
		'Chord Bin': handleImportChordBin,
		Notepad: handleImportNotepad,
		All: handleImportAll,
	};

	const action: SaveActionType = 'Import';

	return (
		<div className='Imports flex flex-col flex-1 gap-4'>
			<h3 className='text-xl font-semibold text-center'>Import</h3>
			<input
				ref={fileInputRef}
				type='file'
				accept='application/json,.json'
				onChange={handleFileChange}
				className='hidden'
			/>
			<SaveSectionButtons saves={saves} action={action} />
		</div>
	);
}

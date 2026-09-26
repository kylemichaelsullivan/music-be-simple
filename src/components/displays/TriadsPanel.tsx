const TRIADS_IMAGE_SRC = '/images/The_Realest_Book.webp';

export function TriadsPanel() {
	return (
		<img
			className='TriadsPanel w-full h-auto rounded-lg border border-slate-300 bg-white'
			src={TRIADS_IMAGE_SRC}
			alt='Triads reference'
		/>
	);
}

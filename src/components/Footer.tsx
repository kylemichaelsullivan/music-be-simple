export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className='Footer font-bold text-center border-t p-2'>
			<p>&copy; {year} Music Be Simple</p>
		</footer>
	);
}

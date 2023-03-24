import '../../src/styles/components/dark-mode-toggle.scss';
import { useState, useEffect } from 'react';
export default function DarkModeToggle() {
	const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'dark');

	function handleClick() {
		console.log('click');
		setTheme(theme === 'light' ? 'dark' : 'light');
	}

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('theme', theme);
	}, [theme]);

	return (
		<button onClick={handleClick} className="dark-mode-toggle">
			<span>Toggle Dark Mode {theme === 'light' ? '🌙' : '🌞'}</span>
		</button>
	);
}

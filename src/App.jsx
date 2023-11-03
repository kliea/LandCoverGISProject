import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Maps from './pages/Maps';
import About from './pages/About';

export default function App() {
	return (
		<main className='h-screen w-screen'>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/about' element={<About />} />
				<Route path='/maps' element={<Maps />} />
			</Routes>
		</main>
	);
}

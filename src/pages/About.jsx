import React from 'react';
import Container from './layouts/Container';

export default function About() {
	return (
		<Container>
			<h1>About</h1>
			<h1>Members</h1>
			<div className='flex gap-5'>
				<h1 className='bg-white p-5'>Klinth</h1>
				<h1 className='bg-white p-5'>Gio</h1>
				<h1 className='bg-white p-5'>Fritzie</h1>
				<h1 className='bg-white p-5'>Junward</h1>
				<h1 className='bg-white p-5'>Armiex</h1>
				<h1 className='bg-white p-5'>Jeric</h1>
				<h1 className='bg-white p-5'>Dino</h1>
			</div>
		</Container>
	);
}

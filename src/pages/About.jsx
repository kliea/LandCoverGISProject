import React from 'react';
import Container from './layouts/Container';

export default function About() {
	return (
		<Container id='About'>
			<div className='h-full w-full flex flex-col bg-[#ECDED5] p-4'>
				<h1 className='text-lg sm:text-xl font-bold'>About</h1>
				<h1 className='text-lg sm:text-xl font-bold'>Members</h1>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 bg-black'>
					<h1 className='bg-white p-5'>Klinth</h1>
					<h1 className='bg-white p-5'>Gio</h1>
					<h1 className='bg-white p-5'>Fritzie</h1>
					<h1 className='bg-white p-5'>Junward</h1>
					<h1 className='bg-white p-5'>Armiex</h1>
					<h1 className='bg-white p-5'>Jeric</h1>
					<h1 className='bg-white p-5'>Dino</h1>
				</div>
			</div>
		</Container>
	);
}

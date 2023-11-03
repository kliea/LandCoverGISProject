import React from 'react';
import Button from './Button';

export default function Navbar() {
	return (
		<nav className='flex flex-row pt-10 w-full justify-between px-20 font-bold text-xl text-black'>
			<div className='text-[#36454F] text-2xl '>
				<h1>This is Title</h1>
			</div>
			<div className='flex gap-3 text-[#36454F] '>
				<Button route='/'>
					<h1 className='uppercase'>Dashboard</h1>
				</Button>
				<Button route='/about'>
					<h1 className='uppercase'>About</h1>
				</Button>
				<Button route='/maps'>
					<h1 className='uppercase'>Maps</h1>
				</Button>
			</div>
		</nav>
	);
}

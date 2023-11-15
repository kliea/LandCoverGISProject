import React from 'react';
import Button from './Button';
import LANDCOVER from '../assets/LANDCOVER.png';

export default function Navbar() {
	return (
		<nav className='flex flex-row fixed top-0 z-50 pb-10 sm:pt-6 md:pt-10 bg-[#07110b] w-full justify-between px-2 sm:px-6 md:px-10'>
			<div className='flex items-center text-xl md:text-5xl lg:text-3xl font-extrabold truncate'>
				<h1 className='text-orange-500'>LAND</h1>
				<h1 className='text-green-500'>COVER</h1>
			</div>
			<div className='hidden sm:flex gap-2 md:gap-3 text-[#F09841] font-bold'>
				<button>
					<Button to='Hero'>
						<h1 className='uppercase text-xl md:text-2xl'>Dashboard</h1>
					</Button>
				</button>
				<button>
					<Button to='Provinces'>
						<h1 className='uppercase text-xl md:text-2xl'>Provinces</h1>
					</Button>
				</button>
				<button>
					<Button to='Maps'>
						<h1 className='uppercase text-xl md:text-2xl'>Maps</h1>
					</Button>
				</button>
				<button>
					<Button to='About'>
						<h1 className='uppercase text-xl md:text-2xl'>About</h1>
					</Button>
				</button>
			</div>
		</nav>
	);
}

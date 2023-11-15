import React from 'react';
import Container from '../layouts/Container';
import Button from '../components/Button';
import LANDCOVER from '../assets/LANDCOVER.png';
import background from '../assets/background.jpg';

export default function Dashboard() {
	return (
		<Container id='Hero'>
			<div
				className='h-full w-full flex justify-between bg-cover bg-center bg-[#ECDED5] gap-10'
				style={{ backgroundImage: `url(${background})` }}>
				<div className='flex flex-col items-start pl-20 pt-20 pr-96 text-white'>
					<h1 className='text-[11rem] font-extrabold leading-none mt-0 mb-2'>
						THE
					</h1>
					<h1 className='text-[11rem] text-orange-500  font-extrabold leading-none mt-0 mb-2'>
						LAND
					</h1>
					<h1 className='text-[11rem] text-green-500  font-extrabold leading-none mt-0 mb-2'>
						COVER
					</h1>
					<h1 className='text-6xl font-extrabold leading-none mt-4 mb-6'>
						OF THE
					</h1>
					<h1 className='text-[11rem] font-extrabold leading-none mt-0 mb-2'>
						PHILIPPINES
					</h1>

					<h3 className='text-2xl'>
						A WEB-GIS Midterm Project in ITE18 GROUP 1
					</h3>
					<button className='mt-5 rounded-full border-orange-500 border-2 p-5 bg-[#0F2618]'>
						<Button to='Provinces'>
							<h1 className='uppercase font-extrabold text-white text-2xl'>Get Started</h1>
						</Button>
					</button>
				</div>
				<img src={LANDCOVER} className='h-full w-9/10' alt='logo' />
			</div>
		</Container>
	);
}

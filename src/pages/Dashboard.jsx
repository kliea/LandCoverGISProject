import React, { useEffect, useRef } from 'react';
import Typed from 'react-typed';
import Background from '../assets/background.jpg';
import Container from './layouts/Container';
import Button from '../components/Button';

export default function Dashboard() {
	return (
		<Container id='Hero'>
			<div
				className='h-full w-full bg-cover'
				style={{ backgroundImage: `url(${Background})` }}>
				<div className='h-full w-full  flex flex-col pt-28 p-4 drop-shadow-md'>
					{/* <img src={Background} className='w-fit' /> */}
					<h3 className='text-[#EDF5E1] text-[60px] pb-5'>
						We{' '}
						<span className='text-[#ffde59]'>
							<Typed
								strings={['Discover', 'Navigate', 'Delight']}
								typeSpeed={150}
								backSpeed={150}
								backDelay={150}
								loop
							/>
						</span>
					</h3>
					<div className='text-[green]'>
						<h1>CARAGA STATE UNIVERSITY</h1>
						<p className='text-[100px] font-[bolder] text-[#EDF5E1]'>
							The
							<br />
							Philippines'
							<br />
							<span className='text-[#549969]'>Land</span>{' '}
							<span className='text-[#ff9900]'>Cover</span>
						</p>
					</div>

					<button>
						<Button to='Provinces'>
							<h1 className='bg-black p-3 rounded-full border border-black w-[130px] text-lg text-[#549969] hover:bg-[#549969] hover:text-white'>
								Explore
							</h1>
						</Button>
					</button>
					<div className='text-white font-bold pt-10'>
						<h3>A WEB-GIS Project of ITE-18 GROUP 1</h3>
						<p>
							Caraga State University - Main, Ampayon, Butuan City, Agusan del
							Norte, Philippines
						</p>
					</div>
				</div>
			</div>
		</Container>
	);
}

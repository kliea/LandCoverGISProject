import React from 'react';
import background from '../../assets/bg.jpg';
import Navbar from '../../components/Navbar';

export default function Page({ children }) {
	return (
		<div className='flex flex-col h-screen w-screen bg-[#83C5BE]'>
			<div>
				<Navbar />
			</div>
			<div className='flex flex-col w-full h-full p-5 '>{children}</div>
		</div>
	);
}

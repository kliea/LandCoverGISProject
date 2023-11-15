import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Profile({ name, job, link, image }) {
	console.log(image);
	return (
		<div className=' h-full w-full p-10'>
			<div className='h-full w-full text-black rounded-xl flex flex-col justify-center gap-20'>
				<div className='h-56 w-56 self-center overflow-hidden'>
					<img src={image} alt={name} className='object-cover w-full h-full' />
				</div>
				<div className='flex flex-col justify-center items-center gap-2 pt-20 '>
					<h2 className='font-bold text-2xl items-center text-slate-50'>
						{name}
					</h2>
					<p className='font-bold text-slate-50'>{job}</p>
				</div>
				<div className='flex justify-center gap-4'>
					<a href={link}>
						<Facebook />
					</a>
					<Instagram />
					<Twitter />
				</div>
			</div>
		</div>
	);
}

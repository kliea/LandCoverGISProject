import React from 'react';
import useMaps from '../hooks/useMaps';

export default function Card({ name, description, image }) {
	// const { handleClick } = useMaps();

	const navClick = () => {
		console.log(name);
	};

	return (
		<div className='flex flex-col md:flex-row max-w-lg md:max-w-2xl bg-white rounded-xl shadow-md overflow-hidden mx-auto'>
			<img className='object-cover w-full md:w-1/3' src={image} alt={name} />
			<div className='p-6 flex flex-col justify-between'>
				<h5 className='text-lg md:text-xl font-bold text-gray-900'>{name}</h5>
				<p className='text-gray-700 text-base mb-4'>{description}</p>
				<button
					onClick={navClick}
					// onClick={handleClick} // Uncomment and use your onClick handler
					className='self-start bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors'>
					Navigate
				</button>
			</div>
		</div>
	);
}

import React, { useContext } from 'react';
import { CustomHookContext } from '../pages/layouts/HooksWrapper';
import { Link } from 'react-scroll';

export default function Card({ name, description, image }) {
	// const { handleClick } = useMaps();
	const { handleClick } = useContext(CustomHookContext);

	const navClick = () => {
		handleClick(name);
		// scroll here
	};

	return (
		<div className='flex flex-col md:flex-row max-w-lg md:max-w-2xl bg-white rounded-xl shadow-md overflow-hidden mx-auto'>
			<img className='object-cover w-full md:w-1/3' src={image} alt={name} />
			<div className='p-6 flex flex-col justify-between'>
				<h5 className='text-lg md:text-xl font-bold text-gray-900'>{name}</h5>
				<p className='text-gray-700 text-base mb-4'>{description}</p>
				<button className='self-start bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors'>
					<Link to='Maps' onClick={() => handleClick(name)}>
						Navigate
					</Link>
				</button>
			</div>
		</div>
	);
}

import React from 'react'

export default function Profile({name, job}) {
  return (
		<div className='flex  items-center justify-center'>
			<div className='w-72 rounded-lg  bg-[#004643] p-10 text-center shadow-lg dark:bg-gray-800'>
				<figure className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-600'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='48'
						height='48'
						fill='currentColor'
						className='bi bi-person-fill text-white dark:text-indigo-300'
						viewBox='0 0 16 16'>
						<path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'></path>
					</svg>
				</figure>
				<h2 className='mt-4 text-3xl font-bold text-[#fffffe]'>{name}</h2>
				<p className='mb-4 text-[#abd1c6]'>{job}</p>
				<div className='flex items-center justify-center'>
					<a
						href='#'
						className='rounded-full bg-[#f9bc60] px-6 py-3 text-[#001e1d] font-bold hover:bg-indigo-700 '>
						Contact
					</a>
				</div>
			</div>
		</div>
	);
}

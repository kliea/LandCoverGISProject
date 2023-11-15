import React, { useState } from 'react';
import Profile from './Profile';

export default function ProfileCarousel({ cards }) {
	const [activeIndex, setActiveIndex] = useState(0);

	const handlePrev = () => {
		setActiveIndex((prevIndex) =>
			prevIndex === 0 ? cards.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setActiveIndex((prevIndex) =>
			prevIndex === cards.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className='relative w-full h-full bg-green-900 hover:bg-emerald-700  rounded-3xl'>
			<div className='h-full w-full flex overflow-hidden'>
				{cards.map((card, index) => (
					<div
						key={card.name}
						className={`w-full h-full flex-shrink-0 transition-opacity duration-500 ease-in-out ${
							index === activeIndex ? 'opacity-100' : 'opacity-0'
						}`}
						style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
						<Profile
							name={card.name}
							job={card.job}
							link={card.link}
							image={card.image}
						/>
					</div>
				))}
			</div>
			<h1 className='absolute top-0 left-5 text-5xl font-bold text-[#FFA500]'>
				The Team
			</h1>
			<button
				onClick={handlePrev}
				className='absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-[#CC5500]  rounded-full p-3 m-4 hover:bg-[#FAD7A0] focus:outline-none'>
				‹
			</button>
			<button
				onClick={handleNext}
				className='absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-[#CC5500]  rounded-full p-3 m-4 hover:bg-[#FAD7A0] focus:outline-none'>
				›
			</button>
			<div className='absolute bottom-0 w-full flex justify-center p-4'>
				{cards.map((_, index) => (
					<button
						key={index}
						className={`h-2 w-2 rounded-full mx-1 ${
							index === activeIndex ? 'bg-orange-500' : 'bg-white'
						}`}
						onClick={() => setActiveIndex(index)}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}

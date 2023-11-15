import React from 'react';
import Carousel from '../components/Carousel';
import SurigaoSur from '../assets/Surigaodelsur.png';
import Agusandelsur from '../assets/Agusandelsur.png';
import Agusandelnorte from '../assets/Agusandelnorte.png';
import Dinagat from '../assets/Dinagat.png';
import Surigaodelnorte from '../assets/Surigaodelnorte.png';

export default function Provinces() {
	const cardData = [
		{
			name: 'Agusan Del Norte',
			description:
				'this region is rich with mosaic of land uses, including extensive agriculture, significant natural vegetation, and water features, interspersed with human settlements and potentially industrial or extractive activities.',
			image: Agusandelnorte,
		},
		{
			name: 'Agusan Del Sur',
			description:
				'this region exhibits a complex tapestry of land uses, where natural features such as forests, water bodies, and wetlands are interspersed with human-driven landscapes like agriculture, urban development, and possibly extractive industries. ',
			image: Agusandelsur,
		},
		{
			name: 'Dinagat',
			description:
				'this region has a balanced distribution of land cover types, including productive agricultural lands, significant forested areas, and a variety of water bodies, all interspersed with human settlements. The presence of wetlands and potential mangrove zones indicates ecological diversity, particularly in coastal areas, which might be key for environmental conservation efforts.',
			image: Dinagat,
		},
		{
			name: 'Surigao Del Norte',
			description:
				'this region boasts a variety of natural landscapes like forests, grasslands, and various types of water bodies, juxtaposed with human-utilized agricultural land. The presence of wetlands and potential mangrove forests, especially along the coastlines and the islands, suggests a rich ecological tapestry. Such areas are likely to be of high conservation value, providing critical services such as habitat for wildlife, storm protection, and water purification.',
			image: Surigaodelnorte,
		},
		{
			name: 'Surigao Del Sur',
			description:
				'this region has a rich array of natural habitats, from agricultural land to diverse forest types and aquatic ecosystems. The mix of these environments suggests a potential for a wide range of biodiversity and ecological services, as well as a landscape that supports various forms of land use by humans.',
			image: SurigaoSur,
		},
	];
	return (
		<section id='Provinces'>
			<div className='h-screen w-full flex flex-col pt-28 p-10 bg-[#2F5025]'>
				<h1 className=' text-5xl font-bold text-[#fffffe]'>
					The Choosen 5 Provinces
				</h1>
				<div className='h-full bg-black'>
					<Carousel cards={cardData} />
				</div>
			</div>
		</section>
	);
}

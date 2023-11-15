import React from 'react';
import img1 from '../assets/Images/Banaue Rice Terraces.jpg';
import ph_img from '../assets/Images/philippines.png';
import img2 from '../assets/Images/Bohol_Hills,_Chocolate_Hills,_Philippines.jpg';
import img3 from '../assets/Images/Taal Lake.jpg';
import img4 from '../assets/Images/Cagayan River.jpg';
import img5 from '../assets/Images/Palawan Rainforest.jpg';
import '../assets//Styles/Home.css';

const Home = () => {
	return (
		<div className='home'>
			<div className='container'>
				<div className='intro' id='intro-content'>
					<h1>The Philippines</h1>
					The Philippines, an archipelago consisting of over 7,000 islands in
					Southeast Asia, boasts a rich tapestry of diverse land covers. From
					lush tropical rainforests to pristine beaches, this tropical paradise
					offers a wide range of stunning natural landscapes. The country is
					home to dense forests teeming with biodiversity, rolling rice terraces
					that exemplify centuries-old agricultural traditions, and volcanic
					terrain that adds a touch of drama to its scenic beauty. Its coastal
					areas are fringed with white sandy shores and coral reefs, making it a
					haven for marine life. Explore the dynamic land covers of the
					Philippines, each contributing to the nation's unique and captivating
					charm.
				</div>
				<div className='ph_img'>
					<img src={ph_img} alt='Philippines Land Cover' />
				</div>
				{/* <div className='home_page'>
					<div className='content'>
						<div className='content-container-left-start'>
							<img
								src={img1}
								alt='Banaue Rice Terraces, Ifugao'
								id='highlight_1'
							/>
							<div className='desc'>
								<h3 id='name'>Banaue Rice Terraces, Ifugao</h3>
								<hr />
								<p>
									Often called the "Eighth Wonder of the World," Rice terraces
									are agricultural landscapes that include terraced fields,
									water management systems, and elements of cultural and
									environmental significance. The land cover of rice terraces is
									typically dominated by agricultural land, meaning fields that
									are used to grow crops. The primary crop grown on rice
									terraces is rice, but other crops may also be grown, such as
									vegetables, fruits, and spices.The terraced fields are the
									most obvious feature of rice terraces, and they are typically
									constructed using stone or mud walls to create level surfaces
									on sloping land. Water management systems are essential for
									rice cultivation, and they include irrigation channels, dams,
									and sluice gates that control the flow of water to the fields.
									Rice terraces often have cultural and historical significance,
									and they may also support a high level of biodiversity.
								</p>
							</div>
						</div>
						<div className='content-container-right'>
							<img src={img2} alt='Chocolate Hills, Bohol' id='highlight_2' />
							<div className='desc'>
								<h3 id='name'>Chocolate Hills, Bohol</h3>
								<hr />
								<p>
									Grassland is the predominant land cover type found in the
									Philippines' Bohol region, which includes the Chocolate Hills.
									The hills are covered in green grass during the wet season,
									but the dry season is when they are most noticeable. The hills
									now resemble chocolate due to the browning and drying of the
									grass. The distinctive topography is enhanced by the dry grass
									cover, which gives rise to the moniker "Chocolate Hills." The
									hills themselves don't have a lot of trees or shrubs covering
									them, but the lands around them could have a variety of land
									uses, including small towns, farms, and other vegetation. The
									Chocolate Hills' protected designation highlights how crucial
									it is to maintain the area's unique grassland landscape.
								</p>
							</div>
						</div>
						<div className='content-container-left'>
							<img src={img3} alt='Taal Lake' id='highlight_1' />
							<div className='desc'>
								<h3 id='name'>Taal Lake, Batangas</h3>
								<hr />
								<p>
									Taal Lake, which is located in the Philippine province of
									Batangas, features a variety of land covers, including the
									lake's notable water surface. Notably, volcanic features are
									added by Taal Volcano on Volcano Island inside the lake. A
									variety of native plants, including trees and shrubs, line the
									lakeshores in the immediate area. Together with urban and
									settlement areas in the towns surrounding the lake,
									agricultural regions, such as farms and fields, make up the
									land cover. Taal Lake's overall ecological variety is enhanced
									by protected areas and reserves, which recognize the region's
									mecological significance. Certain forms of land cover may
									differ in different areas of the lake and its environs.
								</p>
							</div>
						</div>
						<div className='content-container-right'>
							<img src={img4} alt='Cagayan River' id='highlight_2' />
							<div className='desc'>
								<h3 id='name'>Cagayan River, Cagayan</h3>
								<hr />
								<p>
									The Cagayan River, the Philippines' longest and greatest
									river, travels through northern Luzon, spanning diverse land
									covers. It is primarily associated with the province of
									Cagayan, which it is named after. The river itself is a
									notable feature, with surrounding areas distinguished by
									riverbanks and riparian zones that sustain a variety of
									species. Agricultural grounds, including farms and fields, as
									well as urban and settlement areas found in towns along the
									river, contribute to the scenery. Natural flora, woods, and
									ecosystems can be found along the river and its tributaries.
									Wetlands are also present, supporting a rich flora and fauna.
									There may be designated protected areas or conservation zones
									depending on the location, resulting in a mix of natural
									features, agricultural fields, and human-influenced areas
									along the Cagayan River, contributing to the region's overall
									ecological variety.
								</p>
							</div>
						</div>
						<div className='content-container-left-end'>
							<img src={img5} alt='Palawan Rainforest' id='highlight_1' />
							<div className='desc'>
								<h3 id='name'>Palawan Rainforest, Palawan</h3>
								<hr />
								<p>
									The Palawan rainforest, situated on Palawan Island in the
									Philippines, is characterized by a dominant tropical
									rainforest land cover, featuring dense and diverse vegetation,
									including towering trees, vines, and ferns. Renowned as a
									biodiversity hotspot, it hosts a rich array of plant and
									animal species, many of which are endemic to the region. To
									preserve its unique ecosystem, portions of the rainforest are
									designated as protected areas, including national parks. The
									rainforest extends into coastal mangrove forests, mountainous
									areas, and uplands, contributing to the varied topography and
									ecosystems. Recognized for its vital role, the rainforest
									maintains watersheds, regulates water flow, and supports
									freshwater ecosystems. Conservation efforts are actively in
									place to safeguard this significant ecological asset,
									essential for both the island's natural beauty and
									environmental well-being.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div> */}
			</div>
		</div>
	);
};
export default Home;

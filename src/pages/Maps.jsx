import React, { useContext } from 'react';

import { CustomHookContext } from './layouts/HooksWrapper';

import Container from './layouts/Container';
import Button from '../components/Button'; //custom components
import {
	BadgeCheck,
	BadgeInfo,
	EyeOff,
	Home,
	ScanEye,
	ZoomIn,
	ZoomOut,
} from 'lucide-react'; // icons

export default function Maps() {
	const {
		map,
		mousePositionRef,
		scaleLineRef,
		descript,
		province,
		featureInfoTriggered,
		provinceQueryTriggered,
		regions,
		selectedRegion,
		setSelectedRegion,
		provinces,
		selectedProvince,
		setSelectedProvince,
		handleInfoScan,
		handleQueryScan,
		zoomIn,
		zoomOut,
		handleSubmit,
		handleClick,
	} = useContext(CustomHookContext);

	return (
		<Container id='Maps'>
			<div className='h-full w-full flex flex-col pt-28 bg-[#ECDED5]'>
				<div className='h-full w-full flex flex-col p-10 bg-[#2F5025]'>
					<div
						id='map'
						ref={map}
						className='shadow-2xl border-2 border-b-0 border-neutral-900 bg-white'></div>
					<div className='flex w-full justify-between items-center border-2 border-t-0 border-neutral-900 bg-gray-200 p-1 rounded-b-lg '>
						<div className='flex flex-wrap justify-center gap-2 pl-2'>
							<button>
								<Button to='Hero'>
									<Home strokeWidth={2.5} />
								</Button>
							</button>
							<button id='fullscreen' className='fs-button'></button>
							<button onClick={zoomIn}>
								<ZoomIn strokeWidth={2.5} />
							</button>
							<button onClick={zoomOut}>
								<ZoomOut strokeWidth={2.5} />
							</button>
							{featureInfoTriggered ? (
								<button onClick={handleInfoScan}>
									<EyeOff strokeWidth={2.5} />
								</button>
							) : (
								<button onClick={handleInfoScan}>
									<ScanEye strokeWidth={2.5} />
								</button>
							)}
							{provinceQueryTriggered ? (
								<button onClick={handleQueryScan}>
									<BadgeCheck strokeWidth={2.5} />
								</button>
							) : (
								<button onClick={handleQueryScan}>
									<BadgeInfo strokeWidth={2.5} />
								</button>
							)}
						</div>
						<div className='flex flex-wrap '>
							{descript && (
								<div className='flex gap-2'>
									<h1>Description: </h1>
									<h1 className='font-bold'>{descript}</h1>
									<h1>Province: </h1>
									<h1 className='font-bold'>{province}</h1>
								</div>
							)}
							{provinceQueryTriggered && (
								<div className='flex gap-2'>
									<select
										className='uppercase font-bold'
										value={selectedRegion}
										onChange={(e) => setSelectedRegion(e.target.value)}>
										<option value=''>**select a region**</option>
										{regions
											.sort((a, b) => a.localeCompare(b))
											.map((region, index) => (
												<option key={index} value={region}>
													{region}
												</option>
											))}
									</select>
									{selectedRegion && (
										<select
											className='uppercase font-bold'
											value={selectedProvince}
											onChange={(e) => setSelectedProvince(e.target.value)}>
											<option value=''>**select a province**</option>
											{provinces
												.sort((a, b) => a.localeCompare(b))
												.map((province, index) => (
													<option key={index} value={province}>
														{province}
													</option>
												))}
										</select>
									)}
									<button
										onClick={handleSubmit}
										className='bg-white p-2 rounded-3xl border border-black'>
										<h1 className='uppercase font-bold'>submit</h1>
									</button>
								</div>
							)}
						</div>
						<div className='flex gap-5 max-w-1/12 md:max-w-full'>
							<h1>Coordinates: </h1>
							<h1 ref={mousePositionRef} className='mouse-position'></h1>
							<h1>Scale: </h1>
							<h1 ref={scaleLineRef} className='scale-line'></h1>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}

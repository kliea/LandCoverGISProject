import React, { useEffect, useRef, useState } from 'react'; // react hooks
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import BingMaps from 'ol/source/BingMaps.js';
import LayerGroup from 'ol/layer/Group';
import { fromLonLat } from 'ol/proj';
import FullScreen from 'ol/control/FullScreen.js';
import MousePosition from 'ol/control/MousePosition.js';
import { createStringXY } from 'ol/coordinate.js';
import { ScaleLine } from 'ol/control.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill'; // open layers api

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
	const mapRef = useRef(null);
	const mapp = useRef(null);
	const mousePositionRef = useRef(null);
	const scaleLineRef = useRef(null);
	const [descript, setDescript] = useState('');
	const [province, setProvince] = useState('');
	const [featureInfoTriggered, setFeatureInfoTriggered] = useState(false);
	const [provinceQueryTriggered, setProvinceQueryTriggered] = useState(false);
	const [regions, setRegions] = useState([]);
	const [selectedRegion, setSelectedRegion] = useState('');
	const [provinces, setProvinces] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState('');
	const [geoJsonLayer, setGeoJsonLayer] = useState(null);

	useEffect(() => {
		if (!mapRef.current) {
			initializeMap();
		}

		const handleSingleClick = (e) => {
			if (featureInfoTriggered) {
				fetchFeatureInfo(e);
			}
		};

		mapRef.current.on('singleclick', handleSingleClick);

		return () => {
			mapRef.current?.un('singleclick', handleSingleClick);
		};
	}, [featureInfoTriggered]);

	const initializeMap = () => {
		const mapView = new View({
			center: fromLonLat([125.5978, 8.9553]),
			zoom: 10,
		});

		const fs = new FullScreen({
			target: 'fullscreen',
		});

		const mp = new MousePosition({
			coordinateFormat: createStringXY(4),
			projection: 'EPSG:4326',
			target: mousePositionRef.current,
		});

		const scale = new ScaleLine({
			units: 'metric',
			target: scaleLineRef.current,
		});

		mapRef.current = new Map({
			target: mapp.current,
			view: mapView,
			controls: [fs, mp, scale],
			layers: getLayers(),
		});
	};

	const getLayers = () => {
		return [
			new LayerGroup({
				title: 'layers',
				fold: true,
				layers: [
					new TileLayer({
						title: 'Aerial',
						type: 'base',
						visible: true,
						source: new BingMaps({
							key: 'AsMcqtm-jc8We9M2m9Dq9K8c62I7jlwqVCQ4Hpv1mpVIk6u8ZhAmHuG6BgPwTEBn',
							imagerySet: 'Aerial',
						}),
					}),
					new TileLayer({
						title: 'PH_MUNI',
						opacity: 0,
						source: new TileWMS({
							url: 'http://localhost:8080/geoserver/ITE-18-WEBGIS/wms',
							params: {
								LAYERS: 'ITE-18-WEBGIS:PH_MUNI',
								TILED: true,
							},
							serverType: 'geoserver',
							visible: true,
						}),
					}),
					new TileLayer({
						title: 'LandCover_w84',
						opacity: 1,
						source: new TileWMS({
							url: 'http://localhost:8080/geoserver/ITE-18-WEBGIS/wms',
							params: {
								LAYERS: 'ITE-18-WEBGIS:LandCover_w84',
								TILED: true,
							},
							serverType: 'geoserver',
							visible: true,
						}),
					}),
				],
			}),
		];
	};

	const fetchFeatureInfo = async (e) => {
		try {
			const resolution = mapRef.current.getView().getResolution();
			const projection = mapRef.current.getView().getProjection();
			const layers = mapRef.current
				.getLayers()
				.getArray()[0]
				.getLayers()
				.getArray();
			const [Municipalities, LandCover] = [layers[1], layers[2]];
			const fetchUrls = [
				LandCover.getSource().getFeatureInfoUrl(
					e.coordinate,
					resolution,
					projection,
					{ INFO_FORMAT: 'application/json', propertyName: 'DESCRIPT' }
				),
				Municipalities.getSource().getFeatureInfoUrl(
					e.coordinate,
					resolution,
					projection,
					{
						INFO_FORMAT: 'application/json',
						propertyName: 'Pro_Name',
					}
				),
			];

			const [landCoverResponse, municipalitiesResponse] = await Promise.all(
				fetchUrls.map((url) =>
					url
						? fetch(url)
								.then((res) =>
									res.ok ? res.json() : Promise.reject('Failed to fetch')
								)
								.catch((err) => console.error(err))
						: null
				)
			);

			if (landCoverResponse && landCoverResponse.features[0]) {
				setDescript(landCoverResponse.features[0].properties.DESCRIPT);
			}

			if (municipalitiesResponse && municipalitiesResponse.features[0]) {
				setProvince(municipalitiesResponse.features[0].properties.Pro_Name);
			}
		} catch (error) {
			console.error('Error fetching the data:', error);
		}
	};

	const handleInfoScan = () => {
		setProvinceQueryTriggered(false);
		setFeatureInfoTriggered((prev) => !prev);
	};

	const handleQueryScan = () => {
		setDescript('');
		setProvinceQueryTriggered((prev) => !prev);
	};

	const zoomIn = () => {
		let currentZoom = mapRef.current.getView().getZoom();
		mapRef.current.getView().setZoom(currentZoom + 1);
	};

	const zoomOut = () => {
		let currentZoom = mapRef.current.getView().getZoom();
		mapRef.current.getView().setZoom(currentZoom - 1);
	};

	// Place these functions outside of your component
	const fetchRegionsData = async (setRegions) => {
		const url = 'http://localhost:8080/geoserver/ITE-18-WEBGIS/ows';
		const params = new URLSearchParams({
			service: 'WFS',
			version: '1.0.0',
			request: 'GetFeature',
			typeName: 'ITE-18-WEBGIS:PH_MUNI',
			propertyName: 'Reg_Name',
			outputFormat: 'application/json',
		});

		try {
			const response = await fetch(`${url}?${params}`);
			const data = await response.json();
			const fetchedRegions = data.features.map(
				(feature) => feature.properties.Reg_Name
			);
			setRegions([...new Set(fetchedRegions)]);
		} catch (error) {
			console.error('Error fetching regions:', error);
		}
	};

	const fetchProvincesData = async (selectedRegion, setProvinces) => {
		const url = 'http://localhost:8080/geoserver/ITE-18-WEBGIS/ows';
		const params = new URLSearchParams({
			service: 'WFS',
			version: '1.0.0',
			request: 'GetFeature',
			typeName: 'ITE-18-WEBGIS:PH_MUNI',
			propertyName: 'Pro_Name',
			CQL_FILTER: `Reg_Name='${selectedRegion}'`,
			outputFormat: 'application/json',
		});

		try {
			const response = await fetch(`${url}?${params}`);
			const data = await response.json();
			const fetchedProvinces = data.features.map(
				(feature) => feature.properties.Pro_Name
			);
			setProvinces([...new Set(fetchedProvinces)]);
		} catch (error) {
			console.error('Error fetching provinces:', error);
		}
	};

	useEffect(() => {
		fetchRegionsData(setRegions);
		if (selectedRegion) {
			fetchProvincesData(selectedRegion, setProvinces);
		}
	}, [selectedRegion]); // Add selectedRegion to the dependency array to refetch when it changes

	const newAddGeoJsonToMap = (url) => {
		if (geoJsonLayer) {
			geoJsonLayer.getSource().clear();
			mapRef.current.removeLayer(geoJsonLayer);
		}

		const style = new Style({
			stroke: new Stroke({
				color: '#FFFF00',
				width: 3,
			}),
			image: new Circle({
				radius: 7,
				fill: new Fill({
					color: '#FFFF00',
				}),
			}),
		});

		const newGeoJsonLayer = new VectorLayer({
			source: new VectorSource({
				url: url,
				format: new GeoJSON(),
			}),
			style: style,
		});

		newGeoJsonLayer.getSource().on('addfeature', function () {
			mapRef.current.getView().fit(newGeoJsonLayer.getSource().getExtent(), {
				duration: 1590,
				size: mapRef.current.getSize(),
				maxZoom: 21,
			});
		});

		mapRef.current.addLayer(newGeoJsonLayer);
		setGeoJsonLayer(newGeoJsonLayer); // Keep track of the layer in state
	};

	const handleSubmit = () => {
		const baseGeoServerUrl =
			'http://localhost:8080/geoserver/ITE-18-WEBGIS/ows';
		const geoServerParams = new URLSearchParams({
			service: 'WFS',
			version: '1.0.0',
			request: 'GetFeature',
			typeName: 'ITE-18-WEBGIS:PH_MUNI',
			propertyName: 'the_geom',
			CQL_FILTER: `Pro_Name='${selectedProvince}'`,
			outputFormat: 'application/json',
		});
		const fullGeoServerUrl = `${baseGeoServerUrl}?${geoServerParams.toString()}`;
		console.log(fullGeoServerUrl);
		newAddGeoJsonToMap(fullGeoServerUrl);
		setSelectedRegion('');
		setSelectedProvince('');
	};

	return (
		<Container id='Maps'>
			<div className='h-full w-full flex flex-col pt-28 bg-[#ECDED5]'>
				<div className='h-full w-full flex flex-col p-10 bg-[#2F5025]'>
					<div
						id='map'
						ref={mapp}
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

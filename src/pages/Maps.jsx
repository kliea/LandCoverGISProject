import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import BingMaps from 'ol/source/BingMaps.js';
import LayerGroup from 'ol/layer/Group';
import { fromLonLat } from 'ol/proj';
import FullScreen from 'ol/control/FullScreen.js';
import Container from './layouts/Container';
import MousePosition from 'ol/control/MousePosition.js';
import { createStringXY } from 'ol/coordinate.js';
import { ScaleLine } from 'ol/control.js';
import Button from '../components/Button';
import { EyeOff, Home, Scan, ScanEye, ZoomIn, ZoomOut } from 'lucide-react';
import DragZoom from 'ol/interaction/DragZoom';

export default function Maps() {
	const mapRef = useRef(null);
	const mousePositionRef = useRef(null);
	const scaleLineRef = useRef(null);
	const contentRef = useRef(null);
	const [featureInfoTriggered, setFeatureInfoTriggered] = useState(false);

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
			target: 'map',
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
						title: 'Land Cover of the Philippines',
						opacity: 1,
						source: new TileWMS({
							url: 'http://localhost:8080/geoserver/ITE-18-WEBGIS/wms',
							params: {
								LAYERS: 'ITE-18-WEBGIS:demo',
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

	const fetchFeatureInfo = (e) => {
		const resolution = mapRef.current.getView().getResolution();
		const projection = mapRef.current.getView().getProjection();
		const tileWMSLayer = mapRef.current
			.getLayers()
			.getArray()[0]
			.getLayers()
			.getArray()[1];
		const url = tileWMSLayer
			.getSource()
			.getFeatureInfoUrl(e.coordinate, resolution, projection, {
				INFO_FORMAT: 'application/json',
				propertyName: 'area,descript',
			});

		if (url) {
			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					const feature = data.features[0];
					console.log(feature);
					if (feature) {
						contentRef.current.innerHTML = `
						<div class="flex gap-2">
													<h3> Area: </h3> <p class="font-bold">${feature.properties.area}</p>
							<h3> Description: </h3> <p class="font-bold">${feature.properties.descript}</p>
</div>
						`;
					}
				})
				.catch((error) => {
					console.error('Error fetching the data:', error);
				});
		}
	};

	const handleInfoScan = () => {
		setFeatureInfoTriggered((prev) => !prev);
	};

	const zoomIn = () => {
		let currentZoom = mapRef.current.getView().getZoom();
		mapRef.current.getView().setZoom(currentZoom + 1);
	};

	const zoomOut = () => {
		let currentZoom = mapRef.current.getView().getZoom();
		mapRef.current.getView().setZoom(currentZoom - 1);
	};

	return (
		<Container>
			<div id='map' className='h-full w-full bg-white'></div>
			<div className='flex justify-between items-center bg-gray-200 p-1 rounded-b-lg'>
				<div className='flex justify-center gap-2 pl-2'>
					<Button route='/'>
						<Home strokeWidth={2.5} />
					</Button>
					<button id='fullscreen' className='fs-button'></button>
					{featureInfoTriggered ? (
						<button onClick={handleInfoScan}>
							<EyeOff strokeWidth={2.5} />
						</button>
					) : (
						<button onClick={handleInfoScan}>
							<ScanEye strokeWidth={2.5} />
						</button>
					)}
					<button onClick={zoomIn}>
						<ZoomIn strokeWidth={2.5} />
					</button>
					<button onClick={zoomOut}>
						<ZoomOut strokeWidth={2.5} />
					</button>
				</div>
				<div>{featureInfoTriggered && <h1 ref={contentRef}></h1>}</div>
				<div className='flex gap-5 max-w-1/12'>
					<h1>Coordinates: </h1>
					<h1 ref={mousePositionRef} className='mouse-position'></h1>
					<h1>Scale: </h1>
					<h1 ref={scaleLineRef} className='scale-line'></h1>
				</div>
			</div>
		</Container>
	);
}

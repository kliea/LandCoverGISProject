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
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

const useMaps = () => {
	const mapRef = useRef(null);
	const map = useRef(null);
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

		var layerSwitcher = new LayerSwitcher({
			activationMode: 'click',
			startActive: false,
			groupSelectStyle: 'children',
		});

		mapRef.current = new Map({
			target: 'map',
			view: mapView,
			controls: [fs, mp, scale, layerSwitcher],
			layers: getLayers(),
		});
	};

	const getLayers = () => {
		return [
			new LayerGroup({
				title: 'built-in layers',
				fold: true,
				layers: [
					new TileLayer({
						title: 'None',
						type: 'base',
						visible: true,
					}),
					new TileLayer({
						title: 'Aerial',
						type: 'base',
						visible: true,
						source: new BingMaps({
							key: 'AsMcqtm-jc8We9M2m9Dq9K8c62I7jlwqVCQ4Hpv1mpVIk6u8ZhAmHuG6BgPwTEBn',
							imagerySet: 'Aerial',
						}),
					}),
				],
			}),
			new LayerGroup({
				title: 'shape layers',
				fold: true,
				layers: [
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
				.getArray()[1]
				.getLayers()
				.getArray();
			const [Municipalities, LandCover] = [layers[0], layers[1]];
			console.log(Municipalities);
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
	}, [selectedRegion, selectedProvince]); // Add selectedRegion to the dependency array to refetch when it changes

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
		console.log(selectedProvince);
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
	const handleClick = (name) => {
		console.log(name);
		const baseGeoServerUrl =
			'http://localhost:8080/geoserver/ITE-18-WEBGIS/ows';
		const geoServerParams = new URLSearchParams({
			service: 'WFS',
			version: '1.0.0',
			request: 'GetFeature',
			typeName: 'ITE-18-WEBGIS:PH_MUNI',
			propertyName: 'the_geom',
			CQL_FILTER: `Pro_Name='${name}'`,
			outputFormat: 'application/json',
		});
		const fullGeoServerUrl = `${baseGeoServerUrl}?${geoServerParams.toString()}`;
		console.log(fullGeoServerUrl);
		newAddGeoJsonToMap(fullGeoServerUrl);
	};

	return {
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
	};
};

export default useMaps;

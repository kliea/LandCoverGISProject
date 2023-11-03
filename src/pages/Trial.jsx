import React, { useEffect, useRef } from 'react';
import MVT from 'ol/format/MVT';
import Map from 'ol/Map';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import View from 'ol/View';

const VectorTileMap = () => {
	const mapRef = useRef(); // Reference to the map instance
	const infoRef = useRef(); // Reference to the info DOM element

	useEffect(() => {
		// Initialize map
		const map = new Map({
			target: mapRef.current,
			view: new View({
				center: [0, 0],
				zoom: 2,
			}),
			layers: [
				new VectorTileLayer({
					source: new VectorTileSource({
						format: new MVT(),
						url: 'https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf',
					}),
				}),
			],
		});

		// Add pointermove event to the map to display feature properties
		map.on('pointermove', (event) => {
			const info = infoRef.current;

			const features = map.getFeaturesAtPixel(event.pixel);

			if (!features.length) {
				info.innerText = '';
				info.style.opacity = 0;
				return;
			}

			const properties = features[0].getProperties();
			info.innerText = JSON.stringify(properties, null, 2);
			info.style.opacity = 1;
		});

		// Cleanup on unmount
		return () => {
			map.setTarget(null);
		};
	}, []); // Run only once on mount

	return (
		<div>
			<div
				id='map'
				ref={mapRef}
				style={{ width: '100%', height: '400px' }}></div>
			<pre id='info' ref={infoRef} style={{ opacity: 0 }}></pre>
		</div>
	);
};

export default VectorTileMap;

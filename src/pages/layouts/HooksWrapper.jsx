import React, { createContext } from 'react';
import useMaps from '../../hooks/useMaps';

export const CustomHookContext = createContext(null);

export default function HooksWrapper({ children }) {
	const {
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
	} = useMaps();
	return (
		<CustomHookContext.Provider
			value={{
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
			}}>
			{children}
		</CustomHookContext.Provider>
	);
}

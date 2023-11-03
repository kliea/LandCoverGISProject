import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Button({ route, children }) {
	const navigate = useNavigate();

	const HandleClick = () => {
		navigate(route);
	};

	return <button onClick={HandleClick}>{children}</button>;
}

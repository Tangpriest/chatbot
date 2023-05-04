/* eslint-disable no-shadow */
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const TextAnimation = ({ text, duration = 1.5, amplitude = 20 }) => {
	const [ y, setY ] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setY((y) => -y);
		}, duration * 1000);

		return () => clearInterval(intervalId);
	}, [ duration ]);

	return (
		<motion.span
			style={{ fontSize : '2rem', position : 'relative', top : y }}
			animate={{ top : [ amplitude, -amplitude, amplitude ] }}
			transition={{ duration : duration, repeat : Infinity }}
		>
			{text}
		</motion.span>
	);
};

export default TextAnimation
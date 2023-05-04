import { AnimatePresence, motion } from 'framer-motion';

export default function RobotLoading({ isLoading }) {
	return (
		<AnimatePresence>
			{isLoading && (
				<motion.div
					key="loading"
					initial={{ opacity : 0 }}
					animate={{ opacity : 1 }}
					exit={{ opacity : 0 }}
					style={{
						position        : 'fixed',
						top             : 0,
						left            : 0,
						width           : '100%',
						height          : '100%',
						backgroundColor : 'rgba(0, 0, 0, 0.5)',
						display         : 'flex',
						justifyContent  : 'center',
						alignItems      : 'center',
						zIndex          : 9999
					}}
				>
					<motion.span
						style={{
							fontSize : '6rem'
						}}
						animate={{
							y          : [ -20, 0, -20 ],
							rotate     : [ 0, 180, 360 ],
							transition : {
								repeat : Infinity, duration : 2
							}
						}}
					>
            🤖️🤖️🤖️
					</motion.span>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
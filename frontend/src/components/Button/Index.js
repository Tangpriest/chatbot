import styles from './Button.module.css'

export default function Button({ type = 'primary', handleClick, style, children }) {

	const colorList = {
		primary : '#5cb85c',
		danger  : '#d9534f'
	}

	const defaultStyle = {
		backgroundColor : colorList[type] || '#5cb85c',
		':hover'        : {
			backgroundColor : 'red'
		}
	}

	return (
		<button
			className={styles.button}
			onClick={handleClick}
			style={{
				...defaultStyle,
				...style
			}}>
			{children}
		</button>
	)
}
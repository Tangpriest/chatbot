import styles from '../styles/Home.module.css'
import Navigator from './components/Navigator'

export default function Home() {

	return (
		<div className={styles.container}>
			<Navigator />
			<div className={styles.main}>
			</div>
		</div>
	)
}
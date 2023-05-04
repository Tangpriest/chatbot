import Navigator from '../components/Navigator'
import styles from '../styles/Home.module.css'

export default function Home() {

	return (
		<div className={styles.container}>
			<Navigator />
			<div className={styles.main}>
			</div>
		</div>
	)
}
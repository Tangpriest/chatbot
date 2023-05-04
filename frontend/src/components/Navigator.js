import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

export default function Navigator({ setIsLoginVisible, userInfo }) {

	const menus = [
		{
			key  : 'chat',
			page : 'chat/new',
			icon : '/assets/chat.svg',
			name : 'Chat'
		},
		{
			key  : 'settings',
			page : 'settings',
			icon : '/assets/settings.svg',
			name : 'Settings'
		},
		{
			key  : 'account',
			page : 'account',
			icon : '/assets/account.svg',
			name : 'Account'
		}
	]

	const router = useRouter()
	const { pathname, query } = router

	const getBackgroundColor = (menu) => {
		if (pathname && pathname.indexOf(`/${menu.key}`) > -1) {
			return 'var(--secondary-color)'
		}
		else {
			return 'var(--primary-color)'

		}
	}

	return (
		<div className={styles.menu}>
			<div className={styles.logo}>CH</div>
			<div className={styles.menus}>
				{
					menus.map((menu, index) => (
						<div className={styles.menuItem} key={index} onClick={() => router.push(`/${menu.page}`)} style={{
							background : getBackgroundColor(menu)
						}}>
							<Image src={menu.icon} width={30} height={30} alt='robot' />
							<div>{menu.name}</div>
						</div>
					))
				}

			</div>
			<div onClick={() => {
				if (userInfo) {
					router.push('/account')
				}
				else {
					setIsLoginVisible(true)
				}
			}} className={styles.userInfo}>
				{
					userInfo
						? userInfo.name
						: 'Login'
				}
			</div>

		</div>
	)
}
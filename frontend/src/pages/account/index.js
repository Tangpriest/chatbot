import request from '@/utils/request'
import { useEffect, useState } from 'react'
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import Navigator from '../../components/Navigator'
import styles from './Account.module.css'

export default function Account({ setIsLoginVisible, userInfo, setUserInfo }) {

	const [ avatar, setAvatar ] = useState(null)
	const [ OPENAI_API_KEY, setOPENAI_API_KEY ] = useState('')

	const logout = () => {
		localStorage.removeItem('token')
		setUserInfo(null)
	}

	const handleSubmit = async () => {

		const response = await request.put('/member', {
			avatar,
			OPENAI_API_KEY
		})

		if (response.data.code === 0) {
			console.log('更新用户信息成功')
		}
	}

	const getUserInfo = async () => {
		const response = await request.get('/member')

		if (response.data.code === 0) {
			console.log(response.data.data)

			setAvatar(response.data.data.avatar)
			setOPENAI_API_KEY(response.data.data.OPENAI_API_KEY)
		}
	}

	useEffect(() => {
		getUserInfo()
	}, [])

	return (
		<div className='pageContainer'>
			<Navigator setIsLoginVisible={setIsLoginVisible} userInfo={userInfo} />
			<div className='pageMain'>
				<div className={styles.container}>
					<div className={styles.form}>
						<div className={styles.formItem}>
							<label htmlFor="preset-value" style={{ display : 'inline' }}>头像 : </label>
							<Avatar avatar={avatar} setAvatar={setAvatar} />
						</div>
						<label>OpenAiKey : </label>
						<input className={styles.input} value={OPENAI_API_KEY} onChange={e => setOPENAI_API_KEY(e.target.value)} />
					</div>
					<div style={{
						marginTop  : 20,
						display    : 'flex',
						width      : 500,
						alignItems : 'center'
					}}>
						<Button type="submit" onClick={handleSubmit} style={{ marginRight : 20 }}>保存</Button>
						<Button type="danger" onClick={logout}>注销</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
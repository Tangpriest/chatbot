import request from '@/utils/request';
import { useState } from 'react';
import styles from './Login.module.css';

export default function LoginDialog({ visible, onClose, setUserInfo }) {
	const [ isCodeSent, setIsCodeSent ] = useState(false);
	const [ phone, setPhone ] = useState('');
	const [ code, setCode ] = useState('');

	function handlePhoneChange(event) {
		setPhone(event.target.value);
	}

	function handleCodeChange(event) {
		setCode(event.target.value);
	}

	function handleSendCode() {
		setIsCodeSent(true);
	}

	async function handleLogin() {
		// TODO: 实现登录逻辑

		const response = await request.post('/login', {
			mobile : phone
		})

		console.log(response.data)

		if (response.data.code === 0) {
			window.localStorage.setItem('token', response.data.data.token)
			setUserInfo(response.data.data.userInfo)
			onClose();
		}
		else {
			alert(response.data.msg)
		}
	}

	if (!visible) {
		return null;
	}

	return (
		<div className={styles.mask}>
			<div className={styles.dialog}>

				<div className={styles.close} onClick={onClose}>close</div>
				{/* <img src="/login-bg.jpg" alt="登录背景" className={styles.image} /> */}
				<div className={styles.title}>Login</div>
				<div className={styles.inputWrapper}>
					<input
						type="tel"
						placeholder="Mobile"
						value={phone}
						onChange={handlePhoneChange}
						className={styles.myinput}
					/>
					{isCodeSent
						? (
							<input
								type="number"
								placeholder="Code"
								value={code}
								onChange={handleCodeChange}
								className={styles.myinput}
							/>
						)
						: null}
				</div>

				<button
					onClick={isCodeSent
						? handleLogin
						: handleSendCode}
					className={`${styles.button} ${styles.btn}`}
				>
					{isCodeSent
						? 'Login'
						: 'SendCode'}
				</button>
			</div>
		</div>
	);
}

import request from '@/utils/request';
import { appWithTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import '../styles/globals.css';
import LoginDialog from './components/Login';
import RobotLoading from './components/RobotLoading';

const auth = async () => {
	const response = await request.get('/auth')

	console.log(response.data)

	if (response.data.code === 0) {
		return response.data.data.userInfo
	}
	else {
		return null
	}
}

function App({ Component, pageProps }) {

	const [ isLoading, setIsLoading ] = useState(false);
	const [ isLoginVisible, setIsLoginVisible ] = useState(false);
	const [ userInfo, setUserInfo ] = useState(null)

	const [ conversationList, setConversationList ] = useState([])

	useEffect(() => {
		auth().then((user) => {
			if (user) {
				setUserInfo(user)
			}
			else {
				setIsLoginVisible(true)
			}			
		})
			.catch(error => { console.log(error) })
	}, [])

	return (
		<>
			<RobotLoading isLoading={isLoading} />
			<LoginDialog visible={isLoginVisible} onClose={() => setIsLoginVisible(false)} setUserInfo={setUserInfo}/>
			<Component {...pageProps}
				setIsLoading={setIsLoading}
				setIsLoginVisible={setIsLoginVisible}
				userInfo={userInfo}
				setUserInfo={setUserInfo}
				conversationList={conversationList}
				setConversationList={setConversationList}
			/>
		</>
	)
}

export default appWithTranslation(App);

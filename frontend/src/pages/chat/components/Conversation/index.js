import request from '@/utils/request';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import ChatbotIntro from './ChatbotIntro';
import styles from './index.module.css';

export default function Chat({ setIsLoading, setConversationList }) {

	const router = useRouter()

	const [ inputValue, setInputValue ] = useState('');
	const [ chatHistory, setChatHistory ] = useState([]);
	const [ showIntro, setShowIntro ] = useState(true);

	const handleSend = async () => {
		const newChatHistory = [ ...chatHistory, { text : inputValue, user : 'Q' } ];

		setChatHistory(newChatHistory);
		setInputValue('')
		setShowIntro(false)
	};

	/**
   * get user settings from localstorage
   * @returns 
   */
	const getUserSettings = () => {
		const userSettings = JSON.parse(window.localStorage.getItem('userSettings')) || {
			presetValue       : '',
			temperature       : 50,
			top_p             : 50,
			frequency_penalty : 50,
			presence_penalty  : 50
		}

		return ({
			presetValue : userSettings.presetValue || '',
			settings    : {
				temperature       : userSettings.temperature / 100,
				top_p             : userSettings.top_p / 100,
				frequency_penalty : userSettings.frequency_penalty / 100,
				presence_penalty  : userSettings.presence_penalty / 100
			}
		})
	}
 
	const handleAsk = async () => {
		setIsLoading(true)

		const { presetValue, settings } = getUserSettings()

		const response = await request.post('/conversation', {
			id       : router.query.pid,
			question : chatHistory.pop().text,
			presetValue,
			settings
		})

		if (response.data.code === 0) {
			setIsLoading(false)

			const newChatHistory = response.data.data.dialogs

			// newChatHistory[newChatHistory.length - 1].render	= true

			console.log(newChatHistory)

			setChatHistory(newChatHistory)

			if (response.data.new) {
				setConversationList(response.data.list)
				router.push(response.data.data.id)
			}
		}
	};

	useEffect(() => {
		const lastChat = [ ...chatHistory ].pop()

		if (lastChat && lastChat.user === 'Q') {
			handleAsk();
		}
	}, [ chatHistory ]);

	const getConversation = async (id) => {
		const response = await request.get(`/conversation/${id}`)

		if (response.data.code === 0 && response.data.data && response.data.data.dialogs instanceof Array) {
			setChatHistory(response.data.data.dialogs)
			setShowIntro(false)
		}
	}

	useEffect(() => {

		if (router.query.pid !== 'new') {

			getConversation(router.query.pid)
		}

	}, [ router ])

	return (
		<div className={`${styles.container} conversation_full`}>
			<ChatbotIntro showIntro={showIntro} />
			<ChatHistory chatHistory={chatHistory} />
			<ChatInput
				inputValue={inputValue}
				setInputValue={setInputValue}
				handleSend={handleSend}
			/>
		</div>
	);
}

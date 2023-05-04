import request from '@/utils/request'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './ChatList.module.css'

export default function ChatList({ userInfo, conversationList, setConversationList }) {
	const router = useRouter()
	const [ currentChat, setCurrentChat ] = useState(null)

	const getConversationList = async () => {
		const response = await request.get('/conversation')

		if (response.data.code === 0) {
			setConversationList(response.data.data)
		}
	}

	useEffect(() => {
		if (userInfo) {
			getConversationList()
		}
	}, [ userInfo ])

	useEffect(() => {
		if (router.query.pid) {
			setCurrentChat(router.query.pid)
		}
	}, [ router ])

	return (
		<div className={`${styles.chatList} chatList`}>
			{
				conversationList.map((item, index) => {
					return (
						<div className={styles.ChatListItem} key={index} onClick={() => {
							setCurrentChat(item.title)
							router.push(`/chat/${item.id}`)
						}}
						style={{
							backgroundColor : currentChat === item.id
								? 'var(--primary-color-light)'
								: ''
						}}>
							{/* <Image src="/assets/member.svg" alt="Nextjs" width={50} height={50} /> */}
							<div className={styles.ChatListItemContent}>
								<div className={styles.ChatListItemContentTitle}>
									{item.title || '未命名'}
								</div>
								<div className={styles.ChatListItemContentText}>
									{/* {item.description} */}
									描述
								</div>
							</div>
						</div>
					)
				})
			}
		</div>
	)
}
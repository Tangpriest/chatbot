import Navigator from '../components/Navigator'
import ChatComponent from './components/Conversation/index'
import ChatList from './components/List/ChatList'

export default function Chat({ setIsLoading, setIsLoginVisible, userInfo, conversationList, setConversationList }) {
	return (
		<div className='pageContainer'>
			<Navigator setIsLoginVisible={setIsLoginVisible} userInfo={userInfo}/>
			<div className='pageMain'>
				<div style={{
					width   : '100%',
					height  : '100%',
					display : 'flex'
				}}>
					<ChatList className="chatList" userInfo={userInfo} conversationList={conversationList} setConversationList={setConversationList}/>
					<ChatComponent setIsLoading={setIsLoading} setConversationList={setConversationList}/>

				</div>
			</div>
		</div>
	)
}
import { AnimatePresence, motion } from 'framer-motion';

const ChatbotIntro = ({ showIntro }) => {
	return (
		<AnimatePresence>
			{
				showIntro ?
					<motion.div
						initial={{ opacity : 1 }}
						exit={{ opacity : 0 }}
						transition={{ duration : 2 }}
						style={{
							width          : '100%',
							display        : 'flex',
							justifyContent : 'center'
						}}
					>
						<div className="chatbot-intro">
							<h1 className="chatbot-intro__title">ChatBot</h1>
							<p className="chatbot-intro__description">
                Intelligent chatbot🤖️, makes chatting easy⏰. Answers your questions❓ anytime, and provides personalized services👍.
							</p>
							<div className="emoji-container">
								<div className="dance-floor">
									<div className="emoji robot">🤖️</div>
									<div className="emoji rabbit">🐰</div>
									<div className="emoji panda">🐼</div>
								</div>
							</div>

							{/* <video loop muted autoPlay className="video-background">
                <source src="https://cdn.dribbble.com/userupload/2739764/file/original-a87f04d6a44a9fcdb4d0d1e405d215b1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
						</div>
					</motion.div>
					:
					<h1 className="site-title" style={{ textIndent : 60 }}>ChatBot</h1>
			}
		</AnimatePresence>
	);
};

export default ChatbotIntro;

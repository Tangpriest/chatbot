import Image from 'next/image';
import { useState } from 'react';
import styles from './index.module.css';

export default function ChatInput({ inputValue, setInputValue, handleSend }) {
  
	const [ isComposing, setIsComposing ] = useState(false);
	const handleCompositionStart = () => {
		setIsComposing(true);
	}
	const handleCompositionEnd = () => {
		setIsComposing(false);
	}
	const handleKeyDown = (event) => {
		if (isComposing && event.code === 'Enter') {
			event.preventDefault();
		}
		else if (event.code === 'Enter') {
			handleSend();
		}
	}

	return (
		<div className={styles['fixed-bottom']}>
			<input
				className={styles.chatInput}
				onKeyDown={handleKeyDown}
				value={inputValue}
				placeholder="Send a message..."
				onChange={(e) => setInputValue(e.target.value)}
				onCompositionStart={handleCompositionStart}
				onCompositionEnd={handleCompositionEnd}
			/>
			<Image src='/assets/send.svg' width={24} height={24} alt="" className={styles.icon} onClick={handleSend} />
		</div>
	);
}
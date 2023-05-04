import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './index.module.css';

const TypingEffect = ({ text: str }) => {
	const [ displayStr, setDisplayStr ] = useState('');
	const [ currentIndex, setCurrentIndex ] = useState(0);

	useEffect(() => {
		if (currentIndex < str.length) {
			const timeoutId = setTimeout(() => {
				setCurrentIndex(currentIndex + 1);
			}, 50);
			
			return () => clearTimeout(timeoutId);
		}
	}, [ currentIndex, str ]);

	useEffect(() => {
		if (currentIndex < str.length) {
			setDisplayStr(str.slice(0, currentIndex + 1));
		}
	}, [ currentIndex, str ]);

	return (
		<ReactMarkdown className={styles.markdown}>
			{displayStr}
		</ReactMarkdown>
	)
};

export default function ChatHistory({ chatHistory }) {
	const listRef = useRef(null);

	useEffect(() => {
		listRef.current.scrollTop = listRef.current.scrollHeight;
	}, [ chatHistory ]);

	const getBlockStyle = (user) => {
		if (user === 'Q') {
			return 'question_block'
		}
		else {
			return 'answer_block'
		}
	}

	useEffect(() => {
		const isAnswer = [ ...chatHistory ].pop()?.user === 'A'

		if (isAnswer) {
			console.log('收到回答')
		}
	}, [ chatHistory ])

	return (
		<div className={styles.block} ref={listRef}>
			{
				chatHistory instanceof Array && chatHistory.map((item, index) => {
					return (
						<div className={`${styles.blockItem} ${styles[getBlockStyle(item.user)]}`} key={index}>
							<Image src={item.user === 'Q'
								? '/assets/boss.png'
								: '/assets/bot.png'} width={50} height={50} alt="" className={styles.avatar} />
							{
								index === chatHistory.length - 1 && item.user === 'A' && item.render === true 
									?
									<TypingEffect text={item.text} />
									:
									<ReactMarkdown className={styles.markdown}>
										{item.text}
									</ReactMarkdown>
                  
							}
						</div>
					)

				})}
		</div>
	);
}

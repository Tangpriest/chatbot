import { useEffect, useState } from 'react';
import Navigator from '../components/Navigator';
import styles from './Settings.module.css';

function MyForm() {
	const [ presetValue, setPresetValue ] = useState('');
	const [ temperature, setTemperature ] = useState(50);
	const [ top_p, setTop ] = useState(50);
	const [ frequency_penalty, setFrequency ] = useState(50);
	const [ presence_penalty, setPresence ] = useState(50);

	const handlePresetValueChange = (event) => {
		setPresetValue(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// 处理表单提交逻辑

		const userSettings = {
			presetValue,
			temperature,
			top_p,
			frequency_penalty,
			presence_penalty
		}

		window.localStorage.setItem('userSettings', JSON.stringify(userSettings));
	};

	const handleReset = () => {
		window.localStorage.removeItem('userSettings');
		setPresetValue('');
		setTemperature(50);
		setTop(50);
		setFrequency(50);
		setPresence(50);
	}

	useEffect(() => {
		const userSettings = JSON.parse(window.localStorage.getItem('userSettings'));

		if (userSettings) {
			setPresetValue(userSettings.presetValue);
			setTemperature(userSettings.temperature);
			setTop(userSettings.top_p);
			setFrequency(userSettings.frequency_penalty);
			setPresence(userSettings.presence_penalty);
		}
	}, [])

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<label htmlFor="preset-value">预设值 : </label>
			<textarea
				type="text"
				id="preset-value"
				name="preset-value"
				value={presetValue}
				onChange={handlePresetValueChange}
				className={styles.inputArea}
				placeholder='比如: 我是一个软件工程师,主要是做前端开发'

			/>
			<label htmlFor="drag-bar-1">文本多样性 : (值越大，生成的文本越随机)</label>
			<input
				type="range"
				id="temperature"
				name="temperature"
				min="0"
				max="100"
				value={temperature}
				onChange={event => setTemperature(event.target.value)}
				className={styles.dragBar}
			/>

			<label htmlFor="drag-bar-2">高概率词汇 : (该参数的值越高，越多的高概率词汇将被使用)</label>
			<input
				type="range"
				id="top_p"
				name="top_p"
				min="0"
				max="100"
				value={top_p}
				onChange={event => setTop(event.target.value)}
				className={styles.dragBar}
			/>

			<label htmlFor="drag-bar-3">减少重复词汇 : (该参数的值越高，生成文本中相同词汇的使用越少)</label>
			<input
				type="range"
				id="drag-bar-3"
				name="drag-bar-3"
				min="0"
				max="200"
				value={frequency_penalty}
				onChange={event => setFrequency(event.target.value)}
				className={styles.dragBar}
			/>

			<label htmlFor="drag-bar-3">减少不相关词汇 : </label>
			<input
				type="range"
				id="drag-bar-3"
				name="drag-bar-3"
				min="0"
				max="200"
				value={presence_penalty}
				onChange={event => setPresence(event.target.value)}
				className={styles.dragBar}
			/>

			<div>
				<button type="submit" className={styles.save}>保存</button>
				<button className={`${styles.save} ${styles.reset}`} onClick={handleReset}>重置</button>
			</div>
		</form>
	);
}

export default function Chat({ setIsLoginVisible, userInfo }) {
	return (
		<div className='pageContainer'>
			<Navigator setIsLoginVisible={setIsLoginVisible} userInfo={userInfo}/>
			<div className='pageMain'>

				<div className={styles.container}>
					<MyForm />
				</div>
				
			</div>
		</div>
	)
}
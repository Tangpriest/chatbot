const { v4 } = require('uuid')
const chatGPT = require('./chatgpt')

class Conversation {
	async create(ctx) {
		const opt = ctx.request.body

		const conversation = opt.id === 'new'
			? await global.db.conversation.create({
				id      : v4(),
				dialogs : [],
				creator : ctx.userInfo.userId
			})
			: await global.db.conversation.findOne({ id : opt.id })
    
		const dialogs = conversation.dialogs

		const dialogHistory = dialogs
			.map((item) => `${item.user}: ${item.text}`)
			.join('\n');
    
		const prompt = `
${opt.presetValue
		? `Q : ${opt.presetValue} \nA : 我知道了 \n`
		: ''}
${dialogHistory}
Q : ${opt.question}`
		const response = await chatGPT(prompt, opt.settings || {})

		const newDialog = [
			...dialogs,
			{
				user : 'Q',
				text : opt.question
			},
			{
				user : 'A',
				text : response
			}
		]

		const data = await global.db.conversation.findOneAndUpdate({ id : conversation.id }, { $set : { dialogs : newDialog } }, { new : true })

		const list = opt.id === 'new'
			? await global.db.conversation.find({}, { id : 1, title : 1 })
			: []

		setTimeout(() => {
			this.createTitle(conversation.id, opt.question, response)
		}, 3000)
		
		return ctx.body = {
			code : 0,
			data : data,
			new  : opt.id === 'new'
				? true
				: false,
			list : list
		}
    
	}

	async get(ctx) {
		const userId = ctx.userInfo.userId

		const conversation = await global.db.conversation.find({ creator : userId })
		
		return ctx.body = {
			code : 0,
			data : conversation
		}
	}

	async getById(ctx) {
		const conversation = await global.db.conversation.findOne({ id : ctx.params.id })
    
		return ctx.body = {
			code : 0,
			data : conversation
		}
	}

	async createTitle(id, question, answer) {
		const prompt = `下面是我对话的内容，请帮我根据对话内容给我起个标题吧！
    Q : ${question}
    A : ${answer}
    `
		const title = await chatGPT(prompt)

		const data = title.replaceAll('标题：', '')

		await global.db.conversation.updateOne({ id : id }, { $set : { title : data } })
	}

}

module.exports = new Conversation()
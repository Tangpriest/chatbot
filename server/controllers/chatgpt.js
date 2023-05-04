const { Configuration, OpenAIApi } = require('openai');
// const { OPENAI_API_KEY } = require('../../config/config');

const OPENAI_API_KEY = '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'

const configuration = new Configuration({
	apiKey : OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

async function ask(prompt, settings = {}) {
	try {
		
		const conversation = {
			...{
				model             : 'text-davinci-003',
				prompt            : prompt,
				max_tokens        : 500,
				temperature       : 0.3,
				top_p             : 1.0,
				frequency_penalty : 1.0,
				presence_penalty  : 1.0
			},
			...settings
		}

		// console.log(conversation)

		const response = await openai.createCompletion(conversation);

		const answer = response.data.choices[0].text.trim()

		console.log(answer)
		
		return answer
			.replaceAll('A : ？', '')
			.replaceAll('A : ?', '')
			.replaceAll('A : ', '')
			.replaceAll('?', '')
			.replaceAll('？', '')
			.replaceAll('! ', '')
			.replaceAll('！ ', '')

	}
	catch (error) {
		throw new Error(`Failed to get response from OpenAI API: ${error.message}`);
	}
}

module.exports = ask

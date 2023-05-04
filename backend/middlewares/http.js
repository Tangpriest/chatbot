const { v4 } = require('uuid')

module.exports = async function(ctx, next) {
	const startTime = Date.now()
	const requestId = v4()

	ctx.requestId = requestId
	console.log(`--> ${ctx.method} ${ctx.url} ${JSON.stringify(ctx.request.body)} requestId : ${requestId}`)
	await next()
	console.log(`<-- ${ctx.method} ${ctx.url} requestId : ${requestId} done : ${Date.now() - startTime}ms`)
}

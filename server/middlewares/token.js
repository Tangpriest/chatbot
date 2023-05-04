const JwtHelper = require('../token')

module.exports = async function(ctx, next) {

	const token = ctx.headers['authorization']

	if (!token) {
		throw 401
	}

	try {

		const userInfo = JwtHelper.verifyToken(token)

		ctx.userInfo = userInfo

		await next()

	}
	catch (error) {
		if (error.name === 'JsonWebTokenError') {
			throw 403
		}

		if (error.name === 'TokenExpiredError') {
			throw 404
		}

		throw error
	}
}
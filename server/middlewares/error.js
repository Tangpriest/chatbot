const ErrorCode = {
	401 : 'Unauthorized'
}

const handleError = () => 'Internal Server Error'

module.exports = async function(ctx, next) {
	try {
		await next()
	}
	catch (error) {
		console.log(error)
		if (typeof(error) === 'number') {
			if (ErrorCode[error] !== undefined) {
				return ctx.body = {
					code    : error,
					msg     : ErrorCode[error].reason,
					content : ErrorCode[error].comment,
					data    : {
						requestid : ctx.requestId
					}
				}
			}
			else {
				return ctx.body = {
					code    : 500,
					msg     : ErrorCode[500].reason,
					content : ErrorCode[500].comment,

					data : {
						requestid : ctx.requestId
					}
				}
			}
		}
		else {
			return ctx.body = {
				code    : 500,
				msg     : handleError(error),
				content : handleError(error),
				data    : {
					requestid : ctx.requestId
				}
			}
		}
	}
}

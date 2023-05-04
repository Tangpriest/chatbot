const koa = require('koa')
const router = require('./router')
const cors = require('koa2-cors')
const { koaBody } = require('koa-body')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const compress = require('koa-compress')
const db = require('./db/db')
const error = require('./middlewares/error')
const http = require('./middlewares/http')

global.db = db

const app = new koa()

app.use(cors())

app.use(error)

app.use(require('koa-static')(`${__dirname }/public`))

app.use(koaBody({
	multipart  : true,
	formidable : {
		maxFileSize : 1024 * 1024 * 1024
	}
}))

app.use(bodyparser({
	enableTypes : [
		'json',
		'form',
		'text'
	]
}))

app.use(json())

app.use(compress({
	threshold : 10,
	flush     : require('zlib')
}))

app.use(http)

app.use(router.routes()).use(router.allowedMethods())

app.listen(8080, () => {
	console.log('Server is running on port 8080')
})
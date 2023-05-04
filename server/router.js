const Router = require('koa-router')
const Member = require('./controllers/member')
const Token = require('./middlewares/token')
const Conversation = require('./controllers/conversation')

const router = Router()

router.prefix('/api/v1')

/**
 * - 1.登陆接口（返回用户配置信息）
 * - 2.创建问题接口
 * - 3.获取列表接口
 * - 4.获取问答详情接口
 * - 5.配置用户信息接口
 * - 6.完善用户信息接口（OPENAI KEY）
 * - 7.创建订单
 * - 8.支付订单
 * - 9.提出建议接口
 */

router.post('/login', ctx => Member.login(ctx))

router.get('/auth', Token, ctx => Member.auth(ctx))

router.post('/conversation', Token, ctx => Conversation.create(ctx))

router.get('/conversation', Token, ctx => Conversation.get(ctx))

router.get('/conversation/:id', Token, ctx => Conversation.getById(ctx))

router.put('/member', Token, ctx => Member.updateInfo(ctx))

router.get('/member', Token, ctx => Member.getInfo(ctx))

router.post('/member/avatar/upload', Token, ctx => Member.uploadAvatar(ctx))

router.post('/order')

router.post('/order/pay')

router.post('/suggestion')

module.exports = router
const JwtHelper = require('../token')

class Member {
	async login(ctx) {

		const { mobile } = ctx.request.body

		const member = await global.db.memberInfo.findOneAndUpdate({ mobile }, { $set : { mobile : mobile } }, { new : true, upsert : true })

		const token = JwtHelper.generateToken({
			userId : member._id,
			mobile : mobile,
			name   : member.name
		})

		console.log(token)

		return ctx.body = {
			code : 0,
			data : {
				userInfo : {
					name : member.name || 'Leon'
				},
				token : token
			}
		}
	}

	async auth(ctx) {
		const userInfo = ctx.userInfo

		return ctx.body = {
			code : 0,
			data : {
				userInfo : {
					name : userInfo.name || 'Leon'
				}
			}
		}
	}

	async updateInfo(ctx) {
		const opt = ctx.request.body

		const userInfo = ctx.userInfo

		const data = await global.db.memberInfo.findOneAndUpdate({ _id : userInfo.userId }, {
			$set : opt
		}, { new : true })

		return ctx.body = {
			code : 0,
			data : data
		}
	}

	async getInfo(ctx) {

		console.log(global.db)

		const userInfo = await global.db.memberInfo.findOne({ _id : ctx.userInfo.userId })
		
		return ctx.body = {
			code : 0,
			data : userInfo
		}
	}

	async uploadAvatar(ctx) {
		const { image } = ctx.request.body;
		// 将 base64 编码的字符串转换为 Buffer 对象
		const imageData = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
		// 写入文件

		const fileName = `${Date.now()}.png`
		const filePath = `./public/avatars/${fileName}`; // 假设这是保存上传文件的路径

		await new Promise((resolve, reject) => {
			require('fs').writeFile(filePath, imageData, (err) => {
				if (err) {
					reject(err);
				}
				else {
					resolve();
				}
			});
		});
		ctx.body = { 
			code : 0,
			data : {
				url : `/avatars/${ fileName}`
			}	
		}
		
	}
}

module.exports = new Member()
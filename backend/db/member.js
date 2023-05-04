const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
	mobile : {
		type     : String,
		required : true,
		unique   : true
	},
	nickName : {
		type     : String,
		required : true
	},
	OPENAI_API_KEY : {
		type : String
	},
	avatar : {
		type : String
	}
}, {
	timestamps : true
})

module.exports = {
	ObjectName : 'memberInfo',
	TableName  : 'member_info',
	Schema     : Schema
}
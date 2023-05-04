const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
	id : {
		type     : String,
		required : true,
		unique   : true
	},
	title : {
		type : String
	},
	dialogs : {
		type     : Array,
		required : true
	},
	creator : {
		type     : String,
		required : true
	}
}, {
	timestamps : true
})

module.exports = {
	ObjectName : 'conversation',
	TableName  : 'conversation_info',
	Schema     : Schema
}
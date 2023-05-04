const mongoose = require('mongoose')
const config = require('../../config/config')
const Member = require('./member')
const Conversation = require('./conversation')

class mongoDB {
	constructor() {
		this.connect()
		this.combinedSchemas = [
			Member,
			Conversation
		]
		this.models()
	}

	connect() {
		// mongoose.set('useCreateIndex', true)
		// mongoose.set('useFindAndModify', false)

		mongoose.connect(config.MONGODB_URI,
			{
				// useNewUrlParser    : true,
				// useCreateIndex     : true,
				// useUnifiedTopology : true
			})
			.then(() => {
				console.log('MongoDB connection success. ')

				/** ready to use. The `mongoose.connect()` promise resolves to undefined. */
			})
			.catch(err => {
				console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
				// process.exit();
			})
	}

	models() {
		this.combinedSchemas.forEach(item => this[item.ObjectName] = mongoose.model(item.TableName, item.Schema, item.TableName))
	}
}

module.exports = new mongoDB()

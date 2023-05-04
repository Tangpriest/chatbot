import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
	mobile : {
		type     : String,
		required : true,
		unique   : true
	},
	nickName : {
		type     : String,
		required : true
	},
	openAIKey : {
		type     : String,
		required : true
	}
  
});

const Member = mongoose.models.Memeber || mongoose.model('Member', memberSchema);

export default Member;

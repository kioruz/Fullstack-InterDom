const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ColSchema = new Schema({

	nombre:{
		type: String,
		required:true,
		index: {unique: true, dropDups: true}
	},
	isActive:{
		type: Boolean,
		required:true
	},
	
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;    
    }
});


const Colores = mongoose.model('Color', ColSchema, 'Color');
module.exports = Colores;

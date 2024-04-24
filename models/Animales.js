const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AnimalSchema = new Schema({

	nombre:{
		type: String,
		required:true,
		index: {unique: true, dropDups: true}
	},

	imagen:{
		type:String,
		require:false,
		default:'null',
	},
	
	isActive:{
		type: Boolean,
		required:true,
		default:true
	},
	
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;    
    }
});

const Animales = mongoose.model('animales', AnimalSchema, 'animales');
module.exports = Animales;
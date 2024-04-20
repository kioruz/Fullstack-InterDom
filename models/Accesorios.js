const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AcceSchema = new Schema({

	nombre:{
		type: String,
		required:true,
		index: {unique: true, dropDups: true}
	},
    imagen:{
		type: String,
		required:false
	},
	isActive:{
		type: Boolean,
		required:false
    },
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;        
    }
});

const Accesorios = mongoose.model('Accesorios', AcceSchema, 'Accesorios');
module.exports = Accesorios;
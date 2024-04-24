const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VentasSchema = new Schema({
	
	email:{
		type: String,
		required:true
	},
	AnimalNombre:{
		type: String,
		required:true
    },
    ColorNombre:{
		type: String,
		required:true
	},
	AccNombre:{
		type: String,
		required:true
	},
	AnimalImagen:{
		type: String,
		required:false,
		default:'null'
	},
	AccImagen:{
		type: String,
		required:false,
		default:'null'
	},
	
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});
const Ventas = mongoose.model('Ventas', VentasSchema, 'Ventas');
module.exports = Ventas;
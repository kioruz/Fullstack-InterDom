require('mongoose');
const Ventas = require('../models/Ventas');


const addVenta = async (email,AnimalNombre,ColorNombre,AccNombre,AnimalImagen,AccImagen) => {
    try{
        
        const ventalog = new Ventas(
            {              
                email: email,
                AnimalNombre:AnimalNombre,
                ColorNombre:ColorNombre,
                AccNombre:AccNombre,
                AnimalImagen:AnimalImagen,
                AccImagen:AccImagen,
            }
        );

        let vlog = await ventalog.save(); 
        console.log("venta registrada");
        console.log(vlog);
        return { vlog }; 

    
 } catch(error){
        console.error('Error al ingresar venta',error);
    }
 }
  

const getAllVenta = async (limit,offset) => {

    const v = await Ventas.find({}).limit(limit).skip(offset);

    return v;
}

const getVentaEmail = async (v,limit,offset) => {

    const v = await Ventas.find({email:v}).limit(limit).skip(offset);

    return v;
}

const getVenta = async(id) => {

    const v = await Ventas.findById(id);

    return v;
}

const editVenta = async(v) => {

    const result = await Ventas.findByIdAndUpdate(v._id,v,{new:true});

    return result;
}

const deleteVenta = async(id) => {

    const result = await Ventas.findByIdAndDelete(id);

    return result;
}

module.exports = { getVentaEmail,addVenta, getAllVenta, getVenta, editVenta, deleteVenta }
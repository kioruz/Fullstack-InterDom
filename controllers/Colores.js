require('mongoose');
const Color = require('../models/Colores');


const addColor = async (nombre) => {

    try{
        let existColor = await Color.findOne({ nombre: nombre });
        console.log('if controller',nombre);
    if(existColor)
    {
        console.log('if controller');
        console.log('Ya existe el color',existUser);
    }
    
    else{

        const col = new Color(
            {              
                nombre: nombre
                
            }
        );

        let varcolor = await col.save(); 
        console.log("color agregado");
        console.log(varcolor);
        return { varcolor }; 

    }
 } catch(error){
        console.error('Error al buscar color',error);
    }
 }
  

const getAllColores = async (limit,offset) => {

    const colores = await Color.find({}).limit(limit).skip(offset);

    return colores;
}

const getColorID = async(id) => {

    const colores = await Color.findById(id);

    return colores;
}

const editColores = async(color) => {

    const result = await Color.findByIdAndUpdate(color._id,color,{new:true});

    return result;
}

const deleteColor = async(id) => {

    const result = await Color.findByIdAndDelete(id);

    return result;
}

module.exports = {addColor, getAllColores, getColorID, getColorID, editColores, deleteColor }
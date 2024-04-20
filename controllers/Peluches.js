require('mongoose');
const animales = require('../models/Animales');


const addPeluche = async (Nombre,isActive,) => {

    try{
        let existPel = await Pel.findOne({ Nombre: Nombre });
    if(existPel)
    {
        console.log('Ya existe el peluche',existUser);
    }
    
    else{

        const pel = new animales(
            {              
                Nombre: Nombre,
                isActive:isActive,
                
            }
        );

        let peluche = await pel.save(); 
        console.log("peluche nuevo");
        console.log(peluche);
        return { peluche }; 

    }
 } catch(error){
        console.error('Error al buscar peluche',error);
    }
 }
  

const getAllPeluches = async (limit,offset) => {

    const peluches = await animales.find({}).limit(limit).skip(offset);

    return peluches;
}

const getPelucheID = async(id) => {

    const peluche = await animales.findById(id);

    // await Pel.findOne({ _id: req.params.id })

    return peluche;
}

const editPeluche = async(peluche) => {

    const result = await animales.findByIdAndUpdate(peluche._id,peluche,{new:true});

    return result;
}

const deletePeluche = async(id) => {

    const result = await animales.findByIdAndDelete(id);

    return result;
}

module.exports = { addPeluche, getAllPeluches, getPelucheID, editPeluche, deletePeluche }
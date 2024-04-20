require('mongoose');
const Accesorios = require('../models/Accesorios');


const addAccesorios = async (nombre,imagen,isActive,) => {

    try{
        let existAcc = await Accesorios.findOne({ nombre: nombre });
    if(existAcc)
    {
        console.log('Ya existe el Accesorio',existUser);
    }
    
    else{

        const acc = new Accesorios(
            {              
                nombre: nombre,

                imagen:imagen,

                isActive:isActive,
                
            }
        );
        if(!acc.isActive){acc.isActive=true}
        let accesorio = await acc.save(); 
        console.log("Accesorio nuevo");
        console.log(accesorio);
        return { accesorio }; 

    }
 } catch(error){
        console.error('Error al buscar Accesorio',error);
    }
 }
  

const getAllAccesorios = async (limit,offset) => {

    const accesorio = await Accesorios.find({}).limit(limit).skip(offset);

    return accesorio;
}

const getAccesoriosID = async(id) => {

    const accesorio = await Accesorios.findById(id);

    return accesorio;
}

const editAccesorios = async(accesorio) => {
    try {
      console.log("Intentando actualizar el accesorio con ID:", accesorio._id);
      console.log("Datos para actualizar:", accesorio);
  
      const result = await Accesorios.findByIdAndUpdate(accesorio._id, {$set:{nombre: accesorio.nombre, imagen:accesorio.imagen, isActive:accesorio.isActive}}, { new: true });
  
      console.log("Accesorio actualizado:", result);
      return result;
    } catch (error) {
      console.error("Error al actualizar el accesorio:", error);
      
      throw error;
    }
  }

const deleteAccesorios = async(id) => {

    const result = await Accesorios.findByIdAndDelete(id);

    return result;
}

module.exports = { addAccesorios, getAllAccesorios, getAccesoriosID, editAccesorios, deleteAccesorios }
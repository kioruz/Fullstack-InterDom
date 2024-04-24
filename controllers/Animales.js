require('mongoose');
const Animales_ = require('../models/Animales');


const addAnimal = async (nombre,imagen,isActive,) => {

    try{
        let existAni = await Animales_.findOne({ nombre: nombre });
    if(existAni)
    {
        console.log('Ya existe el animal',existUser);
    }
    
    else{

        const ani = new Animales_(
            {              
                nombre: nombre,

                imagen:imagen,

                isActive:isActive,
                
            }
        );

        let animal = await ani.save(); 
        console.log("animal nuevo");
        console.log(animal);
        return { animal }; 

    }
 } catch(error){
        console.error('Error al buscar animal',error);
    }
 }
  

const getAllAnimales = async (limit,offset) => {

    const animales = await Animales_.find({}).limit(limit).skip(offset);

    return animales;
}

const getAnimalID = async(id) => {

    const animal = await Animales_.findById(id);

    // await Pel.findOne({ _id: req.params.id })

    return animal;
}

/*const editAnimal = async(animal) => {

    const result = await Animales_.findByIdAndUpdate(animal._id,animal,{new:true});

    return result;
}
*/
const editAnimal = async(animal) => {
    try {
      
  
      const result = await Animales_.findByIdAndUpdate(animal._id, {$set:{nombre: animal.nombre, imagen:animal.imagen, isActive:animal.isActive}}, { new: true });
  
      console.log("Animal actualizado:", result);
      return result;
    } catch (error) {
      console.error("Error al actualizar el animal:", error);
      // Puedes decidir si quieres lanzar el error o manejarlo de alguna manera
      throw error;
    }
  }

const deleteAnimal = async(id) => {

    const result = await Animales_.findByIdAndDelete(id);

    return result;
}

module.exports = { addAnimal, getAllAnimales, getAnimalID, editAnimal, deleteAnimal }
require('mongoose');
const AnimalesController = require('../controllers/Animales');
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

    const ventas = await Ventas.find({}).limit(limit).skip(offset);

    return ventas;
}


const getVentaEmail = async (v,limit,offset) => {

    const venta = await Ventas.find({email:v}).limit(limit).skip(offset);

    return venta;
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
const deleteVentaUsuario = async(us,id) => {

 
    console.log('datos:',id,'+',us)
    const lista = await getVentaEmail(us);
    const buscarid = lista.find(venta =>venta.id===id);

    if(buscarid)
    {
        const result = await Ventas.findByIdAndDelete(id);
        return result;
    }
    else{
        throw new error('No exite registro con ese id')
    }
 }

const ranking = async (limit, offset) => {
    
    const VentasTotales = await Ventas.find({}).limit(limit).skip(offset);
  
    const ListaAnimales = await AnimalesController.getAllAnimales(limit,offset);
   
    let listaRanking = [];
  
    ListaAnimales.forEach(animal => {
      let contador = 0;
      
      VentasTotales.forEach(venta => {
        if (animal.nombre.toLocaleLowerCase() === venta.AnimalNombre.toLocaleLowerCase()) {
          contador++;
        }
      });
      listaRanking.push({ animal: animal.nombre, ventas: contador });
    });
    
    
    listaRanking.sort((a, b) => b.ventas - a.ventas);

    const top3= listaRanking.slice(0,3);
  
    return top3;
  };
  

module.exports = {deleteVentaUsuario,getVentaEmail,addVenta, getAllVenta, getVenta, editVenta, deleteVenta,ranking }
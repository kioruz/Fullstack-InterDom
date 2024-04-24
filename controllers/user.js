require('mongoose');
const Usuarios = require('../models/user');


const addUser = async (name,lastname,email,isActive,password) => {
    if (!password) {
        throw new Error('La contraseña es requerida');        
      }
      console.log('paso pass');
    try{
        let existUser = await Usuarios .findOne({ email: email });
    if(existUser)
    {
        console.log('El email ya esta en uso',existUser);
    }
    
    else{
        console.log('entro else');
        const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');
        
        const usr = new Usuarios(
            {              
                name: name,
                lastname:lastname,
                email: email,
                isActive:isActive,
                password:cryptoPass
            }
        );

        let user = await usr.save(); 
        console.log("usuario nuevo");
        console.log(user);
        return { user }; 

    }
 } catch(error){
        console.error('Error al buscar email',error);
    }
 }
  

const getAllUsers = async (limit,offset) => {

    const users = await Usuarios.find({}).limit(limit).skip(offset);

    return users;
}

const getUser = async(id) => {

    const user = await Usuarios.findById(id);

    // await Usr.findOne({ _id: req.params.id })

    return user;
}

const editUser = async(user) => {

    const result = await Usuarios.findByIdAndUpdate(user._id,user,{new:true});

    return result;
}

const editpassword = async(user) => {

    const us = await Usuarios.findById(user._id)
    console.log('entro edit',user._id,user.password)

    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(user.password)
        .digest('hex');

    const result = await Usuarios.findByIdAndUpdate(user._id,{$set:{password:cryptoPass}},{new:true});
    return result
}

const editRoles = async(roles,id) => {

    const result = await Usuarios.findByIdAndUpdate(id,{$set:{roles:roles}},{new:true});

    return result;
}

const deleteUser = async(id) => {

    const result = await Usuarios.findByIdAndDelete(id);

    return result;
}

module.exports = { addUser, getAllUsers, getUser, editUser, editRoles, deleteUser,editpassword }
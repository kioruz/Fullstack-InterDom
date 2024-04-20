require('mongoose');
const Usr = require('../models/user');
const jwt = require('jsonwebtoken');
const JwtKey = process.env.JWT_SECRET;

const login = async(email,password) => {

    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');

    const  result = await Usr.findOne({ email: email, isActive:true, password:cryptoPass })
    
    if (result){
              
            const payload = {
                id:Usr.email,ps:cryptoPass
            };
               
            const token = jwt.sign(payload,JwtKey, { expiresIn: '24h' });
            
            return token;
    }
    return null; // retorno 

}

module.exports = {login}
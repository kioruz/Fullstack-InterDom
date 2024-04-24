require('mongoose');
const Usr = require('../models/user');
const jwt = require('jsonwebtoken');
const JwtKey = process.env.JWT_SECRET;
const jwtExpireTime = process.env.JWT_EXPIRE;
const login = async(email,password) => {

    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');

    const  result = await Usr.findOne({ email: email, isActive:true, password:cryptoPass})
    //const  result = await Usr.findOne({ email: email,});const users = await Usuarios.find({}).limit(limit).skip(offset);return users// isActive:true, password:cryptoPass})
    if (result){
              
            const payload = {
                id: result._id,
                email:result.email,
                ps:cryptoPass,
                roles:result.roles
            };
               
            const token = jwt.sign(payload,JwtKey, { expiresIn: jwtExpireTime});
            
            return token;
    }
    return null; 

}
const logout = async(req,res) =>{
    res.cookie()
}
  
  

module.exports = {login,logout}
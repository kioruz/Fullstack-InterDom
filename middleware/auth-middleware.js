const jwt = require('jsonwebtoken');
const JwtKey = process.env.JWT_SECRET;
const verify = (req,res,next) =>{

    try {
        // "Bearer <token>"
        const token = req.headers.authorization.split(" ")[1]; 
        const decode = jwt.verify(token,JwtKey);
        next();
    }catch(error){
        res.status(401).send("No autorizado");
    }     
}

module.exports = {verify}
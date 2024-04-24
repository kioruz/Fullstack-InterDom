const jwt = require('jsonwebtoken');
const JwtKey = process.env.JWT_SECRET;
const verify = (req,res,next) =>{
    try {
        // "Bearer <token>"
        const token = req.headers.authorization.split(" ")[1]; 

    if (token) {
        jwt.verify(token, JwtKey, (err, decoded) => {
            if (err) {
                return res.status(401).send('Token inválido');
            } else {
                req.user = decoded; 
                next();
            }
        });   
    } else {
        return res.status(401).send('Se requiere autenticación');
    }
    }catch(error){
        res.status(401).send("No autorizado");
    }     
}

const IsAdmin = (req, res, next) => {
   
    if (req.user.roles.includes('admin')) { 
        next(); 
    } else {
        res.status(403).send("Acceso denegado. Solo admin");
    }
};


module.exports = {verify,IsAdmin}
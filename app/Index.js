const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const url = process.env.MONGO_URL;
app.use(express.json());
/******/
const UsrController = require('../controllers/user');
const ColorController = require('../controllers/Colores');
const AnimalesController = require('../controllers/Animales');
const AccesoriosController = require('../controllers/Accesorios');
const VentasController = require('../controllers/Ventas');
const AuthController = require('../controllers/auth');
const Middleware = require('../middleware/auth-middleware');
//const MailController = require('./controllers/mail');


mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hola estoy funcionando.");
  res.status(200).json("Hola estoy funcionando.");
});

// GET - POST - DELETE - PUT - PATCH 

app.post("/",(req,res) => {
    res.send("Llamada post");
});

// Get de todos los usuarios
app.get("/users",Middleware.verify,async (req,res) =>{
//  app.get("/users",async (req,res) =>{
  let limit = req.query.limit;
  let offset = req.query.offset;

  try{
      const results = await UsrController.getAllUsers(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente mas tarde.")
  }

});

// Get Info de un usuario

app.get("/users/:id",async (req,res) =>{

    let userId =  req.params.id;

    try{

      user = await UsrController.getUser(userId);

      res.status(200).json(user);

    }catch(error){
      res.status(500).send("Error");
    }

});

// Creo un nuevo usuario

app.post("/users",async (req,res) =>{
    
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let isActive = req.body.isActive;
    let password = req.body.password;
    try{
      const result = await UsrController.addUser(name,lastname,email,isActive,password);
      if(result){
        res.status(201).send("Usuario creado correctamente"); // 201
      }else{
        res.status(409).send("El usuario ya existe"); // 409
      }  
    }catch(error){
      console.error(error);
      res.status(500).send(`Error al crear el usuario: ${error.message}`); //500
    }  
    
});

// Modifico un usuario
app.put("/users/:id",async (req,res) =>{

    const user = { _id: req.params.id, ...req.body };
    //             {_id: req.params.id, name: req.body.name, lastname, email }
    try{
      
      const result = await UsrController.editUser(user);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(404).send("El usuario no existe.");
      }  
    }catch(error){  
       res.status(500).send("Error");
    } 

});

// Elimino un usuario
app.delete("/users/:id", async(req,res) =>{

    try{

      const result = await UsrController.deleteUser(req.params.id);
      if(result){
        res.status(200).send("Usuario borrado.")
      }else{
        res.status(404).send("No se ha podido eliminar el usuario.")
      }  

    }catch(error){
      res.status(500).send("Error")
    }
});

app.put("/users/:id/roles",async (req,res) =>{
    
    const roles = req.body.roles;
    //const user = { _id: req.params.id, ...req.body };
    try{
      
      const result = await UsrController.editRoles(roles,req.params.id);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(404).send("El usuario no existe.");
      }  
    }catch(error){  
       res.status(500).send("Error");
    } 
})

app.post("/auth/login", async (req,res) => {

    const email = req.body.email;
    const password = req.body.password;
    try{
      const result = await AuthController.login(email,password);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(401).send("No puede estar aqui")
      }
    }catch(error){
        res.status(500).send("Error");
    }  
})
console.log(PORT);

/* Manda un mail */
/*MailController.sendMail();
*/
http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

////////////////////////////////////////////////////Colores//////////////////////////////////////////////

//Crear Color
app.post("/colores",async (req,res) =>{
    
  let name = req.body.name;
  let isActive = req.body.isActive;
  try{
    const result = await ColorController.addColor(name,isActive);
    if(result){
      res.status(201).send("Color creado correctamente"); // 201
    }else{
      res.status(409).send("El Color ya existe"); // 409
    }  
  }catch(error){
    console.error(error);
    res.status(500).send(`Error al crear Color: ${error.message}`); //500
  }  
  
});

// Get todos los colores
app.get("/colores",Middleware.verify,async (req,res) =>{
  //app.get("/users",async (req,res) =>{
    let limit = req.query.limit;
    let offset = req.query.offset;
  
    try{
        const results = await ColorController.getAllColores(limit,offset);
        res.status(200).json(results);
  
    }catch(error){
        res.status(500).send("Error. Intente mas tarde.")
    }
  
  });

// Modifico un color
app.put("/colores/:id",async (req,res) =>{

  const color = { _id: req.params.id, ...req.body };

  try{
    
    const result = await ColorController.editColores(color);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El color no existe.");
    }  
  }catch(error){  
     res.status(500).send("Error");
  } 

});

// Elimino un color
app.delete("/colores/:id", async(req,res) =>{

  try{

    const result = await ColorController.deleteColor(req.params.id);
    if(result){
      res.status(200).send("Color borrado.")
    }else{
      res.status(404).send("No se ha podido eliminar el color.")
    }  

  }catch(error){
    res.status(500).send("Error")
  }
});

////////////////////////////////////////////////////Animales//////////////////////////////////////////////

//Crear Animal
app.post("/animales",async (req,res) =>{
    
  let nombre = req.body.nombre;
  let image = req.body.image
  let isActive = req.body.isActive;
  try{
    const result = await AnimalesController.addAnimal(nombre,image,isActive);
    if(result){
      res.status(201).send("Animal creado correctamente"); // 201
    }else{
      res.status(409).send("Animal ya existe"); // 409
    }  
  }catch(error){
    console.error(error);
    res.status(500).send(`Error al crear animal: ${error.message}`); //500
  }  
  
});

// Get todos los animales
app.get("/animales",Middleware.verify,async (req,res) =>{
    let limit = req.query.limit;
    let offset = req.query.offset;
  
    try{
        const results = await AnimalesController.getAllAnimales(limit,offset);
        res.status(200).json(results);
  
    }catch(error){
        res.status(500).send("Error. Intente mas tarde.")
    }
  
  });

// Modifico un animal
app.put("/animales/:id",async (req,res) =>{

  const animal = { _id: req.params.id, ...req.body };

  try{
    
    const result = await AnimalesController.editAnimal(animal);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El animal no existe.");
    }  
  }catch(error){  
     res.status(500).send("Error");
     console.log("error",error);
  } 

});

// Elimino un animal
app.delete("/animales/:id", async(req,res) =>{

  try{

    const result = await AnimalesController.deleteAnimal(req.params.id);
    if(result){
      res.status(200).send("Animal borrado.")
    }else{
      res.status(404).send("No se ha podido eliminar el animal.")
    }  

  }catch(error){
    res.status(500).send("Error")
  }
});

////////////////////////////////////////////////////Accesorios//////////////////////////////////////////////

//Crear Accesorio
app.post("/Accesorios",async (req,res) =>{
    
  let nombre = req.body.nombre;
  let image = req.body.image
  let isActive = req.body.isActive;
  try{
    const result = await AccesoriosController.addAccesorios(nombre,image,isActive);
    if(result){
      res.status(201).send("Accesorio creado correctamente"); // 201
    }else{
      res.status(409).send("Accesorio ya existe"); // 409
    }  
  }catch(error){
    console.error(error);
    res.status(500).send(`Error al crear accesorio: ${error.message}`); //500
  }  
  
});

// Get todos los Accesorios
app.get("/Accesorios",Middleware.verify,async (req,res) =>{
    let limit = req.query.limit;
    let offset = req.query.offset;
  
    try{
        const results = await AccesoriosController.getAllAccesorios(limit,offset);
        res.status(200).json(results);
  
    }catch(error){
        res.status(500).send("Error. Intente mas tarde.")
    }
  
  });

// Modifico un Accesorio
app.put("/Accesorios/:id",async (req,res) =>{

  const animal = { _id: req.params.id, ...req.body };

  try{
    
    const result = await AccesoriosController.editAccesorios(animal);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El accesorio no existe.");
    }  
  }catch(error){  
     res.status(500).send("Error");
     console.log("error",error);
  } 

});

// Elimino un Accesorio
app.delete("/Accesorios/:id", async(req,res) =>{

  try{

    const result = await AccesoriosController.deleteAccesorios(req.params.id);
    if(result){
      res.status(200).send("Accesorio borrado.")
    }else{
      res.status(404).send("No se ha podido eliminar el accesorio.")
    }  

  }catch(error){
    res.status(500).send("Error")
  }
});

////////////////////////////////////////////////////Ventas//////////////////////////////////////////////

//Crear Ventas
app.post("/Ventas",async (req,res) =>{
    
  let email = req.body.email;
  let AnimalNombre = req.body.AnimalNombre;
  let ColorNombre = req.body.ColorNombre;
  let AccNombre = req.body.AccNombre;
  let AnimalImagen = req.body.AnimalImagen;
  let AccImagen = req.body.AccImagen;
  try{
    const result = await AccesoriosController.addAccesorios(nombre,image,isActive);
    if(result){
      res.status(201).send("Accesorio creado correctamente"); // 201
    }else{
      res.status(409).send("Accesorio ya existe"); // 409
    }  
  }catch(error){
    console.error(error);
    res.status(500).send(`Error al crear accesorio: ${error.message}`); //500
  }  
  
});

// Get todos los Accesorios
app.get("/Accesorios",Middleware.verify,async (req,res) =>{
    let limit = req.query.limit;
    let offset = req.query.offset;
  
    try{
        const results = await AccesoriosController.getAllAccesorios(limit,offset);
        res.status(200).json(results);
  
    }catch(error){
        res.status(500).send("Error. Intente mas tarde.")
    }
  
  });

// Modifico un Accesorio
app.put("/Accesorios/:id",async (req,res) =>{

  const animal = { _id: req.params.id, ...req.body };

  try{
    
    const result = await AccesoriosController.editAccesorios(animal);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El accesorio no existe.");
    }  
  }catch(error){  
     res.status(500).send("Error");
     console.log("error",error);
  } 

});

// Elimino un Accesorio
app.delete("/Accesorios/:id", async(req,res) =>{

  try{

    const result = await AccesoriosController.deleteAccesorios(req.params.id);
    if(result){
      res.status(200).send("Accesorio borrado.")
    }else{
      res.status(404).send("No se ha podido eliminar el accesorio.")
    }  

  }catch(error){
    res.status(500).send("Error")
  }
});
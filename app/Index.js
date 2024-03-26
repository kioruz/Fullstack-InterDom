const express = require('express')
const mongoose = require ('mongoose')
const path = require("path");
const app = express()
require('dotenv').config();
require('app-module-path').addPath(__dirname + '/..');
const { obtenerNombresDeAnimales } = require('lib/models/conexion');
app.use(express.static('public'));

//app.use(express.static(path.join(__dirname, "public")));
const url = process.env.MONGO_URL;

mongoose.connect(url)

const AnimalSchema = new mongoose.Schema({
    nombre: String
})

// Configura EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); // Asegúrate de que la carpeta 'views' exista

app.get('/inicio', (req, res) => {
    // Envía el archivo inicio.html ubicado en el directorio 'public'
    res.sendFile(path.join(__dirname,'..', 'public', 'Inicio.html'));
});

app.get("/animales", (req, res) => {
    obtenerNombresDeAnimales()
    .then((animales) => { // Asegúrate de que la variable se llama 'animales'
        res.render('Inicio', { animales: animales }); // Aquí pasas la variable a la plantilla
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'error en el get' });
    });
});
app.get('/test', (req, res) => {
    // Envía el archivo inicio.html ubicado en el directorio 'public'
    res.render('test', {});
});
app.get("/test2", (req, res) => {
    obtenerNombresDeAnimales()
    .then((animales) => { // Asegúrate de que la variable se llama 'animales'
        res.render('test', { animales: animales }); // Aquí pasas la variable a la plantilla
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'error en el get' });
    });
});
  app.listen(8080, () => {
    console.log("inicio del servidor");
  });
  
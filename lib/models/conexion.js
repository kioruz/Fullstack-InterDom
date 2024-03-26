const { MongoClient } = require("mongodb");
require('dotenv').config();

/*async function obtenerNombresDeAnimales() {
  try {
    const database = client.db('UP');
    const animales = database.collection('animales');
    const animalesCursor = await animales.find({}, { _id: 0 });
    const animalesArray = await animalesCursor.toArray();
    const nombres = animalesArray.map(animal => animal.nombre);
    
    console.log(nombres + " son los nombres de los animales");
    return nombres;
  } catch (error) {
    console.error('Error al obtener nombres de animales:', error);
    throw error; 
} finally {
    await client.close(); 
}
}*/
function obtenerNombresDeAnimales() {
  const uri = process.env.MONGO_URL;
  const client = new MongoClient(uri);

  return client.connect() // Retorna la promesa de la conexión
  .then(() => {
      const db = client.db('UP');
      const collection = db.collection('animales');
      return collection.find({}).toArray();
      //return collection.find({}).toArray(); // Retorna la promesa de obtener los datos
  })
  .then((animales) => {
      client.close(); // Cierra la conexión después de obtener los datos
      return animales; // Retorna los datos obtenidos
  })
  .catch((error) => {
      client.close(); // Asegúrate de cerrar la conexión incluso si hay un error
      throw error; // Propaga el error
  });
}

obtenerNombresDeAnimales().catch(console.dir);
module.exports.obtenerNombresDeAnimales = obtenerNombresDeAnimales;

/*function conexion( base,  NombreColeccion) {
  const uri = process.env.MONGO_URL;
  const client = new MongoClient(uri);

  return client.connect(base,NombreColeccion) // Retorna la promesa de la conexión
  .then(() => {
      const db = client.db(base);
      const collection = db.collection(NombreColeccion);
      return collection.find({}).toArray();
      //return collection.find({}).toArray(); // Retorna la promesa de obtener los datos
  })
  .then((animales) => {
      client.close(); // Cierra la conexión después de obtener los datos
      return animales; // Retorna los datos obtenidos
  })
  .catch((error) => {
      client.close(); // Asegúrate de cerrar la conexión incluso si hay un error
      throw error; // Propaga el error
  });
}

conexion().catch(console.dir);
module.exports.conexion = conexion;
*/
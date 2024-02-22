// Configuración de variables de entorno con dotenv
require('dotenv').config();

// Obtener la API_KEY desde las variables de entorno
const { API_KEY } = process.env;

// Importar modelos y biblioteca axios
const { Dog, Temperament } = require('../db');
const axios = require('axios');

const allDogs = async () => {

    try {
        //consulta todos los perrors en la base de datos local
        const dogsDB = await Dog.findAll({
            attributes: ['ID', 'Nombre', 'AlturaMin', 'AlturaMax', 'PesoMin', 'PesoMax', 'Vidamin', 'Vidamax', 'Imagen'],
            include: {
                model: Temperament,
                as: 'Temperamentos',
                attributes: ['Nombre'],
                through: {
                    attributes: [],
                },
            },
        });
      // mapea datos de la base local a un formato mas facil de entender
        const dogsDBtemp = dogsDB.map((dog) => ({
            ID: dog.ID,
            Nombre: dog.Nombre,
            Altura: `${dog.AlturaMin} - ${dog.AlturaMax}`,
            Peso: `${dog.PesoMin} - ${dog.PesoMax}`,
            Vida: `${dog.Vidamin} - ${dog.Vidamax}`,
            Temperamento: dog.Temperamentos.map((e) => e.Nombre).toString(),
            Imagen: dog.Imagen,
        }));
        // consulta datos de perros desde la api externa 
        const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        // mapea datos de la API externa a un formato mas facil de entender 
        const dogsApiData = Array.isArray(dogsApi.data)
            ? dogsApi.data.map((dog) => ({
                ID: dog.id,
                Nombre: dog.name,
                Altura: dog.height ? `${dog.height.metric.split(' - ')[0]} - ${dog.height.metric.split(' - ')[1]}` : 'N/A',
                Peso: dog.weight ? `${dog.weight.metric.split(' - ')[0]} - ${dog.weight.metric.split(' - ')[1]}` : 'N/A',
                Temperamento: dog.temperament,
                Vida: dog.life_span ? (dog.life_span.includes(' - ') ? dog.life_span : 'N/A') : 'N/A',
                Imagen: dog.reference_image_id, 
            }))
            : [];
        // combina datos de la base d datos local y la de la API
        const dogsAll = dogsApiData.concat(dogsDBtemp);
        // devuelve la lista completa de perros
        return dogsAll;
} catch(error){
    //manejo de errores
    throw error;
}
}
module.exports = allDogs;

require('dotenv').config();
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');
const axios = require('axios');

const allDogs = async () => {

    try {
      
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
  
        
        const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        
        const dogsApiData = Array.isArray(dogsApi.data)
            ? dogsApi.data.map((dog) => ({
                ID: dog.id,
                Nombre: dog.name,
                Altura: dog.height ? `${dog.height.metric.split(' - ')[0]} - ${dog.height.metric.split(' - ')[1]}` : 'N/A',
                Peso: dog.weight ? `${dog.weight.metric.split(' - ')[0]} - ${dog.weight.metric.split(' - ')[1]}` : 'N/A',
                Temperamento: dog.temperament,
                Vida: dog.life_span ? (dog.life_span.includes(' - ') ? dog.life_span : 'N/A') : 'N/A',
                Imagen: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
            }))
            : [];


            // mapeo datos de la base local 
            const dogsDBtemp = dogsDB.map((dog) => ({
            ID: dog.ID,
            Nombre: dog.Nombre,
            Altura: `${dog.AlturaMin} - ${dog.AlturaMax}`,
            Peso: `${dog.PesoMin} - ${dog.PesoMax}`,
            Vida: `${dog.Vidamin} - ${dog.Vidamax}`,
            Temperamento: dog.Temperamentos.map((e) => e.Nombre).toString(),
            Imagen: dog.Imagen,
        }));
        // combina datos de la base d datos local y la de la API
        const dogsAll = dogsApiData.concat(dogsDBtemp);
       
        return dogsAll;
} catch(error){

    throw error;
}
}
module.exports = allDogs;

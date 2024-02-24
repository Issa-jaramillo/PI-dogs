 const { Temperament } = require('../db');
 const axios = require('axios');
 require('dotenv').config();
 const  { API_KEY } = process.env

 const temperaments = async (req, res)=>{
   
        try {
        
            const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
                headers: {
                    'x-api-key': API_KEY,
                },
            });
    
            const temperamentsFromAPI = response.data
                .map((dog) => dog.temperament)
                .filter((temperament) => typeof temperament === 'string') 
                .map((temperament) => temperament.split(', '))
                .flat();
    
            const uniqueTemperaments = [...new Set(temperamentsFromAPI)];
    
            // Guardar los temperamentos únicos en la base de datos
            await Promise.all(
                uniqueTemperaments.map(async (temperament) => {
                    await Temperament.findOrCreate({
                        where: { Nombre: temperament },
                    });
                })
            );
    
            // Obtener todos los temperamentos de la base de datos
            const allTemperaments = await Temperament.findAll();
    
            res.status(200).json(allTemperaments);
    } catch (error) {
    
        res.status(500).json({ error: 'Error interno del servidor' });
    }


 };
 
 module.exports = temperaments;
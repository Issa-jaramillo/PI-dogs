//const allDogs = require('./Alldogs');
const { Dog, Temperament } = require('../db')
// postDogs.js
const postDogs = async (req, res) => {
    try {
      // Extraer la información desestructurada del cuerpo de la solicitud
      const { Nombre, AlturaMax, AlturaMin, PesoMax, PesoMin, Vidamax, Vidamin, Imagen, Temperamentos } = req.body;
  
      // Verificar que se proporcionen al menos un temperamento
      if (!Temperamentos || Temperamentos.length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un temperamento' });
      }
  
  
      // Crear el perro en la base de datos
      const newDog = await Dog.create({
        Nombre,
        AlturaMax,
        AlturaMin,
        PesoMax,
        PesoMin,
       Vidamax,
       Vidamin,
        Imagen,
   
      });
     
      // Antes de usar setTemperamentos, asegurémonos de que newDog tenga la función
      if (typeof newDog.setTemperamentos === 'function') {
        // Obtener o crear los temperamentos y relacionarlos con el perro
        const createdTemperaments = await Promise.all(
          Temperamentos.map(async (temperamentName) => {
            const [temperamento] = await Temperament.findOrCreate({
              where: { Nombre: temperamentName },
            });
            return temperamento;
          })
        );
  
        // Asociar los temperamentos con el perro
        await newDog.setTemperamentos(createdTemperaments);
  
        // Responder con el perro creado y los temperamentos asociados
        res.status(201).json({
          dog: {
            ID: newDog.ID,
            Nombre: newDog.Nombre,
            AlturaMax: newDog.AlturaMax,
            AlturaMin: newDog.AlturaMin,
            PesoMin: newDog.PesoMin,
            PesoMax: newDog.PesoMax,
            Vidamax: newDog.Vidamax,
            Vidamin: newDog.Vidamin,
            Imagen: newDog.Imagen,
          
          },
          temperaments: createdTemperaments.map((temperamet) => temperamet.Nombre),
        });
      } else {
        // Si no tiene el método, responder con un mensaje de error
        res.status(500).json({ error: 'Error interno del servidor: setTemperamentos no es una función' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  module.exports = postDogs;
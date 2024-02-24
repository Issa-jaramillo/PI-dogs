const { Dog, Temperament } = require('../db')

const postDogs = async (req, res) => {
    try {
      const { Nombre, AlturaMax, AlturaMin, PesoMax, PesoMin, Vidamax, Vidamin, Imagen, Temperamentos } = req.body;
  
      
      if (!Temperamentos || Temperamentos.length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un temperamento' });
      }
  
  
      
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
     
    
      if (typeof newDog.setTemperamentos === 'function') {
        // Obtengo o creo los temperamentos y relacionarlos con el perro
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

        res.status(500).json({ error: 'Error interno del servidor: setTemperamentos no es una función' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  module.exports = postDogs;
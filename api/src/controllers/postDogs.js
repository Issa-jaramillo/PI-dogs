const { Dog, Temperament } = require('../db');

const postDogs = async (req, res) => {
  try {
    const {
      Nombre,
      AlturaMax,
      AlturaMin,
      PesoMax,
      PesoMin,
      Vidamax,
      Vidamin,
      Imagen,  // Puedes omitir Imagen de la destructuración si ya está presente en la solicitud
      Temperamentos,
    } = req.body;

    // Asigna la imagen predeterminada si no se proporciona una
    const imagenPredeterminada = 'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg';
    const imagenAUsar = Imagen || imagenPredeterminada;

    const newDog = await Dog.create({
      Nombre,
      AlturaMax,
      AlturaMin,
      PesoMax,
      PesoMin,
      Vidamax,
      Vidamin,
      Imagen: imagenAUsar,  // Usa la imagen predeterminada si no se proporciona una
    });

    if (Array.isArray(Temperamentos) && Temperamentos.length > 0) {
      // Buscar los temperamentos existentes en la base de datos
      const existingTemperaments = await Temperament.findAll({
        where: {
          Nombre: Temperamentos,
        },
      });

      // Asociar los temperamentos con el perro
      await newDog.setTemperamentos(existingTemperaments);

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
        temperaments: existingTemperaments.map((temperament) => temperament.Nombre),
      });
    } else {
      res.status(400).json({ error: 'Debe proporcionar al menos un temperamento' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = postDogs;

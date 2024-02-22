const allDogs = require('./Alldogs');

// Controlador para la ruta /dogs que utiliza la función allDogs
const getDogs = async (req, res) => {
  try {
    const dogs = await allDogs();

    res.json(dogs);
  } catch (error) {
    // Manejar errores y devolver respuesta de error al cliente
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDogs;

const allDogs = require('./Alldogs');

// Controlador para la ruta /dogs/:idRaza
const getRazaId = async (req, res) => {
    try {
        // Extraer el ID de la raza de los parámetros de la solicitud
        const { idRaza } = req.params;

        // Verificar si se proporcionó un ID de raza
        if (!idRaza) {
            return res.status(400).send('ID de raza no proporcionado');
        }

        // Obtener información de todas las razas (tanto de la API como de la base de datos)
        const returnDogs = await allDogs();

        // Filtrar las razas que coincidan con el ID proporcionado
        const queryDogs = returnDogs.filter(dog => dog.ID.toString() === idRaza.toString());

        // Verificar si se encontraron resultados
        if (queryDogs.length) {
            // Si hay resultados, responder con el array de resultados
            return res.status(200).json(queryDogs);
        } else {
            // Si no se encontraron resultados, responder con un mensaje de error
            return res.status(404).send('No hay raza de perro con ID ' + idRaza);
        }
    } catch (error) {
        // Manejar errores y devolver respuesta de error al cliente
       
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = getRazaId;
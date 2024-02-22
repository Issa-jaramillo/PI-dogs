const allDogs = require('./Alldogs');

const getRazaName = async (req, res) => {
    try {
        // Extraer el nombre de la raza de la consulta query de la solicitud
        const { Name } = req.query;

        // Verificar si se proporcionó un nombre de raza
        if (!Name) {
            return res.status(400).send('Nombre de raza no proporcionado');
        }

        // Obtener información de todas las razas (tanto de la API como de la base de datos)
        const returnDogs = await allDogs();

        // Filtrar las razas que coincidan con el nombre proporcionado (insensible a mayúsculas y minúsculas)
        const queryDogs = returnDogs.filter(dog =>
            dog.Nombre.toLowerCase().includes(Name.toLowerCase())
        );

        // Verificar si se encontraron resultados
        if (queryDogs.length) {
            // Si se encontraron resultados, responder con el array de resultados
            return res.status(200).json(queryDogs);
        } else {
            // Si no se encontraron resultados, responder con un mensaje de error
            return res.status(404).send('No hay razas de perro con el nombre ' + Name);
        }
    } catch (error) {
        // Manejar errores y devolver respuesta de error al cliente
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

 module.exports = getRazaName

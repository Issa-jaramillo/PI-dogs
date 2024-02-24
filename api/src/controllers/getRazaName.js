const allDogs = require('./Alldogs');

const getRazaName = async (req, res) => {
    try {
 
        const { Name } = req.query;

       
        if (!Name) {
            return res.status(400).send('Nombre de raza no proporcionado');
        }

        const returnDogs = await allDogs();

        // Filtrar las razas que coincidan con el nombre proporcionado (insensible a mayúsculas y minúsculas)
        const queryDogs = returnDogs.filter(dog =>
            dog.Nombre.toLowerCase().includes(Name.toLowerCase())
        );

        if (queryDogs.length) {
            // Si se encontraron resultados, responder con el array de resultados
            return res.status(200).json(queryDogs);
        } else {
       
            return res.status(404).send('No hay razas de perro con el nombre ' + Name);
        }
    } catch (error) {
  
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

 module.exports = getRazaName

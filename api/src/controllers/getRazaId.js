const allDogs = require('./Alldogs');


const getRazaId = async (req, res) => {
    try {
      
        const { idRaza } = req.params;

        
        if (!idRaza) {
            return res.status(400).send('ID de raza no proporcionado');
        }

        const returnDogs = await allDogs();

        // Filtro las razas que coincidan con el ID proporcionado
        const queryDogs = returnDogs.filter(dog => dog.ID.toString() === idRaza.toString());

    
        if (queryDogs.length) {

            return res.status(200).json(queryDogs);
        } else {
            return res.status(404).send('No hay raza de perro con ID ' + idRaza);
        }
    } catch (error) {
    
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = getRazaId;
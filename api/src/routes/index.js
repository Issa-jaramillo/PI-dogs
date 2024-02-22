const { Router } = require('express');
const getDogs = require('../controllers/getDogs');
const getRazaId = require('../controllers/getRazaId');
const getRazaName = require('../controllers/getRazaName')
const postDogs = require('../controllers/postDogs');
const getTemperaments = require('../controllers/getTemperaments');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog } = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs/name', getRazaName);
router.get('/dogs/:idRaza', getRazaId);
router.get('/dogs', getDogs);
router.post('/dogs', postDogs);
router.get('/temperaments', getTemperaments);




module.exports = router;

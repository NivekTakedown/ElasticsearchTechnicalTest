const express = require('express');
const searchController = require('../controllers/searchController');
const { validateSearchParams, validateIndexParams } = require('../middlewares/middlewares');

const router = express.Router();

// Ruta para indexar un nuevo usuario
router.post('/users', validateIndexParams, searchController.indexDocument);

// Ruta para búsqueda exacta
router.get('/users/exact-search', validateSearchParams, searchController.exactSearch);

// Ruta para búsqueda difusa
router.get('/users/fuzzy-search', validateSearchParams, searchController.fuzzySearch);

module.exports = router;
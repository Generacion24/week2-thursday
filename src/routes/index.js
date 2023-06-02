const express = require('express');
const songRouter = require('./song.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/songs', songRouter)

module.exports = router;
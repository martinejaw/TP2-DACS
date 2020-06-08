const express = require('express');

module.exports = app => {

    const Usuarios = app.db.models.Usuarios;

    const router = express.Router();

    router.get('/', (req, res) => {
        res.send('Hola');
    });

    return router;

};
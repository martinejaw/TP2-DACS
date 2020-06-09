const express = require('express');
const { Op } = require('sequelize');
const cors = require('cors');

module.exports = app => {

    const Usuarios = app.db.models.Usuarios;

    const router = express.Router();

    router.get('/', (req, res) => {
        res.json('Hola');
    });

    router.post('/', (req, res) => {
        Usuarios.create(req.body)
            .then(usuarioCreado => 
                res.status(201).json(usuarioCreado))
            .catch(e => {
                res.status(404).json({msg: e.message})
            });
    });

    router.post('/validar', cors(), (req, res) => {
        const user = req.body.user;
        const pass = req.body.password;

        Usuarios.findOne({ where: {[Op.and]: [{ user: user, password: pass }]} })
            .then(validado => {
                if(validado==null){
                    res.status(201).json(false)
                } else {
                    res.status(201).json(true)
                }}
                )
            .catch(e => {
                res.status(404).json(e.message)
            });
    });

    return router;
};
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('./config.js');

let db = null;

module.exports = app => {

    if(!db){
        // Inicio la conexion (seq)
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        db = {
            sequelize,
            Sequelize,
            models: {}
        };


        const dir = path.join(__dirname, 'models');
        fs.readdirSync(dir).forEach(filename => {
            // Obtengo la direccion de cada archivo
            const modelDir = path.join(dir, filename);

            const model = sequelize.import(modelDir); // Me devuelve el modelo
            db.models[model.name] = model;
        });

        Object.keys(db.models).forEach( key => {
            // Ejecuto las relaciones
            db.models[key].associate(db.models);
        });

    }

    return db;

}
module.exports = (sequelize, DataType) => {

    const modeloUsuarios = {
        id: {
            type: DataType.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        user: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }

    // NOMBRE TABLA, Y SUS FILAS
    const Usuarios = sequelize.define('Usuarios', modeloUsuarios);

    return Usuarios;

};
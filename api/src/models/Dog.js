const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    Imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AlturaMin: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    AlturaMax: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    PesoMin: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    PesoMax: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Vidamax: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    Vidamin: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
};

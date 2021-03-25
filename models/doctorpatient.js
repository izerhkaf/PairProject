'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorPatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DoctorPatient.init({
    doctorId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    receipt: DataTypes.STRING,
    diagnosa: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN,
    consultationId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DoctorPatient',
    hooks:{
      beforeCreate(instances, options){
        let seconds = new Date().getSeconds()
        let minutes = new Date().getMinutes()
        let date = new Date().getDate()
        instances.consultationId = `${instances.name}${date}${minutes}${seconds}`
      }
    }
  });
  return DoctorPatient;
};
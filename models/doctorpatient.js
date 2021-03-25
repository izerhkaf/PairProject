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
    doctorId: {
      validate: {
        notEmpty : {
          msg : "Doctor is not allowed empty"
        }  
      },
      type: DataTypes.INTEGER,
    },
    patientId: DataTypes.INTEGER,
    receipt: DataTypes.STRING,
    diagnosa: {
      validate: {
        notEmpty : {
          msg : "diagnosa is not allowed empty"
        }  
      },
      type: DataTypes.STRING
    },
    isDone: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'DoctorPatient',
    // hooks: {
    //   beforeCreate(instances, options){
    //     let seconds = new Date().getSeconds()
    //     let minutes = new Date().getMinutes()
    //     let date = new Date().getDate()
    //     // console.log(instances)
    //     // console.log(`${instances.name}/${date}/${minutes}/${seconds}`) 
    //   }
    // }
  });
  return DoctorPatient;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsToMany(models.Doctor, {through: "DoctorPatient", foreignKey:"patientId"})
    }
    static getFormattedDate(date) {
      let formatted = new Date(date).toISOString().split("T")[0]

      return formatted
    }
  };
  Patient.init({
    name: {
      validate: {
        notEmpty : {
          msg : "name is not allowed empty"
        }  
      },
      type: DataTypes.STRING
    },
    birth_date: {
      validate: {
        notEmpty : {
          msg : "birthdate is not allowed empty"
        }  
      },
      type: DataTypes.DATE
    },
    email: {
      validate: {
        isEmail : {
          msg : "email is not allowed empty"
        }  
      },
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    phone_number: {
      validate: {
        notEmpty : {
          msg : "phone number is not allowed empty"
        }  
      },
      type: DataTypes.STRING
    },
    username: {
      validate: {
        notEmpty : {
          msg : "username is not allowed empty"
        }  
      },
      type: DataTypes.STRING
    },
    password: {
      validate: {
        notEmpty : {
          msg : "password is not allowed empty"
        }  
      },
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};
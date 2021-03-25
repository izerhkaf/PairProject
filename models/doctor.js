'use strict';
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsToMany(models.Patient, {through: "DoctorPatient", foreignKey:"doctorId"})
    }
    
    addDr(){
      return `dr. ${this.name}`
    }
  };
  Doctor.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {msg: "Please Input Name"}
      }
    },
    specialist: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {msg: "Please Input Specialist"}
      }
    },
    gender: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {msg: "Please Input Username"}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {msg: "Please Input Password"}
      }
    }
  }, {
    sequelize,
    modelName: 'Doctor',
    hooks:{
      beforeCreate(instance, option){
        instance.password = bcrypt.hashSync(instance.password, salt)
      }
    }
  });
  return Doctor;
};
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Log extends Model {}

Log.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
          type: DataTypes.STRING,
      },
      body: {
        type: DataTypes.STRING,
      },
      exercises: {
        type: DataTypes.INTEGER,
      },
      time: {
        type: DataTypes.STRING,
      },
      calories_burned: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'log'
    }
  );

  module.exports = Log;
  

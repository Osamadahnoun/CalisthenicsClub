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
          allowNull: false
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false
      },
      exercises: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false
      },
      calories_burned: {
        type: DataTypes.INTEGER,
        allowNull: false
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
  

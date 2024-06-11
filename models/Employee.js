const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'role',
        key: 'id',
        onDelete: 'SET NULL',

      }
    },
    manager_id: {
      type: DataTypes.STRING(30),
      allowNull: true,
      references: {
        model: 'employee',
        key: 'first_name',
        onDelete: 'SET NULL', 

      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee'
  }
);

module.exports = Employee;

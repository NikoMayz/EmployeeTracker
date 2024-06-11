const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'department',
        key: 'id',
        onDelete: 'CASCADE' // Cascade delete

      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'role'
  }
);

module.exports = Role;

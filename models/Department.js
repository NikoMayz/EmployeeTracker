const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class Department extends Model {}

Department.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false
          }
        },
        {
            sequelize,
            timestamps: false,
            // Prevent sequelize from renaming the table
            freezeTableName: true,
            underscored: true,
            modelName: 'department'
          }
        );

        module.exports = Department;















   
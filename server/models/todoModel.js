'use strict';
module.exports = (sequelize, DataTypes) => {
    let todos = sequelize.define('todos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: DataTypes.STRING,
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        timestamps: false,
        tableName: 'todos'
    });
    return todos;
};
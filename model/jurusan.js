const sequelize = require('sequelize');
const db = require('../config/database')

var jurusan = db.define('jurusan', {
    id:{type: sequelize.INTEGER, primaryKey: true},
    nama_jurusan:sequelize.STRING
},{
    freezeTableName:true,
    timestamps:false,
})

module.exports = jurusan
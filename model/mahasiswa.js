const sequelize = require('sequelize');
const db = require('../config/database')
const jurusan = require('./jurusan')

var mahasiswa = db.define('mahasiswa', {
    nim: sequelize.INTEGER,
    nama: sequelize.STRING,
    id_jurusan: sequelize.INTEGER,
    foto: sequelize.TEXT,
}, {
    freezeTableName: true,
    timestamps: false,
})
// ke model jurusan
mahasiswa.hasOne(jurusan, { foreignKey: 'id' })
// ke model mahasiswa
mahasiswa.belongsTo(jurusan, { foreignKey: 'id_jurusan' })

mahasiswa.removeAttribute('id')
module.exports = mahasiswa;
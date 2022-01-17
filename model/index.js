// FILE INDEX DIGUNAKKAN JIKA BANYAK MODEL
const mahasiswa = require('./mahasiswa');
const jurusan = require('./jurusan')
const user = require('./user')
const model = {};

model.mahasiswa = mahasiswa
model.jurusan = jurusan
model.user = user

module.exports = model;
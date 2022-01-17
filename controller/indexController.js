const mahasiswa = require('./mahasiswaController');
const user = require('./userController')
const controllers = {}

controllers.mahasiswa = mahasiswa;
controllers.user = user;

module.exports =controllers;
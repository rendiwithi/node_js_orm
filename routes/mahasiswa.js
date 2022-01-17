// ORM SEQUELIZE
const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../config/database')
const controller = require('../controller/indexController');
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: function (req,res, cb){
        cb(null, './assets/')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

const upload  = multer({storage:storage});

router.get('/', auth,controller.mahasiswa.getAll);
router.get('/:nim', controller.mahasiswa.findAt);
router.post('/', upload.single('foto'), controller.mahasiswa.createNew);
router.put('/', controller.mahasiswa.editAt);
router.delete('/', controller.mahasiswa.deleteAt);

// NON ORM sequelize

// const express = require('express')
// const router = express.Router();
// const db = require('../config/database')

// router.get("/", (req, res, next) => {
//     var sql = `select * from mahasiswa`;
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         res.status(200).json({ message: 'GET Method Mahasiswa', data: result });
//     })
// }).post("/", (req, res, next) => {
//     const mahasiswa = {
//         nim: req.body.nim,
//         nama: req.body.nama,
//         jurusan: req.body.jurusan,
//     }
//     var sql = `INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (${mahasiswa.nim}, '${mahasiswa.nama}', '${mahasiswa.jurusan}');    `
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         res.status(200).json({ mahasiswa });
//     })
// }).put("/", (req, res, next) => {
//     const mahasiswa = {
//         nim: req.body.nim,
//         nama: req.body.nama,
//         jurusan: req.body.jurusan,
//     }
//     var sql = `UPDATE mahasiswa SET nim=${mahasiswa.nim}, nama='${mahasiswa.nama}', jurusan='${mahasiswa.jurusan}' where nim=${mahasiswa.nim} `
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         res.status(200).json({ mahasiswa });
//     })
// }).delete("/", (req, res, next) => {
//     const nim = req.body.nim
//     var sql = `Delete from mahasiswa where nim = ${nim}`
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         res.status(200).json({ "message": `data dengan nim ${nim} sudah terhapus` });
//     })
// })


// router.get("/search/:nim", (req, res, next) => {
//     var nim = req.params.nim;
//     var sql = `select * from mahasiswa where nim = '${nim}'`;
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         if (result.length > 0) {
//             res.status(200).json({ message: 'GET Method Mahasiswa', data: result });
//         } else {
//             res.status(200).json({ message: 'GET Method Mahasiswa', data: "Data not found" });
//         }
//     })
// })
module.exports = router;
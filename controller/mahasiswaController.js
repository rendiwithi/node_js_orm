const model = require('../model/index')
const controller = {}
const { Op } = require('sequelize')
// Read All
controller.getAll = async function (req, res) {
    try {
        await model.mahasiswa.findAll({
            include:[
                {model:model.jurusan}
            ],
            // // oreder asc/desc
            // order: [['nim', 'desc']],
            // // nim as nimMhs
            // attributes: [['nim', 'nimMhs']],
            // // limit 1
            // limit: 1, 
            // where: {
                // nama like= '%rendi%'
                // [Op.or]:{
                //     nama:{
                //         [Op.like]:'%rendi%'
                //     }
                // }

                // 100 < nim > 200000000000
                // nim: {
                //     [Op.between] : [100, 200000000000]
                // },

                // nim = 1462000020 or nama = budi
                // [Op.or]: [
                //     { nim: '1462000020' },
                //     {nama:'budi'}
                // ]

                // nim = 123 or 321
                // nim:{
                //     [Op.or]:[123,321]
                // }
            // },
        }).then((result) => {
            if (result.length > 0) {
                res.status(200).json({ message: "connection succed", data: result })
            } else {
                res.status(200).json({ message: "connection failed", data: [] })
            }
        })
    } catch (error) {
        res.send(404).json({ message: error })
    }
}
// Read one data
controller.findAt = async function (req, res) {
    try {
        await model.mahasiswa.findAll({
            where: {
                nim: req.params.nim
            }
        }).then((result) => {
            if (result.length > 0) {
                res.status(200).json({ message: "connection succed", data: result })
            } else {
                res.status(200).json({ message: "connection failed", data: [] })
            }
        })
    } catch (error) {
        res.send(404).json({ message: error })
    }
}
// Create new data
controller.createNew = async function (req, res) {
    try {
        console.log(req.file);
        let mahasiswa = await model.mahasiswa.create({
            nim: req.body.nim,
            nama: req.body.nama,
            id_jurusan: req.body.id_jurusan,
            foto: req.file.path,
        })
        res.status(201).json({ message: 'success', data: mahasiswa })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
// Edit data
controller.editAt = async function (req, res) {
    try {
        let mahasiswa = await model.mahasiswa.update({
            nama: req.body.nama,
            jurusan: req.body.jurusan,
        }, {
            where: {
                nim: req.body.nim
            }
        })
        res.status(200).json({ message: 'success' })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

// Delete data
controller.deleteAt = function (req, res) {
    try {
        let mahasiswa = model.mahasiswa.destroy({
            where: {
                nim: req.body.nim
            }
        })
        res.status(200).json({ message: 'success' })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
module.exports = controller
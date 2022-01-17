const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//  membuat routes mahasiswa di path /mahasiswa
const mhsRoutes = require('./routes/mahasiswa')
const usrRoutes = require('./routes/userRoutes')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/mahasiswa", mhsRoutes);
app.use('/user', usrRoutes)
app.use('/assets', express.static('assets'))


// semua path error akan kesini
app.use((req, res, next) => {
    const err = new Error(`${req.url} not found in this server`)
    err.status = 404;
    next(err)
})
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message })
})

module.exports = app;
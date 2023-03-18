const express = require('express')
const app = express()
// const router = express.Router();

const UserRoutes = require('./routes/auth.routes')

// app.get('/', (req, res) => {
//     res.quary
// })

app.use(express.json())
console.log(':::::app.js');
app.use('/auth',UserRoutes)

module.exports = app
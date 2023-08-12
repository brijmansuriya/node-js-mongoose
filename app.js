const express = require('express')
const app = express()
// const router = express.Router();

const UserRoutes = require('./routes/auth.routes')

app.get('/', (req, res) => {
    res.send('ok')
})

app.use(express.json())
console.log(':::::app.js');
app.use('/api/auth',UserRoutes)

module.exports = app
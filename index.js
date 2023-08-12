require('dotenv').config()
require('./db')
const port = process.env.PORT
const app = require('./app')

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
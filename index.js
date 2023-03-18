const app = require('./app')
require('dotenv').config()
require('./db')
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
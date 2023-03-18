const { Router } = require('express')
const { register,userlist,userDelete,login} = require('../controllers/auth.controller')
const userRouter = Router()

console.log(':::::app.routes.js');
userRouter.post('/register', register)
userRouter.get('/userlist', userlist)
userRouter.get('/user-delete/:id', userDelete)
userRouter.post('/login',login)

module.exports = userRouter
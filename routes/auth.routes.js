const { Router } = require('express')
const { register,userlist,userDelete,login,userDetails} = require('../controllers/auth.controller')
const userRouter = Router()

console.log(':::::auth app.routes.js');
userRouter.post('/register', register)
userRouter.get('/userlist', userlist)
userRouter.get('/user-delete/:id', userDelete)
userRouter.post('/login',login)
userRouter.get('/user-details/:id', userDetails)


module.exports = userRouter
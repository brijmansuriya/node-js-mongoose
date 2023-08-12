const {Schema,model} = require('mongoose')

const UserSchema = new Schema({
    username: { type: String, 
        require:[true, " please enter username"],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        require: [true, "please enter email address"],
        unique: true,
        index: true,
    },
    phone: {
        type: String,
        require: false,
        minlength: 7,
        maxlength: 15
    },
    password: {
        type: String,
        require: [true, "please enter password"],
        minlength: 8,
        maxlength: 100
    }
   
})
module.exports = model('UserModel', UserSchema)

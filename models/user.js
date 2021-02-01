const bcrypt = require ('bcrypt');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Veuillez indiquer votre nom']
    },
    email: {
        type: String,
        required: [true, 'Veuillez indiquer votre email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Veuillez indiquer votre mot de passe']
    }   
});

userSchema.pre('save', function (next){
    const user = this

    bcrypt.hash(user.password, 10, (error, encrypted)=>{
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('user', userSchema)

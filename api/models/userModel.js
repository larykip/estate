const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    try{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
        next()
    }catch(error){
        console.error(error)
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;
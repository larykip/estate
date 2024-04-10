const errorHandler = require("../error")
const successHandler = require("../success")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createUser = async (req, res, next) => {
    try{
            // Destructure the request body
            const { username, email, password, confirmPassword } = req.body

            // Check if the user already exists
            const user = await User.findOne({ username })
            const emailExists = await User.findOne({ email })
            if(user || emailExists) {
                errorHandler(400, 'User already exists!')
            }

            if(password !== confirmPassword) {
                errorHandler(400, 'Passwords do not match!')
            }
            // Create a new user
            const newUser = new User({ username, email, password })
            await newUser.save()

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            res.cookie('access-token', token, {
                expiresIn: process.env.JWT_EXPIRES_IN,
                httpOnly: true
            })

            res.status(201).json({ message: "User created successfully" })
    }catch(error){
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try{
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if(!user) {
            errorHandler(400, 'Invalid Credentials!')
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            errorHandler(400, 'Invalid Credentials!')
        }

        const token = jwt.sign({ id: user._id, }, process.env.JWT_SECRET)

        res.cookie('access-token', token, {
            expiresIn: process.env.JWT_EXPIRES_IN,
            httpOnly: true
        })

        res.status(200).json({ message: "User logged in successfully" })
        //successHandler(200, 'User logged in successfully')


    }catch(error){
        next(error)
    }
}

module.exports = { createUser, loginUser }
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./connectDB');
dotenv.config();


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(5000, () => {
    connectDB()
    console.log('Server is running on port 5000')
});
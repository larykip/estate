const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./connectDB');
dotenv.config();
const userRoutes = require('./routes/userRoute');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

//parse the request body
app.use(express.json());

//use the authRoutes
app.use('/api/user', userRoutes);

//error middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({ 
        success: false,
        statusCode,
        message
     });
})

//success middleware
// app.use((succ, req, res, next) => {
//     const statusCode = succ.statusCode || 200;
//     const message = succ.message || 'Success';
//     return res.status(statusCode).json({ 
//         success: true,
//         statusCode,
//         message
//      });
// })

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
});
require('dotenv').config();
const express= require('express');
const app= express();

app.use(express.json());

const authenticateUser = require('./middleware/authentication');
const authRouter = require('./routes/authRoutes.js');
const jobsRouter = require('./routes/jobsRoutes.js');
const connectDB = require('./db/connect.js');

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

const port=5000;

const start= async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=>
            console.log(`Server is runnign on port ${port}..`));
    }    
    catch(error){
        console.log(error);
    }
}
start();




require('dotenv').config();
const express= require('express');
const app= express();

app.use(express.json());

const authRouter = require('./routes/authRoutes');

app.use('/api/v1/auth',authRouter);

const connectDB=require('./db/connect.js');
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




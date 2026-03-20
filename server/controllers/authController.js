const User= require('../models/User');

const register= async(req, res)=>{

    try {
        const user= await User.create(req.body);

        res.status(201).json({user});
    }
    catch(error){
        res.status(400)({msg:error.message});
    }
};

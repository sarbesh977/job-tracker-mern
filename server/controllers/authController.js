const User= require('../models/User');

const register= async(req, res)=>{

    try {
        const user= await User.create(req.body);

        res.status(201).json({user});
    }
    catch(error){
        res.status(400).json({msg:error.message});
    }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide email and password' });
  }

  const user= await User.findOne({email});

  if(!user){
    return res.status(401).json({ msg: 'Invalid Credentials' });
  }

  const isPasswordCorrect= user.password===password;

  if(!isPasswordCorrect){
    return res.status(401).json({ msg: 'Invalid Credentials' });
  }
  res.status(200).json({user: { name: user.userName }, msg: 'Login Successful'}) //
};

module.exports= {register, login};
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = user.createJWT();
        res.status(201).json({ user: { userName: user.userName }, token });
    } catch (error) {
        if (error.code && error.code === 11000) {
            return res.status(400).json({ msg: "Please register with unique email" });
        }
        res.status(400).json({ msg: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ msg: 'Invalid Credentials' });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        return res.status(401).json({ msg: 'Invalid Credentials' });
    }

    // UPDATED: Create token using the model method
    const token = user.createJWT();

    res.status(200).json({ 
        user: { userName: user.userName }, 
        token, 
        msg: 'Login Successful' 
    });
};

module.exports = { register, login };
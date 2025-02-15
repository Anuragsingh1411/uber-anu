const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model'); 


module.exports.registerUser = async (req , res , next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(401).json({message : 'Invalid Data'});
    }
    console.log(req.body);
    
    const { fullname, email, password } = req.body;
    //email already exists
    const existingUser = await userModel.findOne({ email });
    if(existingUser){
        return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({ message: "User Created Successfully", token, user });

}

module.exports.loginUser = async (req , res , next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(401).json({message : 'Invalid Data'});
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if(!user ||!(await user.comparePassword(password))){
        return res.status(401).json({ message: 'Invalid Email or Password' });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch){
        return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    const token = user.generateAuthToken();
    
    res.cookie("token" , token);

    res.status(200).json({ message: 'User Logged In Successfully', token, user });

}

module.exports.getUserProfile = async (req , res , next) => {
    
}

module.exports.logoutUser = async (req , res , next) => {

    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'User Logged Out Successfully' });
}
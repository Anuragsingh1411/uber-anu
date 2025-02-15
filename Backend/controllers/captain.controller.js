const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async(req , res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname , email , password , vehicle } = req.body;
    const { firstname, lastname } = fullname;
    const { color, plate, capacity, vehicleType } = vehicle;
    
    // Check if email already exists
    const existingCaptain = await captainModel.findOne({ email });
    if(existingCaptain){
        return res.status(400).json({ errors: [{ msg: "Email already exists" }] });
    }

    
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      color,
      plate,
      capacity,
      vehicleType
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ captain, token });
}

module.exports.loginCaptain = async(req , res , next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email , password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if(!captain){
        return res.status(404).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(404).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({ captain, token });
}

module.exports.getCaptainProfile = async(req , res , next) => {
    res.status(200).json({Captain : req.captain});
}

module.exports.logoutCaptain = async(req , res , next) => {
    const token = req.captain.token || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({ token });
    
    res.clearCookie('token');

    res.status(200).json({ msg: "Logged out successfully" });
    }
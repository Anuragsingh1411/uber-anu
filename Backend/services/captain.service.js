const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !plate ||
    !capacity ||
    !vehicleType ||
    !color
  ) {
    throw new Error("Please fill all the fields");
  }
  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    password,
    vehicle: {
      plate,
      capacity,
      vehicleType,
      color
    }
  });
  return captain;
};
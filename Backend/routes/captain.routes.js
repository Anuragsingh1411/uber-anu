const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be greater than or equal to 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "bike", "auto"])
      .withMessage("Vehicle type must be one of car, bike, or auto")
  ],
  captainController.registerCaptain
);

router.post(
    "/login", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 3 }).withMessage("Password must be at least 3 characters")
  ],
  captainController.loginCaptain
);

router.get('/profile' ,authMiddleware.authCaptain ,  captainController.getCaptainProfile);

router.get('/logout' , authMiddleware.authCaptain , captainController.logoutCaptain);

module.exports = router;

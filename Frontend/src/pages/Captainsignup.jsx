import React, { useState } from 'react';
import axios from 'axios';

const Captainsignup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    vehicle: {
      plate: '',
      capacity: '',
      vehicleType: '',
      color: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('vehicle.')) {
      const vehicleField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        vehicle: {
          ...prevData.vehicle,
          [vehicleField]: value
        }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/captains/register', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={formData.firstname}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={formData.lastname}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="text"
        name="vehicle.plate"
        placeholder="Vehicle Plate"
        value={formData.vehicle.plate}
        onChange={handleChange}
      />
      <input
        type="number"
        name="vehicle.capacity"
        placeholder="Vehicle Capacity"
        value={formData.vehicle.capacity}
        onChange={handleChange}
      />
      <input
        type="text"
        name="vehicle.vehicleType"
        placeholder="Vehicle Type"
        value={formData.vehicle.vehicleType}
        onChange={handleChange}
      />
      <input
        type="text"
        name="vehicle.color"
        placeholder="Vehicle Color"
        value={formData.vehicle.color}
        onChange={handleChange}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Captainsignup;
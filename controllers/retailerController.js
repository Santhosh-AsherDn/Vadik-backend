const Retailer = require('../models/Retailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerRetailer = async (req, res) => {
  const { name, email } = req.body;
  const existing = await Retailer.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Already registered' });

  const retailer = new Retailer({ name, email });
  await retailer.save();
  res.json({ message: 'Retailer registered. Awaiting approval.' });
};

exports.loginRetailer = async (req, res) => {
  const { email, password } = req.body;
  const retailer = await Retailer.findOne({ email });

  if (!retailer || !retailer.approved) return res.status(403).json({ message: 'Not approved yet' });
  const match = await bcrypt.compare(password, retailer.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: retailer._id }, process.env.JWT_SECRET);
  res.json({ token });  
   // for must change password after login
  //  res.json({ token, mustChangePassword: retailer.mustChangePassword });
};

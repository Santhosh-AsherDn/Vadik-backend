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

// 🔹 Basic Details

exports.updateBasicDetails = async (req, res) => {
  try {
    const retailer = await Retailer.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        gender: req.body.gender,
        source: req.body.source,
        firstVisit: req.body.firstVisit,
        status: req.body.status,
        profileId: req.body.profileId,
      },
    }, { new: true });
    res.json(retailer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Advanced Details

exports.updateAdvancedDetails = async (req, res) => {
  try {
    const retailer = await Retailer.findByIdAndUpdate(req.params.id, {
      $set: {
        dateOfBirth: req.body.dateOfBirth,
        dateOfAnniversary: req.body.dateOfAnniversary,
        profession: req.body.profession,
        incomeLevel: req.body.incomeLevel,
        location: req.body.location,
        favouriteProducts: req.body.favouriteProducts,
        favouriteColours: req.body.favouriteColours,
        favouriteBrands: req.body.favouriteBrands,
        lifestyle: req.body.lifestyle,
        interests: req.body.interests,
        customerLabel: req.body.customerLabel,

      },
    }, { new: true });
    res.json(retailer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Privacy Details

exports.updatePrivacyDetails = async (req, res) => {
  try {
    const retailer = await Retailer.findByIdAndUpdate(req.params.id, {
      $set: {
        communicationChannel: req.body.communicationChannel,
        typesOfCommunication: req.body.typesOfCommunication,
        privacyNotes: req.body.privacyNotes,
        satisfactionScore: req.body.satisfactionScore,
        engagementScore: req.body.engagementScore,
        optOption: req.body.optOption,

      },
    }, { new: true });
    res.json(retailer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Referral Details

exports.updateReferralDetails = async (req, res) => {
  try {
    const retailer = await Retailer.findByIdAndUpdate(req.params.id, {
      $set: {
        referredBy: req.body.referredBy,
        referralCode: req.body.referralCode,
        rewardsEarned: req.body.rewardsEarned,
        
      },
    }, { new: true });
    res.json(retailer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
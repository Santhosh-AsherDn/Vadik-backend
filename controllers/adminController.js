const Admin = require("../models/Admin");
const Retailer = require("../models/Retailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendCredentials } = require("../utils/mailer");

exports.registerAdmin = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ email, password: hashedPassword, role });
  await admin.save();
  res.json({ message: "Admin registered" });
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.getRetailers = async (req, res) => {
  const retailers = await Retailer.find();
  res.json(retailers);
};

exports.approveRetailer = async (req, res) => {
  const { retailerId } = req.params;
  const retailer = await Retailer.findById(retailerId);
  if (!retailer) return res.status(404).json({ message: "Retailer not found" });

  const tempPassword = Math.random().toString(36).slice(-8);
  retailer.password = await bcrypt.hash(tempPassword, 10);
  retailer.approved = true;
  // password must change aftrer first login
  // retailer.mustChangePassword = true;
  await retailer.save();

  await sendCredentials(retailer.email, tempPassword);
  res.json({ message: "Retailer approved and credentials sent" });
};

exports.deleteRetailer = async (req, res) => {
  const { retailerId } = req.params;
  await Retailer.findByIdAndDelete(retailerId);
  res.json({ message: "Retailer deleted" });
};

// just for superadmin role / try middleware

exports.updateAdminRole = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const requestingAdmin = await Admin.findById(decoded.id);

    if (requestingAdmin.role !== "superadmin") {
      return res
        .status(403)
        .json({ message: "Access denied. Superadmin only." });
    }

    const { adminId } = req.params;
    const { newRole } = req.body;

    if (!["admin", "superadmin"].includes(newRole)) {
      return res.status(400).json({ message: "Invalid role value" });
    }

    const targetAdmin = await Admin.findById(adminId);
    if (!targetAdmin)
      return res.status(404).json({ message: "Admin not found" });

    targetAdmin.role = newRole;
    await targetAdmin.save();

    res.json({ message: `Admin role updated to ${newRole}` });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

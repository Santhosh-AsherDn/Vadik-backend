const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");
const retailerRoutes = require("./routes/retailerRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

const app = express();
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

app.use("/admin", adminRoutes);
app.use("/retailer", retailerRoutes);
app.use("/password", passwordRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port 5000")
);

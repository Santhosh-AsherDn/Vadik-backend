const express = require("express");
const router = express.Router();
const controller = require("../controllers/retailerController");

router.post("/register", controller.registerRetailer);
router.post("/login", controller.loginRetailer);



module.exports = router;

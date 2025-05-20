const express = require("express");
const router = express.Router();
const controller = require("../controllers/retailerController");

router.post("/register", controller.registerRetailer);
router.post("/login", controller.loginRetailer);

// Route: Update Basic Details

router.put('/basic/:id', controller.updateBasicDetails);

// Route: Update Advanced Details

router.put('/advanced/:id', controller.updateAdvancedDetails);

// Route: Update Privacy Details

router.put('/privacy/:id', controller.updatePrivacyDetails);

// Route: Update Referral Details

router.put('/referral/:id', controller.updateReferralDetails);

module.exports = router;

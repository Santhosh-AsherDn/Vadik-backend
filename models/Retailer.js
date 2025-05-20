const mongoose = require("mongoose");

const retailerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: false,
    },
    // mustChangePassword: {
    //   type: Boolean,
    //   default: true, // Required change on first login
    // },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },

    //Basic details

    profileId:{
      type:Number,
      unique:true,
    },
    gender:{
      type:String,
    },
    source:{
      type:String,
      enum: ["Walk-In", "Online"],
    },
    status: {
      type: String,
      enum: ["Active User", "Inactive User"],
      default: "Active User",
    },
    firstVisitDate: {
      type: Date,
      default: Date.now,
    },

    //Advanced details

    dateOfBirth: {
      type: Date,
    },
    dateOfAnniversary: {
      type: Date,
    },
    profession: {
      type: String,
    },
    incomeLevel: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
      ],
    },
    location: {
      type: String,
    },
    favouriteProducts: {
      type: [String],
    },
    favouriteColour: {
      type: String,
    },
    favouriteBrands: {
      type: [String],
    },
    lifestyle: {
      type: String,
    },
    interests: {
      type: [String],
    },
    customerLabel: {
      type: String,
      enum: [
        "WhatsApp",
        "Email",
        "SMS",
        "Phone Call",
        "In-Person",
      ],
    },

    //Advanced Privacy details

    communicationChannel: {
      type: String,
      enum: [
        "WhatsApp",
        "Email",
        "SMS",
        "Phone Call",
        "In-Person",
      ],
    },
    typesOfCommunication: {
      type: String,
      enum: [
        "Discount Offers",
        "New Arrivals",
        "Fashion Trends",
      ],
    },
    privacyNote: {
      type: String,
      enum: [
        "I agree to share my data with Vadik.Ai",
        "I do not want to share my data with Vadik.Ai",
      ],
    },
    satisfactionScore: {
      type: Number,
      min: 1,
      max: 5,
    },
    engagementScore: {
      type: Number,
      min: 1,
      max: 100,
    },
    optOption: {
      type: String,
      enum: [
        "Opt-In",
        "Opt-Out",
      ],
    },

    // Referral

    referredBy: { type: String },
    referralCode: { type: String },
    rewardsEarned: { type: Number, default: 0 }

  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Retailer", retailerSchema);

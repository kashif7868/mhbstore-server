const mongoose = require("mongoose");

const pearlsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // Assuming you have a User model
      required: true,
    },
    totalPearls: {
      type: Number,
      default: 0,
    },
    earnedFromSignup: {
      type: Number,
      default: 200,  // 200 Pearls for signing up
    },
    earnedFromShopping: [
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",  // Assuming you have an Order model
        },
        pearlsEarned: {
          type: Number,
          required: true,
        },
      },
    ],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Method to update Pearls after shopping
pearlsSchema.methods.updatePearlsAfterShopping = async function (orderAmount) {
  const pearlsForShopping = Math.floor(orderAmount / 1000) * 50; // 50 Pearls for every 1000 Rupees spent
  this.earnedFromShopping.push({
    orderId: orderAmount._id, // Use actual Order ID here
    pearlsEarned: pearlsForShopping,
  });
  this.totalPearls += pearlsForShopping;
  await this.save();
};

// Method to initialize Pearls for new users
pearlsSchema.methods.initializeUserPearls = function () {
  this.totalPearls = this.earnedFromSignup;
  this.save();
};

const Pearls = mongoose.model("Pearls", pearlsSchema);

module.exports = Pearls;

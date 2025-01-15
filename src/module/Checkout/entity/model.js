// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    userDetails: {
      name: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        default: "Pakistan",
      },
      province: {
        type: String,
        default: "Punjab",
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: false,
      },
      apartment: {
        type: String,
        required: false,
      },
      address: {
        type: String,
        required: true,
      },
      specialNotes: {
        type: String,
        required: false,
      },
      shipToDifferentAddress: {
        type: Boolean,
        default: false,
      },
      deliveryAddress: {
        type: String,
        required: false,
      },
    },
    cart: [
      {
        productCode: {
          type: String,
          required: true,
        },
        productName: {
          type: String,
        },
        salePrice: {
          type: Number,
        },
        price: {
          type: Number,
        },
        qty: {
          type: Number,
          default: 1,
        },
        selectedColor: {
          type: String,
        },
        selectedSize: {
          type: String,
        },
        selectedMeter: {
          type: String,
        },
        images: [
          {
            type: String,
          },
        ],
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
      enum: ["bank", "cashOnDelivery"],
    },
    selectedBank: {
      type: String,
      enum: ["bankAlfalah", "MeezanBank", "jazzCash", "easyPaisa"],
      required: false,
    },
    orderStatus: {
      type: String,
      default: "Pending", 
      enum: ["Pending", "Confirmed", "Shipped", "Cancelled", "Completed"],
    },
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryCharges: {
      type: Number,
      default: 0,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deliveryTime: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

// Add methods to update order status
orderSchema.methods.setStatusPending = function () {
  this.orderStatus = "Pending";
};

orderSchema.methods.setStatusConfirmed = function () {
  this.orderStatus = "Confirmed";
};

orderSchema.methods.setStatusShipped = function () {
  this.orderStatus = "Shipped";
};

orderSchema.methods.setStatusCancelled = function () {
  this.orderStatus = "Cancelled";
};

orderSchema.methods.setStatusCompleted = function () {
  this.orderStatus = "Completed";
};

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

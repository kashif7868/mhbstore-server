const mongoose = require("mongoose");
const Order = require("../Checkout/entity/model");  
const Product = require("../Product/entity/model");  
const User = require("../users/entity/model");  
const Pearls = require("../Peerals/entity/model");  

const reportSchema = new mongoose.Schema(
  {
    totalOrders: {
      type: Number,
      default: 0,
    },
    totalCompletedOrders: {
      type: Number,
      default: 0,
    },
    totalPendingOrders: {
      type: Number,
      default: 0,
    },
    totalCancelledOrders: {
      type: Number,
      default: 0, // Tracking cancelled orders
    },
    sales: {
      weekly: {
        type: Number,
        default: 0,
      },
      monthly: {
        type: Number,
        default: 0,
      },
      yearly: {
        type: Number,
        default: 0,
      },
    },
    orders: {
      weekly: {
        type: Number,
        default: 0,
      },
      monthly: {
        type: Number,
        default: 0,
      },
      yearly: {
        type: Number,
        default: 0,
      },
    },
    totalUsers: {
      type: Number,
      default: 0,
    },
    overallIncome: {
      type: Number,
      default: 0,
    },
    targetGoal: {
      type: Number,
      default: 10000000,
    },
    progressToGoal: {
      type: Number,
      default: 0,
    },
    totalProductsSold: {
      type: Number,
      default: 0, // Tracking total products sold
    },
    totalCategories: {
      type: Number,
      default: 0, // Tracking the number of product categories
    },
    discountsApplied: {
      type: Number,
      default: 0, // Tracking total discounts applied
    },
    shippingStatus: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'returned'],
      default: 'pending',
    },
    inventoryStatus: {
      type: String,
      enum: ['in_stock', 'out_of_stock', 'low_stock'],
      default: 'in_stock',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    totalPearls: {
      type: Number,
      default: 0, // Total Pearls earned by users
    },
  },
  { timestamps: true }
);

// Method to fetch and update total orders
reportSchema.methods.updateTotalOrders = async function () {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalCompleted: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
        totalPending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
        totalCancelled: { $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] } },
      },
    },
  ]);

  if (orders.length > 0) {
    const { totalCompleted, totalPending, totalCancelled } = orders[0];
    this.totalCompletedOrders = totalCompleted;
    this.totalPendingOrders = totalPending;
    this.totalCancelledOrders = totalCancelled;
    this.totalOrders = totalCompleted + totalPending + totalCancelled;
  }
};

// Method to fetch and update sales (weekly, monthly, yearly)
reportSchema.methods.updateSales = async function () {
  const salesData = await Order.aggregate([
    {
      $group: {
        _id: {
          week: { $week: "$createdAt" },
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        totalSales: { $sum: "$amount" },
      },
    },
  ]);

  if (salesData.length > 0) {
    const { totalSales } = salesData[0]; // You may need to adapt this for weekly, monthly, and yearly sales
    this.sales.weekly = totalSales; // Assuming sales is updated weekly; modify as needed
  }
};

// Method to fetch and update orders (weekly, monthly, yearly)
reportSchema.methods.updateOrders = async function () {
  const orderData = await Order.aggregate([
    {
      $group: {
        _id: {
          week: { $week: "$createdAt" },
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        totalOrders: { $sum: 1 },
      },
    },
  ]);

  if (orderData.length > 0) {
    const { totalOrders } = orderData[0]; // You may need to adapt this for weekly, monthly, and yearly orders
    this.orders.weekly = totalOrders; // Assuming orders are updated weekly; modify as needed
  }
};

// Method to fetch and update users and income
reportSchema.methods.updateUsersAndIncome = async function () {
  const usersCount = await User.countDocuments({});
  const income = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$amount" },
      },
    },
  ]);

  this.totalUsers = usersCount;
  this.overallIncome = income.length > 0 ? income[0].totalIncome : 0;
  this.updateProgressToGoal(this.overallIncome);
  
  // Fetch Pearls data and update totalPearls in the report
  const pearlsData = await Pearls.aggregate([
    {
      $match: { userId: this.userId }, // Assuming userId is available for the report
    },
    {
      $group: {
        _id: null,
        totalPearls: { $sum: "$totalPearls" },
      },
    },
  ]);

  this.totalPearls = pearlsData.length > 0 ? pearlsData[0].totalPearls : 0;
  this.save(); // Save the updated report
};

// Method to fetch and update product stats
reportSchema.methods.updateProductStats = async function () {
  const totalSold = await Product.aggregate([
    {
      $group: {
        _id: null,
        totalSold: { $sum: "$soldQuantity" }, // Assuming 'soldQuantity' tracks the amount sold
        totalCategories: { $sum: 1 },
      },
    },
  ]);

  if (totalSold.length > 0) {
    const { totalSold: sold, totalCategories: categories } = totalSold[0];
    this.totalProductsSold = sold;
    this.totalCategories = categories;
  }
};

// Method to update discounts applied
reportSchema.methods.updateDiscountsApplied = async function () {
  const discounts = await Order.aggregate([
    {
      $match: { discountApplied: { $exists: true, $ne: null } },
    },
    {
      $group: {
        _id: null,
        totalDiscounts: { $sum: "$discountApplied" },
      },
    },
  ]);

  if (discounts.length > 0) {
    this.discountsApplied = discounts[0].totalDiscounts;
  }
};

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;

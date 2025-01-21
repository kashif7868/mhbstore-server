const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
// const path = require('path');
const config = require("../config/config");
const morgan = require("../config/morgan");
const { jwtStrategy } = require("../config/passport");
const { authLimiter } = require("../middlewares/rateLimiter");
const logRequest = require("../middlewares/logRequest");
const { errorConverter, errorHandler } = require("../middlewares/error");
const { authRoutes } = require("../module/users/route");
const { categoryRoutes } = require("../module/Category/route");
const { subCategoryRoutes } = require("../module/SubCategory/route");
const { smallCategoryRoutes } = require("../module/SmallCateogy/route");
const { productsRoutes } = require("../module/Product/route"); // Add product routes here
const { adsCenterRoutes } = require("../module/AdsCenter/route");
const { certificateRoutes } = require("../module/Certificate/route");
const { homeSliderRoutes } = require("../module/HomeSlider/route");
const { notificationRoutes } = require("../module/Notification/route");
const { partnershipRoutes } = require("../module/Partnership/route");

// Import peerals routes
const { peeralsRoutes } = require("../module/Peerals/route"); // Add peerals route import here

// Import checkout routes
const { checkoutRoutes } = require("../module/Checkout/route");
const { reportRoutes } = require("../module/Report/route"); 
const { cartRoutes } = require('../module/Cart/route');
const ApiError = require("../utils/ApiError");

const app = express();

if (config.env !== "Mhbstore") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/api/auth", authLimiter);
}

// Use public_html/images/ to serve files
app.use(express.static("/images"));

app.use(logRequest);

// define routes here
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Category Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategory", subCategoryRoutes);
app.use("/api/smallcategory", smallCategoryRoutes);

// Product Routes
app.use("/api/products", productsRoutes); // Products API routes

// Ads Routes
app.use("/api/ads", adsCenterRoutes);

// Certificate Routes
app.use("/api/certificates", certificateRoutes);

// Home Slider Routes
app.use("/api/homeslider", homeSliderRoutes);

// Notification Routes
app.use("/api/notifications", notificationRoutes);

// Partnership Routes
app.use("/api/partners", partnershipRoutes);

// Peerals Routes
app.use("/api/peerals", peeralsRoutes); // Add peerals routes

app.use('/api/cart', cartRoutes);
// Checkout Routes
app.use("/api/orders", checkoutRoutes);

// Report Routes (Added new routes for reporting)
app.use("/api/reports", reportRoutes); // Reports API routes

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "API Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);
app.use(express.json());
// handle error
app.use(errorHandler);

module.exports = app;


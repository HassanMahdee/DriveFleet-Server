const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  carName: { type: String, required: true },
  carImage: { type: String, required: true },
  dailyRentPrice: { type: Number, required: true },
  userEmail: { type: String, required: true },
  driverNeeded: { type: Boolean, default: false },
  specialNote: { type: String, default: "" },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Booking", bookingSchema);

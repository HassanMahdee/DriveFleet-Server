const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  carType: { type: String, required: true },
  dailyRentPrice: { type: Number, required: true },
  imageURL: { type: String, required: true },
  seatCapacity: { type: Number, required: true },
  pickupLocation: { type: String, required: true },
  description: { type: String, required: true },
  available: { type: Boolean, default: true },
  ownerEmail: { type: String, required: true },
  bookingCount: { type: Number, default: 0 },
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Car", carSchema);

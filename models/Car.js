const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  carName: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  carType: { type: String, required: true, trim: true },
  dailyRentPrice: { type: Number, required: true },
  imageURL: { type: String, required: true, trim: true },
  seatCapacity: { type: Number, required: true },
  pickupLocation: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  available: { type: Boolean, default: true },
  ownerEmail: { type: String, required: true, trim: true },
  bookingCount: { type: Number, default: 0 },
  addedAt: { type: Date, default: Date.now },
});
carSchema.index({ carType: 1 });
module.exports = mongoose.model("Car", carSchema, "cars");

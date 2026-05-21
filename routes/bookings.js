const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Car = require("../models/Car");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/bookings", async (req, res) => {
  try {
    const {
      carId,
      carName,
      carImage,
      dailyRentPrice,
      totalPrice,
      startDate,
      endDate,
      driverNeeded,
      specialNote,
    } = req.body;

    const booking = new Booking({
      carId,
      carName,
      carImage,
      dailyRentPrice,
      totalPrice,
      startDate,
      endDate,
      driverNeeded,
      specialNote,
      userEmail: req.user.email,
    });
    const saved = await booking.save();

    await Car.findByIdAndUpdate(carId, { $inc: { bookingCount: 1 } });

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/my-bookings", verifyJWT, async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.user.email }).sort({
      bookingDate: -1,
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/my-bookings/:id", verifyJWT,async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

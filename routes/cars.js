const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/cars", async (req, res) => {
  try {
    const { search, type } = req.query;
    const filter = {};

    if (search) {
      filter.carName = { $regex: search, $options: "i" };
    }
    if (type) {
      filter.carType = { $in: [type] };
    }

    const cars = await Car.find(filter).sort({ addedAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/cars/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/my-cars", verifyJWT, async (req, res) => {
  try {
    const ownerEmail = req.user.email;
    const cars = await Car.find({ ownerEmail });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/cars", verifyJWT, async (req, res) => {
  try {
    const car = new Car({ ...req.body, ownerEmail: req.user.email });
    const saved = await car.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.patch("/cars/:id", verifyJWT, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    const updated = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/cars/:id", verifyJWT, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/test-count", async (req, res) => {
  const count = await Car.countDocuments();
  res.json({ count });
});
module.exports = router;

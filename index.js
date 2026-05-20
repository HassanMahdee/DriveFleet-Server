const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const carsRouter = require("./routes/cars");
const bookingsRouter = require("./routes/bookings");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));
mongoose.connection.on("connected", () => {
  console.log(`Connected to database: ${mongoose.connection.name}`);
});
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(carsRouter);
app.use(bookingsRouter);

app.get("/", (req, res) => {
  res.send("DriveFleet Kitchen is cooking!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});

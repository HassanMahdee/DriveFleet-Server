const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const carsRouter = require("./routes/cars");
const bookingsRouter = require("./routes/bookings");
require("dotenv").config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));
mongoose.connection.on("connected", () => {});
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use(carsRouter);
app.use(bookingsRouter);

app.get("/", (req, res) => {
  res.send("DriveFleet Kitchen is cooking!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Enable CORS
app.use(
  cors({
    origin: process.env.REACT_APP_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Determine Upload Directory Based on Environment
const uploadDir = process.env.NODE_ENV === "production" ? "/tmp/uploads" : path.join(__dirname, "./uploads");
console.log(process.env.NODE_ENV);
// Ensure Upload Directory Exists
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Upload directory created at: ${uploadDir}`);
  }
} catch (err) {
  console.error("Error creating upload directory:", err);
}

// Serve Static Files from Uploads Directory
app.use("/uploads", express.static(uploadDir));

// Connect to Database
const connect = require("./DB/connect");
const routes = require("./routes/index");

// Start Server
const port = process.env.PORT || 6000;
const start = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log("Error starting server:", error);
  }
};

start();

// API Routes
app.use("/api", routes);

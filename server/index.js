require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");

app.use(cors({
  origin: process.env.REACT_APP_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

app.use(express.json());

app.use("/uploads", express.static(path.resolve(__dirname, "./uploads"))); 

const fs = require("fs");
const uploadDir = path.join(__dirname, "./uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const port = process.env.PORT || 6000;
const connect = require('./DB/connect');
const routes = require('./routes/index');

const start = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
app.use("/api", routes);

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./src/config/db");

//connect to db
connectDB();

//unitialize express
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/ingredients", require("./src/routes/ingredients.js"));
app.use("/api/recipes", require("./src/routes/recipes.js"));
app.use("/api/auth", require("./src/routes/users.js"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`Server connnected on port : ${process.env.PORT}`);
});

// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

// Define the Schema
const formSchema = new mongoose.Schema({
  productDetails: {
    sno: String,
    particular: String,
    quantity: Number,
    rate: Number,
    amount: Number,
  },
  clientDetails: {
    name: String,
    address: String,
    clientGST: String,
    clientPhone: String,
    date: String,
    invoiceNumber: String,
  },
});

// Create Model
const FormData = mongoose.model("FormData", formSchema);

// API endpoint to save form data
app.post("/api/saveFormData", async (req, res) => {
  try {
    const { productDetails, clientDetails } = req.body;

    const newFormData = new FormData({
      productDetails,
      clientDetails,
    });

    await newFormData.save();
    res.status(200).json({ message: "Data saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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

// Define Schemas
const clientSchema = new mongoose.Schema({
  name: String,
  address: String,
  clientGST: String,
  clientPhone: String,
  date: String,
  invoiceNumber: String,
});

const productSchema = new mongoose.Schema({
  sno: String,
  particular: String,
  quantity: Number,
  rate: Number,
  amount: Number,
});

// Create Models
const Client = mongoose.model("Client", clientSchema);
const Product = mongoose.model("Product", productSchema);

// --- API Endpoints ---

// POST /api/clients - Save client details
app.post("/api/clients", async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = new Client(clientData);
    await newClient.save();
    res.status(200).json({ message: "Client details saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving client data", error });
  }
});

// POST /api/products - Save product details
app.post("/api/products", async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(200).json({ message: "Product details saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving product data", error });
  }
});

// GET /api/clients - Fetch all clients
app.get("/api/clients", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error });
  }
});

// GET /api/products - Fetch all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

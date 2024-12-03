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
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

// Enable mongoose debug mode for detailed logs
mongoose.set("debug", true);

// Define Schemas
const productSchema = new mongoose.Schema({
  sno: String,
  particular: String,
  quantity: Number,
  rate: Number,
  amount: Number,
});

const clientSchema = new mongoose.Schema({
  name: String,
  address: String,
  clientGST: String,
  clientPhone: String,
  date: String,
  invoiceNumber: String,
  products: [productSchema], // Embed productSchema as an array
});

// Create Models
const Client = mongoose.model("Client", clientSchema);
const Product = mongoose.model("Product", productSchema);

// --- Client API Endpoints ---

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

app.post("/api/products/:clientId", async (req, res) => {
  try {
    const { clientId } = req.params;
    const productData = req.body;

    console.log("Received product data:", productData);

    const client = await Client.findById(clientId);
    if (!client) {
      console.log("Client not found for ID:", clientId);
      return res.status(404).json({ message: "Client not found" });
    }

    client.products.push(productData); // Add product to the client's products array
    await client.save();

    console.log("Product added to client successfully:", client);
    res.status(200).json({ message: "Product added to client successfully!" });
  } catch (error) {
    console.error("Error adding product to client:", error);
    res.status(500).json({ message: "Error adding product to client", error });
  }
});

// GET /api/clients - Fetch all clients with their products
app.get("/api/clients", async (req, res) => {
  try {
    const clients = await Client.find(); // Fetch all clients along with their products
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error });
  }
});

// DELETE /api/clients/:clientId - Delete a client by ID
app.delete("/api/clients/:clientId", async (req, res) => {
  try {
    const { clientId } = req.params;
    const deletedClient = await Client.findByIdAndDelete(clientId);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

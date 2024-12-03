import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../common/Navbar/Navbar";
import SideBar from "../common/SideBar/sidebar";
import styles from "./Dashboard.module.css"; // Import styles for Dashboard layout
import Filters from "../common/Filter/Filter";

const Dashboard = () => {
  const [clients, setClients] = useState([]); // State to manage the list of clients
  const [products, setProducts] = useState([]); // State to manage the list of Products

  const navigate = useNavigate();

  // Fetch all clients when the component mounts
  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/clients");
      setClients(response.data); // Update state with fetched client data
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data); // Update state with fetched client data
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleClientDelete = async (clientId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this client?"
      );
      if (confirmDelete) {
        // Delete client from the server
        await axios.delete(`http://localhost:5000/api/clients/${clientId}`);
        // Update the local state to remove the deleted client
        setClients(clients.filter((client) => client._id !== clientId));
        alert("Client deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client. Please try again.");
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this client?"
      );
      if (confirmDelete) {
        // Delete client from the server
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        // Update the local state to remove the deleted client
        setProducts(products.filter((product) => product._id !== productId));
        alert("Client deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client. Please try again.");
    }
  };

  return (
    <div className={styles.dashboard}>
      <NavBar />
      <SideBar />
      <div className={styles.content}>
        <Filters />
        <div className={styles.cardGrid}>
          {clients.map((client, index) => (
            <div key={client._id} className={styles.card}>
              <div className={styles.cardImg}>
                {/* You can add an image here if needed */}
              </div>
              <div className={styles.cardTitle}>{client.name}</div>
              <div className={styles.cardSubtitle}>Client details</div>
              <hr className={styles.cardDivider} />
              <div className={styles.cardFooter}>
                <div className={styles.cardPrice}>
                  <span>Balance:</span> {client.balance || "$0.00"}
                </div>
                <button
                  className={styles.cardBtn}
                  onClick={() => handleClientDelete(client._id)} // Bind delete handler
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.cardGrid}>
          {products.map((product, index) => (
            <div key={product._id} className={styles.card}>
              <div className={styles.cardImg}>
                {/* You can add an image here if needed */}
              </div>
              <div className={styles.cardTitle}>{product.particular}</div>
              <div className={styles.cardSubtitle}>Product Details</div>
              <hr className={styles.cardDivider} />
              <div className={styles.cardFooter}>
                <div className={styles.cardPrice}>
                  <span>Balance:</span> {product.amount || "$0.00"}
                </div>
                <button
                  className={styles.cardBtn}
                  onClick={() => handleProductDelete(product._id)} // Bind delete handler
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

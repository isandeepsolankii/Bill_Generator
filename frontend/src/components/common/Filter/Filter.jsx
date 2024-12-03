import { useEffect, useState } from "react";
import styles from "./Filter.module.css";
import axios from "axios";

function Filters() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/clients")
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Error fetching clients: ", error));
  });

  return (
    <div className={styles.container}>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select Client
        </button>
        <ul className="dropdown-menu">
          {clients.map((client) => (
            <li key={client.id}>
              <a className="dropdown-item" href="#">
                {client.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.mydict}>
        <div>
          <label>
            <input type="radio" name="radio" />
            <span>All</span>
          </label>
          <label>
            <input type="radio" name="radio" />
            <span>Invoice</span>
          </label>
          <label>
            <input type="radio" name="radio" />
            <span>Quotation</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Filters;

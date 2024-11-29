import { useContext, useState } from "react";
import { GlobalContext } from "../../../context";
import axios from "axios";

import Styles from "./styles.module.css";

function ProductFormDetails() {
  const {
    productDetails,
    setProductDetails,
    savedProductDetails,
    setSavedProductDetails,
    showSavedAccordion,
    setShowSavedAccordion,
  } = useContext(GlobalContext);

  // Track the index of the item being edited
  const [editIndex, setEditIndex] = useState(null);

  function handleOnChange(event) {
    const { name, value } = event.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  }

  function handleOnEdit(index) {
    // Set the productDetails to the item to edit and track the edit index
    setProductDetails(savedProductDetails[index]);
    setEditIndex(index);
  }

  async function handleOnClick(event) {
    event.preventDefault();

    // Calculate the amount from quantity and rate
    const amount = productDetails.quantity * productDetails.rate;

    try {
      const response = await axios.post("http://localhost:5000/api/products", {
        sno: productDetails.sno,
        particular: productDetails.particular,
        quantity: productDetails.quantity,
        rate: productDetails.rate,
        amount,
      });

      console.log(response.data.message);

      if (editIndex !== null) {
        const updatedDetails = savedProductDetails.map((detail, index) =>
          index === editIndex ? { ...productDetails, amount } : detail
        );
        setSavedProductDetails(updatedDetails);
        setEditIndex(null);
      } else {
        setSavedProductDetails([
          ...savedProductDetails,
          { ...productDetails, amount },
        ]);
      }

      // Reset the form
      setProductDetails({
        sno: "",
        particular: "",
        quantity: "",
        rate: "",
        amount: "",
      });

      setShowSavedAccordion(true);
    } catch (error) {
      console.error("Error saving product details:", error.response.data);
    }
  }

  // Function to truncate the text to a word limit
  const truncateText = (text, wordLimit) => {
    if (typeof text !== "string") return ""; // Ensure text is a string
    const words = text.split("");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join("") + "..."
      : text;
  };

  return (
    <div>
      <div
        class={`accordion ${Styles.accordionContainer}`}
        id="accordionExample"
      >
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              className={`accordion-button  ${Styles.clientAccordionHeading} `}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#productOne"
              aria-expanded="true"
              aria-controls="productOne"
            >
              Product Details
            </button>
          </h2>
          <div
            id="productOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className={`accordion-body ${Styles.accordionBody}`}>
              {savedProductDetails && savedProductDetails.length > 0 ? (
                <ul>
                  {savedProductDetails.map((detail, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "20px",
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        {detail.sno}. {truncateText(detail.particular, 50)} (
                        {detail.amount})
                      </p>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => handleOnEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => handleOnDelete(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No Product details available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={Styles.accordionBox}>
        <form>
          <label htmlFor="sno">Serial Number</label>
          <input
            className="form-control"
            type="text"
            name="sno"
            id="sno"
            placeholder="Enter Serial Number"
            onChange={handleOnChange}
            value={productDetails.sno}
          />
          <br />
          <label htmlFor="particular">Particulars</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Product Name"
            name="particular"
            id="particular"
            value={productDetails.particular}
            onChange={handleOnChange}
          />
          <br />
          <label htmlFor="quantity">Quantity</label>
          <input
            className="form-control"
            type="text"
            name="quantity"
            id="quantity"
            placeholder="Enter Quantity"
            onChange={handleOnChange}
            value={productDetails.quantity}
          />
          <br />
          <label htmlFor="rate">Rate</label>
          <input
            className="form-control"
            type="text"
            name="rate"
            id="rate"
            placeholder="Enter Rate"
            onChange={handleOnChange}
            value={productDetails.rate}
          />
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleOnClick}
          >
            {editIndex !== null ? "Update Details" : "Add Details"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductFormDetails;

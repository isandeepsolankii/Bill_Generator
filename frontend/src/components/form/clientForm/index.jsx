import { useContext, useState } from "react";
import { GlobalContext } from "../../../context";
import Styles from "./styles.module.css";
import axios from "axios";

function ClientFormDetails({
  setShowAccordian,
  showAccordian,
  setShowProductAccordian,
}) {
  const {
    clientDetails,
    setClientName,
    typeOfBill,
    selectedValue,
    setSelectedValue,
  } = useContext(GlobalContext);
  function handleOnChange(event) {
    const { name, value } = event.target;

    setClientName({
      ...clientDetails,
      [name]: value,
    });
  }

  async function handleOnClick(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/clients", {
        name: clientDetails.name,
        address: clientDetails.address,
        clientGST: clientDetails.clientGST,
        clientPhone: clientDetails.clientPhone,
        date: clientDetails.date,
        invoiceNumber: clientDetails.invoiceNumber,
      });
      console.log(response.data.message);
      setShowAccordian(false);
      setShowProductAccordian(true);
    } catch (error) {
      console.error("Error saving client details:", error.response.data);
    }
  }

  function handleOnEdit(event) {
    console.log("Edited");
    setClientName({
      name: clientDetails.name,
      address: clientDetails.address,
      clientGST: clientDetails.clientGST,
      clientPhone: clientDetails.clientPhone,
      date: clientDetails.date,
      invoiceNumber: clientDetails.invoiceNumber,
    });
    setShowAccordian(true);
  }

  function handleOnDelete(event) {
    console.log("Deleted");
    setClientName({
      name: "",
      address: "",
      clientGST: "",
      clientPhone: "",
      date: "",
      invoiceNumber: "",
    });
    setShowAccordian(true);
  }

  console.log(clientDetails);
  const handleCheckboxChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <div className={Styles.radioInput}>
        {typeOfBill.map((value, index) => (
          <div className={Styles.radioB} key={index}>
            <input
              type="radio"
              className={Styles.radioBInput}
              id={`radio-${value}`}
              name="radio-group"
              checked={selectedValue === value}
              onChange={() => handleCheckboxChange(value)}
            />
            <label className={Styles.radioBLabel} htmlFor={`radio-${value}`}>
              <div className={Styles.radioBCustom}>
                <span className={Styles.radioBCustomFill}></span>
              </div>
              <span className={Styles.radioBText}>{value}</span>
            </label>
          </div>
        ))}
      </div>

      {showAccordian ? (
        <div
          className={`accordion accordion-flush ${Styles.accordionContainer}`}
          id="clientDetailsAccordion"
        >
          <div className={`accordion-item ${Styles.clientDetailsAccordion}`}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button collapsed ${Styles.clientAccordionHeading} `}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="true"
                aria-controls="flush-collapseOne"
              >
                Client Details
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#clientDetailsAccordion"
            >
              <div className={`accordion-body ${Styles.accordionBody}`}>
                <form>
                  <label htmlFor="name">Name: </label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name"
                    onChange={handleOnChange}
                    value={clientDetails.name}
                  />
                  <br />
                  <label htmlFor="address">Address: </label>
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter Site address"
                    onChange={handleOnChange}
                    value={clientDetails.address}
                  />
                  <br />
                  <label htmlFor="clientGST">Enter Client GST Number</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Client GST No."
                    name="clientGST"
                    id="clientGST"
                    value={clientDetails.clientGST}
                    onChange={handleOnChange}
                  />
                  <br />
                  <label htmlFor="clientPhone">Phone Number </label>
                  <input
                    className="form-control"
                    type="text"
                    name="clientPhone"
                    id="clientPhone"
                    placeholder="Enter Phone Number"
                    onChange={handleOnChange}
                    value={clientDetails.clientPhone}
                  />
                  <br />
                  <label htmlFor="date">Enter Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="date"
                    id="date"
                    value={clientDetails.date}
                    onChange={handleOnChange}
                  />
                  <br />
                  <label
                    htmlFor="invoiceNumber"
                    style={{
                      display: selectedValue === "Invoice" ? "block" : "none",
                    }}
                  >
                    Enter Invoice Number
                  </label>
                  <input
                    style={{
                      display: selectedValue === "Invoice" ? "block" : "none",
                    }}
                    className="form-control"
                    type="text"
                    placeholder="Invoice Number"
                    name="invoiceNumber"
                    id="invoiceNumber"
                    value={clientDetails.invoiceNumber}
                    onChange={handleOnChange}
                  />
                  <button
                    className={`btn btn-primary ${Styles.buttonStyle}`}
                    type="submit"
                    onClick={handleOnClick}
                  >
                    Add Details
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`accordion accordion-flush ${Styles.accordionContainer}`}
          id="accordionFlushExample"
        >
          <div className={`accordion-item ${Styles.clientDetailsAccordion}`}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button collapsed ${Styles.accordionHeading}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                <strong>{clientDetails.name.toUpperCase()}</strong>
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className={`accordion-body ${Styles.accordionBody}`}>
                <div className={Styles.accordionBox}>
                  <p>Here are client details</p>

                  <p>
                    <strong>Date: </strong>
                    {clientDetails.date}
                  </p>
                  <p
                    style={{
                      display: selectedValue === "Invoice" ? "block" : "none",
                    }}
                  >
                    <strong>Invoice Number: </strong>
                    {clientDetails.invoiceNumber}
                  </p>
                  <p>
                    <strong>Client Name: </strong>
                    {clientDetails.name}
                  </p>
                  <p>
                    <strong>Client Site Address: </strong>
                    {clientDetails.address}
                  </p>
                  <p>
                    <strong>Client Phone number: </strong>
                    {clientDetails.clientPhone}
                  </p>
                  <p>
                    <strong>Client GST No. : </strong>
                    {clientDetails.clientGST}
                  </p>
                  <button
                    className={`btn btn-primary ${Styles.buttonStyle}`}
                    type="submit"
                    onClick={handleOnEdit}
                  >
                    Edit
                  </button>
                  <button
                    className={`btn btn-primary ${Styles.buttonStyle}`}
                    type="submit"
                    onClick={handleOnDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientFormDetails;

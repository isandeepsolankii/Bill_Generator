import { createContext, useState, useRef } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
  const tableRef = useRef();

  const [productDetails, setProductDetails] = useState({
    sno: "",
    particular: "",
    quantity: "",
    rate: "",
    amount: "",
  });
  const [clientDetails, setClientName] = useState({
    name: "",
    address: "",
    clientGST: "",
    clientPhone: "",
    date: "",
    invoiceNumber: "",
  });
  const [savedProductDetails, setSavedProductDetails] = useState([]);
  const [showSavedAccordion, setShowSavedAccordion] = useState(false);
  const typeOfBill = ["Quotation", "Invoice"];
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        productDetails,
        setProductDetails,
        clientDetails,
        setClientName,
        showSavedAccordion,
        setShowSavedAccordion,
        savedProductDetails,
        setSavedProductDetails,
        typeOfBill,
        selectedValue,
        setSelectedValue,
        tableRef,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;

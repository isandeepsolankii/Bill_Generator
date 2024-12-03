import ClientFormDetails from "./clientForm";
import { useState } from "react";
import ProductFormDetails from "./productFrom";

function FormDetails() {
  const [showAccordian, setShowAccordian] = useState(true);
  const [showProductAccordian, setShowProductAccordian] = useState(false);

  return (
    <div>
      <ClientFormDetails
        showAccordian={showAccordian}
        setShowAccordian={setShowAccordian}
        showProductAccordian={showProductAccordian}
        setShowProductAccordian={setShowProductAccordian}
      />
      {showProductAccordian ? <ProductFormDetails /> : null}
    </div>
  );
}

export default FormDetails;

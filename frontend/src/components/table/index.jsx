import React from "react";

import ClientTable from "./client";

import ProductTable from "./product";

function TableDetails(props, ref) {
  return (
    <div ref={ref}>
      <ClientTable />
      <ProductTable />
    </div>
  );
}

export default React.forwardRef(TableDetails);

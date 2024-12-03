import { useContext } from "react";
import { GlobalContext } from "../../../context";
import Styles from "./styles.module.css";

function ClientTable() {
  const { clientDetails, selectedValue, tableRef } = useContext(GlobalContext);

  // Helper function to format long text
  // Helper function to format long text
  const formatText = (text, maxLength) => {
    const words = text.split(/(\s+|,|\.|\b)/); // Split by spaces, commas, periods, or word boundaries
    let currentLine = "";
    const lines = [];

    words.forEach((word) => {
      if ((currentLine + word).length > maxLength) {
        lines.push(currentLine.trim()); // Push the current line and start a new one
        currentLine = word; // Start new line with the word
      } else {
        currentLine += word; // Append to the current line
      }
    });

    if (currentLine) {
      lines.push(currentLine.trim()); // Add the remaining text as the last line
    }

    return lines.join("\n"); // Join lines with a newline character
  };

  return (
    <div>
      <table className={Styles.table}>
        <tbody>
          <tr>
            <td className={`${Styles.cell} ${Styles["cell-70"]}`}>
              <p>
                <strong>Client Name:</strong>{" "}
                <span>
                  {formatText(clientDetails.name, 80)
                    .split("\n")
                    .map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < clientDetails.name.length - 1 && <br />}
                      </span>
                    ))}
                </span>
              </p>
              <p>
                <strong>Site Location:</strong>{" "}
                <span>
                  {formatText(clientDetails.address, 70)
                    .split("\n")
                    .map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < clientDetails.address.length - 1 && <br />}
                      </span>
                    ))}
                </span>
              </p>
              <p>
                <strong>Client Mobile Number:</strong>{" "}
                {clientDetails.clientPhone}
              </p>
              <p>
                <strong>Client GST Number:</strong> {clientDetails.clientGST}
              </p>
            </td>
            <td className={`${Styles.cell} ${Styles["cell-30"]}`}>
              <p>
                <strong>Date: </strong>
                {clientDetails.date}
              </p>
              <br />
              <br />
              {selectedValue === "Invoice" ? (
                <p>
                  <strong>Invoice Number: </strong>
                  {clientDetails.invoiceNumber}
                </p>
              ) : (
                <p>
                  <strong>Quotation</strong>
                </p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ClientTable;

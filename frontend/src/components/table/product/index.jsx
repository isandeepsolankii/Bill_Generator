import { useContext } from "react";
import { GlobalContext } from "../../../context";
import Styles from "./styles.module.css";

function ProductTable() {
  const { savedProductDetails, selectedValue } = useContext(GlobalContext);
  const subtotal = savedProductDetails.reduce(
    (sum, product) => sum + product.amount,
    0
  );
  const sgst = subtotal * 0.09;
  const cgst = subtotal * 0.09;
  const totalgst = sgst + cgst;
  const grandTotal = subtotal + totalgst;
  const amountInWords = numberToWords(grandTotal);

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

  function numberToWords(num) {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    if (num === 0) return "Zero Rupees Only";

    function recur(n) {
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100)
        return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
      if (n < 1000)
        return (
          ones[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 ? " " + recur(n % 100) : "")
        );
      if (n < 100000)
        return (
          recur(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 ? " " + recur(n % 1000) : "")
        );
      if (n < 10000000)
        return (
          recur(Math.floor(n / 100000)) +
          " Lakh" +
          (n % 100000 ? " " + recur(n % 100000) : "")
        );
      return (
        recur(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 ? " " + recur(n % 10000000) : "")
      );
    }

    // Split integer and decimal parts
    const [integerPart, decimalPart] = num.toFixed(2).split(".");

    const rupeesInWords = recur(parseInt(integerPart));
    const paisaInWords =
      decimalPart && parseInt(decimalPart) > 0
        ? " and " + recur(parseInt(decimalPart)) + " paisa"
        : "";

    return rupeesInWords + " Rupees" + paisaInWords + " Only";
  }

  return (
    <div>
      <table className={Styles.table}>
        <thead>
          <tr>
            <th className={Styles["cell-100"]} colSpan="5">
              <span className={Styles.tableText}>{selectedValue}</span>
            </th>
          </tr>
        </thead>
      </table>
      <table className={Styles.table}>
        <thead>
          <tr>
            <th className={Styles.cell}>S.No</th>
            <th className={Styles.cell}>Particulars</th>
            <th className={Styles.cell}>Quantity</th>
            <th className={Styles.cell}>Rate</th>
            <th className={Styles.cell}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {savedProductDetails.length === 0 ? (
            <tr>
              <td colSpan="5" className={Styles.cell}>
                No Product Details Saved yet.
              </td>
            </tr>
          ) : (
            savedProductDetails.map((detail, index) => (
              <tr key={index}>
                <td className={Styles.cell}>{detail.sno}</td>
                <td className={`${Styles.cell} ${Styles["cell-70"]}`}>
                  {formatText(detail.particular, 200)
                    .split("\n")
                    .map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                </td>
                <td className={Styles.cell}>{detail.quantity}</td>
                <td className={Styles.cell}>
                  {parseFloat(detail.rate).toFixed(2)}
                </td>
                <td className={Styles.cell}>
                  {parseFloat(detail.amount).toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan="2"
              rowSpan="5"
              className={Styles.cell}
              style={{ textAlign: "left", verticalAlign: "top" }}
            >
              <strong>Rupees in words: </strong>
              <span>{amountInWords}</span>
            </td>
            <td colSpan="2" className={Styles.cell}>
              <strong>Subtotal:</strong>
            </td>
            <td className={Styles.cell}>
              {" "}
              <strong>₹{subtotal.toFixed(2)}</strong>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className={Styles.cell}>
              <strong>SGST (9%):</strong>
            </td>
            <td className={Styles.cell}>₹{sgst.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="2" className={Styles.cell}>
              <strong>CGST (9%):</strong>
            </td>
            <td className={Styles.cell}>₹{cgst.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="2" className={Styles.cell}>
              <strong>Total GST (18%):</strong>
            </td>
            <td className={Styles.cell}>₹{totalgst.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="2" className={`${Styles.cell} ${Styles["cell-bold"]}`}>
              <strong>Grand Total:</strong>
            </td>
            <td className={`${Styles.cell} ${Styles["cell-bold"]}`}>
              <strong>₹{grandTotal.toFixed(2)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ProductTable;

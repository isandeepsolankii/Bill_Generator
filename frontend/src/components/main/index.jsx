import { useContext, useState } from "react";
import FormDetails from "../form";
import TableDetails from "../table";
import { GlobalContext } from "../../context";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Styles from "./styles.module.css";

function Main() {
  const { selectedValue, tableRef } = useContext(GlobalContext);

  const [linkCopied, setLinkCopied] = useState(false);
  const shareableLink = `${window.location.href}`;

  const handleCopy = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000); // Reset message after 2 seconds
  };

  const handlePrint = () => {
    if (tableRef.current) {
      const printContent = tableRef.current.innerHTML;
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Table</title>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ccc; padding: 8px; }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className={Styles.mainHeading}>Generate {selectedValue}</h1>

        <div className="col-12 col-md-6">
          <FormDetails />
        </div>

        <div className="col-12 col-md-6">
          <div className={Styles.buttonContainer}>
            <CopyToClipboard text={shareableLink} onCopy={handleCopy}>
              <button
                className={Styles.Btn}
                style={{ backgroundColor: "#209978" }}
              >
                <div className={Styles.sign}>
                  <svg width="23" height="23" viewBox="0 0 256 256">
                    <g
                      fill="#ffffff"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                    >
                      <g transform="scale(5.12,5.12)">
                        <path d="M40,0c-5.46875,0 -9.93359,4.42188 -10,9.875l-14.09375,7.0625c-1.65625,-1.21875 -3.69922,-1.9375 -5.90625,-1.9375c-5.51172,0 -10,4.48828 -10,10c0,5.51172 4.48828,10 10,10c2.20703,0 4.25,-0.71875 5.90625,-1.9375l14.09375,7.0625c0.06641,5.45313 4.53125,9.875 10,9.875c5.51172,0 10,-4.48828 10,-10c0,-5.51172 -4.48828,-10 -10,-10c-2.125,0 -4.09766,0.67578 -5.71875,1.8125l-13.65625,-6.8125l13.65625,-6.8125c1.62109,1.13672 3.59375,1.8125 5.71875,1.8125c5.51172,0 10,-4.48828 10,-10c0,-5.51172 -4.48828,-10 -10,-10zM40,2c4.42969,0 8,3.57031 8,8c0,4.42969 -3.57031,8 -8,8c-1.63672,0 -3.14062,-0.50781 -4.40625,-1.34375c-0.125,-0.41797 -0.50391,-0.70703 -0.9375,-0.71875c-0.00391,-0.00391 -0.02734,0.00391 -0.03125,0c-1.39453,-1.26172 -2.33203,-3.02734 -2.5625,-5c0.21094,-0.35156 0.1875,-0.79687 -0.0625,-1.125c0.10156,-4.33984 3.63281,-7.8125 8,-7.8125zM30.21875,12c0.37109,1.80859 1.23047,3.4375 2.4375,4.75l-12.84375,6.4375c-0.33984,-1.82812 -1.15625,-3.47656 -2.34375,-4.8125zM10,17c1.85156,0 3.55469,0.60938 4.90625,1.65625c0.01172,0.00781 0.01953,0.02344 0.03125,0.03125c0.00781,0.01953 0.01953,0.04297 0.03125,0.0625c0.08594,0.10547 0.19141,0.1875 0.3125,0.25c0.00391,0.00391 0.02734,-0.00391 0.03125,0c1.49609,1.32813 2.48438,3.22266 2.65625,5.34375c-0.11328,0.27344 -0.10156,0.58203 0.03125,0.84375c-0.01953,0.08203 -0.03125,0.16406 -0.03125,0.25c-0.12109,2.21875 -1.12891,4.19141 -2.6875,5.5625c-0.09375,0.05859 -0.17969,0.13281 -0.25,0.21875c-1.375,1.11328 -3.11719,1.78125 -5.03125,1.78125c-4.42969,0 -8,-3.57031 -8,-8c0,-4.42969 3.57031,-8 8,-8zM19.8125,26.8125l12.84375,6.4375c-1.20703,1.3125 -2.06641,2.94141 -2.4375,4.75l-12.75,-6.375c1.1875,-1.33594 2.00391,-2.98437 2.34375,-4.8125zM40,32c4.42969,0 8,3.57031 8,8c0,4.42969 -3.57031,8 -8,8c-4.42969,0 -8,-3.57031 -8,-8c0,-2.40625 1.04688,-4.56641 2.71875,-6.03125c0.02344,-0.01953 0.04297,-0.03906 0.0625,-0.0625c0.00391,-0.00391 0.02734,0.00391 0.03125,0c0.16016,-0.06641 0.30078,-0.17578 0.40625,-0.3125c1.33594,-0.99609 2.98047,-1.59375 4.78125,-1.59375z"></path>
                      </g>
                    </g>
                  </svg>
                </div>

                <div className={Styles.text}>Share</div>
              </button>
            </CopyToClipboard>
            <div className={Styles.paste_button}>
              <button className={Styles.downloadButton}>
                Download &nbsp; ▼
              </button>
              <div className={Styles.dropdown_content}>
                <a id="top" href="#">
                  PDF
                </a>
                <a id="middle" href="#">
                  DOC
                </a>
                <a id="bottom" href="#">
                  PNG
                </a>
              </div>
            </div>
            {linkCopied && (
              <p className={Styles.copiedMessage}>Link copied to clipboard!</p>
            )}
            <button className={Styles.Btn} onClick={handlePrint}>
              <div className={Styles.sign}>
                <svg viewBox="0 0 512 512" width="24" height="24">
                  <path d="M448 192h-32v-80c0-26.51-21.49-48-48-48h-224c-26.51 0-48 21.49-48 48v80h-32c-35.29 0-64 28.71-64 64v112c0 35.29 28.71 64 64 64h32v48c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h32c35.29 0 64-28.71 64-64v-112c0-35.29-28.71-64-64-64zm-320-80c0-8.82 7.18-16 16-16h224c8.82 0 16 7.18 16 16v80h-256v-80zm256 336c0 8.82-7.18 16-16 16h-224c-8.82 0-16-7.18-16-16v-96h256v96zm96-112c0 17.67-14.33 32-32 32h-32v-64h-320v64h-32c-17.67 0-32-14.33-32-32v-112c0-17.67 14.33-32 32-32h384c17.67 0 32 14.33 32 32v112z" />
                </svg>
              </div>

              <div className={Styles.text}>Print</div>
            </button>
          </div>

          <TableDetails ref={tableRef} />
        </div>
      </div>
    </div>
  );
}

export default Main;

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfViewerModal({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages, url }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(+1);
  }

  return (
    <>
      <div className="collapsibleFilter-page-container">
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </>

    // <div className="App">
    //   <header className="App-header">
    //     <Document
    //       file="http://isvhintp01:8001/pdf/FTS_CaseStudy_2.pdf/1"
    //       onLoadSuccess={onDocumentLoadSuccess}
    //     >
    //       <Page height="600" width="900" pageNumber={pageNumber} />
    //     </Document>
    //     <p>
    //       {" "}
    //       Page {pageNumber} of {numPages}
    //     </p>
    //     {pageNumber > 1 && (
    //       <button onClick={changePageBack}>Previous Page</button>
    //     )}
    //     {pageNumber < numPages && (
    //       <button onClick={changePageNext}>Next Page</button>
    //     )}
    //   </header>
    // </div>
  );
}

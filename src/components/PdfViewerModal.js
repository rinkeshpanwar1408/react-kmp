import { Button } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfViewerModal({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const searchText = useSelector((state) => {
    return state.searchresults.searchValue;
  });

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
  const makeTextRenderer = (text) => (textItem) =>
    highlightPattern(textItem.str, text);

  const highlightPattern = (text, pattern) => {
    // const splitText = text.split(pattern);
    // if (splitText.length <= 1) {
    // return text;
    // }
    // const matches = text.match(pattern)

    //  return splitText.reduce(
    //     (arr, element, index) =>
    //       matches[index]
    //         ? [
    //             ...arr,
    //             element,
    //             <mark className="highlight">{matches[index]}</mark>,
    //           ]
    //         : [...arr, element],
    //     []
    //   );
    let escapeSpecialChars = function (string) {
      return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "x");
    };
    let probStr = escapeSpecialChars(pattern);
    let strNew = escapeSpecialChars(text);
    const splitText = strNew.split(probStr);
    let re = new RegExp("\\b" + probStr + "\\b");
    let matches = strNew.match(re);

    if (matches?.length > 0) {
      return splitText.reduce(
        (arr, element, index) =>
          matches[index]
            ? [
                ...arr,
                element,
                <mark className="highlight">{matches[index]}</mark>,
              ]
            : [...arr, element],
        []
      );
    }
  };
  return (
    <>
      <div className="collapsibleFilter-page-container">
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={1.4}
              customTextRenderer={makeTextRenderer(searchText)}
            />
          ))}
        </Document>
      </div>
    </>
  );
}

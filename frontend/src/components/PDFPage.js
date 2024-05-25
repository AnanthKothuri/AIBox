
import React, { useState } from 'react'; 
import { Document, Page, pdfjs } from 'react-pdf';
  
//PDFjs worker from an external cdn 
  
export default function PDFPage({link}) { 
    const url =  
    `https://cors-anywhere.herokuapp.com/${link}`
      
    pdfjs.GlobalWorkerOptions.workerSrc =  
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 
    //  const [numPages, setNumPages] = useState(null); 
    //   const [pageNumber, setPageNumber] = useState(1); 
  
//     function onDocumentLoadSuccess({ numPages }) { 
//     setNumPages(numPages); 
//     setPageNumber(1); 
//   } 
  return ( 
    <> 
    <div className="main"> 
      <Document 
        file={url} 
        // onLoadSuccess={onDocumentLoadSuccess} 
        > 
        <Page pageNumber={0} /> 
      </Document> 
     </div> 
    </> 
  ); 
}
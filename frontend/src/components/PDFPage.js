import React from 'react'; 
import { Document, Page, Canvas, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './PDFPage.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFPage({link}) {
  return ( 
    <div>
      <Document className="pdf-document" file={link.replace('http', 'https')}>
        <Page className="pdf-page" pageNumber={1} scale={1} width={400}/>
      </Document>
    </div>
  ); 
}
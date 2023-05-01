import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import 'bootstrap/dist/css/bootstrap.css';

const ExportPdf = ({ id, customFileName, width, height }) => {
  const [documentWidth, setDocumentWidth] = useState(width);
  const [documentHeight, setDocumentHeight] = useState(height);
  const [loading, setLoading] = useState(false);

  const downloadFileDocument = async () => {
    setLoading(true);
    const input = document.getElementById(id);

    // Get the maximum possible size for the canvas element that maintains the aspect ratio of the PDF page.
    const maxWidth = Math.min(window.innerWidth, window.innerHeight * (width / height));
    const maxHeight = Math.min(window.innerHeight, window.innerWidth * (height / width));
    const canvas = await html2canvas(input, { width: maxWidth, height: maxHeight });

    // Calculate the new dimensions for the PDF document that maintains the aspect ratio of the PDF page.
    const scaleFactor = Math.min(documentWidth / canvas.width, documentHeight / canvas.height);
    const pdfWidth = canvas.width * scaleFactor;
    const pdfHeight = canvas.height * scaleFactor;

    // Create the PDF document and add the rendered image.
    const imgData = canvas.toDataURL('image/jpeg');
    const pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    // Download the PDF document with the custom file name.
    pdf.save(customFileName);

    setLoading(false);
  };

  return (
    <div className='exports-pdf'>
      <button onClick={downloadFileDocument} disabled={loading}>
        {loading ? 'Loading...' : 'Sign the PDF please'}
      </button>
    </div>
  );
};

export default ExportPdf;

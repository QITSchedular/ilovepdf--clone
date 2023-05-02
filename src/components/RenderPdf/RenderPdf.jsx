import React, { useEffect, useState } from "react";
// import "./styles.css";
import * as PDFJS from "pdfjs-dist/build/pdf";
import SignatureDragger from "../ResizableDiv/SignatureDragger";
import ExportPdf from "../ExportPage/ExportPdf";
import "bootstrap/dist/css/bootstrap.min.css"
PDFJS.GlobalWorkerOptions.workerSrc =
  window.location.origin + "/pdf.worker.min.js";

export default function PdfViewer() {
  const [pdf, setPdf] = useState(null); // set the file
  const [width, setWidth] = useState(0);
  const [images, setImages] = useState([]);
  const [height, setHeight] = useState(0);
  const [dragger, setDragger] = useState(false);

  async function showPdf(event) {
    try {
      const file = event.target.files[0];
      const uri = URL.createObjectURL(file);
      var _PDF_DOC = await PDFJS.getDocument(uri).promise;
      setPdf(_PDF_DOC);
      document.getElementById("file-to-upload").value = "";
    } catch (error) {
      alert(error.message);
      console.log("error", error);
    }
  }

  async function renderPage() {
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    let canv = document.querySelector(".canv");

    for (let i = 1; i <= pdf.numPages; i++) {
      var page = await pdf.getPage(i);
      var viewport = page.getViewport({ scale: 1 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };
      // console.log("Number of pages: ", pdf.numPages);
      setWidth(viewport.width);
      setHeight(viewport.height);
      await page.render(render_context).promise;
      let img = canvas.toDataURL("image/jpg");
      
      imagesList.push(img);
    }
    setImages(imagesList);
    setDragger(true);
  }

  useEffect(() => {
    if (pdf) {
      renderPage();
    }
  }, [pdf]);

  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "5px",
    },
    imageWrapper: {
      border: "1px solid rgba(0,0,0,0.15)",
      borderRadius: "3px",
      boxShadow: "0 2px 5px 0 rgba(0,0,0,0.25)",
      padding: "0",
    },
  };

  return (
    <div className="container d-flex flex-column justify-content-center p-2" style={{ backgroundColor: "#EEEEEE" }}>
      <div className="input_controls">

      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("file-to-upload").click()}
      >
        Select PDF
      </button>

      <input
        type="file"
        id="file-to-upload"
        accept="application/pdf"
        hidden
        onChange={showPdf}
      />
      </div>

      <div id="pdf-main-container">
        <div id="pdf-contents">
          <div id="image-convas-row">
            <div style={styles.wrapper} id="mysignature__dragger">
              {/* {images.map((image, idx) => (
                <div key={idx} style={styles.imageWrapper}>
                  {idx === 0 ? <SignatureDragger /> : null}
                  <img
                    src={image}
                    alt={`page-${idx}`}
                    width={width}
                    height={height}
                  />
                </div>
              ))} */}
              
              {/* <SignatureDragger /> */}
              {images.length >0 &&
              <div>
              <img
                    src={images[2]}
                    alt={`page-`}
                    width={width}
                    height={height}
                    id="testOne"
                    className="testOne"
                  />
                <SignatureDragger bounds={".testOne"}/>
                   </div>
              }
             
            </div>
          </div>
        </div>
      </div>
      {/* <ExportPdf id={"testOne"} customFileName={"somerandom"} width={width} height= {height}/> */}
    </div>
  );
}

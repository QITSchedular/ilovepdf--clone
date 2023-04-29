import React, { useEffect, useState } from "react";
import "./styles.css";
import * as PDFJS from "pdfjs-dist/build/pdf";
import SignatureDragger from "../ResizableDiv/SignatureDragger";


PDFJS.GlobalWorkerOptions.workerSrc =
  window.location.origin + "/pdf.worker.min.js";

export default function PdfViewer() {
  const [pdf, setPdf] = useState(null); // set the file
  const [width, setWidth] = useState(0);
  const [images, setImages] = useState([]);
  const [height, setHeight] = useState(0);
  const [dragger, setDragger] = useState(false);
  const [signPdf, setSignPdf] = useState(false);
  const [showSelect, setShowSelect] = useState(true);

  async function showPdf(event) {
    try {
      const file = event.target.files[0];
      const uri = URL.createObjectURL(file);
      var _PDF_DOC = await PDFJS.getDocument(uri).promise;
      setPdf(_PDF_DOC);
      //   console.log("pdf",_PDF_DOC);
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
      console.log("page lenght", pdf.numPages);
      setWidth(viewport.width);
      setHeight(viewport.height);
      await page.render(render_context).promise;
      let img = canvas.toDataURL("image/png");
      imagesList.push(img);
      console.log("images", images);
    }
    setImages(imagesList);
    setDragger(true);
    setShowSelect(false);
    signPdf(true);
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
      // width: "300px",
      // height: "350px",
      border: "1px solid rgba(0,0,0,0.15)",
      borderRadius: "3px",
      boxShadow: "0 2px 5px 0 rgba(0,0,0,0.25)",
      padding: "0",
    },
  };

  return (
    <div className="App" style={{backgroundColor:"#EEEEEE"}}>
      <button
        id="upload-button"
        onClick={() => document.getElementById("file-to-upload").click()}
      >
        Select PDF
      </button>
      
      {/* show the select button initially */}
      {showSelect &&
      <input
        type="file"
        id="file-to-upload"
        accept="application/pdf"
        hidden
        onChange={showPdf}
      />
      }

      <div id="pdf-main-container">
        {/* <div id="pdf-loader" hidden={!pdfRendering}>
          Loading document ...
        </div> */}
        <div id="pdf-contents">
          <div id="image-convas-row">
            {/* <canvas id="pdf-canvas" width={width} height={height}></canvas> */}
            
            <div style={styles.wrapper} id="mysignature__dragger">
                {/* {dragger && <SignatureDragger />} */}
              {images.map((image, idx) => (
                <div key={idx} style={styles.imageWrapper}>
                    {idx === 0 ? <SignatureDragger /> : null}
                  <img
                    src={image}
                    alt={`page-${idx}`}
                    width={width}
                    height={height}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

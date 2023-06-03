import React, { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SignaturePad from "react-signature-canvas";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./SignatureCanvasModal.css";
import { BiImageAdd } from "react-icons/bi";
import NameInput from "../RenderTxtSignature/NameInput";

const SignatureCanvasModal = ({ onApplySignature }) => {
  const [imageURL, setImageURL] = useState(null);
  const [showCanvasModal, setShowCanvasModal] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [textModalData, setTextModalData] = useState(null);
  const sigCanvas = useRef({});

  useEffect(() => {
    // Ensure that SignaturePad component is initialized before calling save function
    if(showCanvasModal === true) {

      sigCanvas.current.on();
    }
  }, []);

  const clear = () => {
    sigCanvas.current.clear();
  };

  const save = () => {
    const imageData = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setImageURL(imageData);
    onApplySignature(imageData);
    //console.log(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  };
  // if the user chooses to upload a signature as an image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file.type === "image/*") {
      throw new Error("Please choose an image");
    } else {
      // Create a new image object
      const img = new Image();
  
      // Set the image source to the selected file
      img.src = URL.createObjectURL(file);
  
      // When the image loads, create a canvas element and draw the image on it
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, img.width, img.height);
  
        // Convert the canvas to a PNG data URL
        const pngUrl = canvas.toDataURL("image/png");
        console.log(pngUrl);
  
        // Use a file reader to display the PNG image
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgData = e.target.result;
          setImageURL(imgData);
          onApplySignature(imgData);
          // console.log(imgData);
        };
        reader.readAsDataURL(file);
      };
    }
  };
  const handleTextModalClick = ()=>{
    setShowTextModal(true);
    setShowCanvasModal(false);
  };
  const handleCanvasModalClick = ()=>{
    setShowCanvasModal(true);
    setShowTextModal(false);
  };
  const handleTextModalData = async(data)=>{
    console.log("Data came from the child" + data)
    await setImageURL(data);
    await onApplySignature(data);

    //console.log("got the data: ", data)
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        data-toggle="modal"
        data-target="#exampleModalCenter"
        onClick={handleCanvasModalClick}
      >
        Draw a signature
      </button>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target="#exampleModalCenter"
        onClick={handleTextModalClick}
      >
        Draw Text
      </button>
      
      <label htmlFor="imageInput" className="btn btn-info text-align-center">
        <BiImageAdd />
        Choose Image
      </label>
       
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Draw Your signature on the canvas..
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body p-2">
              {showCanvasModal && 
                <SignaturePad
                ref={sigCanvas}
                penColor="red"
                canvasProps={{
                  className: "signatureCanvas",
                  width: 482,
                  height: 170,
                }}
              />
              }
              {
                showTextModal && <NameInput getTextModalData={handleTextModalData}/>
              }
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={clear}
              >
                Clear
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={save}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignatureCanvasModal;

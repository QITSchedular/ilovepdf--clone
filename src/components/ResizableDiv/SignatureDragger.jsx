import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import reactLogo from "../../assets/react.svg";
const style = {
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px dashed blue",
  background: "transparent",
  padding: "2px",
};
const imageConatinerStyle = {
  width: "100%",
  height: "100%",
  border: "1px solid red",
  padding: "2px",
};
const imageStyle = {
  width: "100%",
  height: "100%",
};

const SignatureDragger = ({ bounds, signatureData,onChangeDimensions }) => {
  const [parentDimensions, setParentDimensions] = useState({
    width: 500,
    height: 500,
  });
  const [draggableAreaOffset, setDraggableAreaOffset] = useState(10);
  const [signaturePosition, setSignaturePosition] = useState({ x: 0, y: 0 });
  const [signatureSize, setSignatureSize] = useState({ width: 50, height: 50 });
  const imgRef = useRef(null);
  const handleSignatureChange = async (newPosition, newWidth, newHeight, newImgWidth,
    newImgHeight) => {
    setSignaturePosition(newPosition);
    setSignatureSize({ width: newWidth, height: newHeight });
    console.log("Signature position:", newPosition);
    console.log("Signature size:", { width: newWidth, height: newHeight });
    console.log("Only Signature size:", { width: newImgWidth, height: newImgHeight });
    const signatureFontSize = parseInt(window.getComputedStyle(imgRef.current).fontSize);
    console.log("Signature font size:", signatureFontSize);
    // ...

    // A callback function which is passing the data(signature position and the width) back to the parent RenderPdf
    const newObj = {
      position : newPosition,
      width : newImgWidth,
      height : newImgHeight
    }
    onChangeDimensions(newObj);
  };
  
  useEffect(() => {
    const parent = document.querySelector(bounds);
    const { width, height } = parent.getBoundingClientRect();
    console.log("getBoundingClientRect", width, height);
    const offset = Math.min(width, height) * 0.02;
    setParentDimensions({ width, height });
    setDraggableAreaOffset(offset);
  }, []);

  return (
    <Rnd
      style={style}
      default={{
        x: 0,
        y: 0,
        width: 80,
        height: 50,
      }}
      bounds={bounds}
      enableResizing={true}
      dragGrid={[draggableAreaOffset, draggableAreaOffset]}
      onDragStop={(e, d) =>
        handleSignatureChange(
          { x: d.x, y: d.y },
          signatureSize.width,
          signatureSize.height,
          imgRef.current.width,
          imgRef.current.height
        )
      }
      onResizeStop={(e, direction, ref, delta, position) =>
        handleSignatureChange(position, ref.offsetWidth, ref.offsetHeight,imgRef.current.width,
          imgRef.current.height)
      }
    >
      <div className="image__container" style={imageConatinerStyle}>
      <img src={signatureData} alt="signature" style={imageStyle} draggable="false" ref={imgRef}/>
      </div>
      
    </Rnd>
  );
};
export default SignatureDragger;

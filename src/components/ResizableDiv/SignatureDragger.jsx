import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

const SignatureDragger = () => {
  const [parentDimensions, setParentDimensions] = useState({
    width: 500,
    height: 500,
  });
  const [draggableAreaOffset, setDraggableAreaOffset] = useState(10);
  const [signaturePosition, setSignaturePosition] = useState({ x: 0, y: 0 });
  const [signatureSize, setSignatureSize] = useState({ width: 50, height: 50 });
  const handleSignatureChange = (newPosition, newWidth, newHeight) => {
    setSignaturePosition(newPosition);
    setSignatureSize({ width: newWidth, height: newHeight });
    console.log("Signature position:", newPosition);
    console.log("Signature size:", { width: newWidth, height: newHeight });
  };
  useEffect(() => {
    const parent = document.getElementById("mysignature__dragger");
    const { width, height } = parent.getBoundingClientRect();
    const offset = Math.min(width, height) * 0.02;
    setParentDimensions({ width, height });
    setDraggableAreaOffset(offset);
  }, []);
    const bounds = {
    top: draggableAreaOffset,
    right: parentDimensions.width - signatureSize.width - draggableAreaOffset,
    bottom: parentDimensions.height - signatureSize.height - draggableAreaOffset,
    left: draggableAreaOffset
  };
  return (
    <Rnd
      style={style}
      default={{
        x: 0,
        y: 0,
        width: 50,
        height: 50,
      }}
      bounds="parent"
      enableResizing={true}
      dragGrid={[draggableAreaOffset, draggableAreaOffset]}
      onDragStop={(e, d) =>
        handleSignatureChange(
          { x: d.x, y: d.y },
          signatureSize.width,
          signatureSize.height
        )
      }
      onResizeStop={(e, direction, ref, delta, position) =>
        handleSignatureChange(position, ref.offsetWidth, ref.offsetHeight)
      }
      minWidth={50}
      minHeight={50}
      maxWidth={200}
      maxHeight={150}
    >
      Rnd
    </Rnd>
  );
};
export default SignatureDragger;

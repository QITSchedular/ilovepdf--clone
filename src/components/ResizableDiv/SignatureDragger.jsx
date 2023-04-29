import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

const SignatureDragger = () => {
  const [parentDimensions, setParentDimensions] = useState({ width: 500, height: 500 });
  const [draggableAreaOffset, setDraggableAreaOffset] = useState(10);

  useEffect(() => {
    const parent = document.getElementById("mysignature__dragger");
    const { width, height } = parent.getBoundingClientRect();
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
          width: 50,
          height: 50
        }}
        bounds="parent"
        enableResizing={true}
        dragGrid={[draggableAreaOffset, draggableAreaOffset]}
      >
        Rnd
      </Rnd>
    
  );
};
export default SignatureDragger;
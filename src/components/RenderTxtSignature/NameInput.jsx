import React, { useState } from "react";
import html2canvas from "html2canvas";

const fonts = [
  { name: "Helvetica", value: "Helvetica" }
];

const FontSelector = ({ fonts, selected, onChange }) => {
  return (
    <div className="form-check form-check-inline">
      {fonts.map((font) => (
        <label className="form-check-label mx-3" key={font.value}>
          <input
            className="form-check-input"
            type="radio"
            value={font.value}
            checked={selected === font.value}
            onChange={(e) => onChange(e.target.value)}
          />
          {font.name}
        </label>
      ))}
    </div>
  );
};

const FontDisplay = ({ name, font }) => {
  const style = { fontFamily: font, fontSize: "21px" };
  return (
    <div className="mt-4">
      <span style={style}>{name}</span>
    </div>
  );
};

const NameInput = ({ getTextModalData }) => {
  // console.log(getTextModalData);
  const [name, setName] = useState("");
  const [textBase64Img, setTextBase64Img] = useState("");
  const [selectedFont, setSelectedFont] = useState(fonts[0].value);

  const handleInputChange = (e) => {
    
    setName(e.target.value);
  };

  const handleFontChange = (font) => {
    setSelectedFont(font);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Capture the contents of the `rendered_text` div as a base64 PNG image
    const element = document.querySelector(".rendered_text");
    await html2canvas(element, {
      allowTaint: true,
      backgroundColor: null,
      removeContainer: true,
      scale: 8
    }).then(async (canvas) => {
      const base64Image = canvas.toDataURL("image/jpg");

      // Use the base64Image string as needed (e.g. save it to a database, display it in an <img> element, etc.)
      console.log(base64Image);
      await setTextBase64Img(base64Image);
      await getTextModalData(base64Image);
    });
  };
  const handleSendData = () => {
    console.log(textBase64Img);
    getTextModalData(textBase64Img);
  };

  return (
    <div className="container mt-4">
      <form>
        <div className="form-group">
          <label htmlFor="nameInput">Enter your name:</label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="Enter your name"
            value={name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nameDisplay">Your name:</label>
          <div className="card p-2">
            {fonts.map((font, idx) => {
              return (
                <div
                  className="mb-2 d-flex justify-content-center py-3"
                  style={{ fontFamily: font.name, fontSize: "21px" }}
                  key={idx}
                >
                  <div
                    className="rendered_text"
                    style={{ maxWidth: "600px", maxHeight: "250px" }}
                  >
                    {name}
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
        <FontDisplay name={name} font={selectedFont} />
        <button
          type="submit"
          data-dismiss="modal"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
        >
          Apply font
        </button>
      </form>
    </div>
  );
};

export default NameInput;

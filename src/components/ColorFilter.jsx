import { useState } from "react";

const FLAG_COLORS = [
  { name: "rouge", code: "#ff0000" },
  { name: "bleu", code: "#0066ff" },
  { name: "vert", code: "#00aa00" },
  { name: "jaune", code: "#ffcc00" },
  { name: "blanc", code: "#ffffff" },
  { name: "noir", code: "#000000" },
  { name: "orange", code: "#ff8800" },
  { name: "violet", code: "#9900ff" },
  { name: "marron", code: "#8b4513" },
  { name: "gris", code: "#808080" }
];

function ColorFilter({ selectedColors, onChange }) {
  const handleChange = (color) => {
    if (selectedColors.includes(color)) {
      onChange(selectedColors.filter(c => c !== color));
    } else {
      onChange([...selectedColors, color]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-3 shadow-sm">
      <h4 className="mb-4 fw-bold text-primary">🎨 Filtrer par couleur</h4>
      <div className="row g-3">
        {FLAG_COLORS.map(({ name, code }) => (
          <div key={name} className="col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input cursor-pointer"
                type="checkbox"
                id={`color-${name}`}
                checked={selectedColors.includes(name)}
                onChange={() => handleChange(name)}
              />
              <div
                className="rounded-circle ms-2"
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: code,
                  border: "2px solid #ddd"
                }}
              ></div>
              <label className="form-check-label ms-2 cursor-pointer flex-grow-1" htmlFor={`color-${name}`}>
                {name}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorFilter;

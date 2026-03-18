import React from "react";

const HighLightText = ({ text }) => {
  return (
    <span
      className="font-black"
      style={{
        background: "linear-gradient(135deg, #a78bfa, #e879f9, #f472b6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        filter: "drop-shadow(0 0 12px rgba(217,70,239,0.5))",
      }}
    >
      {" "}{text}{" "}
    </span>
  );
};

export default HighLightText;

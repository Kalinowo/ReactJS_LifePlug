import React from "react";

export default function Button({
  children,
  onClick,
  width,
  height,
  fontSize,
  lineHeight,
}) {
  return (
    <>
      <div
        className="customButton"
        style={{
          width: width,
          height: height,
          fontSize: fontSize,
          lineHeight: lineHeight,
        }}
        onClick={onClick}
      >
        {children}
      </div>
    </>
  );
}

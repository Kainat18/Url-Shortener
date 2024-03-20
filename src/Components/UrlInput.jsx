import React from "react";

function UrlInput({ value, onChange, className }) {
  return (
    <div>
      <input
        type="text"
        className={className}
        placeholder="Enter the link here"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default UrlInput;

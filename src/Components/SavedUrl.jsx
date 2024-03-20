import React from "react";

function SavedUrl({ savedUrls }) {
  return (
    <div className="savedUrls-container">
      {savedUrls.length > 0 && (
        <div className="savedUrls">
          <h2>Saved URLs</h2>
          <ul>
            {savedUrls.map((savedUrl, index) => (
              <li key={index}>
                Original Url: {savedUrl.Original} , Shortened Url :
                {savedUrl.Shortened}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SavedUrl;

import React, { useState, useEffect } from "react";
import UrlInput from "./UrlInput";
import SavedUrl from "./SavedUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

function ShortenedUrl() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [loader, setLoader] = useState(false);
  const [savedUrls, setSavedUrls] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const validateUrl = (inputUrl) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(inputUrl);
  };

  const saveToLocalStorage = (originalUrl, shortened) => {
    const updatedSavedUrls = [
      ...savedUrls,
      { Original: originalUrl, Shortened: shortened },
    ];
    setSavedUrls(updatedSavedUrls);
    localStorage.setItem("savedUrls", JSON.stringify(updatedSavedUrls));
  };

  const loadFromLocalStorage = () => {
    const storedUrls = localStorage.getItem("savedUrls");
    if (storedUrls) {
      setSavedUrls(JSON.parse(storedUrls));
    }
  };
  
  const clearLocalStorage =() => {
    localStorage.removeItem("savedUrls");
    setSavedUrls([]);
  }
  const shortenUrl = () => {
    if (!url.trim()) {
      toast.error("Please enter a URL.");
      return;
    }
    const isValidUrl = validateUrl(url);

    if (!isValidUrl) {
      toast.error("enter a valid url");
      setUrl("");
      return;
    }
    setLoader(true);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "spoo-me-url-shortener.p.rapidapi.com",
      },
      body: new URLSearchParams({
        url: url,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setShortenedUrl(data.short_url);
        setUrl("");
        setLoader(false);
        saveToLocalStorage(url, data.short_url);
      });
  };
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const copyToClipoard = () => {
    if(shortenedUrl) {
    navigator.clipboard
      .writeText(shortenedUrl)
      .then(() =>
        toast.success(`Copied clipboard to clipboard , ${shortenedUrl}`)
      )
      .catch((err) => toast.error(`unable to copy to the clipboard, ${err}`));
  } else{
    toast.error("please wait for the shortened url to be generated");
  }}

  return (
    <div className="Shortened-Url">
      <h1>SHORT LINK</h1>
      <i className="fa-solid fa-link"></i>
      <UrlInput
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="input-tag"
      />
      <button className="shortened-btn" onClick={shortenUrl}>
        Shorten URL
      </button>
     
      {shortenedUrl &&(
      <div className="ShortenedUrl-container">
        {loader ? <Loader/> : shortenedUrl && <p>{shortenedUrl}</p>}
       
        <button className="copy-btn" onClick={copyToClipoard}>
          <i className="fa-solid fa-copy"></i>
          <div className="text">Copy</div>
        </button> 
      </div>
      )}
      <ToastContainer />
        <SavedUrl savedUrls = {savedUrls} /> 
        {savedUrls.length > 0 && (
       <button onClick={clearLocalStorage} className="ClearStorage-btn">Clear Saved URLs</button> 
       )}
    </div>
  );
}

export default ShortenedUrl;

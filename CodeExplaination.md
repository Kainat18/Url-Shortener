the fetch function sets up a POST request to the Bitly API endpoint for URL shortening. It includes the Bitly access token for authentication in the request header, specifies the content type as JSON, and provides the long URL in the request body. The fetch function is then used to send this configuration to the Bitly API.

This code sends a POST request to a specified API (apiUrl) with the following details:

Method: It's a POST request, used for creating or submitting data.(post because its submitting data to server to shorten it , and while get is called to retrieve the data from server) 
Headers:
'Authorization': It includes an access token for authentication (Bearer token).
'Content-Type': Specifies that the content being sent is in JSON format.
Body: It contains the long URL to be shortened, converted to a JSON-formatted string.
After making the request:

It extracts the JSON response from the server.
It extracts the shortened URL from the response data.
Finally, it logs the shortened URL to the console.


The await keyword in await navigator.clipboard.writeText(text) pauses the execution of the function until writing to the clipboard is complete, ensuring that the subsequent console.log line executes only after the asynchronous operation finishes. This allows for a more structured and sequential handling of asynchronous code, preventing potential issues that could arise if execution continued before the asynchronous operation completed.

import { useState  , useEffect} from 'react'
import React from 'react'
import ShortenedUrl from './Components/ShortenedUrl';

function App() {
  const [url , setUrl] = useState("");// handling input from user
  const [shortenedUrl , setShortenedUrl] = useState(null);//stores resultant url  
  const [loader , setLoader] = useState(true);
  const [error, setError] = useState(null);
  const [savedUrls, setSavedUrls] = useState([]);
 

  const apiKey= import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_BASE_URL;

   const validateUrl = (inputUrl) =>{
   const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
   return urlPattern.test(inputUrl);
   }

   const saveToLocalStorage = (originalUrl , shortened) => {
    const updatedSavedUrls = [...savedUrls, {Original:originalUrl , Shortened:shortened }];
    setSavedUrls(updatedSavedUrls);
    localStorage.setItem('savedUrls', JSON.stringify(updatedSavedUrls));
  }

  const loadFromLocalStorage = () => {
    const storedUrls = localStorage.getItem('savedUrls');
    if (storedUrls) {
      setSavedUrls(JSON.parse(storedUrls));
    }
    // const removeUrls = localStorage.removeItem('savedUrls')
  }

const shortenUrl = () =>{

const isValidUrl = validateUrl(url);

if (!isValidUrl) {
setError('Invalid URL. Please enter a valid URL.');
return;
} 
  setLoader(true);
  setError(null);

  fetch(apiUrl, {
       method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'spoo-me-url-shortener.p.rapidapi.com'
        },
        body: new URLSearchParams({
          url: url
        })
      })
        .then(response => response.json())
        .then(data => { 
        setShortenedUrl(data.short_url);
        setUrl("");
        setLoader(false);
        saveToLocalStorage(url , data.short_url );
       
       });
 }
useEffect(() => {
  loadFromLocalStorage();
  shortenUrl();
  setError(null);

} , [])

const copyToClipoard = () =>{
 navigator.clipboard.writeText(shortenedUrl)
 .then(() => alert(`Copied clipboard to clipboard , ${shortenedUrl}`))
 .catch((err) => alert(`unable to copy to the clipboard, ${err}`))
//  alert(`You have copied "${shortenedUrl}"`);
}

  return (
    <div className="App">
      <div className="url-container">
        <input type="text" 
        className={`input-tag ${error ? 'error' : ''}`}
        placeholder='type-url'
        value={url}
        onChange={(e)=>setUrl(e.target.value)}
        required
         />
         <button className="url-btn" onClick={shortenUrl}>Shorten</button>
      </div> 
      {error && <p className="error-message">{error}</p>}
       {loader ? <p>Loading...</p> : shortenedUrl && <p>Shortened URL is: {shortenedUrl}</p>} 
       <button onClick={copyToClipoard}>Copy</button>

       {savedUrls.length > 0 && (
        <div>
          <h2>Saved URLs</h2>
          <ul>
            {savedUrls.map((savedUrl, index) => (
              <li key={index}>OriginalUrl:{savedUrl.Original} , Shortened Url :{savedUrl.Shortened}</li>
            ))}
          </ul>
        </div>
      )}
       <ShortenedUrl />
    </div>
   
  )
}

export default App



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


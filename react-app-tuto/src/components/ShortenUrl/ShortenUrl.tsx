import { useState } from "react";
import axios from "axios";

function ShortenUrl() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");

  const handleShortenUrl = async () => {
    try {
      const response = await axios.post(
        "https://api.tinyurl.com/create",
        {
          url: url,
          key: "tK9xzYT3QbEpLqQywf9l9ZYlCJLdyu5HBqX1lUpIXVhstDQ2FTQtNAy6OPJ7",
        },
        {
          headers: {
            Authorization:
              "tK9xzYT3QbEpLqQywf9l9ZYlCJLdyu5HBqX1lUpIXVhstDQ2FTQtNAy6OPJ7", // Replace YOUR_API_KEY with your actual TinyURL API key
            "Content-Type": "application/json",
          },
        }
      );
      setShortenedUrl(response.data); // Make sure to reference the correct path according to the API response
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to shorten URL. Please try again.");
      setShortenedUrl("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to shorten"
      />
      <button onClick={handleShortenUrl}>Shorten URL</button>
      {shortenedUrl && (
        <p>
          Shortened URL:{" "}
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default ShortenUrl;

// export default ShortenUrl;
// import axios, { CanceledError } from "axios";
// import { useEffect } from "react";

// const ShortenUrl = () => {
//   useEffect(() => {
//     const controller = new AbortController();
//     axios
//       .get(
//         "https://ulvis.net/api.php?url=YOUR-LONG-URL&custom=YOUR-CUSTOM-NAME&private=1",
//         {
//           url: "",
//           // custom = "YOUR - CUSTOM - NAME",
//         }
//       )
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => {
//         if (err instanceof CanceledError) return;
//       });

//     return () => controller.abort();
//   }, []);

//   return <div>ShortenUrl</div>;
// };

// export default ShortenUrl;

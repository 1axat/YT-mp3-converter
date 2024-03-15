import { useEffect, useState } from 'react';
import './App.css';
import Logo from "./assets/Logo1.gif";
import { fetch } from "./services/ApiRequest";

function App() {
  const [link, setLink] = useState('');
  const [id, setId] = useState(null);
  const [response, setResponse] = useState(null);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if(id) {
      const fetchData = () => {
        let interval = setInterval(async function () {
          const res = await fetch(id);

          if(res.status === 200 && res.data.status === "ok"){
            setResponse(res.data); 
            clearInterval(interval);
          }
          else if(res.status === 200 && res.data.status === "fail"){
            alert("Invalid video URL, please don't use share links");
            setDisabled(false);
            clearInterval(interval);
          }
        }, 1000);
      }
      fetchData();
    }
  }, [id]);

  useEffect(()  => {
    if(response){
      window.location.href = response.link;
    }
  }, [response]);


  return (
      <div className="App">
        <div id="logo">
          <img src={Logo}  /> 
        </div>
        <div id="body">
          <input 
          type="text" 
          placeholder="    Enter YouTube URL here"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
          />
          <span>Convert YouTube to MP3 in seconds</span>
        </div>


        <button
          onClick = {() => {
            if (!link.trim()) {
              alert("Please enter a YouTube URL before downloading.");
              return;
            }
            const urlPattern=/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
            if(!urlPattern.test(link)){
              alert("Please enter a valid YouTube URL.");
              return;
            }
            setDisabled(false);
            // "=" because the API expects only the ID of the video from the link.
            setDownloadStarted(true);
            const text = link.split("=")[1];
            if(text){
              setId(text);
            }
          }}
          >Download</button>
          {downloadStarted && <p id="status">Your download is getting started....</p>}

      </div>
  )
}

export default App
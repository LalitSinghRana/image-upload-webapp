import { useState } from "react";
import Popup from "./components/Popup/Popup.js";
import consts from "./consts";
import "./App.css";

function App() {
  // buttonPopup is used to open and close pop component
  const [buttonPopup, setButtonPopup] = useState(false);
  // url store the image url seleced by user
  const [url, setUrl] = useState(consts.DEFAULT_STRING_URL);

  return (
    <>
      <main>
        <div className="url">
          <p>{url}</p>
        </div>
        <button onClick={()=>setButtonPopup(true)} type="button">Select Image</button>
      </main>
      <Popup 
        trigger={buttonPopup} 
        setTrigger={setButtonPopup}
        setUrl={setUrl}
      />
    </>
  );
};

export default App;


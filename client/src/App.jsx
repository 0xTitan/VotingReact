import { useState } from "react";
import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Account from "./components/Account/AccoutInfo";
import Worflow from "./components/Worflow/Workflow";
import "./App.css";

function App() {
  const [isOwner, setOwner] = useState(false);

  function handleOwnerCheck(value) {
    console.log(value);
    setOwner(value);
  }

  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Account handleOwnerCheck={handleOwnerCheck} />
          <hr />
          {isOwner && <Worflow />}
          <hr />
          {/* <Demo /> */}
          <hr />
          {/* <Footer /> */}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;

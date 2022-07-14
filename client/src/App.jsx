import { useState } from "react";
import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Account from "./components/Account/AccoutInfo";
import Worflow from "./components/Worflow/Workflow";
import VoterRegistration from "./components/VoterRegistration/VoterRegistration";
import ProposalRegistration from "./components/ProposalRegistration/ProposalRegistration";
import "./App.css";

function App() {
  const [isOwner, setOwner] = useState(false);
  const [isRegister, setRegistered] = useState(false);
  const [currentWorflow, setCurrentWorflow] = useState(0);

  function handleOwnerCheck(value) {
    setOwner(value);
  }

  function handleVoterRegisteredCheck(value) {
    console.log("isRegister : " + value);
    setRegistered(value);
  }

  function handleWorkflowStatusCheck(value) {
    console.log("currentWorflow : " + value);
    setCurrentWorflow(value);
  }

  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Account
            handleOwnerCheck={handleOwnerCheck}
            handleVoterRegisteredCheck={handleVoterRegisteredCheck}
          />
          <hr />
          {isOwner && (
            <Worflow handleWorkflowStatusCheck={handleWorkflowStatusCheck} />
          )}
          <hr />
          {isOwner && currentWorflow == 0 && <VoterRegistration />}
          <hr />
          {isRegister && currentWorflow == 1 && <ProposalRegistration />}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;

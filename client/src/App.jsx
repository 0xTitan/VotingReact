import { useState } from "react";
import { EthProvider } from "./contexts/EthContext";
// import Intro from "./components/Intro/";
// import Setup from "./components/Setup";
// import Demo from "./components/Demo";
import Account from "./components/Account/AccoutInfo";
import Worflow from "./components/Worflow/Workflow";
import VoterRegistration from "./components/VoterRegistration/VoterRegistration";
import ProposalRegistration from "./components/ProposalRegistration/ProposalRegistration";
import ProposalList from "./components/ProposalList/ProposalList";
import VoteResult from "./components/VoteResult/VoteResult";
import VoterInfo from "./components/VoterInfo/VoterInfo";
import "./App.css";

function App() {
  const [isOwner, setOwner] = useState(false);
  const [isRegister, setRegistered] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [proposalIdVotedFor, setProposalIfVotedFor] = useState(-1);
  const [currentWorflow, setCurrentWorflow] = useState(0);

  function handleOwnerCheck(owner) {
    setOwner(owner);
  }

  function handleVoterRegisteredCheck(registered) {
    console.log("registered : " + registered);
    setRegistered(registered);
  }

  function handleHasVotedCheck(voted) {
    setHasVoted(voted);
  }

  function handleProposalIfVotedFor(propIdVotedFor) {
    console.log("proposalIdVotedFor : " + propIdVotedFor);
    setProposalIfVotedFor(propIdVotedFor);
  }

  function handleWorkflowStatusCheck(status) {
    console.log("setCurrentWorflow to : " + status);
    setCurrentWorflow(status);
  }

  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Account
            handleOwnerCheck={handleOwnerCheck}
            handleVoterRegisteredCheck={handleVoterRegisteredCheck}
            handleHasVotedCheck={handleHasVotedCheck}
            handleProposalIfVotedFor={handleProposalIfVotedFor}
            handleWorkflowStatusCheck={handleWorkflowStatusCheck}
          />
          <hr />
          {isOwner && (
            <Worflow handleWorkflowStatusCheck={handleWorkflowStatusCheck} />
          )}

          {isOwner && currentWorflow == 0 && <VoterRegistration />}

          {isRegister && currentWorflow == 1 && <ProposalRegistration />}

          {isRegister && currentWorflow == 3 && (
            <ProposalList
              hasVoted={hasVoted}
              handleHasVotedCheck={handleHasVotedCheck}
              proposalIdVotedFor={proposalIdVotedFor}
            />
          )}
          {currentWorflow == 5 && <VoteResult />}
          {currentWorflow == 5 && isRegister && <VoterInfo />}
          {currentWorflow == 0 && !isOwner && (
            <span className="instruction">
              {" "}
              Addresses are currently registered. Please come back later !
            </span>
          )}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;

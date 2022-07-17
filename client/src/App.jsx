import { useState } from "react";
import { EthProvider } from "./contexts/EthContext";
import Account from "./components/Account/AccoutInfo";
import Worflow from "./components/Worflow/Workflow";
import EventDisplayer from "./components/EventDisplayer/EventDisplayer";
import Navbar from "./components/NavBar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Events from "./components/Events/Events";
import TransferOnwerShip from "./components/TransferOwnerShip/TransferOnwerShip";
import "./App.css";

function App() {
  const [isOwner, setOwner] = useState(false);
  const [isRegister, setRegistered] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [proposalIdVotedFor, setProposalIfVotedFor] = useState(-1);
  const [currentWorflow, setCurrentWorflow] = useState(0);
  const [raisedEvent, SetRaisedEvent] = useState("");

  function handleOwnerCheck(owner) {
    setOwner(owner);
  }

  function handleVoterRegisteredCheck(registered) {
    setRegistered(registered);
  }

  function handleHasVotedCheck(voted) {
    setHasVoted(voted);
  }

  function handleProposalIfVotedFor(propIdVotedFor) {
    setProposalIfVotedFor(propIdVotedFor);
  }

  function handleWorkflowStatusCheck(status) {
    setCurrentWorflow(status);
  }

  const showEvent = (raisedEvent) => {
    SetRaisedEvent(raisedEvent);
  };

  return (
    <BrowserRouter>
      <EthProvider>
        <div id="App">
          <div className="container">
            <div className="header">
              {isOwner && <Navbar></Navbar>}
              <Account
                handleOwnerCheck={handleOwnerCheck}
                handleVoterRegisteredCheck={handleVoterRegisteredCheck}
                handleHasVotedCheck={handleHasVotedCheck}
                handleProposalIfVotedFor={handleProposalIfVotedFor}
                handleWorkflowStatusCheck={handleWorkflowStatusCheck}
              />
            </div>
            <hr />
            <Routes>
              <Route
                path="/VotingReact/workflow"
                element={
                  isOwner && (
                    <Worflow
                      handleWorkflowStatusCheck={handleWorkflowStatusCheck}
                      showEvent={showEvent}
                    />
                  )
                }
              ></Route>
              <Route
                path="/VotingReact"
                element={
                  <Home
                    isOwner={isOwner}
                    isRegister={isRegister}
                    currentWorflow={currentWorflow}
                    showEvent={showEvent}
                    hasVoted={hasVoted}
                    handleHasVotedCheck={handleHasVotedCheck}
                    proposalIdVotedFor={proposalIdVotedFor}
                  ></Home>
                }
              />
              <Route
                path="/VotingReact/event/proposal"
                element={
                  isOwner && (
                    <Events
                      key="ProposalRegistered"
                      type="ProposalRegistered"
                    ></Events>
                  )
                }
              ></Route>
              <Route
                path="/VotingReact/event/workflow"
                element={
                  isOwner && (
                    <Events
                      key="WorkflowStatusChange"
                      type="WorkflowStatusChange"
                    ></Events>
                  )
                }
              ></Route>
              <Route
                path="/VotingReact/event/voter"
                element={
                  isOwner && (
                    <Events
                      key="VoterRegistered"
                      type="VoterRegistered"
                    ></Events>
                  )
                }
              ></Route>
              <Route
                path="/VotingReact/event/vote"
                element={isOwner && <Events key="Vote" type="Vote"></Events>}
              ></Route>
              <Route
                path="/VotingReact/transferOwner"
                element={
                  isOwner && (
                    <TransferOnwerShip
                      handleOwnerCheck={handleOwnerCheck}
                    ></TransferOnwerShip>
                  )
                }
              ></Route>
              <Route
                path="*"
                element={<Navigate to="/VotingReact" replace />}
              ></Route>

              <Route
                path="/VotingReact/event/*"
                element={!isOwner && <Navigate to="/VotingReact" replace />}
              ></Route>
            </Routes>
            <EventDisplayer
              raisedEvent={raisedEvent}
              showEvent={showEvent}
            ></EventDisplayer>
          </div>
        </div>
      </EthProvider>
    </BrowserRouter>
  );
}

export default App;

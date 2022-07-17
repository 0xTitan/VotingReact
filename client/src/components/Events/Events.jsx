import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./Events.css";

function Events({ type }) {
  const {
    state: { contract },
  } = useEth();

  const [workflowEvents, setWorkflowEvents] = useState([]);
  const [proposalEvents, setProposalEvents] = useState([]);
  const [voterEvents, setVoterEvents] = useState([]);
  const [voteEvents, setVoteEvents] = useState([]);
  let loaded = false;

  let optionsPast = {
    filter: {
      value: [],
    },
    fromBlock: 0,
    toBlock: "latest",
  };

  let optionsNew = {
    filter: {
      value: [],
    },
    fromBlock: "latest",
  };

  useEffect(() => {
    if (contract && !loaded) {
      watchEvents();
      loaded = true;
    }
  }, []);

  const watchEvents = () => {
    switch (type) {
      case "ProposalRegistered":
        return listenProposal();
      case "WorkflowStatusChange": {
        listenWorkflowStatus();
        listenNewWorkflowStatus();
        return;
      }
      case "VoterRegistered":
        return listenVoter();
      case "Vote":
        return listenVote();
    }
  };

  const listenProposal = async () => {
    await contract.getPastEvents(
      "ProposalRegistered",
      optionsPast,
      (error, oldEvents) => {
        if (oldEvents.length > 0) {
          oldEvents.map((e) =>
            setProposalEvents((current) => [
              e.returnValues.proposalId,
              ...current,
            ])
          );
        }
      }
    );
    contract.events.ProposalRegistered(optionsNew).on("data", (newEvent) => {
      setProposalEvents((current) => [
        newEvent.returnValues.proposalId,
        ...current,
      ]);
    });
  };

  const listenWorkflowStatus = async () => {
    await contract.getPastEvents(
      "WorkflowStatusChange",
      optionsPast,
      (error, oldEvents) => {
        if (oldEvents.length > 0) {
          oldEvents.map((e) => {
            console.log("Add past event");
            setWorkflowEvents((current) => [
              e.returnValues.newStatus,
              ...current,
            ]);
          });
        }
      }
    );
  };

  const listenNewWorkflowStatus = () => {
    contract.events.WorkflowStatusChange(optionsNew).on("data", (newEvent) => {
      console.log("Add new event");
      setWorkflowEvents((current) => [
        newEvent.returnValues.newStatus,
        ...current,
      ]);
    });
  };

  const listenVoter = async () => {
    await contract.getPastEvents(
      "VoterRegistered",
      optionsPast,
      (error, oldEvents) => {
        if (oldEvents.length > 0) {
          console.log("past voter");
          oldEvents.map((e) =>
            setVoterEvents((current) => [
              e.returnValues.voterAddress,
              ...current,
            ])
          );
        }
      }
    );

    contract.events.VoterRegistered(optionsNew).on("data", (newEvent) => {
      console.log("New voter");
      setVoterEvents((current) => [
        newEvent.returnValues.voterAddress,
        ...current,
      ]);
    });
  };

  const listenVote = async () => {
    await contract.getPastEvents("Voted", optionsPast, (error, oldEvents) => {
      if (oldEvents.length > 0) {
        oldEvents.map((e) =>
          setVoteEvents((current) => [
            {
              voter: e.returnValues.voter,
              voteId: e.returnValues.proposalId,
            },
            ...current,
          ])
        );
      }
    });

    contract.events.Voted(optionsNew).on("data", (newEvent) => {
      setVoteEvents((current) => [
        {
          voter: newEvent.returnValues.voter,
          voteId: newEvent.returnValues.proposalId,
        },
        ...current,
      ]);
    });
  };

  switch (type) {
    case "ProposalRegistered":
      return (
        <div className="registeredEvents-container">
          {proposalEvents.length > 0 &&
            proposalEvents.map((currentEvent) => (
              <span key={currentEvent} className="instruction">
                Proposal registered with id : {currentEvent}
              </span>
            ))}
          {proposalEvents.length == 0 && (
            <span className="instruction">No events</span>
          )}
        </div>
      );
    case "WorkflowStatusChange":
      return (
        <div className="registeredEvents-container">
          {workflowEvents.length > 0 &&
            workflowEvents.map((currentEvent) => (
              <span key={currentEvent} className="instruction">
                Workflow updated to : {currentEvent}
              </span>
            ))}
          {workflowEvents.length == 0 && (
            <span className="instruction">No events</span>
          )}
        </div>
      );
    case "VoterRegistered":
      return (
        <div className="registeredEvents-container">
          {voterEvents.length > 0 &&
            voterEvents.map((currentEvent) => (
              <span key={currentEvent} className="instruction">
                Voter registered with address : {currentEvent}
              </span>
            ))}
          {voterEvents.length == 0 && (
            <span className="instruction">No events</span>
          )}
        </div>
      );
    case "Vote":
      return (
        <div className="registeredEvents-container">
          {voteEvents.length > 0 &&
            voteEvents.map((currentEvent) => (
              <span key={currentEvent.voter} className="instruction">
                Vote registered for address : {currentEvent.voter} and proposal
                : {currentEvent.voteId}
              </span>
            ))}
          {voteEvents.length == 0 && (
            <span className="instruction">No events</span>
          )}
        </div>
      );
    default:
      return <span className="instruction">No events</span>;
  }
}

export default Events;

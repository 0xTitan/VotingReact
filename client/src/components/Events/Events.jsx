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
    const fetchData = async () => {
      await watchEvents();
    };

    if (contract) {
      fetchData();
    }
  }, [contract]);

  const watchEvents = () => {
    switch (type) {
      case "ProposalRegistered":
        listenProposal();
      case "WorkflowStatusChange":
        listenWorkflowStatus();
      case "VoterRegistered":
        listenVoter();
      case "Vote":
        listenVote();
    }
  };

  const listenProposal = async () => {
    await contract.getPastEvents(
      "ProposalRegistered",
      optionsPast,
      (error, oldEvents) => {
        if (oldEvents.length > 0) {
          let listId = [...proposalEvents];
          oldEvents.map(
            (e) => (listId = [, e.returnValues.proposalId, ...listId])
          );
          setProposalEvents(listId);
        }
      }
    );
    console.log("proposalEvents : " + proposalEvents);
    contract.events.ProposalRegistered(optionsNew).on("data", (newEvent) => {
      setProposalEvents([newEvent.returnValues.proposalId, ...proposalEvents]);
    });
  };

  const listenWorkflowStatus = async () => {
    await contract.getPastEvents(
      "WorkflowStatusChange",
      optionsPast,
      (error, oldEvents) => {
        if (oldEvents.length > 0) {
          let listId = [...workflowEvents];
          oldEvents.map(
            (e) => (listId = [e.returnValues.newStatus, ...listId])
          );
          setWorkflowEvents(listId);
        }
      }
    );

    contract.events.WorkflowStatusChange(optionsNew).on("data", (newEvent) => {
      setWorkflowEvents([newEvent.returnValues.newStatus, ...workflowEvents]);
    });
  };

  const listenVoter = async () => {
    await contract.getPastEvents(
      "VoterRegistered",
      optionsPast,
      (error, oldEvents) => {
        if (oldEvents.length > 0) {
          let listAddress = [...voterEvents];
          console.log(oldEvents);
          oldEvents.map(
            (e) => (listAddress = [e.returnValues.voterAddress, ...listAddress])
          );
          setVoterEvents(listAddress);
        }
      }
    );

    contract.events.VoterRegistered(optionsNew).on("data", (newEvent) => {
      setVoterEvents([newEvent.returnValues.voterAddress, ...voterEvents]);
    });
  };

  const listenVote = async () => {
    await contract.getPastEvents("Voted", optionsPast, (error, oldEvents) => {
      if (oldEvents.length > 0) {
        let listVote = [...voteEvents];
        oldEvents.map(
          (e) =>
            (listVote = [
              {
                voter: e.returnValues.voter,
                voteId: e.returnValues.proposalId,
              },
              ...listVote,
            ])
        );
        setVoteEvents(listVote);
      }
    });

    contract.events.Voted(optionsNew).on("data", (newEvent) => {
      const data = {
        voter: newEvent.returnValues.voter,
        voteId: newEvent.returnValues.proposalId,
      };
      setVoteEvents([data, ...voteEvents]);
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

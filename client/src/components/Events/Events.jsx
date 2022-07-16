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
          const data = oldEvents.map((e) => e.returnValues.proposalId);
          setProposalEvents([...proposalEvents, data]);
        }
      }
    );

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
          const data = oldEvents.map((e) => e.returnValues.newStatus);
          setWorkflowEvents([...workflowEvents, data]);
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
          const data = oldEvents.map((e) => e.returnValues.voterAddress);
          setVoterEvents([...voterEvents, data]);
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
        const data = oldEvents.map((e) => ({
          voter: e.returnValues.voter,
          voteId: e.returnValues.proposalId,
        }));
        setVoteEvents([...voteEvents, data]);
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
        <div className="proposalRegisteredEvents-container">
          {proposalEvents.length > 0 &&
            proposalEvents.map((currentEvent) => (
              <span className="instruction">
                Proposal registered with id :{currentEvent}
              </span>
            ))}
          {proposalEvents.length == 0 && (
            <span className="instruction">No events</span>
          )}
        </div>
      );
    case "WorkflowStatusChange":
      return (
        <div className="proposalRegisteredEvents-container">
          {workflowEvents.length > 0 &&
            workflowEvents.map((currentEvent) => (
              <span className="instruction">
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
        <div className="proposalRegisteredEvents-container">
          {voterEvents.length > 0 &&
            voterEvents.map((currentEvent) => (
              <span className="instruction">
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
        <div className="proposalRegisteredEvents-container">
          {voteEvents.length > 0 &&
            voteEvents.map((currentEvent) => (
              <span className="instruction">
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

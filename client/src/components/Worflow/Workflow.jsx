import { useState, useEffect, useCallback } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./Workflow.css";

function Worflow({ handleWorkflowStatusCheck, showEvent }) {
  const {
    state: { contract, accounts },
  } = useEth();
  const [workflowStatus, setWorkflowStatus] = useState(0);

  useEffect(() => {
    if (accounts) {
      read();
    }
  }, [accounts]);

  const read = useCallback(async () => {
    const value = await contract.methods
      .workflowStatus()
      .call({ from: accounts[0] });
    setWorkflowStatus(value);
    handleWorkflowStatusCheck(value);
  }, [contract]);

  const checkStatus = (status) => {
    return status - 1 == workflowStatus;
  };

  const startProposalsRegistering = async (e) => {
    const transact = await contract.methods
      .startProposalsRegistering()
      .send({ from: accounts[0] });
    const value = await contract.methods
      .workflowStatus()
      .call({ from: accounts[0] });
    setWorkflowStatus(value);
    handleWorkflowStatusCheck(value);
    //get event from transaction.0
    showEvent(
      "Workflow updated to  :" +
      transact.events.WorkflowStatusChange.returnValues.newStatus
    );
  };

  const endProposalsRegistering = async (e) => {
    const transact = await contract.methods
      .endProposalsRegistering()
      .send({ from: accounts[0] });
    const value = await contract.methods
      .workflowStatus()
      .call({ from: accounts[0] });
    setWorkflowStatus(value);
    handleWorkflowStatusCheck(value);
    //get event from transaction.0
    showEvent(
      "Workflow updated to  :" +
      transact.events.WorkflowStatusChange.returnValues.newStatus
    );
  };

  const startVotingSession = async (e) => {
    const transact = await contract.methods
      .startVotingSession()
      .send({ from: accounts[0] });
    const value = await contract.methods
      .workflowStatus()
      .call({ from: accounts[0] });
    setWorkflowStatus(value);
    handleWorkflowStatusCheck(value);
    //get event from transaction.0
    showEvent(
      "Workflow updated to  :" +
      transact.events.WorkflowStatusChange.returnValues.newStatus
    );
  };

  const endVotingSession = async (e) => {
    const transact = await contract.methods
      .endVotingSession()
      .send({ from: accounts[0] });
    const value = await contract.methods
      .workflowStatus()
      .call({ from: accounts[0] });
    setWorkflowStatus(value);
    handleWorkflowStatusCheck(value);
    //get event from transaction.0
    showEvent(
      "Workflow updated to  :" +
      transact.events.WorkflowStatusChange.returnValues.newStatus
    );
  };

  const tallyVotes = async (e) => {
    const transact = await contract.methods
      .tallyVotes()
      .send({ from: accounts[0] });
    const value = await contract.methods
      .workflowStatus()
      .call({ from: accounts[0] });
    setWorkflowStatus(value);
    handleWorkflowStatusCheck(value);

    showEvent(
      "Workflow updated to  :" +
      transact.events.WorkflowStatusChange.returnValues.newStatus
    );
  };

  return (
    <div className="workflow-container">
      <span className="admin-instruction">Workflow management</span>
      <div className="workflow-actions">
        <button
          className="worflow-button"
          disabled={!checkStatus(1)}
          onClick={startProposalsRegistering}
        >
          Start proposal registration
        </button>
        <button
          className="worflow-button"
          disabled={!checkStatus(2)}
          onClick={endProposalsRegistering}
        >
          End proposal registration
        </button>
        <button
          className="worflow-button"
          disabled={!checkStatus(3)}
          onClick={startVotingSession}
        >
          Start voting session
        </button>
        <button
          className="worflow-button"
          disabled={!checkStatus(4)}
          onClick={endVotingSession}
        >
          End voting session
        </button>
        <button
          className="worflow-button"
          disabled={!checkStatus(5)}
          onClick={tallyVotes}
        >
          Tally vote
        </button>
      </div>
    </div>
  );
}

export default Worflow;

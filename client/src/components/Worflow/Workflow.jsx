import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Worflow() {
  const {
    state: { contract, accounts },
  } = useEth();
  const [workflowStatus, setWorkflowStatus] = useState(0);

  useEffect(() => {
    setWorkflowStatus(999);
    if (accounts) {
      read();
    }
  }, [accounts]);

  const read = async () => {
    const value = await contract.methods
      .workflowStatus()
      .call({ from: accounts[0] });
    setWorkflowStatus(value);
  };

  const checkStatus = (status) => {
    return status > workflowStatus;
  };

  const startProposalsRegistering = async (e) => {
    const transact = await contract.methods
      .startProposalsRegistering()
      .send({ from: accounts[0] });
    const value = await contract.methods
      .workflowStatus()
      .call({ from: accounts[0] });
    setWorkflowStatus(value);
    //get event from transaction.0
    console.log(
      "Previous status  :" +
        transact.events.WorkflowStatusChange.returnValues.previousStatus
    );
    console.log(
      "Current status  :" +
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
    //get event from transaction.0
    console.log(
      "Previous status  :" +
        transact.events.WorkflowStatusChange.returnValues.previousStatus
    );
    console.log(
      "Current status  :" +
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
    //get event from transaction.0
    console.log(
      "Previous status  :" +
        transact.events.WorkflowStatusChange.returnValues.previousStatus
    );
    console.log(
      "Current status  :" +
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
    //get event from transaction.0
    console.log(
      "Previous status  :" +
        transact.events.WorkflowStatusChange.returnValues.previousStatus
    );
    console.log(
      "Current status  :" +
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
    //get event from transaction.0
    console.log(
      "Previous status  :" +
        transact.events.WorkflowStatusChange.returnValues.previousStatus
    );
    console.log(
      "Current status  :" +
        transact.events.WorkflowStatusChange.returnValues.newStatus
    );
  };

  return (
    <div className="btns">
      <button disabled={!checkStatus(1)} onClick={startProposalsRegistering}>
        Start proposal registration
      </button>
      <button disabled={!checkStatus(2)} onClick={endProposalsRegistering}>
        End proposal registration
      </button>
      <button disabled={!checkStatus(3)} onClick={startVotingSession}>
        Start voting session
      </button>
      <button disabled={!checkStatus(4)} onClick={endVotingSession}>
        End voting session
      </button>
      <button disabled={!checkStatus(5)} onClick={tallyVotes}>
        Tally vote
      </button>
      <button onClick={read}>read()</button>
      <p>{workflowStatus}</p>
    </div>
  );
}

export default Worflow;

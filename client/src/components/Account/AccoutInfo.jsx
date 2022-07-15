import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./AccountInfo.css";

function AccountInfo({
  handleOwnerCheck,
  handleVoterRegisteredCheck,
  handleHasVotedCheck,
  handleProposalIfVotedFor,
  handleWorkflowStatusCheck,
}) {
  const {
    state: { accounts, networkID, web3, contract },
  } = useEth();

  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [workflowStatus, setWorkflowStatus] = useState(0);

  const getBalance = async () => {
    // const value = contract
    //   ? await contract.methods.winningProposalID().call({ from: accounts[0] })
    //   : -1;

    const valueWei = web3 ? await web3.eth.getBalance(accounts[0]) : 0;
    let valueEth = web3 ? web3.utils.fromWei(valueWei, "ether") : 0;
    valueEth = Number(valueEth).toFixed(3);
    setBalance(valueEth + " ETH");
  };

  const getCurrentAddress = async () => {
    if (accounts) {
      const addr =
        accounts[0].substring(0, 7) +
        "..." +
        accounts[0].substring(accounts[0].length - 4, accounts[0].length);
      setAddress(addr);
    }
  };

  const getNetwork = async () => {
    console.log(networkID);
    switch (networkID) {
      case 1:
        setNetwork("Ethereum");
        break;
      case 3:
        setNetwork("Ropsten");
        break;
      case 4:
        setNetwork("Rinkeby");
        break;
      case 5:
        setNetwork("Goerli");
        break;
      default:
        setNetwork("local - " + networkID);
    }
  };

  const isOwner = async () => {
    const value = contract
      ? await contract.methods.owner().call({ from: accounts[0] })
      : -1;
    if (value === accounts[0]) {
      handleOwnerCheck(true);
    } else {
      handleOwnerCheck(false);
    }
  };

  const getCurrentWorkflowAndVoterRegistered = async () => {
    const value = await contract.methods
      .workflowStatus()
      .call({ from: accounts[0] });
    console.log("status : " + value);
    setWorkflowStatus(value);
    handleWorkflowStatusCheck(value);
    if (value > 0) {
      isRegistered();
    }
  };

  const isRegistered = async () => {
    try {
      const value = contract
        ? await contract.methods
            .getVoter(accounts[0])
            .call({ from: accounts[0] })
        : null;
      console.log(value);
      if (value.isRegistered) {
        handleVoterRegisteredCheck(true);
      } else {
        handleVoterRegisteredCheck(false);
      }
      if (value.hasVoted) {
        handleHasVotedCheck(true);
      } else {
        handleHasVotedCheck(false);
      }
      if (value.votedProposalId >= 0 && value.hasVoted) {
        handleProposalIfVotedFor(value.votedProposalId);
      } else {
        handleProposalIfVotedFor(-1);
      }
    } catch (err) {
      console.log(err);
      handleVoterRegisteredCheck(false);
      handleHasVotedCheck(false);
      handleProposalIfVotedFor(-1);
    }
  };

  useEffect(() => {
    if (web3) {
      getCurrentAddress();
      getBalance();
      getNetwork();
      isOwner();
      getCurrentWorkflowAndVoterRegistered();
    }
  }, [web3, accounts, address, handleWorkflowStatusCheck]);

  return (
    <div className="class-accountInfo">
      <p className="class-itemAccountInfo">{address}</p>
      <p className="class-itemAccountInfo">{balance}</p>
      <p className="class-itemAccountInfo">{network}</p>
    </div>
  );
}

export default AccountInfo;

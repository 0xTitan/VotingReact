import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./VoterInfo.css";

function VoterInfo() {
  const {
    state: { accounts, contract },
  } = useEth();

  const [voter, setVoter] = useState();
  const [address, setAddress] = useState("");
  const [addressValid, setAddressValid] = useState(false);
  const [proposal, setProposal] = useState(false);
  const [answer, SetAnswer] = useState("");

  useEffect(() => {
    setAddress("");
    SetAnswer("");
  }, [accounts]);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length === 42) {
      setAddressValid(true);
      setAddress(value);
    }
  };

  const checkVoterInfo = async () => {
    try {
      const voterInfo = await contract.methods
        .getVoter(address)
        .call({ from: accounts[0] });
      if (voterInfo) {
        setVoter(voterInfo);

        if (voterInfo.hasVoted && voterInfo.votedProposalId >= 0) {
          const proposal = await contract.methods
            .getOneProposal(voterInfo.votedProposalId)
            .call({ from: accounts[0] });
          setProposal(proposal);
          SetAnswer(
            "Voter with address " +
              address +
              "has voted for " +
              proposal.description
          );
        } else {
          SetAnswer("Voter with address " + address + " didn't vote");
        }
      }
    } catch (err) {
      SetAnswer("No data for address " + address);
    }
  };

  return (
    <div className="voterInfo-container">
      <span className="voterInfo-instruction">Check vote by address</span>
      <div className="voterInfo-main">
        <input
          className="voterInfo-inputTxt"
          name="voterAddress"
          type="text"
          id="voterAddress"
          value={address}
          onChange={(e) => handleChange(e)}
        ></input>
        <button
          className="voterInfo-button"
          disabled={!addressValid}
          onClick={checkVoterInfo}
        >
          Get voter result
        </button>
      </div>
      <span className="instruction">{answer}</span>
    </div>
  );
}

export default VoterInfo;

import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function VoterInfo() {
  const [voter, setVoter] = useState();
  const [address, setAddress] = useState([voterAddress: "", valid: 0 ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length === 42) {
      setValidAddress(true);
    }
  };

  const checkVoterInfo = async (index) => {
    const prop = proposalList[index].proposal;
    const transact = await contract.methods
      .addProposal(prop)
      .send({ from: accounts[0] });
    console.log(
      "Proposal added  : " +
        transact.events.ProposalRegistered.returnValues.proposalId
    );

    const listProposal = [...proposalList];
    listProposal[index]["registered"] = 1;
    setProposalList(listProposal);
  };

  return (
    <div>
      <input
        className="voterInfo-inputTxt"
        name="voterAddress"
        type="text"
        id="voterAddress"
        onChange={(e) => handleAddressChange(e)}
      ></input>
      <button onClick={checkVoterInfo}>Get voter result</button>
    </div>
  );
}

export default VoterInfo;

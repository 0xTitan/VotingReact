import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./ProposalRegistration.css";

function ProposalRegistration() {
  const {
    state: { contract, accounts },
  } = useEth();
  const [proposalList, setProposalList] = useState([
    { proposal: "", registered: 0 },
  ]);

  const handleAddProposal = () => {
    setProposalList([...proposalList, { proposal: "", registered: 0 }]);
  };

  //   const handleRemoveProposal = (index) => {
  //     console.log("RemoveProposal");
  //     const listProposal = [...proposalList];
  //     console.log(index);
  //     console.log(listProposal);
  //     listProposal.splice(index, 1);
  //     setProposalList(listProposal);
  //   };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const listProposal = [...proposalList];
    listProposal[index][name] = value;
    setProposalList(listProposal);
  };

  const handleRegisterProposals = async (index) => {
    console.log(proposalList);
    console.log(proposalList[index].proposal);
    const prop = proposalList[index].proposal;
    const transact = await contract.methods
      .addProposal(prop)
      .send({ from: accounts[0] });
    console.log(transact);
    console.log(
      "Proposal added  : " +
        transact.events.ProposalRegistered.returnValues.proposalId
    );

    const listProposal = [...proposalList];
    listProposal[index]["registered"] = 1;
    setProposalList(listProposal);
  };

  return (
    <div className="proposalRegistration-main">
      <h3 htmlFor="adminSentence">
        Admin please proceed with proposal address registration before moving to
        next phase
      </h3>
      {proposalList.map((currentProposal, index) => (
        <div className="proposalRegistration-operation">
          <div className="proposalRegistration-add">
            <div className="proposalRegistration-input">
              <input
                className="proposalRegistration-inputTxt"
                name="proposal"
                type="text"
                id="proposal"
                disabled={currentProposal.registered}
                value={currentProposal.proposal}
                onChange={(e) => handleChange(e, index)}
              ></input>

              {currentProposal.valid === 0 &&
                currentProposal.proposal.length > 0 && (
                  <p className="proposalRegistration-alert">!</p>
                )}
              {currentProposal.proposal.length > 0 && (
                <button
                  type="button"
                  className="registerProposal-btn"
                  disabled={currentProposal.registered}
                  onClick={() => handleRegisterProposals(index)}
                >
                  <span>Register</span>
                </button>
              )}
            </div>
            {proposalList.length - 1 === index && proposalList.length < 100 && (
              <button
                type="button"
                className="addProposal-btn"
                onClick={handleAddProposal}
              >
                <span>Add proposal</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProposalRegistration;

import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./ProposalRegistration.css";

function ProposalRegistration({ showEvent }) {
  const {
    state: { contract, accounts },
  } = useEth();

  const [proposalList, setProposalList] = useState([
    { proposal: "", registered: 0 },
  ]);

  const handleAddProposal = () => {
    setProposalList([...proposalList, { proposal: "", registered: 0 }]);
  };

  useEffect(() => {
    setProposalList([{ proposal: "", registered: 0 }]);
  }, [accounts]);

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
    const prop = proposalList[index].proposal;
    const transact = await contract.methods
      .addProposal(prop)
      .send({ from: accounts[0] });
    showEvent(
      "Proposal added  : " +
        transact.events.ProposalRegistered.returnValues.proposalId
    );

    const listProposal = [...proposalList];
    listProposal[index]["registered"] = 1;
    setProposalList(listProposal);
  };

  return (
    <div className="proposalRegistration-main">
      <span className="admin-instruction">
        Please proceed with proposal registration
      </span>
      {proposalList.map((currentProposal, index) => (
        <div key={index} className="proposalRegistration-operation">
          <div className="proposalRegistration-add">
            <div className="proposalRegistration-input">
              <input
                className="proposalRegistration-inputTxt"
                name="proposal"
                type="text"
                id="proposal"
                placeholder="Enter proposal"
                disabled={currentProposal.registered}
                value={currentProposal.proposal}
                onChange={(e) => handleChange(e, index)}
              ></input>
              {currentProposal.proposal.length > 0 && (
                <button
                  type="button"
                  className="registerProposal-button"
                  disabled={currentProposal.registered}
                  onClick={() => handleRegisterProposals(index)}
                >
                  <span>Register proposal to smart contract</span>
                </button>
              )}
            </div>
            {proposalList.length - 1 === index && proposalList.length < 100 && (
              <button
                type="button"
                className="addProposal-button"
                onClick={handleAddProposal}
              >
                <span>Create a new proposal</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProposalRegistration;

import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./VoteResult.css";

function VoteResult() {
  const {
    state: { contract, accounts },
  } = useEth();

  const [winingProposal, setWinningProposal] = useState();

  useEffect(() => {
    if (contract) {
      getWinner();
    }
  }, [contract]);

  const getWinner = async () => {
    const winningProposalId = await contract.methods
      .winningProposalId()
      .call({ from: accounts[0] });
    // const proposal = await contract.methods
    //   .getOneProposal(winningProposalId)
    //   .call({ from: accounts[0] });

    setWinningProposal(winningProposalId);
  };

  return (
    <div className="voterResult-container">
      <span className="voterResult-instruction">Winner result</span>
      <div className="voterResult-txt">
        <span className="voterResult-result">
          {winingProposal && (
            <span>Winner is proposal with id : {winingProposal}</span>
          )}
        </span>
      </div>
    </div>
  );
}
export default VoteResult;

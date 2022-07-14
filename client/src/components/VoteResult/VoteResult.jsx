import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

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
      .winningProposalID()
      .call({ from: accounts[0] });
    const proposal = await contract.methods
      .getOneProposal(winningProposalId)
      .call({ from: accounts[0] });

    setWinningProposal(proposal);
  };

  return (
    <div>
      {winingProposal && (
        <h1>
          Winner is {winingProposal.description} with {winingProposal.voteCount}{" "}
          votes
        </h1>
      )}
    </div>
  );
}
export default VoteResult;

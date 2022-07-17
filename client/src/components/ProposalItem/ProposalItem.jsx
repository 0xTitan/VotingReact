import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./ProposalItem.css";

function ProposalItem({
  id,
  hasVoted,
  handleHasVotedCheck,
  proposalIdVotedFor,
  showEvent,
}) {
  const {
    state: { accounts, contract },
  } = useEth();

  const [data, setData] = useState();
  const [voteId, setVoteId] = useState(proposalIdVotedFor);

  useEffect(() => {
    if (contract) {
      retrievePropName(id);
      setVoteId(proposalIdVotedFor);
    }
  }, [contract, accounts, proposalIdVotedFor]);

  const retrievePropName = async (idProp) => {
    const proposal = await contract.methods
      .getOneProposal(idProp)
      .call({ from: accounts[0] });
    if (proposal) {
      //   setProposalList([proposal, ...proposalList]);
      setData({
        description: proposal.description,
        voteCount: proposal.voteCount,
      });
      //   console.log(id);
      //   const list = [...proposalList, { id: data.id }];
      //   console.log(list.length);
      //   setProposalList(list);
    }
  };

  const handleVote = async () => {
    const transac = await contract.methods
      .setVote(id)
      .send({ from: accounts[0] });
    handleHasVotedCheck(true);
    setVoteId(id);
    showEvent(
      "Vote register  : " +
        transac.events.Voted.returnValues.voter +
        " for prop id " +
        transac.events.Voted.returnValues.proposalId
    );
  };

  return (
    <div key={id} className="proposalItem-container">
      <h2>{data && data.description}</h2>
      <p>Number of vote : {data && data.voteCount}</p>
      {voteId == id && <p> You voted for this prop</p>}
      {voteId != id && (
        <button
          className="proposalItem-button"
          disabled={hasVoted}
          onClick={handleVote}
        >
          Vote
        </button>
      )}
    </div>
  );
}

export default ProposalItem;

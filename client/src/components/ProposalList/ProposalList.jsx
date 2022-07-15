import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import ProposalItem from "../ProposalItem/ProposalItem";

function ProposalList({ hasVoted, handleHasVotedCheck, proposalIdVotedFor }) {
  const {
    state: { contract, accounts },
  } = useEth();

  const [pastEvents, setPastEvents] = useState([]);
  let loading = false;

  useEffect(() => {
    console.log("render PropList");
    const fetchData = async () => {
      await getProposalList();
      loading = false;
    };

    if (contract && !loading) {
      fetchData();
    }
  }, [contract, accounts, proposalIdVotedFor]);

  const getProposalList = async () => {
    loading = true;
    let optionsPast = {
      filter: {
        value: [],
      },
      fromBlock: 0,
      toBlock: "latest",
    };

    await contract.getPastEvents(
      "ProposalRegistered",
      optionsPast,
      (error, events) => {
        console.log(events);
        setPastEvents(events);
      }
    );
  };

  return (
    <div>
      {pastEvents.map((event) => (
        <div key={event.returnValues.proposalId}>
          <ProposalItem
            id={event.returnValues.proposalId}
            hasVoted={hasVoted}
            handleHasVotedCheck={handleHasVotedCheck}
            proposalIdVotedFor={proposalIdVotedFor}
          ></ProposalItem>
        </div>
      ))}
    </div>
  );
}
export default ProposalList;

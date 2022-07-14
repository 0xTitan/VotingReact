import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import ProposalItem from "../ProposalItem/ProposalItem";

function ProposalList({ hasVoted, handleHasVotedCheck, proposalIdVotedFor }) {
  const {
    state: { contract },
  } = useEth();

  const [pastEvents, setPastEvents] = useState([]);
  let loading = false;

  useEffect(() => {
    console.log("render PropsList");
    console.log(loading);

    const fetchData = async () => {
      await getProposalList();
    };

    if (contract && !loading) {
      fetchData();
    }
  }, [contract]);

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
        // events.map(
        //   async (event) => await retrievePropName(event.returnValues.proposalId)
        // );
      }
    );
  };

  return (
    <div>
      {pastEvents.map((event) => (
        <div>
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

import React from "react";
import VoterRegistration from "../VoterRegistration/VoterRegistration";
import ProposalRegistration from "../ProposalRegistration/ProposalRegistration";
import ProposalList from "../ProposalList/ProposalList"
import VoteResult from "../VoteResult/VoteResult";
import VoterInfo from "../VoterInfo/VoterInfo";

function Home({
  isOwner,
  isRegister,
  currentWorflow,
  showEvent,
  hasVoted,
  handleHasVotedCheck,
  proposalIdVotedFor,
}) {
  return (
    <div>
      {isOwner && currentWorflow == 0 && (
        <VoterRegistration showEvent={showEvent} />
      )}

      {isRegister && currentWorflow == 1 && (
        <ProposalRegistration showEvent={showEvent} />
      )}

      {isRegister && currentWorflow == 3 && (
        <ProposalList
          hasVoted={hasVoted}
          handleHasVotedCheck={handleHasVotedCheck}
          proposalIdVotedFor={proposalIdVotedFor}
          showEvent={showEvent}
        />
      )}
      {currentWorflow == 5 && <VoteResult />}
      {currentWorflow == 5 && isRegister && <VoterInfo />}
      {currentWorflow == 0 && !isOwner && (
        <span className="instruction">
          {" "}
          Addresses are currently registered. Please come back later !
        </span>
      )}
      {currentWorflow > 0 && !isRegister && (
        <span className="instruction">
          {" "}
          You're are not registered to participate to this voting session.
        </span>
      )}
    </div>
  );
}

export default Home;

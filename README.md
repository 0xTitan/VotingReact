# Voting smart contract dapp

This dapp allow the smart owner to start a voting session.
He needs to manage the worflow by first registering voter address then advanced to next status until tally vote.
Registered voter(address) can submit proposal then vote for one.
When voting phase is over, the winner is determined

# DAPP link

Please visit : https://0xtitan.github.io/VotingReact/

# Smart contract address (Ropsten)

0x2cF00AADBA6028573E26329454Bc1B7e13EC77C9

# Loom link

# Generated SOLC documentation 

```json
{
   "author":"Owner : Alyra / Revision : 0xTitan.",
   "kind":"dev",
   "methods":{
      "addProposal(string)":{
         "details":"Create and store proposal struct in an array proposalsArray. Emit an event ProposalRegistered",
         "params":{
            "_desc":"proposal description."
         }
      },
      "addVoter(address)":{
         "details":"Create and store voter struct in an mapping state variable voters. Emit an event VoterRegistered",
         "params":{
            "_addr":"address."
         }
      },
      "endProposalsRegistering()":{
         "details":"Update workflowStatus state variable to ProposalsRegistrationEnded. Emit an event WorkflowStatusChange"
      },
      "endVotingSession()":{
         "details":"Update workflowStatus state variable to VotingSessionEnded. Emit an event WorkflowStatusChange"
      },
      "getOneProposal(uint256)":{
         "details":"return struct proposal",
         "params":{
            "_id":"proposal id."
         },
         "returns":{
            "_0":"proposal information"
         }
      },
      "getVoter(address)":{
         "details":"return struct Voter",
         "params":{
            "_addr":"address."
         },
         "returns":{
            "_0":"voter information"
         }
      },
      "owner()":{
         "details":"Returns the address of the current owner."
      },
      "renounceOwnership()":{
         "details":"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner."
      },
      "setVote(uint256)":{
         "details":"Increment vote count for the proposal id. Update has voted to true for the address call the function. Emit an event Voted",
         "params":{
            "_id":"proposal id."
         }
      },
      "startProposalsRegistering()":{
         "details":"Update workflowStatus state variable to ProposalsRegistrationStarted. Emit an event WorkflowStatusChange"
      },
      "startVotingSession()":{
         "details":"Update workflowStatus state variable to VotingSessionStarted. Emit an event WorkflowStatusChange"
      },
      "tallyVotes()":{
         "details":"Update workflowStatus state variable to VotesTalliedRegister winner proposal id in state variable winningProposalId. Emit an event WorkflowStatusChange"
      },
      "transferOwnership(address)":{
         "details":"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."
      }
   },
   "title":"Voting contract",
   "version":1
}
```


# IPFS smart contract documentation

Dev doc : https://ipfs.io/ipfs/QmTzzdeVcFZ51Sh8rnwAbSWM2rhet68JTvyVHQgTVRs8RT

import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./VoterRegistration.css";

function VoterRegistration() {
  const {
    state: { contract, accounts },
  } = useEth();
  const [voterAddressList, setVoterAddressList] = useState([
    { voterAddress: "", valid: 0 },
  ]);

  const handleAddVoter = () => {
    setVoterAddressList([...voterAddressList, { voterAddress: "", valid: 0 }]);
  };

  const handleRemoveVoter = (index) => {
    console.log("RemoveVoter");
    const listVoter = [...voterAddressList];
    console.log(index);
    console.log(listVoter);
    listVoter.splice(index, 1);
    setVoterAddressList(listVoter);
  };

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target;
    const listVoter = [...voterAddressList];
    listVoter[index][name] = value;
    console.log("adress length" + value.length);
    if (value.length === 42) {
      listVoter[index]["valid"] = 1;
      console.log("address valid");
    } else {
      listVoter[index]["valid"] = 0;
    }
    setVoterAddressList(listVoter);
  };

  const handleRegisterVoters = async () => {
    console.log(voterAddressList[0].voterAddress);
    const transact = await contract.methods
      .addVoter(voterAddressList[0].voterAddress)
      .send({ from: accounts[0] });
    console.log(transact);
    console.log(
      "Voter added  :" +
        transact.events.VoterRegistered.returnValues.voterAddress
    );
  };

  return (
      <div className="voterRegistration-main">
        <h3 htmlFor="adminSentence">
          Admin please proceed with voter address registration before moving to
          next phase
        </h3>
        {voterAddressList.map((currentVoter, index) => (
          <div className="voterRegistration-operation">
            <div className="voterRegistration-add">
              <div className="voterRegistration-input">
                <input
                  className="voterRegistration-inputTxt"
                  name="voterAddress"
                  type="text"
                  id="voterAddress"
                  value={currentVoter.voterAddress}
                  onChange={(e) => handleAddressChange(e, index)}
                ></input>

                {currentVoter.valid === 0 &&
                  currentVoter.voterAddress.length > 0 && (
                    <p className="voterRegistration-alert">!</p>
                  )}
                {voterAddressList.length > 1 && (
                  <button
                    type="button"
                    className="removeVoter-btn"
                    onClick={() => handleRemoveVoter(index)}
                  >
                    <span>Remove voter</span>
                  </button>
                )}
              </div>
              {voterAddressList.length - 1 === index &&
                voterAddressList.length < 100 && (
                  <button
                    type="button"
                    className="addVoter-btn"
                    onClick={handleAddVoter}
                  >
                    <span>Add voter</span>
                  </button>
                )}
            </div>
          </div>
        ))}
        {voterAddressList.length > 1 && (
          <button
            type="button"
            className="registerVoter-btn"
            onClick={handleRegisterVoters}
          >
            <span>Register</span>
          </button>
        )}
      </div>
  );
}

export default VoterRegistration;
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

  const handleRegisterVoters = async (index) => {
    console.log(voterAddressList[index].voterAddress);
    const transact = await contract.methods
      .addVoter(voterAddressList[index].voterAddress)
      .send({ from: accounts[0] });
    console.log(transact);
    console.log(
      "Voter added  :" +
        transact.events.VoterRegistered.returnValues.voterAddress
    );
  };

  return (
    <div className="voterRegistration-main">
      <span className="admin-instruction">
        Admin please proceed with voter address registration before moving to
        next phase
      </span>
      {voterAddressList.map((currentVoter, index) => (
        <div key={index} className="voterRegistration-operation">
          <div className="voterRegistration-add">
            <div className="voterRegistration-input">
              <input
                className="voterRegistration-inputTxt"
                name="voterAddress"
                type="text"
                id="voterAddress"
                placeholder="Enter address"
                value={currentVoter.voterAddress}
                onChange={(e) => handleAddressChange(e, index)}
              ></input>
              {currentVoter.valid === 0 &&
                currentVoter.voterAddress.length > 0 && (
                  <div className="voterRegistration-alert">
                    <p>!</p>
                  </div>
                )}
              {currentVoter.voterAddress.length == 42 && (
                <button
                  type="button"
                  className="registerVoter-button"
                  onClick={() => handleRegisterVoters(index)}
                >
                  <span>Register</span>
                </button>
              )}
            </div>
            {voterAddressList.length - 1 === index &&
              voterAddressList.length < 100 && (
                <button
                  type="button"
                  className="addVoter-button"
                  onClick={handleAddVoter}
                >
                  <span>Add voter</span>
                </button>
              )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default VoterRegistration;

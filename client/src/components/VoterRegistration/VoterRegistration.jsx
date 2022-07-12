import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./VoterRegistration.css";

function VoterRegistration() {
  const {
    state: { contract, accounts },
  } = useEth();
  const [voterAddressList, setVoterAddressList] = useState([
    { voterAddress: "" },
  ]);

  const handleAddVoter = () => {
    setVoterAddressList([...voterAddressList, { voterAddress: "" }]);
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
    setVoterAddressList(listVoter);
  };


  return (
    <form>
      <div className="voterRegistration-main">
        <h3 htmlFor="adminSentence">
          Admin please proceed with voter address registration before moving to
          next phase
        </h3>
        {voterAddressList.map((currentVoter, index) => (
          <div className="voterRegistration-operation">
            <div className="voterRegistration-add">
              <input
                name="voterAddress"
                type="text"
                id="voterAddress"
                value={currentVoter.voterAddress}
                onChange={(e) => handleAddressChange(e, index)}
              ></input>
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
            <div>
              {voterAddressList.length > 1 && (
                <button
                  type="button"
                  className="removeVoter-btn"
                  onClick={() =>handleRemoveVoter(index)}
                >
                  <span>Remove voter</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}

export default VoterRegistration;

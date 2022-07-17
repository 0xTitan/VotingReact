import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { useNavigate } from "react-router-dom";
import "./TransferOwnerShip.css";

function TransferOnwerShip({ handleOwnerCheck }) {
  const {
    state: { contract, accounts },
  } = useEth();

  const [newOwner, setNewOwner] = useState("");
  const [valid, setValid] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setNewOwner("");
    setValid(0);
  }, [accounts]);

  const handleOwnerChange = (e) => {
    const { name, value } = e.target;
    if (value.length === 42) {
      setValid(1);
    } else {
      setValid(0);
    }
    setNewOwner(value);
  };

  const handleOwnerRegistration = async () => {
    try {
      const transact = await contract.methods
        .transferOwnership(newOwner)
        .send({ from: accounts[0] });
      handleOwnerCheck(false);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="ownerRegistration-main">
      <span className="admin-instruction">
        Admin please proceed with new owner registration
      </span>
      <div className="ownerRegistration-input">
        {newOwner.length > 0 && valid == 0 && (
          <div className="ownerRegistration-alert">
            <p>!</p>
          </div>
        )}
        <input
          className="ownerRegistration-inputTxt"
          name="ownerAddress"
          type="text"
          id="ownerAddress"
          placeholder="Enter address"
          onChange={(e) => handleOwnerChange(e)}
        ></input>

        <button
          type="button"
          className="registerOwner-button"
          onClick={handleOwnerRegistration}
          disabled={!valid}
        >
          <span>Register new onwer</span>
        </button>
      </div>
    </div>
  );
}

export default TransferOnwerShip;

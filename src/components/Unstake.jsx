import React, { useState } from "react";
import useUnstake from "../hooks/useUnstake"; 

const Unstake = () => {
  const [poolID, setPoolID] = useState(""); 
  const [amount, setAmount] = useState(""); 

  const unstake = useUnstake();

  const handleUnstake = async () => {
    if (!poolID) {
      alert("Please enter a Pool ID");
      return;
    }
    await unstake(poolID);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePoolIDChange = (e) => {
    setPoolID(e.target.value);
  };

  return (
    <div className="w-80 h-80 bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Unstake</h1>
        <input
          value={poolID}
          onChange={handlePoolIDChange}
          placeholder="Enter Pool ID"
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleUnstake}
          className="text-white bg-blue-600 py-1 px-4 rounded-md"
        >
          Unstake
        </button>
      </div>
      <div className="flex items-center mb-4">
        <p>You will receive</p>
        <p>MONIE</p>
      </div>
      <div className="flex items-center">
        <p>Staking APR</p>
        <p>0.5% Daily</p>
      </div>
    </div>
  );
};

export default Unstake;

import React, { useState } from "react";

const Unstake = () => {
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="w-80 h-80 bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Unstake</h1>
        <input
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter Voter's Address"
          className="w-full p-2 border rounded-md"
        />
        <button className="text-white bg-blue-600 py-1 px-4 rounded-md">
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

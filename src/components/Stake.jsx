import React, { useState } from "react";
import useStake from "../hooks/useStake";

const Stake = () => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const stake = useStake(); 

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleStake = async () => {
    setLoading(true);
    await stake(amount); 
    setLoading(false);
  };

  return (
    <div className="w-80 h-80 bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Stake</h1>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter Amount to Stake"
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleStake}
          disabled={loading} 
          className={`text-white bg-blue-600 py-1 px-4 rounded-md ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Staking..." : "Stake"}
        </button>
      </div>
      <div className="flex items-center mb-4">
      </div>
      <div className="flex items-center">
        <p>Staking APR</p>
        <p>0.5% Daily</p>
      </div>
    </div>
  );
};

export default Stake;

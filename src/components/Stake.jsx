import React, { useState } from "react";
import useStake from "../hooks/useStake";

const Stake = () => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const stake = useStake(); // Initialize the useStake hook

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleStake = async () => {
    setLoading(true);
    await stake(amount); // Call the stake function with the entered amount
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
          disabled={loading} // Disable the button while loading
          className={`text-white bg-blue-600 py-1 px-4 rounded-md ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Staking..." : "Stake"}{" "}
          {/* Display appropriate text based on loading state */}
        </button>
      </div>
      {/* You will need to replace 'MONIE' with the appropriate token name */}
      <div className="flex items-center mb-4">
        <p>You will receive</p>
        <p>MONIE</p> {/* Replace 'MONIE' with the appropriate token name */}
      </div>
      {/* You can replace '0.5% Daily' with the actual staking APR */}
      <div className="flex items-center">
        <p>Staking APR</p>
        <p>0.5% Daily</p>{" "}
        {/* Replace '0.5% Daily' with the actual staking APR */}
      </div>
    </div>
  );
};

export default Stake;

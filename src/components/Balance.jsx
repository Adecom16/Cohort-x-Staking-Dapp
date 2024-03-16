import { useState } from "react";
import useStakeBalance from "../hooks/useStakeBalance";

const StakeBalance = ({ poolId }) => {
  const stakeBalance = useStakeBalance(poolId);

  return (
    <div className="mt-5 mb-5">
      <div className="w-80 h-80 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h1 className="text-xl font-bold">Stake Balance</h1>
        </div>
        <div className="mb-4">
          {/* <p>Pool ID: {poolId}</p> */}
          <p>Stake Balance: {stakeBalance}</p>
        </div>
      </div>
    </div>
  );
};

export default StakeBalance;

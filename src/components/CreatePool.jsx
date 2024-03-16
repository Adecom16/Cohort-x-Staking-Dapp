import { useState } from "react";
import useCreatePool from "../hooks/useCreatePool";
import usePools from "../hooks/UsePools";

const CreatePool = () => {
  const [rate, setRate] = useState(0);
  const [poolId, setPoolId] = useState(0);

  const handleCreatePool = useCreatePool(rate);
  const handleUsePool = usePools();

  const handleRateChange = (e) => {
    setRate(e.target.value);
  };

  const handleCreatePoolClick = () => {
    handleCreatePool();
  };

  const handleUsePoolClick = () => {
    handleUsePool(setPoolId());
  };

  return (
    <div className="mt-5 mb-5">
      <div className="w-80 h-80 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h1 className="text-xl font-bold">Create Pool</h1>
        </div>
        <div className="mb-4">
          <label className="font-bold" htmlFor="stake">
            Stake
          </label>
          <input
            id="stake"
            type="text"
            value={rate}
            onChange={handleRateChange}
            placeholder="Enter Voter's Address"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <button
            className="text-white bg-blue-600 py-2 px-4 rounded-md mr-2"
            onClick={handleCreatePoolClick}
          >
            Create Pool
          </button>
          <button
            className="text-white bg-blue-600 py-2 px-4 rounded-md"
            onClick={handleUsePoolClick}
          >
            Get Pools
          </button>
        </div>
        <div className="mb-4 font-bold">Total Staked Money</div>
        <div className="flex items-center justify-between">
          <div className="flex">
            <p>Receive's APR {poolId}</p>

            <p> </p>
          </div>
          <p>No. of Stakers</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePool;

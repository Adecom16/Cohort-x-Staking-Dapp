import { useCallback } from "react";
import { ethers } from "ethers";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import contractAbi from "../constants/ABIs/contractAbi.json";
import { toast } from "react-toastify";

const useUnstake = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (poolID) => {
      if (!poolID) {
        toast.error("Invalid Pool ID");
        return;
      }

      if (!isSupportedChain(chainId)) {
        toast.error("Wrong Network");
        return;
      }

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const stakingContract = new ethers.Contract(
        import.meta.env.VITE_staking_contract_address,
        contractAbi,
        signer
      );

      try {
        const unstakeTx = await stakingContract.unstake(poolID);
        const receipt = await unstakeTx.wait();

        if (receipt.status) {
          toast.success("Unstake successful");
          return;
        }

        toast.error("Unstake failed");
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while unstaking");
      }
    },
    [chainId, walletProvider]
  );
};

export default useUnstake;

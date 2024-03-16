import { useCallback } from "react";
import { ethers } from "ethers";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import contractAbi from "../constants/ABIs/contractAbi.json";
import tokenAbi from "../constants/ABIs/tokenAbi.json";
import { toast } from "react-toastify";

const useStake = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (amount) => {
      if (!amount) {
       
        toast.error("Please enter a valid amount to stake");
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

      const rewardTokenContract = new ethers.Contract(
        import.meta.env.VITE_reward_token_contract_address,
        tokenAbi,
        signer
      );

      const value = ethers.parseUnits(amount.toString(), 18); 

      try {
        const approve = await rewardTokenContract.approve(
          import.meta.env.VITE_staking_contract_address,
          value
        );

        const approveReceipt = await approve.wait();

        if (approveReceipt.status) {
          const createPool = await stakingContract.createPool(value);
          const receipt = await createPool.wait();

          if (receipt.status) {
            toast.success("Staking successful");
            return;
          }

          toast.error("Staking failed");
        } else {
          toast.error("Approval failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while staking");
      }
    },
    [chainId, walletProvider]
  );
};

export default useStake;

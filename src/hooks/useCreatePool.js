import { ethers } from "ethers";
import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import contractAbi from "../constants/ABIs/contractAbi.json";
import tokenAbi from "../constants/ABIs/tokenAbi.json";
import { toast } from "react-toastify";

const useCreatePool = (rate) => {
  console.log("Is it working :", rate);
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return toast.error("Wrong Network");;
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    console.log(signer, readWriteProvider);
    console.log(
      import.meta.env.VITE_staking_contract_address,
      readWriteProvider
    );

    const stakingContract = new ethers.Contract(
      import.meta.env.VITE_staking_contract_address,
      contractAbi,
      signer
    );
    console.log("staked");
    toast.success("Staked");

  

    const rewardTokenContract = new ethers.Contract(
      import.meta.env.VITE_reward_token_contract_address,
      tokenAbi,
      signer
    );

    const value = ethers.parseUnits("100", 18);

    try {
      console.log("trying to approve", rate);
      const approve = await rewardTokenContract.approve(
        import.meta.env.VITE_staking_contract_address,
        value
      );

      const approveReceipt = await approve.wait();

      console.log("trying to stake", approveReceipt);
      if (approveReceipt.status) {
        const createPool = await stakingContract.createPool(rate);
        console.log("staked");

        const receipt = await createPool.wait();
        console.log("trying 3", receipt);

        if (receipt.status) {
          toast.success("Pool Created Successfully");
          return;
        }

        toast.error("Pool Creation Failed");
      } else {
        toast.error("Approval Failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
      return err;
    }
  }, [rate, chainId, walletProvider]);
};
export default useCreatePool;

import { ethers } from "ethers";
import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import contractAbi from "../constants/ABIs/contractAbi.json";
import { toast } from "react-toastify";

const usePools = () => {
  console.log("Working");
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return toast.error("Wrong Network");
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

    try {
      const createPool = await stakingContract.id();
      toast.success(`Pool Created ${Number(createPool)}`);

      return console.log("Pool gotten", Number(createPool));
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
      return err;
    }
  }, [chainId, walletProvider]);
};
export default usePools;

import { useEffect, useState } from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import contractAbi from "../constants/ABIs/contractAbi.json";
import { ethers } from "ethers";

const useStakeBalance = (poolId) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [stakeBalance, setStakeBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!isSupportedChain(chainId)) {
        console.error("Wrong Network");
        return;
      }

      const readWriteProvider = getProvider(walletProvider);
      const signer = readWriteProvider.getSigner();

      const contract = new ethers.Contract(
        import.meta.env.VITE_staking_contract_address,
        contractAbi,
        signer
      );

      try {
        const userStakeBalance = await contract.getUserStakeBalance(
          poolId,
          signer
        );
        const balance = Number(userStakeBalance);
        setStakeBalance(balance);
      } catch (error) {
        console.error("Error fetching stake balance:", error);
      }
    };

    fetchData();
  }, [chainId, poolId, walletProvider]);

  console.log("Reached this point");

  return stakeBalance;
};

export default useStakeBalance;

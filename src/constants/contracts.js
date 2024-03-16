import { ethers } from "ethers";
import Abi from "./abi.json";

export const geStakingContract = (providerOrSigner) =>
  new ethers.Contract(
    import.meta.env.VITE_staking_contract_address,
    Abi,
    providerOrSigner
  );

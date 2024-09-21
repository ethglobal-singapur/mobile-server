import { ethers } from "ethers";

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import Contract from "../../artifacts/contracts/Passport-Contract.sol/Passport.json";

const getContract = () => {
  const address = readFileSync(resolve(process.cwd(), "address.txt"), "utf-8");
  const url = "https://testnet.hashio.io/api";
  const provider = new ethers.JsonRpcProvider(url);

  const privateKey =
    "1e5b7c4e6b3d8213d5720543c3f233d4fe1dd9409f40f983b2e5bc3eb9f3a236";
  const signer = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(address, Contract.abi, signer);
  return contract;
};

export default getContract;

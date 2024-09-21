import { ethers } from "hardhat";
import runLog from "../src/utils/getContract";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);
  const deployment = await ethers.deployContract("Passport");
  const address = await deployment.getAddress();
  return address;
}

main()
  .then((address) => {
    writeFileSync(resolve(process.cwd(), "address.txt"), address);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: "0.8.27",
  networks: {
    testnet: {
      url: "https://testnet.hashio.io/api",
      accounts: [
        "1e5b7c4e6b3d8213d5720543c3f233d4fe1dd9409f40f983b2e5bc3eb9f3a236",
      ],
      gas: 500000, // Example gas limit
    },
  },
};

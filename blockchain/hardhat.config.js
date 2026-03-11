import { defineConfig } from "hardhat/config";
import hardhatViem from "@nomicfoundation/hardhat-viem";

export default defineConfig({
  plugins: [hardhatViem],

  solidity: {
    version: "0.8.28",
  },

  networks: {
    sepolia: {
      type: "http",
      url: "https://sepolia.infura.io/v3/c282b4cf6f7a4cdb94e55032a9d900dc",
      accounts: ["037b39986bf1fb90fc84c1176db372767cf0862d103459b81f8b8e8c18726d7f"]
    }
  }
});
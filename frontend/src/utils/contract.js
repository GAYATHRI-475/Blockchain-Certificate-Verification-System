// import { ethers } from "ethers";

// const contractAddress = "0xcdc2a4b369746518fbcc9faf4f586446a41806f9";

// const contractABI = [
//   "function issueCertificate(string certId,string certificateHash,string ipfsHash)"
// ];

// export const getContract = async () => {
//   if (!window.ethereum) {
//     alert("MetaMask not installed");
//     return;
//   }

//   // Connect to MetaMask
//   const provider = new ethers.BrowserProvider(window.ethereum);
//   const signer = await provider.getSigner();

//   const contract = new ethers.Contract(contractAddress, contractABI, signer);
//   return contract;
// };

// frontend/src/utils/contract.js
import { ethers } from "ethers";

// Use your frontend .env variable for contract address
const contractAddress = "0x9148adf9d6a4391ac2d56888644c59c4b13a5435";

const contractABI = [
  "function issueCertificate(string certId,string certificateHash,string ipfsHash)"
];

export const getContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }

  // Request wallet connection if not connected
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Connect to MetaMask
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Create contract instance with signer → MetaMask popup will trigger on write
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
};
import { ethers } from "ethers";

const contractAddress = "0xcdc2a4b369746518fbcc9faf4f586446a41806f9";

const contractABI = [
  "function issueCertificate(string certId,string studentName,string course,string ipfsHash)"
];

export const getContract = async () => {

  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return contract;
};
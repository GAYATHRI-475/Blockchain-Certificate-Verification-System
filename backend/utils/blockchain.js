import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/*
-------------------------------------
FIX ES MODULE PATH
-------------------------------------
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
-------------------------------------
LOAD CONTRACT ABI
-------------------------------------
*/
const artifactPath = path.resolve(
  __dirname,
  "../../blockchain/artifacts/contracts/Certificate.sol/Certificate.json"
);

const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

/*
-------------------------------------
ENV VARIABLES
-------------------------------------
*/
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const RPC_URL = process.env.RPC_URL;

/*
-------------------------------------
ACCOUNT FROM PRIVATE KEY
-------------------------------------
*/
const account = privateKeyToAccount(PRIVATE_KEY);

/*
-------------------------------------
SEPOLIA CHAIN CONFIG
-------------------------------------
*/
const sepoliaChain = {
  id: 11155111,
  name: "Sepolia",
  network: "sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [RPC_URL],
    },
  },
};

/*
-------------------------------------
READ CLIENT
-------------------------------------
*/
const publicClient = createPublicClient({
  chain: sepoliaChain,
  transport: http(RPC_URL),
});

/*
-------------------------------------
WRITE CLIENT
-------------------------------------
*/
const walletClient = createWalletClient({
  account,
  chain: sepoliaChain,
  transport: http(RPC_URL),
});

/*
-------------------------------------
VERIFY CERTIFICATE
-------------------------------------
*/
export async function verifyCertificate(certificateHash) {
  try {
    const result = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: contractArtifact.abi,
      functionName: "verifyCertificate",
      args: [certificateHash],
    });

    // result: [ipfsHash, issuerWallet, issuedTimestamp, exists]
    const [ipfsHash, issuerWallet, issuedTimestamp, exists] = result;

    return {
      ipfsHash,
      issuerWallet,
      issuedTimestamp: Number(issuedTimestamp),
      exists,
    };

  } catch (error) {
    console.error("Blockchain verify error:", error);
    throw error;
  }
}

/*
-------------------------------------
ISSUE CERTIFICATE
-------------------------------------
*/
export async function issueCertificate(
  certId,
  certificateHash,
  ipfsHash
) {
  try {

    const txHash = await walletClient.writeContract({
      address: CONTRACT_ADDRESS,
      abi: contractArtifact.abi,
      functionName: "issueCertificate",
      args: [certId, certificateHash, ipfsHash],
    });

    return txHash;

  } catch (error) {

    console.error("Blockchain issue error:", error);
    throw error;

  }
}
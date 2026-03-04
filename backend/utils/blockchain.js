import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { createPublicClient, createWalletClient, http } from "viem";
import { localhost } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES module path fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load ABI
const artifactPath = path.resolve(
  __dirname,
  "../../blockchain/artifacts/contracts/Certificate.sol/Certificate.json"
);

const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

// ✅ Load from .env
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const RPC_URL = process.env.RPC_URL;

console.log("Loaded PRIVATE_KEY:", process.env.PRIVATE_KEY);

// ✅ Create account from private key
const account = privateKeyToAccount(PRIVATE_KEY);

const hardhatChain = {
  id: 31337,
  name: "Hardhat",
  network: "hardhat",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [RPC_URL],
    },
  },
};

// Read client
const publicClient = createPublicClient({
  chain: hardhatChain,
  transport: http(RPC_URL),
});

// Write client
const walletClient = createWalletClient({
  account,
  chain: hardhatChain,
  transport: http(RPC_URL),
});

export async function verifyCertificate(certId) {
  return await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: contractArtifact.abi,
    functionName: "verifyCertificate",
    args: [certId],
  });
}

export async function issueCertificate(certId, studentName, course, ipfsHash) {
  const hash = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: contractArtifact.abi,
    functionName: "issueCertificate",
    args: [certId, studentName, course, ipfsHash],
  });

  return hash;
}

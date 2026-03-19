import { createPublicClient, http, decodeEventLog } from "viem";
import { sepolia } from "viem/chains";
import Certificate from "../models/Certificate.js";
import fs from "fs";

const contractABI = JSON.parse(
  fs.readFileSync(
    new URL("../contracts/Certificate.json", import.meta.url)
  )
);

const client = createPublicClient({
  chain: sepolia,
  transport: http(process.env.RPC_URL),
});

const contractAddress = process.env.CONTRACT_ADDRESS;

export const startCertificateListener = () => {
  console.log("👂 Listening for CertificateIssued events...");

  client.watchEvent({
    address: contractAddress,

    onLogs: async (logs) => {
      for (const log of logs) {
        try {
          const decoded = decodeEventLog({
            abi: contractABI.abi,
            data: log.data,
            topics: log.topics,
          });

          if (decoded.eventName !== "CertificateIssued") continue;

          const { certId } = decoded.args;

          console.log("📢 Certificate Confirmed:", certId);

          // ✅ UPDATE STATUS → ACTIVE
          await Certificate.updateOne(
            { certId },
            { status: "active" }
          );

          console.log("✅ Status updated to ACTIVE");

        } catch (err) {
          console.error("Listener error:", err.message);
        }
      }
    },
  });
};
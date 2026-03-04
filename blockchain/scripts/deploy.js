import { network } from "hardhat";

async function main() {
  const { viem } = await network.connect();

  const [walletClient] = await viem.getWalletClients();

  const contract = await viem.deployContract("Certificate", [], {
    walletClient,
  });

  console.log("Certificate deployed at:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { Wallet } from "zksync-ethers";
import { deployContract,deployUpgradeContract,UpgradeContract } from "./utils";
import { ethers } from "ethers";
import { Deployer } from "@matterlabs/hardhat-zksync";


// An example of a basic deploy script
// It will deploy a CrowdfundingCampaign contract to selected network
// `parseEther` converts ether to wei, and `.toString()` ensures serialization compatibility.
export default async function () {
  const contractArtifactName = "NFT";
  const constructorArguments = ["ZK_QUEST", "ZKQ", "baseUri"];
  await deployContract(contractArtifactName, constructorArguments);

  // const contractArtifactName = "ZkNFT";
  // const constructorArguments = ["0xfdFd2304af41bAf61092d511BfD4caa6cAEC8D86"];
  // await deployContract(contractArtifactName, constructorArguments);



  // const contractArtifactName = "ERC20Upgrade";
  // const constructorArguments = [];
  // await UpgradeContract(contractArtifactName, constructorArguments);
}


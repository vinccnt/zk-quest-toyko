import { deployContract } from "./utils";
import { ethers } from "ethers";

// An example of a basic deploy script
// It will deploy a CrowdfundingCampaign contract to selected network
// `parseEther` converts ether to wei, and `.toString()` ensures serialization compatibility.
export default async function () {
  // const contractArtifactName = "CrowdfundingCampaign";
  // const constructorArguments = [ethers.parseEther('.02').toString()];
  // await deployContract(contractArtifactName, constructorArguments);

  const contractArtifactName = "MyToken";
  const constructorArguments = ["0xfdFd2304af41bAf61092d511BfD4caa6cAEC8D86"];
  await deployContract(contractArtifactName, constructorArguments);
}

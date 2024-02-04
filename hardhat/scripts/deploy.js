const hre = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  // URL from where we can extract the metadata for a EthereumPlanet
  const metadataURL = "ipfs://QmVr3BHAdTJ9Bm48w1iGUUtYaL45PikNnBR1MpGdBcyAFE";
  /*
  DeployContract in ethers.js is an abstraction used to deploy new smart contracts,
  so EthereumPlanetContract here is a factory for instances of our EthereumPlanet contract.
  */
  // here we deploy the contract
  const EthereumPlanetContract = await hre.ethers.deployContract(
    "EthereumPlanet",
    [metadataURL]
  );

  await EthereumPlanetContract.waitForDeployment();

  // print the address of the deployed contract
  console.log(
    "EthereumPlanet Contract Address:",
    EthereumPlanetContract.target
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

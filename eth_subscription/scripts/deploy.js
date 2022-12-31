const hre = require("hardhat");

async function main(){
    const Subscription = await hre.ethers.getContractFactory("Subscription");
    const subscription = await Subscription.deploy();
    await subscription.deployed();
  //checking the address of contract
    console.log("address of subscription contract",subscription.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
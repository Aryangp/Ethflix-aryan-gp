
const hre = require("hardhat");
const codeAddress= 0x5FbDB2315678afecb367f032d93F642f64180aa3;


// Returns the Ether balance of a given address.
async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx ++;
  }
}

async function main() {
 //get the address of owner and buyer
  const [owner, buyer1,buyer2] = await hre.ethers.getSigners();
  const Subscription = await hre.ethers.getContractFactory("Subscription");
  const subscription = await Subscription.connect(owner).deploy();
  await subscription.deployed();
//checking the address of contract
  console.log("address of subscription contract",subscription.address);

  // Check balances before the coffee purchase.
  const addresses = [owner.address, buyer1.address, subscription.address];
  console.log("== start ==");
  await printBalances(addresses);

  //transaction 
  console.log("user purchased a 2 month subscription")
  const pay = {value: hre.ethers.utils.parseEther('0.005')};
  const tx= await subscription.connect(buyer1).paySubscription(1,pay);
  await tx.wait();
  console.log(tx); 

  console.log("== After ==");
  await printBalances(addresses);

  console.log("==user paymemt detail==");
  const paymentLastMoment=await subscription.connect(owner).lastPaymentOfUser(buyer1.address);
  console.log("payment of user buyer1 last date: ",paymentLastMoment);
  const paymentExpirationDate=await subscription.connect(owner).checkExpirationDate(buyer1.address);
  console.log("payment of user buyer1 expire date: ",paymentExpirationDate);

  console.log("==transfer to owner==")
  await subscription.connect(owner).transferToOwner();
  await printBalances(addresses);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

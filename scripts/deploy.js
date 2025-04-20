const hre = require("hardhat");

async function main() {
  // Deploy Bookstore contract
  const Bookstore = await hre.ethers.getContractFactory("Bookstore");
  const bookstore = await Bookstore.deploy();
  await bookstore.waitForDeployment();
  console.log("Bookstore deployed to:", await bookstore.getAddress());

  // Deploy SpecialEditionNFT contract
  const SpecialEditionNFT = await hre.ethers.getContractFactory("SpecialEditionNFT");
  const specialEditionNFT = await SpecialEditionNFT.deploy();
  await specialEditionNFT.waitForDeployment();
  console.log("SpecialEditionNFT deployed to:", await specialEditionNFT.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

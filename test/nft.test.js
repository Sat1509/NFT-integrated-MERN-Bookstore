const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SpecialEditionNFT", function () {
  let specialEditionNFT; // Contract instance
  let owner, user; // Signers

  before(async function () {
    // Get signers
    [owner, user] = await ethers.getSigners();

    // Deploy the contract dynamically
    const SpecialEditionNFT = await ethers.getContractFactory("SpecialEditionNFT");
    specialEditionNFT = await SpecialEditionNFT.deploy();
    await specialEditionNFT.waitForDeployment(); // Wait for contract to be fully deployed
  });

  it("Should mint an NFT successfully", async function () {
    const tokenURI = "ipfs://example-token-uri";
    const bookTitle = "Test Book";
    const author = "John Doe";

    // Mint NFT
    const tx = await specialEditionNFT.mintNFT(user.address, tokenURI, bookTitle, author);
    const receipt = await tx.wait(); // Wait for transaction to be mined

    // Assert that the NFTMinted event was emitted
    await expect(tx)
      .to.emit(specialEditionNFT, "NFTMinted")
      .withArgs(1, user.address, bookTitle, author); // First token ID should be 1

    // Fetch token URI and Book Title from contract
    const mintedTokenURI = await specialEditionNFT.tokenURI(1);
    const mintedBookTitle = (await specialEditionNFT.getBookDetails(1)).title;

    // Assertions to verify correctness
    expect(mintedTokenURI).to.equal(tokenURI);
    expect(mintedBookTitle).to.equal(bookTitle);
  });
});

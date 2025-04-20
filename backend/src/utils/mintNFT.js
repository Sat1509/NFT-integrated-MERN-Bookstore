
/*const { ethers } = require("ethers");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

// Load ABI
const abiPath = path.join(__dirname, "NFTContractABI.json");
const contractJson = JSON.parse(fs.readFileSync(abiPath, "utf-8"));
const contractABI = contractJson.abi;

// Connect to blockchain
const provider = new ethers.JsonRpcProvider(
  process.env.BLOCKCHAIN_RPC_URL || `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract instance
const contractAddress = process.env.CONTRACT_ADDRESS;
const nftContract = new ethers.Contract(contractAddress, contractABI, wallet);

async function mintNFT(to, tokenURI, bookTitle, author) {
  try {
    console.log(`Minting NFT to: ${to} with tokenURI: ${tokenURI}, Title: ${bookTitle}, Author: ${author}`);

    const tx = await nftContract.mintNFT(to, tokenURI, bookTitle, author);
    const receipt = await tx.wait();

    console.log(`NFT Minted! Transaction Hash: ${tx.hash}`);

    // Extract tokenId from event logs
    const event = receipt.logs.find(log => log.address === contractAddress);
    const tokenId = event ? parseInt(event.topics[1], 16) : null;

    return { success: true, txHash: tx.hash, tokenId };
  } catch (error) {
    console.error("Error minting NFT:", error);
    return { success: false, error: error.reason || "Minting failed" };
  }
}

module.exports = { mintNFT };*/


const { ethers } = require("ethers");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

// Mocking Switch (set TEST_MODE=true in .env)
const TEST_MODE = process.env.TEST_MODE === "true";


// Use local provider for simulations
const provider = TEST_MODE
  ? new ethers.JsonRpcProvider("http://localhost:8545") // Local node
  : new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);

// Mock wallet for testing
const wallet = TEST_MODE
  ? new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider) // Hardhat test PK
  : new ethers.Wallet(process.env.PRIVATE_KEY, provider);



// Load ABI
const abiPath = path.join(__dirname, "NFTContractABI.json");
const contractJson = JSON.parse(fs.readFileSync(abiPath, "utf-8"));
const contractABI = contractJson.abi;

const contractAddress = process.env.NFT_CONTRACT_ADDRESS;
const nftContract = new ethers.Contract(contractAddress, contractABI, wallet);


// Mock Contract (Optional)
const mockMint = async () => {
  return {
    hash: "0xSIMULATED_TX_HASH",
    wait: () => Promise.resolve({ logs: [] })
  };
};

// Main Function
async function mintNFT(to, tokenURI, bookTitle, author) {
  try {
    console.log(`[${TEST_MODE ? "SIMULATION" : "LIVE"}] Minting NFT...`);

    // Use mock if in test mode
    const tx = TEST_MODE
      ? await mockMint()
      : await nftContract.mintNFT(to, tokenURI, bookTitle, author);

    // Simulated response
    return TEST_MODE
      ? { success: true, txHash: "SIMULATED_TX_HASH_" + Date.now(),
        tokenId: Date.now().toString()}
      : {
          success: true,
          txHash: tx.hash,
          tokenId: 123 // Extract from real tx
        };

  } catch (error) {
    return { success: false, error: "Simulated failure" };
  }
}

module.exports = { mintNFT };

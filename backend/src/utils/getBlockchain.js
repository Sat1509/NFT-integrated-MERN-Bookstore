const { ethers } = require("ethers");
const contractABI = require("./NFTContractABI.json").abi; // Ensure this file exists and is correctly formatted
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const contractAddress = process.env.NFT_CONTRACT_ADDRESS;

async function getBlockchain() {
  try {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);
    return contract;
  } catch (error) {
    console.error("Error connecting to blockchain:", error);
    return null;
  }
}

module.exports = getBlockchain;


// Assuming you have a function to get the blockchain provider




async function getTokenIdFromTx(txHash) {
  try {
    const txReceipt = await provider.getTransactionReceipt(txHash);
    const tokenId = parseTxReceiptForTokenId(txReceipt);
    return tokenId;
  } catch (error) {
    console.error("Error fetching tokenId from tx:", error);
    throw error;
  }
}

function parseTxReceiptForTokenId(txReceipt) {
  const iface = new ethers.Interface([
    "event NFTMinted(uint256 indexed tokenId, address indexed owner, string title, string author)"
  ]);

  for (const log of txReceipt.logs) {
    try {
      const parsedLog = iface.parseLog(log);
      if (parsedLog.name === "NFTMinted") {
        return parsedLog.args.tokenId.toString(); // Return as string or number
      }
    } catch {
      // Skip non-matching logs
    }
  }

  throw new Error("NFTMinted event not found in transaction logs");
}




module.exports = { getBlockchain, getTokenIdFromTx };




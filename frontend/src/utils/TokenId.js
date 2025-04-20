import { ethers } from "ethers";

// This should already be defined
const provider = new ethers.BrowserProvider(window.ethereum);

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

export default getTokenIdFromTx;

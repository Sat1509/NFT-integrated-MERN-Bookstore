import { ethers } from "ethers";
import specialEditionABI from "../constants/SpecialEditionABI";


const CONTRACT_ADDRESS = "0xB5f2EC634c0EC3CaD8D27D4d59709406E7220d3A"; // Update if needed

const getBlockchain = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask to use this feature.");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum); // Updated to BrowserProvider
  const accounts = await provider.send("eth_requestAccounts", []); // Request access to accounts
  const signer = await provider.getSigner(); // Updated: getSigner now returns a promise

  const contract = new ethers.Contract(CONTRACT_ADDRESS, specialEditionABI, signer);
  return contract;
};

// Function to mint special edition NFT
export const mintNFT = async (recipient, tokenURI, bookTitle, author) => {
  const contract = await getBlockchain();
  if (!contract) return;

  try {
    const tx = await contract.mintNFT(recipient, tokenURI, bookTitle, author);
    await tx.wait();

    // Return only txHash, ignore tokenId
    return { 
      txHash: tx.hash,
      tokenId: null // or omit this field
    };
  } catch (error) {
    console.error("Error minting special edition NFT:", error);
    throw error;
  }
};

export default getBlockchain;

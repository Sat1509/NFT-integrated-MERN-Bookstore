import React, { createContext, useState, useEffect, useContext } from "react";
import getBlockchain from "../utils/connectContract";

const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [bookCount, setBookCount] = useState(0);

  useEffect(() => {
    const loadContract = async () => {
      const contractInstance = await getBlockchain();
      if (contractInstance) {
        setContract(contractInstance);
      }
    };
    loadContract();
  }, []);

  const fetchBookCount = async () => {
    if (!contract) return;
    const count = await contract.bookCount();
    setBookCount(parseInt(count));
  };

  return (
    <BlockchainContext.Provider value={{ contract, bookCount, fetchBookCount }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => useContext(BlockchainContext);

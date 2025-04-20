import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { usePurchaseSpecialEditionMutation } from '../../redux/features/nfts/SpecialEditionApi';

const NFTPurchaseModal = ({ book, onClose }) => {
  const [processing, setProcessing] = useState(false);
  const [purchaseSpecialEdition] = usePurchaseSpecialEditionMutation();

  const handlePurchase = async () => {
    try {
      setProcessing(true);
      await purchaseSpecialEdition(book.id).unwrap();
      // optional: toast success message
      onClose();
    } catch (error) {
      console.error("NFT Purchase failed:", error);
      // optional: show error message
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Confirm Purchase</h2>
        <p>Are you sure you want to buy <strong>{book.title}</strong> for <span className="text-green-600">{book.price} ETH</span>?</p>
        <div className="mt-6 flex justify-end">
          <button className="mr-4 text-gray-600" onClick={onClose}>Cancel</button>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded" 
            onClick={handlePurchase}
            disabled={processing}
          >
            {processing ? "Processing..." : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTPurchaseModal;

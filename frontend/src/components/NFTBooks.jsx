import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useGetSpecialEditionsQuery } from '../redux/features/nfts/SpecialEditionApi';
import NFTPurchaseModal from "./modals/NFTPurchaseModal";

const NFTBooks = () => {
  const { data: nftBooks = [], isLoading, isError, error } = useGetSpecialEditionsQuery();
  const [selectedBook, setSelectedBook] = useState(null);

  if (isLoading) return <p>Loading NFT books...</p>;
  if (isError) return <p>Error fetching books: {error?.message || "Something went wrong"}</p>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">NFT Books Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {nftBooks.map((book) => (
          <div key={book.id} className="border p-4 rounded-lg shadow-md">
            <img src={book.image} alt={book.title} className="w-full h-60 object-cover mb-4" />
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-500">{book.author}</p>
            <p className="text-green-600 font-bold mt-2">{book.price} ETH</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setSelectedBook(book)}
            >
              Buy NFT
            </button>
          </div>
        ))}
      </div>

      {selectedBook && <NFTPurchaseModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </div>
  );
};


export default NFTBooks;

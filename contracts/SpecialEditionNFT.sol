// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SpecialEditionNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    uint256 public constant ROYALTY_PERCENTAGE = 10; // 10% royalty

    struct BookInfo {
        string title;
        string author;
    }

    mapping(uint256 => BookInfo) private _bookDetails;

    event NFTMinted(uint256 indexed tokenId, address indexed owner, string title, string author);
    event NFTResold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 salePrice, uint256 authorRoyalty);

    constructor() ERC721("SpecialEditionBook", "SEB") {}

    function mintNFT(address recipient, string memory tokenURI, string memory bookTitle, string memory author) 
        public onlyOwner 
        returns (uint256) 
    {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _bookDetails[newItemId] = BookInfo(bookTitle, author);
        
        emit NFTMinted(newItemId, recipient, bookTitle, author);
        return newItemId;
    }

    function resellNFT(uint256 tokenId, address buyer, uint256 salePrice) public {
        require(ownerOf(tokenId) == msg.sender, "Not the NFT owner");
        
        uint256 royaltyAmount = (salePrice * ROYALTY_PERCENTAGE) / 100;

        // Transfer NFT ownership
        _transfer(msg.sender, buyer, tokenId);

        // Log resale transaction and royalty (off-chain system handles actual payment)
        emit NFTResold(tokenId, msg.sender, buyer, salePrice, royaltyAmount);
    }

    function getBookDetails(uint256 tokenId) public view returns (string memory title, string memory author) {
        return (_bookDetails[tokenId].title, _bookDetails[tokenId].author);
    }
}

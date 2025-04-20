// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Bookstore {
    struct Book {
        uint id;
        string title;
        string author;
        uint256 price;
        address owner;
        bool isForSale;
    }

    mapping(uint => Book) public books;
    uint public bookCount = 0;
    address public owner;

    event BookAdded(uint bookId, string title, string author, uint256 price);
    event BookPurchased(uint bookId, address buyer, uint256 price);
    event BookListed(uint bookId, uint256 price);
    event BookUnlisted(uint bookId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    modifier onlyBookOwner(uint _bookId) {
        require(books[_bookId].owner == msg.sender, "Not book owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addBook(string memory _title, string memory _author, uint256 _price) public onlyOwner {
        bookCount++;
        books[bookCount] = Book(bookCount, _title, _author, _price, msg.sender, false);
        emit BookAdded(bookCount, _title, _author, _price);
    }

    function listBookForSale(uint _bookId, uint256 _price) public onlyBookOwner(_bookId) {
        books[_bookId].isForSale = true;
        books[_bookId].price = _price;
        emit BookListed(_bookId, _price);
    }

    function unlistBook(uint _bookId) public onlyBookOwner(_bookId) {
        books[_bookId].isForSale = false;
        emit BookUnlisted(_bookId);
    }

    function buyBook(uint _bookId) public payable {
        require(books[_bookId].isForSale, "Book not for sale");
        require(msg.value >= books[_bookId].price, "Insufficient funds");

        address previousOwner = books[_bookId].owner;
        books[_bookId].owner = msg.sender;
        books[_bookId].isForSale = false;

        payable(previousOwner).transfer(msg.value);
        emit BookPurchased(_bookId, msg.sender, msg.value);
    }
}

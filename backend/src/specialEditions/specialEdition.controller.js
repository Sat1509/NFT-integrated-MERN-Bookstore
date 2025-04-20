const SpecialEdition = require('./specialEdition.model');
const NftOrder = require('../nftOrder/nftOrder.model'); // Import NFT order model
const Order = require('../order/order.model');

// Create a special edition book (Admin Only)
exports.createSpecialEdition = async (req, res) => {
    try {
        const book = new SpecialEdition(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fetch all special edition books
exports.getSpecialEditions = async (req, res) => {
    try {
        const books = await SpecialEdition.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSpecialEditionById = async (req, res) => {
    try {
        const book = await SpecialEdition.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Handle purchase of a special edition book
exports.purchaseSpecialEdition = async (req, res) => {
    try {
        const userId = req.user.id;
        const email = req.user.email;
        const { bookId } = req.body;

        // Check if the book exists
        const book = await SpecialEdition.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

    
        const newOrder = new Order({
            name,
            email,
            phone,
            address,
            productIds: [], // because it's not a regular book
            specialEditionIds: [bookId], // this is your new field
            totalPrice: book.price
        });
        
        await newOrder.save();

        res.status(200).json({ message: 'Purchase successful! You can claim your NFT later.' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update a special edition book (Admin Only)
/*exports.updateSpecialEdition = async (req, res) => {
    try {
        const updatedBook = await SpecialEdition.findOneAndUpdate(
            { _id: req.body.id },
            req.body,
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete a special edition book (Admin Only)
exports.deleteSpecialEdition = async (req, res) => {
    try {
        const deletedBook = await SpecialEdition.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json({ message: 'Special edition book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/


exports.updateSpecialEdition = async (req, res) => {
    try {
      const { id } = req.params; // Get ID from URL parameter
      const updates = req.body;
  
    
      const updatedBook = await SpecialEdition.findByIdAndUpdate(
        id, // Use params.id
        updates,
        { new: true, runValidators: true } // Validate updates
      );
  
      if (!updatedBook) {
        return res.status(404).json({ error: "Book not found" });
      }
  
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.deleteSpecialEdition = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBook = await SpecialEdition.findByIdAndDelete(id);
  
      if (!deletedBook) {
        return res.status(404).json({ error: "Book not found" });
      }
  
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


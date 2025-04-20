import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import './css/BookCard.css';

const BookCard = ({ book }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className="book-card">
            <div className="book-container">
                <div className="book-image">
                    <Link to={`/books/${book._id}`}>
                        <img
                            src={`${getImgUrl(book?.coverImage)}`}
                            alt={book?.title}
                            className="book-cover"
                        />
                    </Link>
                </div>

                <div className="book-details">
                    <Link to={`/books/${book._id}`} className="book-title">
                        {book?.title}
                    </Link>
                    <p className="book-description">
                        {book?.description.length > 80
                            ? `${book.description.slice(0, 80)}...`
                            : book?.description}
                    </p>
                    <p className="book-price">
                        ${book?.newPrice}{' '}
                        <span className="book-old-price">${book?.oldPrice}</span>
                    </p>
                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(book)}>
                        <FiShoppingCart className="cart-icon" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;

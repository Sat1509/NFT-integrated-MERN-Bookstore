import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import { getImgUrl } from '../../utils/getImgUrl';
import './css/SingleBook.css';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (isLoading) return <div className="single-book-loading">Loading...</div>;
    if (isError) return <div className="single-book-error">An error occurred while loading the book information.</div>;

    return (
        <div className="single-book-container">
            <div className="single-book-card">
                <div className="single-book-content-wrapper">
                    <div className="single-book-image-wrapper">
                        <img
                            src={`${getImgUrl(book.coverImage)}`}
                            alt={book.title}
                            className="single-book-image"
                        />
                    </div>
                    <div className="single-book-details">
                        <h1 className="single-book-title">{book.title}</h1>
                        <p className="single-book-author"><strong>Author:</strong> {book.author || 'Unknown'}</p>
                        <p className="single-book-published">
                            <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                        </p>
                        <p className="single-book-category single-book-capitalize">
                            <strong>Category:</strong> {book?.category}
                        </p>
                        <p className="single-book-description">{book.description}</p>

                        <button onClick={() => handleAddToCart(book)} className="single-book-btn-primary">
                            <FiShoppingCart />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBook;

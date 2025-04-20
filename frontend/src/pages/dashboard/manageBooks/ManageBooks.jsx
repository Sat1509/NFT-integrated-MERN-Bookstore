import React from 'react';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link, useNavigate } from 'react-router-dom';
import './ManageBooks.css';
import Swal from 'sweetalert2';

const ManageBooks = () => {
  const navigate = useNavigate();
  const { data: books, refetch } = useFetchAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This book will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      try {
        await deleteBook(id).unwrap();
        Swal.fire('Deleted!', 'Book has been deleted.', 'success');
        refetch();
      } catch (error) {
        console.error('Failed to delete book:', error.message);
        Swal.fire('Error', 'Failed to delete book. Please try again.', 'error');
      }
    }
  };
  

  const handleEditClick = (id) => {
      navigate(`/dashboard/edit-book/${id}`);
  };

  return (
      <section className="manage-books-section">
          <div className="manage-books-container">
              <div className="manage-books-content">
                  {/* Header Section */}
                  <div className="manage-books-header">
                      <div className="header-content">
                          <h3 className="title">All Books</h3>
                          
                      </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-container">
                      <table className="books-table">
                          <thead>
                              <tr>
                                  <th className="table-header">#</th>
                                  <th className="table-header">Book Title</th>
                                  <th className="table-header">Category</th>
                                  <th className="table-header">Price</th>
                                  <th className="table-header">Actions</th>
                              </tr>
                          </thead>

                          <tbody>
                              {books && books.map((book, index) => (
                                  <tr key={book._id}>
                                      <td className="table-cell">{index + 1}</td>
                                      <td className="table-cell">{book.title}</td>
                                      <td className="table-cell">{book.category}</td>
                                      <td className="table-cell">₹{book.newPrice}</td>
                                      <td className="table-cell actions-cell">
                                          {/* Edit Link */}
                                          <Link 
                                              to={`/dashboard/edit-book/${book._id}`} 
                                              className="edit-link"
                                              onClick={() => handleEditClick(book._id)}
                                          >
                                              Edit
                                          </Link>

                                          {/* Delete Button */}
                                          <button 
                                              onClick={() => handleDeleteBook(book._id)} 
                                              className="delete-button"
                                          >
                                              Delete
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </section>
  );
};

export default ManageBooks;

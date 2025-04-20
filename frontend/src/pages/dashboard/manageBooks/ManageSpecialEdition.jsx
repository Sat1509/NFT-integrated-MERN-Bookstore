import React from 'react';
import { useDeleteSpecialEditionMutation, useGetSpecialEditionsQuery } from '../../../redux/features/nfts/SpecialEditionApi';
import { Link, useNavigate } from 'react-router-dom';
import './ManageBooks.css'; // You can keep the same CSS if structure is same
import Swal from 'sweetalert2';

const ManageSpecialEditionBooks = () => {
  const navigate = useNavigate();
  const { data: specialBooks, refetch } = useGetSpecialEditionsQuery();
  const [deleteSpecialBook] = useDeleteSpecialEditionMutation();

  const handleDeleteSpecialBook = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action will delete the special edition book permanently.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      try {
        await deleteSpecialBook(id).unwrap();
        Swal.fire({
          title: 'Deleted!',
          text: 'The special edition book has been deleted.',
          icon: 'success',
          confirmButtonColor: '#3a345b',
        });
        refetch();
      } catch (error) {
        console.error('Failed to delete special edition book:', error.message);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the book. Please try again.',
          icon: 'error',
          confirmButtonColor: '#3a345b',
        });
      }
    }
  };
  

  const handleEditClick = (id) => {
    navigate(`/dashboard/edit-special-edition/${id}`);
  };

  return (
    <section className="manage-books-section">
      <div className="manage-books-container">
        <div className="manage-books-content">
          {/* Header Section */}
          <div className="manage-books-header">
            <div className="header-content">
              <h3 className="title">All Special Edition Books</h3>
            </div>
          </div>

          {/* Table Section */}
          <div className="table-container">
            <table className="books-table">
              <thead>
                <tr>
                  <th className="table-header">#</th>
                  <th className="table-header">Title</th>
                  <th className="table-header">Category</th>
                  <th className="table-header">Base Price</th>
                  <th className="table-header">Edition</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>

              <tbody>
                {specialBooks && specialBooks.map((book, index) => (
                  <tr key={book._id}>
                    <td className="table-cell">{index + 1}</td>
                    <td className="table-cell">{book.title}</td>
                    <td className="table-cell">{book.category}</td>
                    <td className="table-cell">₹{book.price}</td>
                    <td className="table-cell">{book.editionType || '—'}</td>
                    <td className="table-cell actions-cell">
                      <Link
                        to={`/dashboard/edit-special-edition/${book._id}`}
                        className="edit-link"
                        onClick={() => handleEditClick(book._id)}
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDeleteSpecialBook(book._id)}
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

export default ManageSpecialEditionBooks;

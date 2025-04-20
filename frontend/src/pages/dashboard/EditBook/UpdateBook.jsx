import React, { useEffect } from 'react'
import InputField from '../addBook/InputField'
import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';
import './UpdateBook.css';
import { useNavigate } from 'react-router-dom'; // at the top



const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData?.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setValue('coverImage', bookData.coverImage)
    }
  }, [bookData, setValue])

  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
    };
    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      Swal.fire({
        title: "Book Updated",
        text: "Your book has been updated successfully!",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3a345b",
        cancelButtonColor: "#4b1535",
        confirmButtonText: "Done."
      }).then(() => {
        navigate('/dashboard/manage-books');
        window.location.reload(); // reloads after navigation
      });
    } catch (error) {
      console.log("Failed to update book.");
      alert("Failed to update book.");
    }
  }

  if (isLoading) return <Loading />
  if (isError) return <div>Error fetching book data</div>

  return (
    <div className="update-book-container">
      <h2 className="update-book-title">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
            { value: 'fantasy', label: 'Fantasy' },
            { value: 'romance', label: 'Romance' },
            { value: 'thriller', label: 'Thriller' },
            { value: 'dystopian', label: 'Dystopian' },
          ]}
          register={register}
        />
        <div className="trending-checkbox">
          <label className="trending-label">
            <input
              type="checkbox"
              {...register('trending')}
              className="trending-input"
            />
            <span className="trending-text">Trending</span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />

        <button type="submit" className="update-book-button">
          Update Book
        </button>
      </form>
    </div>
  )
}

export default UpdateBook

import React, { useEffect } from 'react'
import InputField from '../addBook/InputField'
import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useGetSpecialEditionByIdQuery, useUpdateSpecialEditionMutation } from '../../../redux/features/nfts/SpecialEditionApi'
import Loading from '../../../components/Loading'
import Swal from 'sweetalert2'
import './UpdateBook.css'
import { useNavigate } from 'react-router-dom';


const EditSpecialEdition = () => {
  const { id } = useParams()
  const { data: bookData, isLoading, isError, refetch } = useGetSpecialEditionByIdQuery(id)
  const [updateSpecialEdition] = useUpdateSpecialEditionMutation()
  const { register, handleSubmit, setValue } = useForm()
  const navigate = useNavigate();


  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title)
      setValue('description', bookData.description)
      setValue('genre', bookData.genre)
      setValue('author', bookData.author)
      setValue('price', bookData.price)
      setValue('coverImage', bookData.coverImage)
    }
  }, [bookData, setValue])

  const onSubmit = async (data) => {
    const updatedData = {
      title: data.title,
      description: data.description,
      genre: data.genre,
      author: data.author,
      price: Number(data.price),
      coverImage: data.coverImage || bookData.coverImage
    }

    try {
      await updateSpecialEdition({ id, ...updatedData }).unwrap()
      Swal.fire({
        title: "Book Updated",
        text: "Your special edition book has been updated successfully!",
        icon: "success",
        confirmButtonColor: "#3a345b",
        confirmButtonText: "Done."
      }).then(() => {
        navigate('/dashboard/manage-special-editions'); // navigate to manage special editions page
        window.location.reload(); // reloads after navigation
      });
      await refetch()
    } catch (error) {
      console.error("Failed to update book:", error)
      Swal.fire({
        title: "Error",
        text: "Failed to update the special edition.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "Okay"
      })
    }
  }

  if (isLoading) return <Loading />
  if (isError) return <div>Error fetching special edition book.</div>

  return (
    <div className="update-book-container">
      <h2 className="update-book-title">Update Special Edition</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter title"
          register={register}
        />

        <InputField
          label="Author"
          name="author"
          placeholder="Enter author"
          register={register}
        />

        <SelectField
          label="Genre"
          name="genre"
          options={[
            { value: '', label: 'Choose A Genre' },
            { value: 'romance', label: 'Romance' },
            { value: 'fantasy', label: 'Fantasy' },
            { value: 'horror', label: 'Horror' },
            { value: 'dystopian', label: 'Dystopian' },
            { value: 'classic', label: 'Classic' },
          ]}
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter description"
          type="textarea"
          register={register}
        />

        <InputField
          label="Price"
          name="price"
          type="number"
          placeholder="Enter price"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Enter image URL"
          register={register}
        />

        <button type="submit" className="update-book-button">
          Update Book
        </button>
      </form>
    </div>
  )
}

export default EditSpecialEdition

import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useCreateSpecialEditionMutation } from '../../../redux/features/nfts/SpecialEditionApi';
import Swal from 'sweetalert2';
import './AddBook.css';
import { useNavigate } from 'react-router-dom'; 

const AddSpecialEdition = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [useLink, setUseLink] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [coverImageURL, setCoverImageURL] = useState('');
  const [createSpecialEdition, { isLoading }] = useCreateSpecialEditionMutation();
  

  const onSubmit = async (data) => {
    const specialEditionData = {
      ...data,
      coverImage: useLink ? coverImageURL : imageFileName,
    };

    try {
      await createSpecialEdition(specialEditionData).unwrap();
      Swal.fire({
        title: 'Special Edition Book Added!',
        text: 'Your special edition book has been created successfully.',
        icon: 'success',
        confirmButtonColor: '#3a345b',
        confirmButtonText: 'Done',
      });
      reset();
      setImageFile(null);
      setImageFileName('');
      setCoverImageURL('');
    } catch (error) {
      console.error(error);
      alert('Failed to create special edition book. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <div className="add-book-container">
      <h2 className="add-book-title">Add Special Edition Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="add-book-form">
        <InputField label="Title" name="title" placeholder="Enter title" register={register} />
        <InputField label="Author" name="author" placeholder="Enter author name" register={register} />
        <SelectField
          label="Genre"
          name="category"
          options={[
            { value: '', label: 'Choose A Genre' },
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
        <InputField label="Price" name="price" type="number" placeholder="Enter price" register={register} />
        <InputField label="Description" name="description" type="textarea" placeholder="Enter description" register={register} />
        <InputField label="NFT Metadata URL" name="nftMetadata" placeholder="Enter IPFS/Metadata link" register={register} />

        <div className="cover-image-upload">
          <label className="cover-image-label">Cover Image</label>
          <div className="toggle-upload-type">
            <label>
              <input type="radio" checked={!useLink} onChange={() => setUseLink(false)} /> Upload
            </label>
            <label>
              <input type="radio" checked={useLink} onChange={() => setUseLink(true)} /> Use Link
            </label>
          </div>

          {!useLink ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cover-image-input"
              />
              {imageFileName && (
                <p className="cover-image-filename">Selected: {imageFileName}</p>
              )}
            </>
          ) : (
            <input
              type="text"
              placeholder="Paste image URL (e.g. Cloudinary)"
              value={coverImageURL}
              onChange={(e) => setCoverImageURL(e.target.value)}
              className="cover-image-input"
            />
          )}
        </div>

        <button type="submit" className={`submit-button ${isLoading ? 'loading' : ''}`}>
          {isLoading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddSpecialEdition;

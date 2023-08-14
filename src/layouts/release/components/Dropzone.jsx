import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const DropzoneContainer = styled('div')({
    height: '150px',
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease-in-out',
    '&:hover': {
      borderColor: '#a0a0a0',
      background: '#f0f0f0', // Add background color on hover
    },
  });

const ImageList = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: '20px',
});

const ImageContainer = styled('div')({
  margin: '10px',
  position: 'relative',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const Image = styled('img')({
  maxWidth: '100%',
  maxHeight: '100px',
  borderRadius: '4px',
});

const DeleteButton = styled('button')({
  position: 'absolute',
  top: '5px',
  right: '5px',
  background: 'transparent',
  color: 'gray',
  border: 'none',
  cursor: 'pointer',
  transition: 'color 0.3s ease-in-out',
  '&:hover': {
    color: 'red',
  },
});

function Dropzone({ onChange, initialFiles }) {
    const [files, setFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
  
    const onDrop = (acceptedFiles) => {
      const newImageUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      setImageUrls([...imageUrls, ...newImageUrls]);
      setFiles([...files, ...acceptedFiles]);
    };
  
    useEffect(() => {
      if (initialFiles && initialFiles.length > 0) {
        setFiles(initialFiles);
      }
    }, [initialFiles]);
  

  
    const deleteImage = (index) => {
      const newFiles = [...files];
      const newImageUrls = [...imageUrls];
      
      URL.revokeObjectURL(newImageUrls[index]);
      newImageUrls.splice(index, 1);
      newFiles.splice(index, 1);
      
      setImageUrls(newImageUrls);
      setFiles(newFiles);
    };
  
    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });
  
    return (
      <div>
        <DropzoneContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <p>이미지 파일을 드래그하여 업로드하거나 클릭하여 이미지 선택</p>
        </DropzoneContainer>
        <ImageList>
          {files.map((file, index) => (
            <ImageContainer key={file.name}>
              <Image src={imageUrls[index]} alt={file.name} />
              <DeleteButton onClick={() => deleteImage(index)}>
                <DeleteIcon />
              </DeleteButton>
            </ImageContainer>
          ))}
        </ImageList>
      </div>
    );
  }
  
  
  export default Dropzone;
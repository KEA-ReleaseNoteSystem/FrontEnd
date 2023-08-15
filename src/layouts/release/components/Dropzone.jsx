import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import MDButton from '../../../components/MDButton';
import MDSnackbar from '../../../components/MDSnackbar';
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

function Dropzone({ onClick, initialFiles, Button=true ,insidePreview=false}) {
    const [files, setFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [snackbarOpen, setSnackbarOpen]= useState(false);
    const [snackbarMessage, setSnackbarMessage]= useState(false);


    const onDrop = (acceptedFiles) => {
        const newImageUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
        const newFiles = [...files, ...acceptedFiles];
        if (newFiles.length > 3) {
            newImageUrls.splice(3);
            newFiles.splice(3);
            setSnackbarOpen(true); // MDSnackbar 열기
            setSnackbarMessage('최대 3개 파일만 추가할 수 있습니다.');
        }
        setImageUrls([...imageUrls, ...newImageUrls]);
        setFiles(newFiles);
    };

    const onClickSubmitButton = async () => {
        const combinedFiles = [...files];
        for (const initialFile of initialFiles) {
            const response = await fetch(initialFile);
            const blob = await response.blob();
            const file = new File([blob], initialFile.split('/').pop(), { type: blob.type }); // Blob을 File 객체로 변환
            combinedFiles.push(file);
        }

        if (onClick) {
            onClick(combinedFiles);
        }
    };

    useEffect(() => {
            setFiles(initialFiles);
            setImageUrls(initialFiles);
    }, [initialFiles]);


    // const deleteImage = (index) => {
    //     const newFiles = [...files];
    //     const newImageUrls = [...imageUrls];

    //     URL.revokeObjectURL(newImageUrls[index]);
    //     newImageUrls.splice(index, 1);
    //     newFiles.splice(index, 1);

    //     setImageUrls(newImageUrls);
    //     setFiles(newFiles);

    //     if (index < initialFiles.length) {
    //         initialFiles.splice(index, 1);
    //     }
    // };

    const deleteImage = (index, e) => {
        e.stopPropagation(); // 이벤트 전파 중지
    
        const newFiles = [...files];
        const newImageUrls = [...imageUrls];
    
        URL.revokeObjectURL(newImageUrls[index]);
        newImageUrls.splice(index, 1);
        newFiles.splice(index, 1);
    
        setImageUrls(newImageUrls);
        setFiles(newFiles);
    
        if (index < initialFiles.length) {
            initialFiles.splice(index, 1);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

    const renderImageList = () => (
        <ImageList>
            {files.map((file, index) => (
                <ImageContainer key={file.name}>
                    <Image src={imageUrls[index]} alt={file.name} />
                    <DeleteButton onClick={(e) => deleteImage(index, e)}>
                <DeleteIcon />
            </DeleteButton>
                </ImageContainer>
            ))}
        </ImageList>
    );

    return (
        <div>
            <DropzoneContainer {...getRootProps()}>
                <input {...getInputProps()} />
                <p>이미지 파일을 드래그하여 업로드하거나 클릭하여 이미지 선택 (최대 3개 파일만 가능)</p>
                {insidePreview && renderImageList()} {/* 드랍존 내부에 프리뷰 표시 */}
            </DropzoneContainer>
            {!insidePreview && renderImageList()} {/* 드랍존 외부에 프리뷰 표시 */}
            {Button && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <MDButton onClick={onClickSubmitButton}>Save File</MDButton>
                </div>
            )}
            <MDSnackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                content={snackbarMessage}
                title="alert"
                color='error'
            />
        </div>
    );
}


export default Dropzone;
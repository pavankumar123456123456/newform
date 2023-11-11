import { Button } from '@mui/material';
import { useRef } from 'react';
import CameraIcon from '@mui/icons-material/Camera';
import { useNavigate } from 'react-router-dom';

// import './styles.css';
export const FileUploader = ({ handleFile, setImageData }) => {
  const navigate = useNavigate();
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
    if (fileUploaded) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target.result;
        setImageData(base64Image);

        // Store the Base64-encoded image in localStorage
        localStorage.setItem('uploadedImage', base64Image);
      };

      reader.readAsDataURL(fileUploaded);
    }
    setTimeout(() => {
      navigate('/scanned-data');
    }, 2000);
  };
  return (
    <>
      <Button
        disableElevation
        variant="contained"
        className="button-upload"
        onClick={handleClick}
        startIcon={<CameraIcon />}
      >
        Scan
      </Button>
      <input
        type="file"
        accept="image/*"
        capture="camera"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: 'none' }} // Make the file input element invisible
      />
    </>
  );
};

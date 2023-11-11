import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [spocName, setSpocName] = useState('');
  const [headCount, setHeadCount] = useState('');
  const [staffStrength, setStaffStrength] = useState('');

  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  //   const navigate = useNavigate();

  const getGeoLocation = () => {
    setLoading(true);
    // Check if the browser supports Geolocation
    if ('geolocation' in navigator) {
      // Get current position
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Latitude and Longitude are available in the `coords` object
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          console.log('Latitude: ' + latitude);
          setLat(latitude);

          console.log('Longitude: ' + longitude);
          setLong(longitude);
          setLoading(false);
        },
        function (error) {
          // Handle errors (e.g., user denied access or unable to determine location)
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    
    event.preventDefault();
    let obj = {
      lat,
      long,
      company_name: companyName,
      spoc_name: spocName,
      headcount: headCount,
      staff_strength: staffStrength,
    };

    console.log(obj);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <Grid
        style={{
          marginTop: '120px',
        }}
      >
        <Grid item xs={12}>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <h2
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              Form Data
            </h2>
            <TextField
              label="Company name capture"
              onChange={(e) => setCompanyName(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={companyName}
            />

            <TextField
              label="HR spock Name/Procurment spoc Name"
              onChange={(e) => setSpocName(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={spocName}
            />

            <TextField
              color="secondary"
              accept="image/*"
              capture="camera"
              type="file"
              onChange={() => getGeoLocation()}
              required
              fullWidth
            />
            <Grid item sx={{ mb: 3 }}>
              {lat && long && (
                <div style={{ fontWeight: 300 }}>
                  lat : {lat} & long : {long}{' '}
                </div>
              )}
            </Grid>

            <TextField
              label="Capture HeadCount / Building Area SQFT"
              onChange={(e) => setHeadCount(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="number"
              sx={{ mb: 3 }}
              fullWidth
              value={headCount}
            />

            <TextField
              label="Capture StaffStrength(Approx Seating)"
              onChange={(e) => setStaffStrength(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="number"
              sx={{ mb: 3 }}
              fullWidth
              value={staffStrength}
            />

            {/* <Button variant="contained" color="success" type="submit" fullWidth>
              Submit
            </Button> */}
            <LoadingButton
              color="success"
              type="submit"
              //   onClick={handleClick}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              fullWidth
            >
              <span>Submit</span>
            </LoadingButton>
          </form>
        </Grid>
      </Grid>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Enter correct details to login !
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default Login;

import React from 'react';
import { Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className='row dark-mode'>
      <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="logo" />
      <Stack>
        <Typography variant="h5">About us</Typography>
        <Typography component="span">About Galaxia</Typography>
        <Typography component="span">Terms and conditions</Typography>
      </Stack>
      <Stack>
        <Typography variant="h5">
          Social media
        </Typography>
        <Typography component="span">
          <FontAwesomeIcon icon={faFacebook} /> /galaxia
        </Typography>
        <Typography component="span">
          <FontAwesomeIcon icon={faTwitter} /> /galaxia
        </Typography>
        <Typography component="span">
          <FontAwesomeIcon icon={faDiscord} /> /galaxia
        </Typography>
      </Stack>
    </footer>
  )
}

export default Footer
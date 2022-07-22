import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Icon } from '@mui/material';

function Footer() {
  return (
    <footer>
      <img src="" alt="logo" />
      <ul>
        <h5>About us</h5>
        <li>About Galaxia</li>
        <li>Terms and conditions</li>
      </ul>
      <ul>
        <h5>Follow us</h5>
        <li><FacebookIcon/> /galaxia</li>
        <li><TwitterIcon/> /galaxia</li>
        <li><Icon baseClassName="fa-brands" className="fa-discord" /> /galaxia</li>
      </ul>
    </footer>
  )
}

export default Footer
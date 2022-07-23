import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className='row dark-mode'>
      <img src="logo.svg" alt="logo" />
      <ul>
        <h5>About us</h5>
        <li>About Galaxia</li>
        <li>Terms and conditions</li>
      </ul>
      <ul>
        <h5>Follow us</h5>
        <li><FontAwesomeIcon icon={faFacebook} /> /galaxia</li>
        <li><FontAwesomeIcon icon={faTwitter} /> /galaxia</li>
        <li><FontAwesomeIcon icon={faDiscord} /> /galaxia</li>
      </ul>
    </footer>
  )
}

export default Footer
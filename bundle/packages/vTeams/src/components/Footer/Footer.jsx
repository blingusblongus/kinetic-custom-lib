import React from 'react';
import { VTEAMS } from '../../../globals/globals';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="flex flex-align-vert flex-center">
      <div>
        <div>esolutionsONE - vTEAMS</div>
        <div className="flex flex-center footer-link-container">
          -
          <a>Contact Us</a>
          -
          <a>Privacy Policy</a>
          -
          <a>Report an Issue</a>
          -
        </div>
        <div>Version {VTEAMS.VERSION}</div>
      </div>
    </footer>
  );
};

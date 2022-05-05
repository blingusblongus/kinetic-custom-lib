import React from 'react';
import logoImage from '../../assets/images/login-background.png';
import logoName from '../../assets/images/login-name.png';
import { I18n } from '@kineticdata/react';
import logo from '../../assets/images/esolutions_logo_green.svg';

export const LoginWrapper = ({ children }) => (
  <div className="login-container">
    <div className="login-wrapper">
      {children}
      <div
        className="login-image-container"
        style={{
          backgroundImage: `url(${logo})`,
          filter: 'drop-shadow(.5rem .5rem .5rem gray)',
        }}
      >
        <div className="kinops-text">
          {/* <img
            src={logoName}
            alt="Kinops - streamline everyday work for teams"
          /> */}
          {/* <h3>
            <I18n>Welcome to kinops</I18n>
          </h3>
          <p>
            <I18n>Streamline everyday work for teams.</I18n>
          </p> */}
        </div>
      </div>
    </div>
  </div>
);

import React from 'react';
import NavIcon from '../NavIcon/NavIcon';
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <>
      <header className="flex flex-align-vert flex-between bg--primary">
        <div className="flex">
          <NavIcon component={<MenuIcon sx={{ fontSize: '2rem' }} />} />
          <NavIcon
            src={
              'https://media-exp1.licdn.com/dms/image/C560BAQHaOumbvRhcKg/company-logo_200_200/0/1635449306924?e=2147483647&v=beta&t=iNjxG2pi15Zoc0XUzguuV3en1x9f_w1hc66kWlGNyR8'
            }
          />
        </div>
        <div className="flex flex-center">
          <NavIcon
            src={
              'https://media-exp1.licdn.com/dms/image/C560BAQHaOumbvRhcKg/company-logo_200_200/0/1635449306924?e=2147483647&v=beta&t=iNjxG2pi15Zoc0XUzguuV3en1x9f_w1hc66kWlGNyR8'
            }
          />
          <div className="vteams-title">vTEAMS</div>
        </div>
        <div className="flex">
          <Button
            sx={{
              color: 'black',
              backgroundColor: 'white',
              height: '2rem',
              margin: 'auto 4px',
            }}
            size="small"
          >
            Contact Us
          </Button>
          <NavIcon component={<MenuIcon sx={{ fontSize: '2rem' }} />} />
          <NavIcon component={<MenuIcon sx={{ fontSize: '2rem' }} />} />
          <NavIcon component={<MenuIcon sx={{ fontSize: '2rem' }} />} />
        </div>
      </header>

      <div className="subheader" />
    </>
  );
};

export default Navbar;

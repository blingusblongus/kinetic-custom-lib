import React from 'react';
import NavIcon from '../NavIcon/NavIcon';
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Button from '@mui/material/Button';

const Navbar = () => {
  const iconSize = '2rem';
  return (
    <>
      <header className="navbar-grid bg--primary">
        <div className="flex">
          <NavIcon
            component={<MenuIcon size="small" sx={{ fontSize: iconSize }} />}
          />
          <NavIcon
            component={<HomeOutlinedIcon sx={{ fontSize: iconSize }} />}
          />
        </div>
        <div className="flex flex-center">
          <NavIcon
            src={
              'https://media-exp1.licdn.com/dms/image/C560BAQHaOumbvRhcKg/company-logo_200_200/0/1635449306924?e=2147483647&v=beta&t=iNjxG2pi15Zoc0XUzguuV3en1x9f_w1hc66kWlGNyR8'
            }
          />
          <div id="vteams-title">vTEAMS</div>
        </div>
        <div className="flex flex-right">
          <Button
            sx={{
              color: 'black',
              backgroundColor: 'white',
              height: '1.5rem',
              margin: 'auto 4px',
              fontSize: '.8rem',
            }}
            size="small"
          >
            Contact Us
          </Button>
          <NavIcon component={<MenuIcon sx={{ fontSize: iconSize }} />} />
          <NavIcon component={<MenuIcon sx={{ fontSize: iconSize }} />} />
          <NavIcon component={<MenuIcon sx={{ fontSize: iconSize }} />} />
        </div>
      </header>

      <div className="subheader" />
    </>
  );
};

export default Navbar;

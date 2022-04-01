import React from 'react';
import NavIcon from '../NavIcon/NavIcon';
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Button from '@mui/material/Button';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

const Navbar = () => {
  const iconSize = '2rem';
  return (
    <>
      <header className="navbar-grid bg--primary">
        <div className="flex">
          <NavIcon component={<MenuIcon />} />
          <NavIcon component={<HomeOutlinedIcon />} />
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
              fontSize: '.7rem',
            }}
            size="small"
          >
            Contact Us
          </Button>
          <NavIcon component={<ErrorOutlineIcon />} />
          <NavIcon component={<NotificationsNoneIcon />} />
          <NavIcon component={<PermIdentityOutlinedIcon />} />
        </div>
      </header>

      <div className="subheader" />
    </>
  );
};

export default Navbar;

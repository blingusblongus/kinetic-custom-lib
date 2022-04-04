import React from 'react';
import NavIcon from '../NavIcon/NavIcon';
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

const Navbar = () => {
  const iconSize = '2rem';

  // hook up with redux later
  const notifications = 1;

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
              '&:hover': {
                color: 'white',
                backgroundColor: 'gray',
              },
            }}
            size="small"
          >
            Contact Us
          </Button>
          <NavIcon component={<ErrorOutlineIcon />} />

          <NavIcon
            component={
              <Badge
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                invisible={!notifications}
                // overlap="circular"
                variant="dot"
                color="error"
                sx={{
                  '.MuiBadge-dot': {
                    transform: 'scale(1.15)',
                    transformOrigin: 'center',
                  },
                  '.MuiBadge-colorError': { backgroundColor: 'red' },
                }}
              >
                <NotificationsNoneIcon />
              </Badge>
            }
          />
          <NavIcon component={<PermIdentityOutlinedIcon />} />
        </div>
      </header>

      <div className="subheader" />
    </>
  );
};

export default Navbar;

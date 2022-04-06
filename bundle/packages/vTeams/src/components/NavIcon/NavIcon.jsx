import React from 'react';
import './NavIcon.css';

const NavIcon = ({ src, component }) => {
  const innerElement = !!src ? <img src={src} /> : component;

  return <div className="nav-icon">{innerElement}</div>;
};

export default NavIcon;

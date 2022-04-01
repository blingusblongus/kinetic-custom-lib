import React from 'react';
import './NavIcon.css';

const NavIcon = ({ src, component }) => {
  const innerElement = !!src ? <img src={src} /> : component;

  if (component) console.log(component.style);
  return <div className="nav-icon">{innerElement}</div>;
};

export default NavIcon;

import React from 'react';
import './NavTab.css';
const NavTab = ({ title, blackLine }) => (
  <header className={`navtab ${blackLine && 'navtab_line_black'}`}>{title}</header>
);

export default NavTab;

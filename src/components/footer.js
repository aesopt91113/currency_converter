import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-2 pl-2 pb-2 footerBackground footerText d-flex inline-block justify-content-center">
      <a className="nav-link iconpad footerLogoColor" href="https://www.instagram.com/meyran.l/" target="blank"><i className="fab fa-instagram"></i></a>
      <a className="nav-link iconpad footerLogoColor" href="https://www.facebook.com/meyran.lee" target="blank"><i className="fab fa-facebook-square"></i></a>
      <a className="nav-link footerLogoColor" href="https://github.com/aesopt91113" target="blank"><i className="fab fa-github"></i></a>
    </footer>
  )
}

export default Footer;

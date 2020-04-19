import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a id="title" className="navbar-brand ml-3 font-weight-bold" href="#">XxXchange Rate</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Graph<span className="sr-only">(current)</span></a>
          </li>
        </ul>
        <span className="navbar-text">
          <div className="form-inline my-2 my-lg-0">
            <a className="nav-link iconpad logocolor" href="https://www.instagram.com/meyran.l/" target="blank"><i className="fab fa-instagram"></i></a>
            <a className="nav-link iconpad logocolor" href="https://www.facebook.com/meyran.lee" target="blank"><i className="fab fa-facebook-square"></i></a>
            <a className="nav-link logocolor" href="https://github.com/aesopt91113" target="blank"><i className="fab fa-github"></i></a>
          </div>
        </span>
      </div>
    </nav>
  )
}

export default Navbar;

import React from 'react';

export default () => {
  return (
    <nav id="comp-navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">XxXchange Rate</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/graph">Graph</a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto social-links">
          <li className="nav-item">
            <a className="nav-link" href="https://www.instagram.com/meyran.l"><i className="fab fa-instagram" /></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://www.facebook.com/meyran.lee"><i className="fab fa-facebook" /></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/aesopt91113"><i className="fab fa-github" /></a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

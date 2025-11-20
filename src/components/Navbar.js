import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    let { theme, toggleTheme, setCountryFilter, currentCountry } = this.props;
    
    const countries = [
      { code: 'in', name: 'India' },
      { code: 'us', name: 'USA' },
      { code: 'gb', name: 'UK' },
      { code: 'cn', name: 'China' },
      { code: 'pk', name: 'Pakistan' },
    ];

    return (
      <nav className={`navbar navbar-expand-lg ${theme === 'light' ? 'navbar-light bg-light' : 'navbar-dark bg-dark'}`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#top">NewsMonkey</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#top" onClick={() => this.props.setCategory('general')}>Home</a>
              </li>
              <li className="nav-item"><a className="nav-link" href="#top" onClick={() => this.props.setCategory('business')}>Business</a></li>
              <li className="nav-item"><a className="nav-link" href="#top" onClick={() => this.props.setCategory('entertainment')}>Entertainment</a></li>
              <li className="nav-item"><a className="nav-link" href="#top" onClick={() => this.props.setCategory('health')}>Health</a></li>
              <li className="nav-item"><a className="nav-link" href="#top" onClick={() => this.props.setCategory('science')}>Science</a></li>
              <li className="nav-item"><a className="nav-link" href="#top" onClick={() => this.props.setCategory('sports')}>Sports</a></li>
              <li className="nav-item"><a className="nav-link" href="#top" onClick={() => this.props.setCategory('technology')}>Technology</a></li>
            </ul>
            <form className="d-flex" role="search" onSubmit={this.props.handleSearchSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search news..."
                    aria-label="Search"
                    value={this.props.searchTerm}
                    onChange={this.props.handleSearchChange}
                />
                <button className={`btn ${theme === 'light' ? 'btn-outline-dark' : 'btn-outline-light'}`} type="submit">Search</button>
            </form>

            <div className="dropdown mx-2">
                <button className={`btn dropdown-toggle ${theme === 'light' ? 'btn-outline-dark' : 'btn-outline-light'}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {countries.find(c => c.code === currentCountry)?.name || 'Country'}
                </button>
                <ul className={`dropdown-menu ${theme === 'dark' ? 'dropdown-menu-dark' : ''}`}>
                    {countries.map((country) => (
                        <li key={country.code}>
                            <a 
                                className={`dropdown-item ${currentCountry === country.code ? 'active' : ''}`} 
                                href="#top" 
                                onClick={() => setCountryFilter(country.code)}
                            >
                                {country.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`form-check form-switch mx-3 text-${theme === 'light' ? 'dark' : 'light'}`}>
              <input 
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                id="flexSwitchCheckDefault" 
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
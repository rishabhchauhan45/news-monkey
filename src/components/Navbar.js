import React, { Component } from 'react';


export class Navbar extends Component {
  render() {
    let { theme, toggleTheme, setCountryFilter, currentCountry, currentCategory } = this.props;
    
    const countries = [
      { code: 'in', name: 'India', flag: '🇮🇳' },
      { code: 'us', name: 'USA', flag: '🇺🇸' },
      { code: 'gb', name: 'UK', flag: '🇬🇧' },
      { code: 'cn', name: 'China', flag: '🇨🇳' },
      { code: 'pk', name: 'Pakistan', flag: '🇵🇰' },
    ];

    const isActive = (cat) => currentCategory === cat ? 'active text-decoration-underline' : '';

  
    const navLinkStyle = {
        fontWeight: '800', 
        fontSize: '1.15rem', 
        letterSpacing: '0.5px'
    };

    
    const countryBtnStyle = {
        borderRadius: '30px',
        background: 'linear-gradient(135deg, #ff9933, #ffffff, #138808)',
        border: 'none',
        color: '#212529',
        fontWeight: 'bold',
        paddingInline: '20px'
    };


    return (
      <nav className={`navbar navbar-expand-lg sticky-top shadow ${theme === 'light' ? 'navbar-light bg-white' : 'navbar-dark bg-dark'}`} style={{transition: 'all 0.3s ease'}}>
        <div className="container-fluid px-lg-5">
          
          <a className="navbar-brand fw-bold d-flex align-items-center" href="#top" style={{letterSpacing: '1px', color: 'var(--bs-primary)', fontSize: '1.8rem'}}>
            NewsMonkey <span className="ms-2 fs-4" role="img" aria-label="monkey">🐵</span>
            </a>
            
          <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" style={{filter: theme === 'dark' ? 'invert(1)' : 'none'}}></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center"> 
              <li className="nav-item">
               
                <a className={`nav-link ${isActive('general')}`} aria-current="page" href="#top" onClick={() => this.props.setCategory('general')} style={navLinkStyle}>Home</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('business')}`} href="#top" onClick={() => this.props.setCategory('business')} style={navLinkStyle}>Business</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('entertainment')}`} href="#top" onClick={() => this.props.setCategory('entertainment')} style={navLinkStyle}>Entertainment</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('health')}`} href="#top" onClick={() => this.props.setCategory('health')} style={navLinkStyle}>Health</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('science')}`} href="#top" onClick={() => this.props.setCategory('science')} style={navLinkStyle}>Science</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('sports')}`} href="#top" onClick={() => this.props.setCategory('sports')} style={navLinkStyle}>Sports</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('technology')}`} href="#top" onClick={() => this.props.setCategory('technology')} style={navLinkStyle}>Technology</a>
              </li>
            </ul>
            
            <div className="d-flex align-items-center">
             
                <form className="d-flex my-2 my-lg-0 me-3 align-items-center" role="search" onSubmit={this.props.handleSearchSubmit}>
                    <input
                        className="form-control me-2 shadow-sm thick-border-input search-input-hover"
                        type="search"
                        placeholder="Search topics..."
                        aria-label="Search"
                        value={this.props.searchTerm}
                        onChange={this.props.handleSearchChange}
                        style={{borderRadius: '30px', paddingLeft: '20px',width: '250'}}
                    />
                    <button className="btn shadow-sm light-search-btn" type="submit" style={{borderRadius: '30px', paddingInline: '25px'}}>
                        Search 🔍
                    </button>
                </form>

                <div className="dropdown my-2 my-lg-0 me-3">
                    <button className="btn dropdown-toggle shadow-sm d-flex align-items-center hover-effect" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={countryBtnStyle}>
                        <span className="me-2">{countries.find(c => c.code === currentCountry)?.name}</span>
                        <span style={{fontSize: '1.4rem'}} role="img" aria-label="flag">
                            {countries.find(c => c.code === currentCountry)?.flag}
                        </span>
                    </button>
                    <ul className={`dropdown-menu shadow border-0 mt-2 ${theme === 'dark' ? 'dropdown-menu-dark' : ''}`} style={{borderRadius: '15px', overflow: 'hidden'}}>
                        {countries.map((country) => (
                            <li key={country.code}>
                                <a 
                                    className={`dropdown-item d-flex justify-content-between align-items-center py-2 ${currentCountry === country.code ? 'active fw-bold' : ''}`} 
                                    href="#top" 
                                    onClick={() => setCountryFilter(country.code)}
                                >
                                    <span>{country.name}</span>
                                    <span style={{fontSize: '1.3rem'}}>{country.flag}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

              
                <div className={`form-check form-switch p-0 m-0 d-flex align-items-center hover-effect`} style={{cursor: 'pointer'}}>
                    <label className="form-check-label me-2 fs-5" htmlFor="flexSwitchCheckDefault" style={{cursor: 'pointer'}}>
                        {theme === 'light' ? '☀️' : '🌙'}
                    </label>
                    <input 
                        className="form-check-input m-0" 
                        type="checkbox" 
                        role="switch" 
                        id="flexSwitchCheckDefault" 
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        style={{cursor: 'pointer', width: '3rem', height: '1.5rem'}}
                    />
                </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
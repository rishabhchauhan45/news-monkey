import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  state = {
    category: 'general',
    searchTerm: '',
    theme: 'light',
    country: 'in' // Country state ko 'in' (India) set kiya
  }

  setCategory = (newCategory) => {
    this.setState({ category: newCategory, searchTerm: '' });
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.setState({});
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light'
    }));
  }

  setCountryFilter = (newCountry) => {
    this.setState({ country: newCountry, searchTerm: '' }); // Country बदलने पर search term reset karein
  }

  render() {
    return (
      <div className={`app-container ${this.state.theme}`}>
        <Navbar 
          setCategory={this.setCategory} 
          searchTerm={this.state.searchTerm}
          handleSearchChange={this.handleSearchChange}
          handleSearchSubmit={this.handleSearchSubmit}
          theme={this.state.theme}
          toggleTheme={this.toggleTheme}
          setCountryFilter={this.setCountryFilter} // Navbar ko setCountryFilter function pass kiya
          currentCountry={this.state.country} // Navbar ko current country pass kiya
        />
        <News 
          key={this.state.category + this.state.searchTerm + this.state.theme + this.state.country} // Key ko country ke saath update kiya
          category={this.state.category} 
          searchTerm={this.state.searchTerm}
          theme={this.state.theme}
          country={this.state.country} // News component ko country pass kiya
        />
      </div>
    );
  }
}
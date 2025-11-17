import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    // Props (data) ko component se nikal rahe hain
    let { title, description, imageUrl, newsUrl } = this.props;
    
    return (
      // Yeh sabse bahar wala div hai
      <div className="my-3"> 
        {/* Yeh card div hai */}
        <div className="card"> 
          <img src={!imageUrl ? "https://newsdata.io/api/1/latest?apikey=pub_1136e01a11c34ae482238053f60f2961&q=ind%20%2Cus%2Cuk%2Cpak%2Cchina%20all%20news%20": imageUrl} className="card-img-top" alt="..." />
          {/* Yeh card-body div hai */}
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div> 
          {/* card-body div yahan band hua */}
        </div> 
        {/* card div yahan band hua */}
      </div> 
      // sabse bahar wala div yahan band hua
    )
  }
}

export default NewsItem
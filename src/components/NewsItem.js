import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    
    let { title, description, imageUrl, newsUrl } = this.props;

    return (
      <div className="my-3">
        <div className="card">
          <img 
            src={imageUrl ? imageUrl : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=500&q=60"} 
            className="card-img-top" 
            alt="News" 
          />
          <div className="card-body">
            
            <h5 className="card-title">
              {title ? title.slice(0, 45) : ""}...
            </h5>

            {/* description को 90 अक्षरों तक छोटा किया */}
            <p className="card-text">
              {description ? description.slice(0, 90) : ""}...
            </p>
            
            <a 
              href={newsUrl} 
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
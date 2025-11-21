import React, { Component } from 'react'

export class NewsItem extends Component {

  
  truncateDescription = (desc, wordLimit) => {
    if (!desc) return "";
    const words = desc.split(" ");
    if (words.length <= wordLimit) return desc;
    return words.slice(0, wordLimit).join(" ") + "... ";
  }

  render() {
    let { title, description, imageUrl, newsUrl, theme, date } = this.props;

  
    let truncatedDescription = this.truncateDescription(description, 20);

    let formattedDate = new Date(date).toLocaleDateString('en-IN', {
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
      <div className="h-100 my-3">
      
        <a 
            href={newsUrl} 
            target='_blank' 
            rel="noreferrer" 
            className="text-decoration-none text-reset d-block h-100 news-card-hover"
            style={{perspective: '1000px'}}
        >
            <div className={`card h-100 shadow-sm ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light border-secondary'}`} style={{borderRadius: '15px', overflow: 'hidden', transition: 'transform 0.3s'}}>
            
            <div style={{ position: 'relative' }}>
                <img 
                    src={!imageUrl ? "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2246192352.jpg?c=16x9&q=w_800,c_fill" : imageUrl} 
                    className="card-img-top" 
                    alt="..." 
                    style={{height: '200px', objectFit: 'cover'}} 
                />
                <span className="position-absolute top-0 end-0 badge rounded-pill bg-danger m-2" style={{zIndex: '1', fontSize: '0.8rem'}}>
                    {new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
            </div>
            
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{title}</h5>
                
                
                <p className="card-text flex-grow-1">
                {truncatedDescription}
                </p>
          
                <p className="card-text">
                    <small className={`text-${theme === 'light' ? 'muted' : 'secondary'}`}>
                    Is : {formattedDate}
                    </small>
                </p>

               
                <div className={`btn btn-sm mt-auto w-100 ${theme === 'light' ? 'btn-primary' : 'btn-outline-light'}`} style={{borderRadius: '20px', pointerEvents: 'none'}}> 
                    Read More &rarr;
                </div>
            </div>
            </div>
        </a>
      </div>
    )
  }
}

export default NewsItem
import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component { // Capital 'N' का ध्यान रखें

  
 
 constructor() {
    super();
    console.log("hello i am constructor from news component");
    this.state = {
      articles: [], 
      loading: false
    }
  }

async componentDidMount() {
   
let url = "https://newsdata.io/api/1/latest?apikey=pub_1136e01a11c34ae482238053f60f2961&q=ind&language=en";
    
    try {
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData); 
        this.setState({ 
            articles: parsedData.results ? parsedData.results : [],
            loading: false
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines</h2>
      <div className="row">
    {this.state.articles && this.state.articles.map((element) => {
        return <div className='col-md-4' key={element.link}>
            <NewsItem 
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                imageUrl={element.image_url}
                newsUrl={element.link} 
            />
        </div>
    })}
</div>
        
      </div>
    )
  }
}

export default News
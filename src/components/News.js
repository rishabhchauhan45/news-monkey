import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor() {
        super();
        console.log("hello i am constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1, 
            nextPage: null
        }
    }

    async componentDidMount() {
    
    let url = `https://newsdata.io/api/1/latest?apikey=pub_1136e01a11c34ae482238053f60f2961&q=ind&language=enpageSize=30`;
    
    try {
        let data = await fetch(url);
        let parsedData = await data.json();

      
        this.setState({
            articles: parsedData.results ? parsedData.results : [],
            nextPage: parsedData.nextPage, 
            loading: false
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

    handlePrevClick = async () => {
        console.log("previous");
        let url = `https://newsdata.io/api/1/latest?apikey=pub_1136e01a11c34ae482238053f60f2961&q=ind&language=en&page=${this.state.page - 1}&pageSize-30`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.results
        });
    }

    handleNextClick = async () => {
        console.log("Next button clicked");
        let url = `https://newsdata.io/api/1/latest?apikey=pub_1136e01a11c34ae482238053f60f2961&q=ind&language=en&page=${this.state.page + 1}&pageSize-30`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page + 1,
            articles: parsedData.results
        });
    }

   
    render() {
        console.log("render");
        return (
            <div className="container my-3">
            <h1 className="text-center"> NewsMonkey - Top Headlines</h1>

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
                <div className="container d-flex justify-content-between">
                   
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
} 
export default News
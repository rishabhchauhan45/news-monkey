import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        category: 'top',
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            nextPage: null, 
            totalArticles: 0
        }
    }
    async fetchNews(pageNumberOrToken = null) {
    
        if (!pageNumberOrToken) {
             this.setState({ loading: true });
        }

      
        const apiKey = "pub_1136e01a11c34ae482238053f60f2961"; 
      
        let category = this.props.category;
        if (category === 'general') {
            category = 'top';
        }
        
     
        let url = `https://newsdata.io/api/1/latest?apikey=pub_1136e01a11c34ae482238053f60f2961&q=india%20news&language=en`;
        
       
        if(category) url += `&category=${category}`;
        
        
        if (pageNumberOrToken) {
            url += `&page=${pageNumberOrToken}`;
        }

        console.log("Fetching URL:", url);

        try {
            let data = await fetch(url);
            let parsedData = await data.json();

            console.log("API Response:", parsedData);

            if (parsedData.results) {
                const newArticles = this.state.articles.concat(parsedData.results);
                
                this.setState({
                    articles: newArticles,
                    nextPage: parsedData.nextPage,
                    loading: false,
                    totalArticles: newArticles.length
                });
            } else {
                console.error("API Error or no results:", parsedData.message || "Unknown error");
                this.setState({ loading: false, nextPage: null });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        this.fetchNews();
    }

    fetchMoreData = () => {
        if (this.state.nextPage) {
            this.fetchNews(this.state.nextPage);
        } else {
            this.setState({ loading: false });
        }
    };

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top Headlines</h1>

               
                {this.state.loading && this.state.articles.length === 0 && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.nextPage !== null}
                    loader={<Spinner />}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <div className="container"> 
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.link || Math.random()}>
                                    <NewsItem
                                        title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        imageUrl={element.image_url}
                                        newsUrl={element.link}
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News;
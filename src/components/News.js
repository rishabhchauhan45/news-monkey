import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        category: 'general',
        searchTerm: '',
        theme: 'light'
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        searchTerm: PropTypes.string,
        theme: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            nextPage: null,
            totalArticles: 0,
            error: null
        }
    }

    async fetchNews(pageNumberOrToken = null) {
        this.setState({ error: null });

        if (!pageNumberOrToken) {
             this.setState({ articles: [], loading: true });
        } else {
             this.setState({ loading: true });
        }

        const apiKey = "pub_1136e01a11c34ae482238053f60f2961";
        
        let url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=en`;
        
        // Country parameter
        if (this.props.country) {
            url += `&country=${this.props.country}`;
        }

        // Category or Search Term as 'q' parameter or 'category' parameter
        if (this.props.searchTerm) {
            // If there's a search term, use it as the main query 'q'
            url += `&q=${encodeURIComponent(this.props.searchTerm)}`;
        } else {
            // If no search term, try to use NewsData.io's 'category' parameter directly
            // NewsData.io has a specific list of categories.
            // If the current category is 'general', we can use a generic query 'q'
            // rather than a specific 'category' parameter which might be restrictive.
            
            const newsDataIoCategories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
            
            if (this.props.category === 'general') {
                url += `&q=${encodeURIComponent('latest news')}`; // Generic query for home/general
            } else if (newsDataIoCategories.includes(this.props.category)) {
                // If our category matches NewsData.io's list, use their 'category' parameter
                url += `&category=${this.props.category}`;
            } else {
                // Fallback: if category is not general and not in NewsData.io's list, use it as 'q'
                url += `&q=${encodeURIComponent(this.props.category + ' news')}`; 
            }
        }

        if (pageNumberOrToken) {
            url += `&page=${pageNumberOrToken}`;
        }
        
        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            
            if (parsedData.results && parsedData.results.length > 0) {
                const newArticles = pageNumberOrToken ? this.state.articles.concat(parsedData.results) : parsedData.results;
                
                this.setState({
                    articles: newArticles,
                    nextPage: parsedData.nextPage,
                    loading: false,
                    totalArticles: newArticles.length
                });
            } else {
                this.setState({ 
                    articles: [], 
                    loading: false, 
                    nextPage: null, 
                    error: "Oops! No news available for this category or country. Please try selecting another option."
                });
            }
        } catch (error) {
            this.setState({ 
                articles: [], 
                loading: false, 
                nextPage: null, 
                error: "An error occurred while fetching news. Please check your internet connection or try again later." 
            });
        }
    }

    componentDidMount() {
        this.fetchNews();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category || this.props.searchTerm !== prevProps.searchTerm || this.props.country !== prevProps.country) {
            this.fetchNews();
        }
    }

    fetchMoreData = () => {
        if (this.state.nextPage) {
            this.fetchNews(this.state.nextPage);
        } else {
            this.setState({ loading: false });
        }
    };

    render() {
        let { theme } = this.props;
        // Determine the title based on search term, category and country
        let displayTitle = "Top ";
        if (this.props.searchTerm) {
            displayTitle += `Search Results for "${this.props.searchTerm}"`;
        } else if (this.props.category === 'general') {
            displayTitle += `General`;
        } else {
            displayTitle += `${this.props.category}`;
        }
        displayTitle += ` Headlines in ${this.props.country.toUpperCase()}`;


        return (
            <div className={`container my-3 text-${theme === 'light' ? 'dark' : 'light'}`}>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - {displayTitle}</h1>
                
                {this.state.loading && this.state.articles.length === 0 && !this.state.error && <Spinner />}
                
                {this.state.error && (
                    <div className="alert alert-danger text-center" role="alert">
                        <h4 className="alert-heading">NewsMonkey - Error</h4>
                        <p>{this.state.error}</p>
                        <hr />
                        <p className="mb-0">Please try selecting another option.</p>
                    </div>
                )}

                {!this.state.error && this.state.articles.length === 0 && !this.state.loading && (
                     <div className="alert alert-info text-center" role="alert">
                        <h4 className="alert-heading">No News Found!</h4>
                        <p>It seems there are no news articles available for your current selection. Please try a different category, country, or search term.</p>
                    </div>
                )}
                
                {!this.state.error && this.state.articles.length > 0 && (
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
                                            theme={theme}
                                        />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                )}
            </div>
        );
    }
}

export default News;

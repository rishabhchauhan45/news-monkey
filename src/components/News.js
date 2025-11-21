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

        // ✅✅✅ यहाँ पर नयी API KEY है ✅✅✅
        const apiKey = "pub_d0458dce84234eb791b9b3021216ede2";
        
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
            
            if (parsedData.status === 'error') {
                 throw new Error(parsedData.message || "API Error");
            }

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
                error: error.message || "An error occurred while fetching news. Please check your internet connection or try again later." 
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
        
        return (
            <div className={`container my-3 text-${theme === 'light' ? 'dark' : 'light'}`}>
                
                {/* ✅✅✅ नई हेडिंग (बैज स्टाइल) यहाँ है ✅✅✅ */}
                <h1 className="text-center my-4 d-flex align-items-center justify-content-center flex-wrap gap-2" style={{margin: '35px 0px'}}>
                  <span className="fw-bold" style={{color: theme === 'light' ? '#0d6efd' : '#6ea8fe'}}>NewsMonkey:</span>
                  
                  {this.props.searchTerm ? (
                      // अगर सर्च किया गया है तो ऐसा दिखेगा
                      <>
                        <span>Search Results for</span>
                        <span className="badge rounded-pill bg-warning text-dark px-3 py-2" style={{fontSize: '1rem'}}>
                            "{this.props.searchTerm}"
                        </span>
                      </>
                  ) : (
                      // अगर कैटेगरी है तो ऐसा दिखेगा
                      <>
                        <span>Top</span>
                        {/* कैटेगरी बैज */}
                        <span className="badge rounded-pill bg-primary px-3 py-2 text-capitalize" style={{fontSize: '1rem'}}>
                            {this.props.category === 'general' ? 'General' : this.props.category}
                        </span>
                        <span>Headlines</span>
                      </>
                  )}
                  
                  <span>in</span>
                  
                  {/* कंट्री बैज */}
                 {/* कैटेगरी बैज - fw-bold जोड़ा गया */}
<span className="badge rounded-pill bg-primary px-3 py-2 text-capitalize fw-bold" style={{fontSize: '1rem'}}>
    {this.props.category === 'general' ? 'General' : this.props.category}
</span>
                </h1>
                {/* ✅✅✅ नई हेडिंग ख़त्म ✅✅✅ */}

                
                {this.state.loading && this.state.articles.length === 0 && !this.state.error && <Spinner />}
                
                {this.state.error && (
                    <div className="alert alert-danger text-center" role="alert">
                        <h4 className="alert-heading">NewsMonkey - Error</h4>
                        <p>{this.state.error}</p>
                        <hr />
                        <p className="mb-0">Please try selecting another option (Country/Category) or check back later.</p>
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
                                    return <div className="col-md-4 mb-4" key={element.link || Math.random()}>
                                        <NewsItem
                                            title={element.title ? element.title : ""}
                                            description={element.description ? element.description : ""}
                                            imageUrl={element.image_url}
                                            newsUrl={element.link}
                                            theme={theme}
                                            date={element.pubDate}
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
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in', // यह अब NewsData.io के 'q' पैरामीटर में ही इस्तेमाल होगा
        pageSize: 8,
        category: 'general', // यह भी 'q' पैरामीटर में इस्तेमाल होगा
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        console.log("hello i am constructor from news component");
        this.state = {
            articles: [],
            loading: true,
            page: 1, // UI के लिए पेज नंबर
            nextPage: null, // NewsData.io का pagination टोकन
            totalResults: 0 // NewsData.io direct totalResults नहीं देता, इसलिए यह 0 ही रहेगा
        }
    }

    // नया fetchNews फंक्शन NewsData.io API के लिए
    async fetchNews(pageNumberOrToken = null) { // pageNumberOrToken अब NewsData.io का nextPage टोकन होगा
        this.setState({ loading: true });

        // NewsData.io के लिए query string बनाएँ
        // हम props.country और props.category को 'q' पैरामीटर में शामिल करेंगे
        // आप यहाँ अपनी पसंद के देशों को 'q' में जोड़ सकते हैं।
        let query = `${this.props.category}`; // category को query में शामिल करें
        
        // मल्टीपल कंट्रीज़ के लिए:
        let countriesForQuery = "ind,us,uk,pak,china"; // यहाँ लिस्ट बना दी है
        if (query) {
            query += ` ${countriesForQuery}`; // category और countries को एक साथ जोड़ें
        } else {
            query = countriesForQuery;
        }

        // NewsData.io URL
        // `page=` पैरामीटर में `nextPage` टोकन का उपयोग करें
        let url = `https://newsdata.io/api/1/latest?apikey=pub_1136e01a11c34ae482238053f60f2961&q=${encodeURIComponent(query)}&language=en`;
        if (pageNumberOrToken) {
            url += `&page=${pageNumberOrToken}`; // अगर nextPage टोकन है, तो उसे जोड़ें
        }
        
        console.log("Fetching URL:", url); // URL को कंसोल में देखें

        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            
            console.log("API Response:", parsedData);

            this.setState({
                articles: parsedData.results ? parsedData.results : [],
                nextPage: parsedData.nextPage, // NewsData.io से मिलने वाला अगला पेज टोकन
                // NewsData.io में direct totalResults नहीं होता, इसलिए इसे अपडेट नहीं कर सकते
                // totalResults: parsedData.totalResults, // अगर API ये देता तो अपडेट करते
                loading: false
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ loading: false });
        }
    }

    async componentDidMount() {
        this.fetchNews(); // पहली बार बिना nextPage टोकन के कॉल करें
    }

    handlePrevClick = async () => {
        console.log("Previous button clicked");
        // NewsData.io के साथ 'previous page' फंक्शनैलिटी थोड़ी मुश्किल है क्योंकि यह
        // सीधे previous page token नहीं देता।
        // अभी के लिए, हम सिर्फ UI के पेज नंबर को घटा रहे हैं।
        this.setState(prevState => ({
            page: Math.max(1, prevState.page - 1)
        }));
        // अगर आपको पिछली खबरें सच में चाहिए, तो आपको पिछले 'nextPage' टोकन को कहीं स्टोर करना होगा।
        // या आप 'q' को फिर से fetchNews में पास करके रीलोड कर सकते हैं।
    }

    handleNextClick = async () => {
        console.log("Next button clicked");
        if (this.state.nextPage) { // अगर nextPage टोकन है तो ही आगे बढ़ें
            this.fetchNews(this.state.nextPage); // अगले पेज का टोकन पास करें
            this.setState(prevState => ({
                page: prevState.page + 1 // UI के लिए पेज नंबर बढ़ाएँ
            }));
        } else {
            console.log("No more pages available!");
        }
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top Headlines</h1>
                
                {this.state.loading && <Spinner />}
                
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.link || element.title}>
                            <NewsItem
                                title={element.title ? element.title : ""}
                                description={element.description ? element.description : ""}
                                // NewsData.io में image_url होता है, urlToImage नहीं
                                imageUrl={element.image_url}
                                newsUrl={element.link} // NewsData.io में link होता है, url नहीं
                            />
                        </div>
                    })}
                </div>
                
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    {/* Next बटन को तब तक disabled रखें जब nextPage टोकन न हो */}
                    <button disabled={!this.state.nextPage} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News;
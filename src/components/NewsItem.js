import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    return (
      <div>
        this is a news item
        <NewsItem/>
      </div>
    )
  }
}

export default NewsItem

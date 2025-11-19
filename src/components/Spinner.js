

import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      // 'text-center' क्लास इसे हॉरिजॉन्टली सेंटर कर देगी
      <div className="text-center my-3"> 
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
}

export default Spinner
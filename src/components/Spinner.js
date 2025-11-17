import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        {/* हमने लोकल 'loading.gif' को इम्पोर्ट करना हटा दिया है,
            और 'src' में सीधे एक इंटरनेट लिंक डाल दिया है */}
        <img 
          src="loading"
          alt="loading" 
          style={{width: "30px"}} // ये स्टाइल GIF का साइज छोटा रखने के लिए है
        />
      </div>
    )
  }
}

export default Spinner
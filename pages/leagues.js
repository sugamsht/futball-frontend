import React from 'react'
import Script from 'next/script'

export default function leagues() {
  return (
<>
        <Script src='https://widgets.sociablekit.com/instagram-stories/widget.js' async defer> </Script>
    <div className='sk-ww-instagram-stories' data-embed-id='151272'></div>
</>
  )
}

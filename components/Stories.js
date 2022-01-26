import React from 'react'
import Story from './Story'

function Stories() {

    if (typeof window !== 'undefined') {
        document.getElementsByClassName('chimai').onClick = () => { console.log("Chimai") };
    }

    const story2 = [
        {
            url: 'https://images.unsplash.com/photo-1546608235-3310a2494cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=638&q=80',
        },
    ];

    const story1 = [
        {
            url: 'https://images.unsplash.com/photo-1570498839593-e565b39455fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
        },
    ];

    // <script src="../lib/cDg-min.js"></script>
    return (
        <div className='flex flex-1 items-center justify-start h-60 w-full bg-red-400 my-2 overflow-x-scroll overflow-y-hidden scrollbar-hide ' id='chimai'>
            <Story storyIndex={0} />
            <Story storyIndex={1} />
            <Story storyIndex={2} />
            <Story storyIndex={3} />
        </div>
    )
}

export default Stories

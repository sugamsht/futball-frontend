import React from 'react'
import Story from './Story'

function Stories() {
    return (
        <div className='flex flex-1 items-center justify-start h-60 w-screen bg-red-400 m-2 overflow-x-scroll overflow-y-hidden scrollbar-hide '>
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
        </div>
    )
}

export default Stories

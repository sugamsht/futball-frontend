import React from 'react'
import Result from './Result'

function Results() {
    return (
        <div className='bg-pink-300 flex flex-1 items-center justify-start w-full h-40 m-2 overflow-x-scroll overflow-y-hidden scrollbar-hide'>
            <Result />
            <Result />
            <Result />
            <Result />
            <Result />
            <Result />
            <Result />
        </div>
    )
}

export default Results

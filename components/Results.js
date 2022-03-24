import Result from './Result'
import React from 'react';

function Results({ result }) {

    const displayResults = 5;
    var leng = result.length;
    const showResult = result.slice(leng - displayResults, leng).reverse();

    return (
        <div className='px-2 bg-pink-300 flex flex-1 items-center justify-start w-full h-40 py-2 overflow-x-scroll overflow-y-hidden scrollbar-hide'>
            {
                showResult.map((result, index) => (
                    <Result result={result.fixtureResult} key={index} score1={result.score[0]} score2={result.score[1]} />
                ))}
        </div>
    )
}

export default Results

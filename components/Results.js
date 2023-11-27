import Result from './Result';
import React from 'react';

function Results({ results }) {
    // console.log("yo results ma aako", results[0].tournament_title);
    const displayResults = 5;

    // Make sure the results array is not null or undefined
    const showResults = results && results.length > 0
        ? results.slice(-displayResults).reverse()
        : [];

    return (
        <div className='px-2 bg-pink-300 flex flex-1 items-center justify-start w-full h-40 py-2 overflow-x-scroll overflow-y-hidden scrollbar-hide'>
            {showResults.map((result, index) => (
                <Result key={index} result={result?.fixtureResult} score1={result?.score[0]} score2={result?.score[1]} tournamentTitle={result?.tournament_title} />
            ))}
        </div>
    );
}

export default Results;

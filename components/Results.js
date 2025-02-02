import Result from './Result';
import React from 'react';

function Results({ results }) {
    const displayResults = 5;
    const showResults = results?.length > 0
        ? results.slice(-displayResults).reverse()
        : [];

    return (
        <div className='px-4 py-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl shadow-2xl'>
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-lg md:text-xl font-bold mb-4 md:mb-6 ml-2">
                Recent Results
            </h2>
            <div className='flex space-x-3 md:space-x-4 lg:space-x-6 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 px-2'>
                {showResults.map((result, index) => (
                    <Result
                        key={index}
                        result={result?.fixtureResult}
                        score1={result?.score[0]}
                        score2={result?.score[1]}
                        tournamentTitle={result?.tournament_title}
                    />
                ))}
            </div>
        </div>
    );
}

export default Results;
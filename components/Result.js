import React from 'react';

function Result({ tournamentTitle, result, score1, score2 }) {
    var postponed = false;
    if (score1 < 0 || score2 < 0) {
        postponed = true;
        score1 = '...';
        score2 = '...';
    }

    return (
        <div className="flex items-center justify-start w-full h-full m-2">
            <div className="relative w-28 lg:w-full h-36 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 h-full w-full bg-[#2785D5]"></div>
                <div className="relative h-full w-full flex justify-center items-center">
                    <div className='text-center'>
                        {postponed && <p className="text-sm md:text-lg 2xl:text-xl font-bold text-black-500">Postponed</p>}

                        {tournamentTitle && (
                            <p className="text-xs md:text-sm 2xl:text-lg font-bold text-green-400">{tournamentTitle}</p>
                        )}

                        <h2 className="w-full h-full text-sm md:text-base 2xl:text-xl font-bold tracking-tight text-white ">
                            {result.split(' vs ')[0]} <p className='text-yellow-200 inline'>{score1}</p> <br />
                            {result.split(' vs ')[1]} <p className='text-yellow-200 inline'>{score2}</p>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;

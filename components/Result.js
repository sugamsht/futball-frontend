import React from 'react'

function Result({ result, score1, score2 }) {
    var postponed = false;
    if (score1 < 0 || score2 < 0) {
        postponed = true;
        score1 = '...'
        score2 = '...'
    }

    return (
        <div className="flex items-center justify-start w-full h-full m-2">
            <div className="relative w-28 lg:w-full h-36 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 h-full w-full bg-[#2785D5]" ></div>
                <div className="relative h-full w-full flex justify-center items-center">
                    <div className='text-center'>
                        {postponed && <p className="font-bold text-xl text-black-500">Postponed due to Corona</p>}

                        <h2 className="w-full h-full text-sm md:text-md lg:text-lg 2xl:text-xl font-semibold tracking-tight text-white ">
                            {result.split(' vs ')[0]} <p className='text-yellow-200 inline'>{score1}</p> <br />
                            {result.split(' vs ')[1]} <p className='text-yellow-200 inline'>{score2}</p>
                        </h2>

                        {/* <p className="font-extralight text-white"> Ghar maa </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result

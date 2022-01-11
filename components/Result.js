import React from 'react'

function Result({ result, score1, score2 }) {
    return (
        <div className="flex items-center justify-start w-full h-full m-2">
            <div className="relative w-28 lg:w-full h-36 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 h-full w-full bg-[#2699FB]" ></div>
                <div className="relative h-full w-full flex justify-center items-center">
                    <div className='text-center'>
                        <p className="font-bold text-white">Results</p>
                        <h2 className="w-full h-full text-sm md:text-md lg:text-xl font-semibold tracking-tight text-white ">
                            {result.split(' vs ')[0]} {score1} <br />
                            {result.split(' vs ')[1]} {score2}
                        </h2>
                        {/* <p className="font-extralight text-white"> Ghar maa </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result

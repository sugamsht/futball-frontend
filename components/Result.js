import React from 'react'

function Result() {
    return (
        <div className="flex items-center justify-start w-full h-full m-2">
            <div className="relative w-28 lg:w-full h-36 overflow-hidden rounded-3xl">
                <img
                    src="https://lh3.ggpht.com/p/AF1QipOm6RtYU_9B9HqdC2VBA5qAhHHpu7SEjcjTMmpY=s512"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-bottom"
                />
                <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-black/75" ></div>
                <div className="relative h-full w-full flex justify-center items-center">
                    <div className='text-center'>
                        <p className="font-bold text-white">Results</p>
                        <h2 className="w-full h-full text-sm md:text-1xl lg:text-2xl font-semibold tracking-tight text-white ">
                            Liverpool 1 <br />
                            Tottenham 1 <br />
                        </h2>
                        <p className="font-extralight text-white"> Ghar maa </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result

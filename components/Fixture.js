import React from 'react'
// import logo from '../assets/apf_logo.png'

function Fixture({ team1, team2, time, date }) {
    return (
        <div className='justify-start items-start w-full h-10 bg-gray-700 text-black my-2 overflow-hidden'>
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-2 items-start">
                    <div
                        className="flex justify-center text-2xl col-span-2 border-1 rounded-xl p-1 bg-gray-100"
                    >
                        {date.split(' ')[1]} {date.split(' ')[2]}, {time}
                    </div>
                    <div
                        className="flex justify-left text-2xl col-span-4 border-1 rounded-xl p-1 bg-gray-100"
                    >
                        <div className='grid grid-flow-col'>
                            <img className='w-9 h-9 rounded items-center mr-4' src='./apf_logo.png' />
                            <p>{team1}</p>
                        </div>
                    </div>
                    <div
                        className="flex justify-center text-2xl col-span-1 border-1 rounded-xl p-1 bg-gray-100"
                    >
                        -
                    </div>
                    <div
                        className="flex justify-left text-2xl col-span-4 border-1 rounded-xl p-1 bg-gray-100"
                    >
                        <div className='grid grid-flow-col'>
                            <img className='w-9 h-9 rounded items-center mr-4' src='./apf_logo.png' />
                            <p>{team2}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fixture

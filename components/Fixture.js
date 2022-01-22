import React from 'react'


function Fixture({ team1, team2, time, date }) {
    var short1 = team1.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')
    var short2 = team2.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')
    return (
        <div className='justify-center items-center w-full h-auto bg-gray-700 text-white my-2 overflow-hidden'>
            <div className="container">
                <div className="grid grid-cols-12 gap-0 md:gap-4 items-center text-xl">
                    <div
                        className="flex justify-center items-center text-black col-span-2 border-1 rounded-xl p-1 bg-gray-100"
                    >
                        {date.split(' ')[1]} {date.split(' ')[2]}, {time}
                    </div>
                    <div
                        className="flex justify-center md:justify-start items-start md:items-center col-span-4 border-1 rounded-xl ml-2 lg:ml-[4rem]"
                    >
                        <img className='w-9 h-9 rounded items-center mr-2 lg:mr-4' src='./apf_logo.png' />
                        <div className='grid grid-flow-col'>
                            <p className='flex md:hidden justify-start items-center'>{short1}</p>
                            <p className='hidden md:block'>{team1}</p>
                        </div>
                    </div>
                    <div
                        className="flex justify-center items-center text-black text-xl col-span-1 border-1 rounded-xl md:p-[0.2rem] md:bg-gray-100"
                    >
                        -
                    </div>
                    <div
                        className="flex justify-center md:justify-start items-start md:items-center col-span-4 border-1 rounded-xl ml-2 lg:ml-[4rem]"
                    >
                        <img className='w-9 h-9 rounded items-center mr-2 lg:mr-4' src='./apf_logo.png' />
                        <div className='grid grid-flow-col'>
                            <p className='flex md:hidden justify-start items-center'>{short2}</p>
                            <p className='hidden md:block'>{team2}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fixture

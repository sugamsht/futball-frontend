import React from 'react'

function Fixture({ team1, team2, time, date }) {
    const short1 = team1.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')
    const short2 = team2.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')

    // Create a new Date object from the date prop
    const dateObj = new Date(date);

    // Format the date without the year
    const formattedDate = `${dateObj.toLocaleString('default', { month: 'long' })} ${dateObj.getDate()}`;

    return (
        <div className='flex justify-center items-center w-full h-auto bg-gray-800 text-white my-4 overflow-hidden hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-lg'>
            <div className="container">
                <div className="grid grid-cols-12 gap-0 md:gap-6 items-center text-2xl">
                    <div
                        className="flex justify-center items-center text-black col-span-2 rounded-xl p-4 bg-gray-200"
                    >
                        {`${formattedDate}`}
                    </div>
                    <div
                        className="flex justify-center md:justify-start items-start md:items-center col-span-4 rounded-xl lg:ml-[6rem]"
                    >
                        <img className='w-12 h-12 rounded items-center mr-3 lg:mr-6' src='./Nepal_Super_League_logo.png' />
                        <div className='grid grid-flow-col'>
                            <p className='flex md:hidden justify-start items-center'>{short1}</p>
                            <p className='hidden md:block'>{team1}</p>
                        </div>
                    </div>
                    <div
                        className="flex justify-center items-center text-black text-2xl col-span-1 rounded-xl md:p-[0.4rem] md:bg-gray-200"
                    >
                        {time}
                    </div>
                    <div
                        className="flex justify-center md:justify-start items-start md:items-center col-span-4 rounded-xl lg:ml-[4rem] 2xl:ml-[6rem]"
                    >
                        <img className='w-12 h-12 rounded items-center mr-3 lg:mr-6' src='./Nepal_Super_League_logo.png' />
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
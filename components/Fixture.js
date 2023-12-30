import React from 'react'

const Team = ({ shortName, fullName, logo }) => (
    <div className="flex justify-center md:justify-center items-start md:items-center col-span-4 rounded-xl">
        <img className='w-8 md:w-12 h-8 md:h-12 rounded items-center' src={logo} />
        <div className='grid grid-flow-col'>
            <p className='flex md:hidden justify-start items-center'>{shortName}</p>
            <p className='hidden md:block'>{fullName}</p>
        </div>
    </div>
);
function Fixture({ team1, team2, time, date }) {
    const short1 = team1.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')
    const short2 = team2.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')

    // Create a new Date object from the date prop
    const dateObj = new Date(date);

    // Format the date without the year
    const formattedDate = `${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getDate()}`;
    const formattedDateFull = `${dateObj.toLocaleString('default', { month: 'long' })} ${dateObj.getDate()}`;

    return (
        <div className='flex justify-center items-center w-full h-auto bg-gray-800 text-white my-4 overflow-hidden hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-lg'>
            <div className="container">
                <div className="flex justify-start items-center text-xl md:text-2xl">
                    <div className="flex justify-start items-center text-black col-span-2 rounded-xl p-2 md:p-4 bg-gray-200">
                        <p className='lg:hidden'>{formattedDate}</p>
                        <p className='hidden lg:block'>{formattedDateFull}</p>
                    </div>
                    <div className='grid grid-cols-5 items-center w-full space-x-4'>
                        <div className='col-span-2'>
                            <Team shortName={short1} fullName={team1} logo='./Nepal_Super_League_logo.png' />
                        </div>
                        <div className="flex justify-center items-center text-white lg:text-black text-xl md:text-2xl rounded-xl lg:p-1 lg:bg-gray-200 col-span-1">
                            {time}
                        </div>
                        <div className='col-span-2'>
                            <Team shortName={short2} fullName={team2} logo='./Nepal_Super_League_logo.png' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fixture
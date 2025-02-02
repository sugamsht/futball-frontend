import React from 'react';

const Team = ({ shortName, fullName, logo }) => (
    <div className="flex items-center space-x-3 col-span-4">
        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white/20">
            <img
                className="w-full h-full object-cover"
                src={logo}
                alt={fullName}
            />
        </div>
        <div className="hidden md:flex flex-col">
            <span className="text-base font-semibold text-gray-100">{fullName}</span>
        </div>
    </div>
);

function Fixture({ team1, team2, time, date }) {
    const short1 = team1.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
    const short2 = team2.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');

    // Create a new Date object from the date prop
    const dateObj = new Date(date);

    // Format the date without the year
    const formattedDate = `${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getDate()}`;
    const formattedDateFull = `${dateObj.toLocaleString('default', { month: 'long' })} ${dateObj.getDate()}`;

    return (
        <div className="group relative w-full bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 
                       hover:bg-gray-700/30 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
                {/* Date Badge */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-md">
                    <p className="text-sm font-semibold">{formattedDate}</p>
                    <p className="hidden lg:block text-xs">{formattedDateFull}</p>
                </div>

                {/* Teams & Time */}
                <div className="flex-1 flex items-center justify-around px-4">
                    <Team shortName={short1} fullName={team1} logo='./Nepal_Super_League_logo.png' />

                    <div className="flex flex-col items-center mx-4">
                        <span className="text-sm text-gray-300">Kickoff</span>
                        <span className="text-xl font-bold text-emerald-400">{time}</span>
                    </div>

                    <Team shortName={short2} fullName={team2} logo='./Nepal_Super_League_logo.png' />
                </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 
                           group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        </div>
    );
}

export default Fixture;
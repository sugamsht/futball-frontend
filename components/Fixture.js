import React from 'react';

const Team = ({ fullName, logo, computedShortName }) => (
    <div className="flex items-center space-x-2 w-20 md:w-32">
        <div className="flex-none">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-lg border border-white/20">
                <img
                    className="w-full h-full object-cover"
                    src={logo}
                    alt={fullName}
                />
            </div>
        </div>
        <div className="flex-1">
            {/* On mobile devices (<md): text is hidden */}
            <span
                className="hidden md:inline lg:hidden text-sm font-semibold text-gray-100 truncate"
                title={fullName}
            >
                {computedShortName}
            </span>
            {/* On large screens (lg and above): show full name */}
            <span
                className="hidden lg:inline text-sm md:text-lg font-semibold text-gray-100 truncate"
                title={fullName}
            >
                {fullName}
            </span>
        </div>
    </div>
);

function Fixture({ team1, team2, time, date }) {
    // Compute shorthand names from team names.
    const short1 = team1.split(/\s/).reduce((acc, word) => acc + word.charAt(0), '');
    const short2 = team2.split(/\s/).reduce((acc, word) => acc + word.charAt(0), '');
    const dateObj = new Date(date);
    const formattedShortDate = `${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getDate()}`;
    const formattedFullDate = `${dateObj.toLocaleString('default', { month: 'long' })} ${dateObj.getDate()}`;

    return (
        <div className="group relative w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl transform transition-all hover:scale-105 hover:bg-white/20">
            <div className="flex items-center justify-between">
                {/* Date Badge */}
                <div className="flex-shrink-0 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full shadow-md">
                    <p className="block lg:hidden text-xs md:text-sm font-bold">{formattedShortDate}</p>
                    <p className="hidden lg:block text-[10px] md:text-xs tracking-wide">{formattedFullDate}</p>
                </div>

                {/* Teams & Time */}
                <div className="flex-1 flex items-center justify-around px-2 md:px-6">
                    <Team fullName={team1} computedShortName={short1} logo="./Nepal_Super_League_logo.png" />

                    <div className="flex flex-col items-center mx-2">
                        <span className="text-xs md:text-sm text-gray-200 uppercase tracking-wide">Kickoff</span>
                        <span className="text-xl md:text-2xl font-bold text-emerald-400">{time}</span>
                    </div>

                    <Team fullName={team2} computedShortName={short2} logo="./Nepal_Super_League_logo.png" />
                </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        </div>
    );
}

export default Fixture;
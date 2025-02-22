import React from 'react';
import Link from 'next/link';

const Team = ({ fullName, logo, computedShortName }) => (
    <div className="flex items-center space-x-2 w-20 md:w-32">
        <div className="flex-none">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-lg border border-white/20">
                <img
                    className="w-full h-full object-cover"
                    src={`./logo/${logo}`}
                    alt={fullName}
                />
            </div>
        </div>
        <div className="flex-1">
            <span
                className="hidden md:inline lg:hidden text-sm font-semibold text-gray-100 truncate"
                title={fullName}
            >
                {computedShortName}
            </span>
            <span
                className="hidden lg:inline text-sm md:text-lg font-semibold text-gray-100 truncate"
                title={fullName}
            >
                {fullName}
            </span>
        </div>
    </div>
);

function Fixture({ fixture }) {
    const { _id, homeTeam, awayTeam, matchDate, time, status, score } = fixture;

    const shortHome = homeTeam.name.split(/\s/).reduce((acc, word) => acc + word.charAt(0), '');
    const shortAway = awayTeam.name.split(/\s/).reduce((acc, word) => acc + word.charAt(0), '');

    const dateObj = new Date(matchDate);
    const formattedShortDate = `${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getDate()}`;
    const formattedFullDate = `${dateObj.toLocaleString('default', { month: 'long' })} ${dateObj.getDate()}`;

    return (
        <Link href={status === "Completed" ? `/results/${_id}` : `/fixtures/${_id}`}>
            <div className="block">
                <div className="group relative w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl transform transition-all hover:scale-105 hover:bg-white/20">
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full shadow-md">
                            <p className="block lg:hidden text-xs md:text-sm font-bold">{formattedShortDate}</p>
                            <p className="hidden lg:block text-[10px] md:text-xs tracking-wide">{formattedFullDate}</p>
                        </div>
                        <div className="flex-1 flex items-center justify-around px-2 md:px-6">
                            <Team
                                fullName={homeTeam.name}
                                computedShortName={shortHome}
                                logo={homeTeam.logo || "./Nepal_Super_League_logo.png"}
                            />
                            {status === "Completed" ? (
                                <div className="flex flex-col items-center mx-2">
                                    <span className="text-xs md:text-sm text-gray-200 uppercase tracking-wide">Score</span>
                                    <span className="text-xl md:text-2xl font-bold text-yellow-400">
                                        {score.home} - {score.away}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center mx-2">
                                    <span className="text-xs md:text-sm text-gray-200 uppercase tracking-wide">Kickoff</span>
                                    <span className="text-xl md:text-2xl font-bold text-emerald-400">{time}</span>
                                </div>
                            )}
                            <Team
                                fullName={awayTeam.name}
                                computedShortName={shortAway}
                                logo={awayTeam.logo || "./Nepal_Super_League_logo.png"}
                            />
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
            </div>
        </Link>
    );
}

export default Fixture;
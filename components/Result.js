import { useRouter } from 'next/router';

function Result({ tournamentTitle, homeTeamName, awayTeamName, score1, score2, id }) {
    const router = useRouter();
    const postponed = score1 < 0 || score2 < 0;

    const handleClick = () => {
        router.push(`/results/${id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="relative group flex-shrink-0 w-56 md:w-64 lg:w-72 h-32 md:h-36 cursor-pointer transition-all duration-300 hover:scale-105"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 rounded-2xl shadow-lg" />
            <div className="absolute inset-0.5 bg-gray-900/30 rounded-xl backdrop-blur-sm border border-white/10 p-3 md:p-4 lg:p-6">
                <div className="h-full flex flex-col justify-between space-y-2 md:space-y-3">
                    {postponed ? (
                        <div className="text-center flex items-center justify-center h-full">
                            <p className="text-base md:text-lg font-bold bg-gradient-to-r from-red-400 to-pink-400 text-transparent bg-clip-text">
                                Postponed
                            </p>
                        </div>
                    ) : (
                        <>
                            {tournamentTitle && (
                                <p className="text-xs md:text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                                    {tournamentTitle}
                                </p>
                            )}
                            <div className="space-y-2 md:space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm md:text-base font-medium text-white truncate">{homeTeamName}</span>
                                    <span className="text-lg md:text-xl font-bold text-yellow-400 ml-2 md:ml-3">{score1}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm md:text-base font-medium text-white truncate">{awayTeamName}</span>
                                    <span className="text-lg md:text-xl font-bold text-yellow-400 ml-2 md:ml-3">{score2}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Result;
import React, { useEffect, useState } from 'react';

const PointsTable = ({ points, tournaments }) => {
    const [selectedTournament, setSelectedTournament] = useState(tournaments[tournaments.length - 1]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (points) {
            const filteredPoints = points.filter(team => team.tournament_title === selectedTournament);
            const sortedData = [...filteredPoints].sort((a, b) => {
                if (a.points !== b.points) return b.points - a.points;
                return b.gd - a.gd;
            });
            setTableData(sortedData);
        }
    }, [selectedTournament, points]);

    const renderTableRows = () => {
        if (!tableData || tableData.length === 0) {
            return (
                <tr>
                    <td colSpan="8" className="py-6 text-center text-gray-400">
                        No data available for the selected tournament
                    </td>
                </tr>
            );
        }

        return tableData.map((itemData, index) => (
            <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                <td className="py-1 md:py-2 text-center font-medium text-emerald-400 text-xs md:text-sm">
                    {index + 1}
                </td>
                <td className="py-1 md:py-2 flex items-center space-x-2">
                    <div className="hidden md:block w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-700/50 overflow-hidden border border-white/10">
                        <img
                            src="./Nepal_Super_League_logo.png"
                            alt="Team Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="font-medium text-gray-100 text-xs md:text-sm truncate">
                        {itemData.team_name}
                    </span>
                </td>
                <td className="text-center py-1 md:py-2 text-gray-300 text-xs md:text-sm">
                    {itemData.played}
                </td>
                <td className="hidden md:table-cell text-center py-1 md:py-2 text-gray-300 text-xs md:text-sm">
                    {itemData.win}
                </td>
                <td className="hidden md:table-cell text-center py-1 md:py-2 text-gray-300 text-xs md:text-sm">
                    {itemData.draw}
                </td>
                <td className="hidden md:table-cell text-center py-1 md:py-2 text-gray-300 text-xs md:text-sm">
                    {itemData.lost}
                </td>
                <td className="hidden md:table-cell text-center py-1 md:py-2 font-medium text-cyan-400 text-xs md:text-sm">
                    {itemData.gd}
                </td>
                <td className="text-center py-1 md:py-2 font-semibold text-purple-400 text-xs md:text-sm">
                    {itemData.points}
                </td>
            </tr>
        ));
    };

    const tournamentsWithPoints = tournaments.filter(tournament =>
        points.some(team => team.tournament_title === tournament)
    );

    return (
        <div className='w-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl overflow-hidden'>
            <div className="p-0 md:p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-sm md:text-xl font-bold truncate">
                        League Standings
                    </h2>
                    {tournamentsWithPoints.length > 0 && (
                        <select
                            className="bg-gray-700/50 backdrop-blur-sm text-gray-100 px-2 py-1 md:px-4 md:py-2 rounded-lg 
                                     border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 text-xs md:text-sm"
                            value={selectedTournament}
                            onChange={(e) => setSelectedTournament(e.target.value)}
                        >
                            {tournamentsWithPoints.map((tournament, index) => (
                                <option
                                    key={index}
                                    value={tournament}
                                    className="bg-gray-800 text-gray-100 text-sm"
                                >
                                    {tournament}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 rounded-lg">
                    <table className="w-full min-w-[400px] md:min-w-full">
                        <thead className="bg-gray-700/50 backdrop-blur-sm">
                            <tr>
                                <th className="px-2 md:px-4 py-1 md:py-2 text-left text-xs md:text-sm font-semibold text-cyan-400">POS</th>
                                <th className="pl-2 md:pl-1 py-1 md:py-2 text-left text-xs md:text-sm font-semibold text-cyan-400">TEAM</th>
                                <th className="px-2 md:px-2 py-1 md:py-2 text-center text-xs md:text-sm font-semibold text-cyan-400">PLD</th>
                                <th className="hidden md:table-cell px-2 md:px-4 py-1 md:py-2 text-center text-xs md:text-sm font-semibold text-cyan-400">WON</th>
                                <th className="hidden md:table-cell px-2 md:px-4 py-1 md:py-2 text-center text-xs md:text-sm font-semibold text-cyan-400">DRN</th>
                                <th className="hidden md:table-cell px-2 md:px-4 py-1 md:py-2 text-center text-xs md:text-sm font-semibold text-cyan-400">LST</th>
                                <th className="hidden md:table-cell px-2 md:px-4 py-1 md:py-2 text-center text-xs md:text-sm font-semibold text-cyan-400">GD</th>
                                <th className="px-2 md:px-4 py-1 md:py-2 text-center text-xs md:text-sm font-semibold text-cyan-400">PTS</th>
                            </tr>
                        </thead>
                        <tbody>{renderTableRows()}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PointsTable;
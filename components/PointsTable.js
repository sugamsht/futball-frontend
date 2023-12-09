import React, { useEffect, useState } from 'react';

const PointsTable = ({ points, tournaments }) => {
    const [selectedTournament, setSelectedTournament] = useState(tournaments[tournaments.length - 1]);
    const [tableData, setTableData] = useState('');

    useEffect(() => {
        // Check if points is truthy before proceeding
        if (points) {
            // Filter points based on the selected tournament
            const filteredPoints = points.filter(team => team.tournament_title === selectedTournament);
            // Sort the filtered points
            const sortedData = [...filteredPoints].sort((a, b) => {
                if (a.points < b.points) {
                    return 1;
                } else if (a.points > b.points) {
                    return -1;
                }
                // Sort by gd
                if (a.gd < b.gd) {
                    return 1;
                } else if (a.gd > b.gd) {
                    return -1;
                } else {
                    return 0;
                }
            });

            // Update the state with the sorted data
            setTableData(generateTable(sortedData));
        }
    }, [selectedTournament, points]);


    const generateTable = (points) => {
        if (points.length === 0) {
            return (
                <tr>
                    <td colSpan="8" className="text-center">No data available for the selected tournament</td>
                </tr>
            );
        }

        return points.map((itemData, index) => (
            <tr key={index}>
                <td className='mr-9 text-center'>{index + 1}</td>
                <td className='pl-3'>{itemData.team_name}</td>
                <td className='text-center'>{itemData.played}</td>
                <td className='md:hidden 2xl:table-cell text-center'>{itemData.win}</td>
                <td className='md:hidden 2xl:table-cell text-center'>{itemData.draw}</td>
                <td className='md:hidden 2xl:table-cell text-center'>{itemData.lost}</td>
                <td className='text-center'>{itemData.gd}</td>
                <td className='text-center'>{itemData.points}</td>
            </tr>
        ));
    };

    // Filter tournaments with corresponding points
    const tournamentsWithPoints = tournaments.filter(tournament =>
        points.some(team => team.tournament_title === tournament)
    );

    return (
        <div className='sm:flex-wrap md:block col-span-6 md:col-span-2 w-auto h-[30rem] my-2 bg-gray-700 '>
            <div className="text-white h-full bg-gray-800 overflow-scroll scrollbar-hide">
                <div className="py-2 xl:py-4">
                    {/* Add the dropdown menu to select the tournament */}
                    {tournamentsWithPoints.length > 0 && (
                        <select
                            className="text-white bg-gray-800 p-1 border-none outline-none"
                            value={selectedTournament}
                            onChange={(e) => setSelectedTournament(e.target.value)}
                        >
                            {tournamentsWithPoints.map((tournament, index) => (
                                <option key={index} value={tournament}>
                                    {tournament}
                                </option>
                            ))}
                        </select>
                    )}
                    <div className="max-w-screen-xl px-2 mx-auto">
                        <table className="w-full md:text-xs lg:text-sm xl:text-base">
                            <thead>
                                <tr className="border-b border-gray-600">
                                    <th className="text-left p-1 pb-2">&nbsp;</th>
                                    <th className="text-left p-1 pb-2 pl-3"><abbr title="Teams in Competition">TEAM</abbr></th>
                                    <th className="text-left p-1 pb-2"><abbr title="Games Played">PLD</abbr></th>
                                    <th className="md:hidden 2xl:table-cell text-left p-1 pb-2"><abbr title="Games Won">WON</abbr></th>
                                    <th className="md:hidden 2xl:table-cell text-left p-1 pb-2"><abbr title="Games Drawn">DRN</abbr></th>
                                    <th className="md:hidden 2xl:table-cell text-left p-1 pb-2"><abbr title="Games Lost">LST</abbr></th>
                                    <th className="text-left p-1 pb-2"><abbr title="Goal Difference">GD</abbr></th>
                                    <th className="text-left p-1 pb-2"><abbr title="Points">PTS</abbr></th>
                                </tr>
                            </thead>
                            <tbody className='text-white h-full'>{tableData}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointsTable;

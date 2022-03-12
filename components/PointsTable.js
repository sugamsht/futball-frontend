import React, { useEffect } from 'react';

const PointsTable = ({ points }) => {

    useEffect(() => {
        document.getElementById('data').innerHTML = temp;
    }, []);

    //sort stat
    points.sort((a, b) => (a.points < b.points) ? 1 : -1)

    if (points?.length > 0) {
        var i = 1;
        var temp = "";
        points.forEach((itemData) => {
            //index of itemData.team

            temp += "<tr>";
            temp += "<td class='mr-9 text-center'>" + i + "</td>";
            temp += "<td class='pl-3'>" + itemData.name + "</td>";
            temp += "<td class='text-center'>" + itemData.played + "</td>";
            temp += "<td class='md:hidden 2xl:table-cell text-center'>" + itemData.win + "</td>";
            temp += "<td class='md:hidden 2xl:table-cell text-center'>" + itemData.draw + "</td>";
            temp += "<td class='md:hidden 2xl:table-cell text-center'>" + itemData.lost + "</td>";
            temp += "<td class='text-center'>" + itemData.gd + "</td>";
            temp += "<td class='text-center'>" + itemData.points + "</td>";
            i++;
        });
        // document.getElementById('data').innerHTML = temp;
    }

    return (
        <div className='sm:flex-wrap md:block col-span-6 md:col-span-2 w-auto h-[30rem] my-2 bg-gray-700 '>
            <div className="text-white h-full bg-gray-800 overflow-scroll scrollbar-hide">
                <h1 className="text-xs md:text-sm lg:text-2xl font-bold pt-2 xl:pt-3 text-center w-full">Nepal A Division Table</h1>
                <div className="py-2 xl:py-4">
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
                            <tbody className='text-white h-full ' id="data">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PointsTable

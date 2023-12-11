import React from 'react'
import axios from 'axios';
import { useQuery } from "react-query"
import Link from 'next/link';


const fetchLiveScore = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scoreboard`);
    return response.data;
};
export default function LiveScore({ initialData }) {

    const { data, isLoading, isError, error } = useQuery('scoreboard', fetchLiveScore,
        {
            initialData,
            refetchInterval: 20000, //refetch every 20 seconds
            refetchOnWindowFocus: false, //don't refetch when the window is in focus
        }
    );

    if (isLoading) { return <h2>Loading...</h2> }
    if (isError) { return <h2>{error.message}</h2> }

    const live = data?.[0]

    return (
        <>
            <Link href="/live" >
                <div className="sm:flex-wrap md:block col-span-7 lg:col-span-3 w-auto my-2 live-score-card overflow-hidden">
                    <div className="w-full h-full flex flex-col bg-white">
                        <div className="flex border-b-2 border-gray-200 p-4">
                            <hr />
                            <div className="flex items-center leading-4 bg-pink-100 text-red-700 mr-auto text-bold rounded py-2 px-3 match-status whitespace-nowrap">
                                • Live</div>
                            <div className="flex text-bold items-center match-tournament">
                                <img
                                    className="w-14 h-10 lg:mx-2 lg:w-16 2xl:mx-0 2xl:h-auto"
                                    src="./Adiv_logo.png" />
                                {live?.fixObject.tournament_title}
                            </div>
                            <div className="match-actions flex ml-auto">
                            </div>
                        </div>
                        <div className="match-content flex relative">
                            <div className="column">
                                <div className="team team--home">
                                    <div className="team-logo">
                                        <img src={live?.fixObject.team1Object[0].logo} />
                                    </div>
                                    <h2 className="team-name text-center mt-6 font-bold text-lg 2xl:text-xl">
                                        {live?.fixObject.team1Object[0].name}
                                    </h2>
                                </div>
                            </div>
                            <div className="column">
                                <div className="match-details">
                                    <div className="match-date">
                                        <strong>{live?.fixObject.date}</strong>
                                        {/* 12 Aug at <strong>19:00</strong> */}
                                    </div>
                                    <div className="match-score">
                                        <span className="match-score-number match-score-number--leading">{live?.score1}</span>
                                        <span className="match-score-divider">:</span>
                                        <span className="match-score-number">{live?.score2}</span>
                                    </div>
                                    <div className="match-time-lapsed">
                                        {/* 72' */}
                                        <span className="match-half-title">{live?.timer}</span>
                                    </div>
                                    <div className="match-referee ml-4 mt-4 lg:flex lg:flex-col lg:items-center lg:ml-0 ">
                                        Referee: <strong>{live?.referee}</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="team team--away">
                                    <div className="team-logo">
                                        <img src={live?.fixObject.team2Object[0].logo} />
                                    </div>
                                    <h2 className="team-name text-center mt-6 font-bold text-lg 2xl:text-xl">{live?.fixObject.team2Object[0].name}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}



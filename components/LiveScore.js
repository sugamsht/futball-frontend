import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios';

export default function LiveScore() {

    const [loading, setLoading] = useState(true);
    const [live, setLive] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/scoreboard')
            .then(function (response) {
                // handle success
                const data = response.data.reverse();
                setLive(data)
                setLoading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, []);

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined|Material+Icons" rel="stylesheet" />
            </Head>
            <div className="sm:flex-wrap md:block col-span-7 lg:col-span-3 w-auto my-2 live-score-card overflow-hidden">
                <div className="w-full h-full flex flex-col bg-white">
                    <div className="flex border-b-2 border-gray-200 p-4">
                        <hr />
                        <div className="flex items-center leading-4 bg-pink-100 text-red-700 mr-auto text-bold rounded py-2 px-3 match-status whitespace-nowrap">
                            • Live</div>
                        <div className="flex text-bold match-tournament">
                            <img className="w-14 ml-2 lg:ml-0 lg:mr-2 lg:w-10" src="https://www.goalnepal.com/uploads/news/1546859794.png" />{live[0].fixObject.tournament_title}</div>
                        <div className="match-actions flex ml-auto">
                            {/* <button className="btn-icon"><i className="material-icons-outlined">grade</i></button>
                            <button className="btn-icon"><i className="material-icons-outlined">add_alert</i></button> */}
                        </div>
                    </div>
                    <div className="match-content flex relative">
                        <div className="column">
                            <div className="team team--home">
                                <div className="team-logo">
                                    <img src={live[0].fixObject.team1Object[0].logo} />
                                </div>
                                <h2 className="team-name">{live[0].fixObject.team1Object[0].name}</h2>
                            </div>
                        </div>
                        <div className="column">
                            <div className="match-details">
                                <div className="match-date">
                                    <strong>{live[0].fixObject.date}</strong>
                                    {/* 12 Aug at <strong>19:00</strong> */}
                                </div>
                                <div className="match-score">
                                    <span className="match-score-number match-score-number--leading">{live[0].score1}</span>
                                    <span className="match-score-divider">:</span>
                                    <span className="match-score-number">{live[0].score2}</span>
                                </div>
                                <div className="match-time-lapsed">
                                    72'
                                </div>
                                <div className="match-referee ml-4 mt-4 lg:flex lg:flex-col lg:items-center lg:ml-0 ">
                                    Referee: <strong>{live[0].referee}</strong>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="team team--away">
                                <div className="team-logo">
                                    <img src={live[0].fixObject.team2Object[0].logo} />
                                </div>
                                <h2 className="team-name ">{live[0].fixObject.team2Object[0].name}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

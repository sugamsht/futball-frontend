import React from 'react'
import Head from 'next/head'

export default function LiveScore() {
    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined|Material+Icons" rel="stylesheet" />
            </Head>
            <div className="sm:flex-wrap md:block col-span-7 lg:col-span-3 w-auto my-2 live-score-card">
                <div className="w-full h-full flex flex-col bg-white">
                    <div className="flex border-b-2 border-gray-200 p-4">
                        <hr />
                        <div className="flex leading-4 bg-pink-100 text-red-700 mr-auto text-bold rounded py-2 px-3 match-status">
                            • Live</div>
                        <div className="flex text-bold match-tournament">
                            <img className="mr-3 w-10" src="https://www.goalnepal.com/uploads/news/1546859794.png" />Martyr's Memorial A-Division</div>
                        <div className="match-actions flex ml-auto">
                            <button className="btn-icon"><i className="material-icons-outlined">grade</i></button>
                            <button className="btn-icon"><i className="material-icons-outlined">add_alert</i></button>
                        </div>
                    </div>
                    <div className="match-content flex relative">
                        <div className="column">
                            <div className="team team--home">
                                <div className="team-logo">
                                    <img src="https://assets.codepen.io/285131/whufc.svg" />
                                </div>
                                <h2 className="team-name">West Ham</h2>
                            </div>
                        </div>
                        <div className="column">
                            <div className="match-details">
                                <div className="match-date">
                                    12 Aug at <strong>19:00</strong>
                                </div>
                                <div className="match-score">
                                    <span className="match-score-number match-score-number--leading">2</span>
                                    <span className="match-score-divider">:</span>
                                    <span className="match-score-number">0</span>
                                </div>
                                <div className="match-time-lapsed">
                                    72'
                                </div>
                                <div className="match-referee">
                                    Referee: <strong>Joseph Hicks</strong>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="team team--away">
                                <div className="team-logo">
                                    <img src="https://assets.codepen.io/285131/chelsea.svg" />
                                </div>
                                <h2 className="team-name">Chelsea</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

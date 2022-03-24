import React from 'react'
import LiveScore from '../components/LiveScore'
import axios from 'axios';
import { useQuery } from "react-query"
import styles from './live.module.scss'
import Head from 'next/head';


const fetchLiveScore = () => {
    return axios.get('http://localhost:3000/api/scoreboard')
}


const fakeData = [
    {
        "id": "1",
        "time": "1",
        "event": "Ball goes out of play for a Chelsea goal kick.",
    },
    {
        "id": "2",
        "time": "2",
        "event": "Hakim Ziyech puts the ball in the net and the away team extend their lead. The score-line now reads 0-2.",
    },
    {
        "id": "3",
        "time": "3",
        "event": "The away team take the lead again.",
    },
    {
        "id": "4",
        "time": "4",
        "event": "The score-line now reads 0-1.",
    },
    {
        "id": "5",
        "time": "5",
        "event": "Hawa Hanyo last ma.",
    },
]

function LiveEvent() {
    const { data, isLoading, isFetching, error } = useQuery('liveScore', fetchLiveScore,)
    // console.log("yo aako cha comment", data?.data?.[0]?.event)
    const event = data?.data?.[0]?.event.reverse();
    if (isLoading) return <p>Loading...</p>
    if (isFetching) return <p>Updating...</p>
    if (error) return <p>{error.message}</p>
    return (
        <ul className="list-none">
            {event.map(event => {
                return (
                    <li className="py-2" key={event}>
                        {event}
                    </li>
                )
            })}
        </ul>
    )
}

function Statistics() {
    return (
        <div className="mx-1 md:mx-[7vw] pt-5 pb-10">
            <div id="stat" className="grid grid-flow-row">
                <section id={styles.body}>
                    <div className={styles.match_stats_row}>
                        <div>
                            <span className={styles.match_stat_num}>03</span>
                        </div>
                        <div>
                            <span className={styles.match_stat_desc}>
                                <i className="fa fa-dot-circle-o"></i>
                                <span>Shoot On Target</span>
                            </span>
                        </div>
                        <div>
                            <span className={styles.match_stat_num}>03</span>
                        </div>
                    </div>
                    <div className={styles.match_stats_row}>
                        <div>
                            <span className={styles.match_stat_num}>05</span>
                        </div>
                        <div>
                            <span className={styles.match_stat_desc}>
                                <i className="fa fa-square-o"></i>
                                <span>Shoot Off Target</span>
                            </span>
                        </div>
                        <div>
                            <span className={styles.match_stat_num}>08</span>
                        </div>
                    </div>
                    <div className={styles.match_stats_row}>
                        <div>
                            <span className={styles.match_stat_num}>03</span>
                        </div>
                        <div>
                            <span className={styles.match_stat_desc}>
                                <i className="fa fa-hand-paper-o"></i>
                                <span>Total Save</span>
                            </span>
                        </div>
                        <div>
                            <span className={styles.match_stat_num}>03</span>
                        </div>
                    </div>
                    <div className={styles.match_stats_row}>
                        <div>
                            <span className={styles.match_stat_num}>68%</span>
                        </div>
                        <div>
                            <span className={styles.match_stat_desc}>
                                <i className="fa fa-users"></i>
                                <span>Ball Possession</span>
                            </span>
                        </div>
                        <div>
                            <span className={styles.match_stat_num}>32%</span>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

function live() {
    return (
        <>
            <Head>
                <link href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' />
            </Head>
            <div className='mx-1 md:mx-[20vw] min-h-screen'>
                <LiveScore />
                <div>
                    <ul className="
                nav nav-tabs nav-justified
                flex flex-col
                md:flex-row
                flex-wrap
                list-none
                border-b-0
                pl-0 mb-4"
                        id="tabs-tabJustify" role="tablist">
                        <li className="nav-item flex-grow text-center" role="presentation">
                            <a href="#tabs-homeJustify" className="
                        nav-link
                        w-full
                        block
                        font-medium text-xs leading-tight uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6 py-3 my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent
                        active"
                                id="tabs-home-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-homeJustify" role="tab"
                                aria-controls="tabs-homeJustify" aria-selected="true">Live</a>
                        </li>
                        <li className="nav-item flex-grow text-center" role="presentation">
                            <a href="#tabs-profileJustify" className="
                        nav-link
                        w-full
                        block
                        font-medium text-xs leading-tight uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6 py-3 my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent"
                                id="tabs-profile-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-profileJustify" role="tab"
                                aria-controls="tabs-profileJustify" aria-selected="false">Statistics</a>
                        </li>
                        <li className="nav-item flex-grow text-center" role="presentation">
                            <a href="#tabs-messagesJustify" className="
                        nav-link
                        w-full
                        block
                        font-medium text-xs leading-tight uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6 py-3 my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent"
                                id="tabs-messages-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-messagesJustify" role="tab"
                                aria-controls="tabs-messagesJustify" aria-selected="false">Lineup</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="tabs-tabContentJustify">
                        <div className="tab-pane fade show active mx-[2vw]" id="tabs-homeJustify" role="tabpanel"
                            aria-labelledby="tabs-home-tabJustify">
                            <LiveEvent />
                        </div>
                        <div className="tab-pane fade" id="tabs-profileJustify" role="tabpanel" aria-labelledby="tabs-profile-tabJustify">
                            <Statistics />
                        </div>
                        <div className="tab-pane fade" id="tabs-messagesJustify" role="tabpanel" aria-labelledby="tabs-profile-tabJustify">
                            Tab 3 Vye cha ka Lineup
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default live

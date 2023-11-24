import React from 'react'
import LiveScore from '../components/LiveScore'
import axios from 'axios';
import { useQuery } from "react-query"
import styles from './live.module.scss'

import { FiSquare } from 'react-icons/fi'
import { FaRegDotCircle, FaRegHandPaper, FaUsers } from 'react-icons/fa'
import { MdEmojiPeople } from 'react-icons/md'
import { GiCheckeredFlag } from 'react-icons/gi'


const fetchLiveScore = () => {
    return axios.get('http://localhost:3000/api/scoreboard')
}

const fakeData1 = [
    {
        "team": "1",
        "position": "GK",
        "shirt_number": "1",
        "name": "Ederson",
    },
    {
        "team": "1",
        "position": "DF",
        "shirt_number": "2",
        "name": "Dias",
    },
    {
        "team": "1",
        "position": "ST",
        "shirt_number": "3",
        "name": "Aguero",
    },
    {
        "team": "1",
        "position": "LW",
        "shirt_number": "4",
        "name": "Sane",
    },
]

const fakeData2 = [
    {
        "team": "2",
        "position": "GK",
        "shirt_number": "1",
        "name": "De Gea",
    },
    {
        "team": "2",
        "position": "DF",
        "shirt_number": "6",
        "name": "Maguire",
    },
    {
        "team": "2",
        "position": "ST",
        "shirt_number": "7",
        "name": "Ronaldo",
    },
    {
        "team": "2",
        "position": "LW",
        "shirt_number": "8",
        "name": "Pogba",
    },
]

// const fakeData = [...fakeData1, ...fakeData2]

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
            <div>
                <section id={styles.body}>
                    <div className={styles.match_stats_row}>
                        <div>
                            <span className={styles.match_stat_num}>03</span>
                        </div>
                        <div>
                            <span className="uppercase text-base flex flex-col items-center gap-1">
                                <FaRegDotCircle className='text-2xl opacity-80' />
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
                            <span className="uppercase text-base flex flex-col items-center gap-1">
                                <FiSquare className='text-2xl opacity-80' />
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
                            <span className="uppercase text-base flex flex-col items-center gap-1">
                                <GiCheckeredFlag className='text-2xl opacity-80' />
                                <span>Offside</span>
                            </span>
                        </div>
                        <div>
                            <span className={styles.match_stat_num}>02</span>
                        </div>
                    </div>
                    <div className={styles.match_stats_row}>
                        <div>
                            <span className={styles.match_stat_num}>05</span>
                        </div>
                        <div>
                            <span className="uppercase text-base flex flex-col items-center gap-1">
                                <FaRegHandPaper className='text-2xl opacity-80' />
                                <span>Total Save</span>
                            </span>
                        </div>
                        <div>
                            <span className={styles.match_stat_num}>03</span>
                        </div>
                    </div>
                    <div className={styles.match_stats_row}>
                        <div>
                            <span className={styles.match_stat_num}>10</span>
                        </div>
                        <div>
                            <span className="uppercase text-base flex flex-col items-center gap-1">
                                <MdEmojiPeople className='text-2xl opacity-80' />
                                <span>Fouls</span>
                            </span>
                        </div>
                        <div>
                            <span className={styles.match_stat_num}>07</span>
                        </div>
                    </div>
                    <div className={styles.match_stats_row}>
                        <div>
                            <span className={styles.match_stat_num}>68%</span>
                        </div>
                        <div>
                            <span className="uppercase text-base flex flex-col items-center gap-1">
                                <FaUsers className='text-2xl opacity-80' />
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

function Lineups() {
    const { data, isLoading, isFetching, error } = useQuery('liveScore', fetchLiveScore);

    if (isLoading) return <p>Loading...</p>
    if (isFetching) return <p>Updating...</p>
    if (error) return <p>{error.message}</p>

    // Assuming the API response has a structure similar to the provided response
    const team1Object = data?.data?.[0]?.fixObject?.team1Object[0];
    const team2Object = data?.data?.[0]?.fixObject?.team2Object[0];

    console.log("team1Object ko player", team1Object.playerList)
    return (
        <div className='flex bg-gray-400'>
            <table className='w-1/2 items-center'>
                <tbody>
                    <tr>
                        <th className='border-2 border-collapse w-full items-center'>{team1Object.name}</th>
                    </tr>
                    {team1Object.playerList.map((player, index) => (
                        <tr key={index}>
                            <td className='border-2 border-collapse w-full items-center'>
                                <span className='text-lg'>
                                    &emsp;{player.jersey_no}.&emsp;{`${player.fname} ${player.lname}`}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className='w-1/2 items-center'>
                <tbody>
                    <tr>
                        <th className='border-2 border-collapse w-full items-center'>{team2Object.name}</th>
                    </tr>
                    {team2Object.playerList.map((player, index) => (
                        <tr key={index}>
                            <td className='border-2 border-collapse w-full items-center'>
                                <span className='text-lg'>
                                    &emsp;{player.jersey_no}.&emsp;{`${player.fname} ${player.lname}`}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function live() {
    return (
        <>
            <div className='mx-1 md:mx-[20vw] min-h-screen'>
                <LiveScore />
                <div>
                    <ul className="nav nav-tabs nav-justified flex flex-col md:flex-row flex-wrap list-none border-b-0pl-0 mb-4"
                        id="tabs-tabJustify" role="tablist">
                        <li className="nav-item flex-grow text-center" role="presentation">
                            <a href="#tabs-homeJustify" className=" nav-link w-full block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
                                id="tabs-home-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-homeJustify" role="tab"
                                aria-controls="tabs-homeJustify" aria-selected="true">Live</a>
                        </li>
                        <li className="nav-item flex-grow text-center" role="presentation">
                            <a href="#tabs-profileJustify" className=" nav-link w-full block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
                                id="tabs-profile-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-profileJustify" role="tab"
                                aria-controls="tabs-profileJustify" aria-selected="false">Statistics</a>
                        </li>
                        <li className="nav-item flex-grow text-center" role="presentation">
                            <a href="#tabs-messagesJustify" className=" nav-link w-full block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
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
                            <Lineups />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default live

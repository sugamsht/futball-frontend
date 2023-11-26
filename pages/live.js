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
        .catch(error => {
            throw error; // Rethrow the error to be caught by react-query
        });
}


function LiveEvent() {
    const { data, isLoading, isFetching, error } = useQuery('liveScore', fetchLiveScore,)
    // console.log("yo aako cha comment", data?.data?.[0]?.event)
    const event = data?.data?.[0]?.event.reverse();
    if (isLoading) return <p>Loading...</p>
    if (isFetching) return <p>Updating...</p>
    if (error) return <p>{error.message}</p>
    return (
        <ul className="list-none">
            {event.map((eventItem, index) => (
                <li className="py-2" key={index}>
                    {eventItem}
                </li>
            ))}
        </ul>
    )
}

const StatisticRow = ({ icon, label, value }) => (
    <div className={styles.match_stats_row}>
        <div>
            <span className={styles.match_stat_num}>{value}</span>
        </div>
        <div>
            <span className="uppercase text-base flex flex-col items-center gap-1">
                {icon({ className: 'text-2xl opacity-80' })}
                <span>{label}</span>
            </span>
        </div>
        <div>
            <span className={styles.match_stat_num}>{value}</span>
        </div>
    </div>
);

function Statistics() {
    return (
        <div className="mx-1 md:mx-[7vw] pt-5 pb-10">
            <div>
                <section id={styles.body}>
                    <StatisticRow icon={FaRegDotCircle} label="Shoot On Target" value="03" />
                    <StatisticRow icon={FiSquare} label="Shoot Off Target" value="08" />
                    <StatisticRow icon={GiCheckeredFlag} label="Offside" value="02" />
                    <StatisticRow icon={FaRegHandPaper} label="Total Save" value="03" />
                    <StatisticRow icon={MdEmojiPeople} label="Fouls" value="07" />
                    <StatisticRow icon={FaUsers} label="Ball Possession" value="32%" />
                </section>
            </div>
        </div>
    );
}

function Lineups() {
    const { data, isLoading, isFetching, error } = useQuery('liveScore', fetchLiveScore);
    const lineupData = data?.data?.[0];
    const removeNullDot = (player) => player.replace(/null\./g, '').trim();

    if (isLoading) return <p>Loading...</p>;
    if (isFetching) return <p>Updating...</p>;
    if (error) return <p>{error.message}</p>;
    if (!lineupData) return null;

    const renderTable = (teamIndex) => (
        <table className='w-1/2 items-center'>
            <tbody>
                <tr>
                    <th className='border-2 border-collapse w-full items-center'>
                        <div className='w-full text-center'>{lineupData.fixname.split(' vs ')[teamIndex]}</div>
                    </th>
                </tr>
                {lineupData.lineup[teamIndex]?.split(',')?.map((player, index) => (
                    <tr key={index}>
                        <td className='border-2 border-collapse w-full items-center'>
                            <span className='text-lg'>&emsp;{(removeNullDot(player)) || '  '}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className='flex bg-gray-400'>
            {renderTable(0)}
            {renderTable(1)}
        </div>
    );
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

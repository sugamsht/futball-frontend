import React from 'react'
import LiveScore from '../components/LiveScore'
import axios from 'axios';
import { useQuery } from "react-query"


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
    const { data, isLoading, error } = useQuery('liveScore', fetchLiveScore)
    // console.log("yo aako cha comment", data?.data?.[0]?.event)
    const event = data?.data?.[0]?.event
    if (isLoading) return <p>Loading...</p>
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

function test() {
    return (
        <div className='mx-[20vw]'>
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
                    <div className="tab-pane fade show active" id="tabs-homeJustify" role="tabpanel"
                        aria-labelledby="tabs-home-tabJustify">
                        <LiveEvent />
                    </div>
                    <div className="tab-pane fade" id="tabs-profileJustify" role="tabpanel" aria-labelledby="tabs-profile-tabJustify">
                        Tab 2 affai hal Statistics
                    </div>
                    <div className="tab-pane fade" id="tabs-messagesJustify" role="tabpanel" aria-labelledby="tabs-profile-tabJustify">
                        Tab 3 Vye cha ka Lineup
                    </div>
                </div>
            </div>
        </div>
    )
}


export default test

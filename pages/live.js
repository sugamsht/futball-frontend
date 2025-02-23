import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Link from 'next/link';
import { FiSquare, FiClock } from 'react-icons/fi';
import { FaRegDotCircle, FaRecycle, FaUsers } from 'react-icons/fa';
import { MdEmojiPeople } from 'react-icons/md';
import { GiCheckeredFlag, GiSoccerBall } from 'react-icons/gi';
import { TbRectangleVerticalFilled } from "react-icons/tb";
import LiveScore from '../components/LiveScore';

// Add these above your component definitions (e.g., after your imports)
const YellowCardIcon = () => (
    <TbRectangleVerticalFilled className="text-2xl" style={{ color: 'yellow' }} />
);
const RedCardIcon = () => (
    <TbRectangleVerticalFilled className="text-2xl" style={{ color: 'red' }} />
);


// Fetch live scoreboard data from the API
const fetchLiveScore = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scoreboard`);
    return response.data;
};

function LiveEvents() {
    const { data, isLoading, isError, error } = useQuery('liveScore', fetchLiveScore, {
        refetchInterval: 30000,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return (
            <div className="text-cyan-400 animate-pulse text-center p-6">
                Loading live events...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-red-400 text-center p-6">
                Error loading events: {error.message}
            </div>
        );
    }

    const live = data?.data?.[0];
    // Create a shallow copy before reversing to avoid modifying original data
    const events = Array.isArray(live?.events)
        ? [...live.events].sort((a, b) => b.minute - a.minute)
        : [];

    // Use event filtering only if the event.team is populated as an ObjectId and teams are populated
    const homeTeamId = live?.fixture?.homeTeam?._id || live?.fixture?.homeTeam?.name;
    const awayTeamId = live?.fixture?.awayTeam?._id || live?.fixture?.awayTeam?.name;

    let homeEvents = events.filter(event => event.team === homeTeamId);
    let awayEvents = events.filter(event => event.team === awayTeamId);
    if (!homeEvents.length && !awayEvents.length && events.length) {
        const half = Math.ceil(events.length / 2);
        homeEvents = events.slice(0, half);
        awayEvents = events.slice(half);
    }

    return (
        <div className="flex space-x-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="flex-1">
                <h3 className="text-center text-lg font-bold text-cyan-400 mb-2">Home Team Events</h3>
                {homeEvents.map((eventItem, index) => (
                    <div key={eventItem._id || index} className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg mb-2 hover:bg-gray-700/50 transition">
                        <div className="text-cyan-400">
                            {eventItem.type === 'Goal' ? (
                                <GiSoccerBall className="text-xl" />
                            ) : eventItem.type === 'YellowCard' ? (
                                <TbRectangleVerticalFilled className="text-xl" style={{ color: 'yellow' }} />
                            ) : eventItem.type === 'RedCard' ? (
                                <TbRectangleVerticalFilled className="text-xl" style={{ color: 'red' }} />
                            ) : eventItem.type === 'Substitution' ? (
                                <FaRecycle className="text-xl" />
                            ) : (
                                <FiClock className="text-xl" />
                            )}
                        </div>
                        <span className="text-gray-300">
                            {`${eventItem.minute}' - ${eventItem.type}`} by{" "}
                            {eventItem.player && typeof eventItem.player === "object"
                                ? eventItem.player.fullName
                                : (eventItem.player || "Unknown Player")}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex-1">
                <h3 className="text-center text-lg font-bold text-cyan-400 mb-2">Away Team Events</h3>
                {awayEvents.map((eventItem, index) => (
                    <div key={eventItem._id || index} className="flex items-center justify-end space-x-4 p-3 bg-gray-700/30 rounded-lg mb-2 hover:bg-gray-700/50 transition">
                        <span className="text-gray-300">
                            {`${eventItem.minute}' - ${eventItem.type}`} by{" "}
                            {eventItem.player && typeof eventItem.player === "object"
                                ? eventItem.player.fullName
                                : (eventItem.player || "Unknown Player")}
                        </span>
                        <div className="text-cyan-400">
                            {eventItem.type === 'Goal' ? (
                                <GiSoccerBall className="text-xl" />
                            ) : eventItem.type === 'YellowCard' ? (
                                <YellowCardIcon />
                            ) : eventItem.type === 'RedCard' ? (
                                <RedCardIcon />
                            ) : eventItem.type === 'Substitution' ? (
                                <FaRecycle className="text-xl" />
                            ) : (
                                <FiClock className="text-xl" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const StatisticRow = ({ icon: Icon, label, home, away, isProgress = false }) => {
    return (
        <div className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition">
            <div className="grid grid-cols-3 items-center gap-4">
                <div className="text-right">
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {home}
                    </span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                    <Icon className="text-2xl text-cyan-400" />
                    <span className="text-sm text-gray-300">{label}</span>
                </div>
                <div className="text-left">
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        {away}
                    </span>
                </div>
            </div>
            {isProgress && (
                <div className="mt-2 flex justify-center">
                    <div className="w-1/3 bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full"
                            style={{ width: `${home}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

function Statistics() {
    const { data, isLoading, isError, error } = useQuery('liveScore', fetchLiveScore, {
        refetchInterval: 30000,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return (
            <div className="text-cyan-400 animate-pulse text-center p-6">
                Loading statistics...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-red-400 text-center p-6">
                Error loading statistics: {error.message}
            </div>
        );
    }

    const liveData = data?.data?.[0];
    const stats = liveData?.stats;
    if (!stats) {
        return (
            <div className="text-gray-300 text-center p-6">
                No statistics available.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <StatisticRow
                icon={FaRegDotCircle}
                label="Shots on Target"
                home={stats.home.shots_on_target}
                away={stats.away.shots_on_target}
            />
            <StatisticRow
                icon={FiSquare}
                label="Total Shots"
                home={stats.home.shots}
                away={stats.away.shots}
            />
            <StatisticRow
                icon={GiCheckeredFlag}
                label="Offsides"
                home={stats.home.offsides}
                away={stats.away.offsides}
            />
            <StatisticRow
                icon={MdEmojiPeople}
                label="Fouls"
                home={stats.home.fouls}
                away={stats.away.fouls}
            />
            <StatisticRow
                icon={FaUsers}
                label="Possession"
                home={stats.home.possession}
                away={stats.away.possession}
                isProgress
            />
            <StatisticRow
                icon={FaRecycle}
                label="Corners"
                home={stats.home.corners}
                away={stats.away.corners}
            />
            <StatisticRow
                icon={YellowCardIcon}
                label="Yellow Cards"
                home={stats.home.yellowCards}
                away={stats.away.yellowCards}
            />
            <StatisticRow
                icon={RedCardIcon}
                label="Red Cards"
                home={stats.home.redCards}
                away={stats.away.redCards}
            />
        </div>
    );
}

function Lineups() {
    const { data, isLoading, error } = useQuery('liveScore', fetchLiveScore, {
        refetchInterval: 30000,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return (
            <div className="text-cyan-400 animate-pulse text-center p-6">
                Loading lineups...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-400 text-center p-6">
                Error loading lineups: {error.message}
            </div>
        );
    }

    // Use the first scoreboard object as the live match
    const liveData = data?.data?.[0];
    if (!liveData) {
        return (
            <div className="text-gray-300 text-center p-6">
                No live match lineup available.
            </div>
        );
    }

    // Use the populated homeLineup and awayLineup arrays
    const TeamLineup = ({ players, team }) => (
        <div className="flex-1 bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-3 mb-4">
                <img
                    src={team?.logo ? `/logo/${team.logo}` : '/logo.png'}
                    className="w-12 h-12 object-contain"
                    alt="Team logo"
                    onError={(e) => {
                        e.target.src = '/logo.png';
                    }}
                />
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {team.name}
                </h3>
            </div>
            <div className="space-y-2">
                {players && players.length > 0 ? (
                    players.map((player, index) => (
                        <div key={player._id || index} className="p-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition">
                            <Link href={`/players/${player._id}`}>
                                <div className="text-gray-300">
                                    {typeof player === 'object'
                                        ? player.fullName || `${player.fname} ${player.lname}`
                                        : player}
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="p-2 text-gray-300">No lineup available</div>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4">
            <TeamLineup players={liveData.homeLineup} team={liveData.fixture.homeTeam} />
            <div className="border-l-2 border-dashed border-gray-600/50" />
            <TeamLineup players={liveData.awayLineup} team={liveData.fixture.awayTeam} />
        </div>
    );
}

function Live() {
    const [activeTab, setActiveTab] = useState('live');

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                {/* Live Score Section */}
                <LiveScore />

                {/* Tabs Navigation */}
                <div className="border-b border-gray-700/50 mb-6">
                    <div className="flex flex-wrap gap-4 p-4">
                        <button
                            onClick={() => setActiveTab('live')}
                            className={`px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 
                active:scale-95 font-medium relative overflow-hidden group
                ${activeTab === 'live'
                                    ? 'bg-gray-700/80 text-cyan-400'
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/80 hover:text-cyan-400'
                                }`}
                        >
                            <span className="relative z-10">Live Events</span>
                            <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 
                  rounded-xl transition-opacity ${activeTab === 'live' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                            />
                        </button>

                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 
                active:scale-95 font-medium relative overflow-hidden group
                ${activeTab === 'stats'
                                    ? 'bg-gray-700/80 text-cyan-400'
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/80 hover:text-cyan-400'
                                }`}
                        >
                            <span className="relative z-10">Statistics</span>
                            <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 
                  rounded-xl transition-opacity ${activeTab === 'stats' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                            />
                        </button>

                        <button
                            onClick={() => setActiveTab('lineups')}
                            className={`px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 
                active:scale-95 font-medium relative overflow-hidden group
                ${activeTab === 'lineups'
                                    ? 'bg-gray-700/80 text-cyan-400'
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/80 hover:text-cyan-400'
                                }`}
                        >
                            <span className="relative z-10">Lineups</span>
                            <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 
                  rounded-xl transition-opacity ${activeTab === 'lineups' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                            />
                        </button>
                    </div>
                </div>

                {/* Tabs Content */}
                <div className="space-y-8">
                    {activeTab === 'live' && (
                        <div className="animate-fade-in">
                            <LiveEvents />
                        </div>
                    )}

                    {activeTab === 'stats' && (
                        <div className="animate-fade-in">
                            <Statistics />
                        </div>
                    )}

                    {activeTab === 'lineups' && (
                        <div className="animate-fade-in">
                            <Lineups />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Live;

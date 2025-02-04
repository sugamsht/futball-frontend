import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import LiveScore from '../components/LiveScore';
import { FiSquare, FiClock } from 'react-icons/fi';
import { FaRegDotCircle, FaRegHandPaper, FaUsers, FaFutbol } from 'react-icons/fa';
import { MdEmojiPeople, MdEventNote } from 'react-icons/md';
import { GiCheckeredFlag, GiSoccerBall } from 'react-icons/gi';

const fetchLiveScore = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scoreboard`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

function LiveEvents() {
    const { data, isLoading, error } = useQuery('liveScore', fetchLiveScore);
    const event = data?.[0]?.event?.reverse();

    if (isLoading) return (
        <div className="text-cyan-400 animate-pulse text-center p-6">
            Loading live events...
        </div>
    );

    if (error) return (
        <div className="text-red-400 text-center p-6">
            Error loading events: {error.message}
        </div>
    );

    return (
        <div className="space-y-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm">
            {event?.map((eventItem, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition">
                    <div className="text-cyan-400">
                        {eventItem.includes('GOAL') ? <GiSoccerBall className="text-xl" /> :
                            eventItem.includes('CARD') ? <MdEventNote className="text-xl" /> :
                                <FiClock className="text-xl" />}
                    </div>
                    <span className="text-gray-300 flex-1">{eventItem}</span>
                    {/* <span className="text-sm text-gray-400">{(index + 1) * 5}'</span> */}
                </div>
            ))}
        </div>
    );
}

const StatisticRow = ({ icon: Icon, label, value, isProgress = false }) => (
    <div className="grid grid-cols-3 items-center gap-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
        <div className="text-right">
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {isProgress ? '' : value}
            </span>
        </div>
        <div className="flex flex-col items-center space-y-1">
            <Icon className="text-2xl text-cyan-400" />
            <span className="text-sm text-gray-300">{label}</span>
        </div>
        <div className="text-left">
            {isProgress ? (
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full"
                        style={{ width: `${value}%` }}
                    />
                </div>
            ) : (
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {value}
                </span>
            )}
        </div>
    </div>
);

function Statistics() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <StatisticRow icon={FaRegDotCircle} label="Shots on Target" value="03" />
            <StatisticRow icon={FiSquare} label="Shots off Target" value="08" />
            <StatisticRow icon={GiCheckeredFlag} label="Offsides" value="02" />
            <StatisticRow icon={FaRegHandPaper} label="Saves" value="03" />
            <StatisticRow icon={MdEmojiPeople} label="Fouls" value="07" />
            <StatisticRow icon={FaUsers} label="Possession" value="58" isProgress />
        </div>
    );
}

function Lineups() {
    const { data, isLoading, error } = useQuery('liveScore', fetchLiveScore);
    const lineupData = data?.[0];
    const removeNullDot = (player) => player.replace(/null\./g, '').trim();

    if (isLoading) return (
        <div className="text-cyan-400 animate-pulse text-center p-6">
            Loading lineups...
        </div>
    );

    if (error) return (
        <div className="text-red-400 text-center p-6">
            Error loading lineups: {error.message}
        </div>
    );

    const TeamLineup = ({ teamIndex }) => (
        <div className="flex-1 bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-3 mb-4">
                <img
                    src={`./logo/${lineupData.fixObject?.['team' + (teamIndex + 1) + 'Object']?.[0]?.logo}`}
                    className="w-12 h-12 object-contain"
                    alt="Team logo"
                    onError={(e) => {
                        e.target.src = '/logo.png';
                    }}
                />
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {lineupData.fixname.split(' vs ')[teamIndex]}
                </h3>
            </div>
            <div className="space-y-2">
                {lineupData.lineup[teamIndex]?.split(',')?.map((player, index) => (
                    <div key={index} className="p-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition">
                        <span className="text-gray-300">{removeNullDot(player) || '---'}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4">
            <TeamLineup teamIndex={0} />
            <div className="border-l-2 border-dashed border-gray-600/50" />
            <TeamLineup teamIndex={1} />
        </div>
    );
}

function Live() {
    const [activeTab, setActiveTab] = useState('live');

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                <LiveScore />

                {/* Modern Tabs Navigation */}
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
import React from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiStar, FiCalendar, FiUsers } from 'react-icons/fi';
import { FaTshirt, FaTrophy } from 'react-icons/fa';

const PlayerPage = ({ player, team, recentMatches }) => {
    const router = useRouter();
    // Using the first tournament stats; adjust lookup as needed.
    const stats = player.tournament[0];
    const positionColors = {
        'FW': 'from-red-400 to-orange-400',
        'MF': 'from-blue-400 to-cyan-400',
        'DF': 'from-green-400 to-emerald-400',
        'GK': 'from-purple-400 to-pink-400'
    };

    // Calculate age from DOB
    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const difference = Date.now() - birthDate.getTime();
        return Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Navigation */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Team
                </button>

                {/* Player Header */}
                <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 rounded-2xl p-8 backdrop-blur-sm border border-white/10 shadow-2xl mb-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <div className={`absolute inset-0 bg-gradient-to-r ${positionColors[player.position]} rounded-full blur-2xl opacity-30`} />
                            <img
                                // src={`/players/${player._id}.jpg`}
                                src={`/players/default_logo.png`}
                                alt={player.fname}
                                className="w-48 h-48 rounded-full border-4 border-white/20 hover:scale-105 transition-transform"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {player.fname} {player.lname}
                            </h1>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <span className={`px-4 py-1 rounded-full ${positionColors[player.position]} text-white`}>
                                    {player.position}
                                </span>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <FaTshirt className="text-yellow-400" />
                                    <span className="text-xl font-bold">#{stats.jersey_no}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <FiCalendar className="text-blue-400" />
                                    <span>{calculateAge(player.dob)} years</span>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-4 justify-center md:justify-start">
                                <img
                                    src={`/logo/${team?.logo}`}
                                    alt={team?.name}
                                    className="w-12 h-12 rounded-full border-2 border-white/20"
                                    onError={(e) => e.target.src = '/logo/default_logo.png'}
                                />
                                <div>
                                    <p className="text-gray-300">{stats.team_name}</p>
                                    <p className="text-sm text-gray-400">{team?.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        title="Matches Played"
                        value={stats.match_played}
                        icon={<FiUsers className="w-6 h-6" />}
                        color="from-blue-400 to-cyan-400"
                    />
                    <StatCard
                        title="Goals Scored"
                        value={stats.goals_scored}
                        icon={<FiStar className="w-6 h-6" />}
                        color="from-yellow-400 to-orange-400"
                    />
                    <StatCard
                        title="Assists"
                        value={stats.assists}
                        icon={<FaTrophy className="w-6 h-6" />}
                        color="from-purple-400 to-pink-400"
                    />
                    <StatCard
                        title="Yellow Cards"
                        value={stats.yellow_cards}
                        icon={<FaTrophy className="w-6 h-6" />}
                        color="from-green-400 to-emerald-400"
                    />
                </div>

                {/* Performance Details */}
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm mb-12">
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                        Tournament Performance
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatItem title="Minutes Played" value={stats.match_played * 90} unit="mins" />
                        <StatItem title="Goals per Match" value={(stats.goals_scored / stats.match_played).toFixed(2)} />
                        <StatItem title="Assist Rate" value={(stats.assists / stats.match_played).toFixed(2)} />
                        <StatItem title="Disciplinary" value={`${stats.yellow_cards}Y ${stats.red_cards}R`} />
                    </div>
                </div>

                {/* Recent Matches */}
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
                        Recent Appearances
                    </h2>
                    <div className="space-y-4">
                        {recentMatches.map((match, index) => {
                            const [team1, team2] = match.fixtureResult.split(" vs ");
                            return (
                                <div key={index} className="p-4 bg-gray-700/10 rounded-xl hover:bg-gray-700/20 transition-colors">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-400">
                                            {new Date(match.date).toLocaleDateString()}
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            {match.tournament_title}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white flex-1 text-center">{team1}</span>
                                        <span className="text-xl font-bold text-yellow-400 mx-4">
                                            {match.score[0]} - {match.score[1]}
                                        </span>
                                        <span className="text-white flex-1 text-center">{team2}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Components
const StatCard = ({ title, value, icon, color }) => (
    <div className={`bg-gradient-to-r ${color} p-1 rounded-2xl`}>
        <div className="bg-gray-900/80 p-6 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full bg-gradient-to-r ${color}`}>
                    {icon}
                </div>
                <div>
                    <h3 className="text-gray-400 text-sm">{title}</h3>
                    <p className="text-2xl font-bold text-white">{value}</p>
                </div>
            </div>
        </div>
    </div>
);

const StatItem = ({ title, value, unit }) => (
    <div className="flex flex-col items-center p-3 bg-gray-700/10 rounded-lg">
        <span className="text-gray-400 text-sm">{title}</span>
        <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-medium text-white">{value}</span>
            {unit && <span className="text-sm text-gray-400">{unit}</span>}
        </div>
    </div>
);

export async function getServerSideProps(context) {
    const { id } = context.params;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const playerRes = await fetch(`${backendUrl}/api/players/${id}`);
    const player = await playerRes.json();

    // Fetch team data using tournament team name
    const teamRes = await fetch(`${backendUrl}/api/teams/search/${player.data.tournament[0].team_name}`);
    const teamData = await teamRes.json();
    const team = teamData.data[0] || {};

    // Fetch recent matches for the team
    console.log("yo muzi team", team);
    const matchesRes = await fetch(`${backendUrl}/api/results/search?team=${team.name}`);
    const recentMatches = await matchesRes.json();

    return {
        props: {
            player: player.data,
            team: team,
            recentMatches: recentMatches.data.slice(0, 5) || []
        }
    };
}

export default PlayerPage;
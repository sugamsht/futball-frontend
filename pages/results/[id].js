import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiArrowLeft, FiClock, FiCalendar, FiMapPin, FiUsers, FiActivity } from 'react-icons/fi';

const ResultDetails = ({ fixture, homeTeam, awayTeam }) => {
    const router = useRouter();
    const matchDate = new Date(fixture.matchDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const matchTime = `${matchDate} • ${fixture.time}`;

    // Dynamically select Player of the Match
    const allPlayers = [...(homeTeam?.playerList || []), ...(awayTeam?.playerList || [])];
    const playerOfTheMatch = allPlayers.reduce((bestPlayer, player) => {
        const playerStats = player.tournament;
        const bestStats = bestPlayer.tournament;
        return (playerStats.goals_scored + playerStats.assists) > (bestStats.goals_scored + bestStats.assists) ? player : bestPlayer;
    }, allPlayers[0]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Navigation */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Results
                </button>

                {/* Main Match Card */}
                <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 rounded-2xl p-8 backdrop-blur-sm border border-white/10 shadow-2xl hover:shadow-3xl transition-shadow">
                    {/* Tournament Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                            {fixture.tournament.title}
                        </h1>
                        <div className="mt-2 flex items-center justify-center gap-4 text-gray-300">
                            <FiCalendar className="inline-block" />
                            <span>{matchDate}</span>
                            <FiClock className="inline-block ml-4" />
                            <span>{fixture.time}</span>
                        </div>
                    </div>

                    {/* Teams & Score Display */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                        {/* Home Team */}
                        <div className="flex-1 text-center">
                            <img
                                src={`/logo/${homeTeam?.logo || 'logo.png'}`}
                                alt={homeTeam?.name}
                                className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 hover:scale-105 transition-transform"
                                onError={(e) => { e.target.src = '/logo/logo.png'; }}
                            />
                            <h3 className="text-2xl md:text-3xl font-bold text-white">
                                <Link href={`/teams/${encodeURIComponent(homeTeam?.name)}`}>
                                    {homeTeam?.name}
                                </Link>
                            </h3>
                            <p className="text-gray-400 mt-2">
                                <FiMapPin className="inline-block mr-2" />
                                {homeTeam?.location || 'Unknown Location'}
                            </p>
                        </div>

                        {/* Score Center */}
                        <div className="flex flex-col items-center">
                            <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
                                {fixture.score.home} - {fixture.score.away}
                            </div>
                            <div className="mt-4 px-6 py-2 bg-gray-800/50 rounded-full flex items-center gap-2">
                                <FiActivity className="text-purple-400" />
                                <span className="text-sm text-gray-300">{fixture.status}</span>
                            </div>
                        </div>

                        {/* Away Team */}
                        <div className="flex-1 text-center">
                            <img
                                src={`/logo/${awayTeam?.logo || 'logo.png'}`}
                                alt={awayTeam?.name}
                                className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 hover:scale-105 transition-transform"
                                onError={(e) => { e.target.src = '/logo/logo.png'; }}
                            />
                            <h3 className="text-2xl md:text-3xl font-bold text-white">
                                <Link href={`/teams/${encodeURIComponent(awayTeam?.name)}`}>
                                    {awayTeam?.name}
                                </Link>
                            </h3>
                            <p className="text-gray-400 mt-2">
                                <FiMapPin className="inline-block mr-2" />
                                {awayTeam?.location || 'Unknown Location'}
                            </p>
                        </div>
                    </div>

                    {/* Stadium Info */}
                    <div className="text-center border-t border-white/10 pt-6">
                        <p className="text-xl text-gray-300">
                            <FiMapPin className="inline-block mr-2 text-purple-400" />
                            Played at {fixture.stadium}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {/* Match Statistics Card */}
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-purple-400/30 transition-all">
                        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                            <FiActivity className="inline-block mr-3" />
                            Match Statistics
                        </h2>
                        <div className="space-y-4">
                            <StatProgress
                                title="Possession"
                                team1={`${fixture.stats.home.possession}%`}
                                team2={`${fixture.stats.away.possession}%`}
                            />
                            <StatItem
                                title="Shots"
                                team1={fixture.stats.home.shots}
                                team2={fixture.stats.away.shots}
                            />
                            <StatItem
                                title="Shots on Target"
                                team1={fixture.stats.home.shots_on_target}
                                team2={fixture.stats.away.shots_on_target}
                            />
                            <StatItem
                                title="Corners"
                                team1={fixture.stats.home.corners}
                                team2={fixture.stats.away.corners}
                            />
                            <StatItem
                                title="Fouls"
                                team1={fixture.stats.home.fouls}
                                team2={fixture.stats.away.fouls}
                            />
                            <StatItem
                                title="Offsides"
                                team1={fixture.stats.home.offsides}
                                team2={fixture.stats.away.offsides}
                            />
                        </div>
                    </div>

                    {/* Team Managers Card */}
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-blue-400/30 transition-all">
                        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                            <FiUsers className="inline-block mr-3" />
                            Team Leadership
                        </h2>
                        <div className="space-y-6">
                            <ManagerCard
                                manager={homeTeam?.manager || 'Unknown Manager'}
                                team={homeTeam?.name}
                                color="from-purple-400/20 to-purple-600/20"
                            />
                            <ManagerCard
                                manager={awayTeam?.manager || 'Unknown Manager'}
                                team={awayTeam?.name}
                                color="from-blue-400/20 to-cyan-600/20"
                            />
                        </div>
                    </div>

                    {/* Player of the Match Card */}
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-yellow-400/30 transition-all">
                        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
                            ⚽ Player of the Match
                        </h2>
                        <div className="p-4 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
                                        <span className="text-2xl">⭐</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">
                                        {playerOfTheMatch?.fname} {playerOfTheMatch?.lname}
                                    </h3>
                                    <p className="text-gray-400">
                                        {playerOfTheMatch?.position} • {playerOfTheMatch?.tournament[0]?.team_name}
                                    </p>
                                    <div className="flex gap-4 mt-2">
                                        <StatBadge title="Goals" value={playerOfTheMatch?.tournament[0]?.goals_scored} />
                                        <StatBadge title="Assists" value={playerOfTheMatch?.tournament[0]?.assists} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lineups Section */}
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                    <TeamLineup team={homeTeam} color="purple" />
                    <TeamLineup team={awayTeam} color="blue" />
                </div>
            </div>
        </div>
    );
};

// Helper Components (unchanged)
const StatItem = ({ title, team1, team2 }) => (
    <div className="flex justify-between items-center p-3 bg-gray-700/10 rounded-lg hover:bg-gray-700/20 transition-colors">
        <span className="text-gray-400">{title}</span>
        <div className="flex gap-4">
            <span className="text-white font-medium">{team1}</span>
            <span className="text-gray-400">-</span>
            <span className="text-white font-medium">{team2}</span>
        </div>
    </div>
);

const StatProgress = ({ title, team1, team2 }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
            <span>{team1}</span>
            <span>{team2}</span>
        </div>
        <div className="relative pt-1">
            <div className="overflow-hidden h-2 bg-gray-700 rounded-full">
                <div
                    className="h-2 bg-gradient-to-r from-purple-400 to-blue-400"
                    style={{ width: team1 }}
                />
            </div>
        </div>
        <div className="text-center text-sm text-gray-400">{title}</div>
    </div>
);

const ManagerCard = ({ manager, team, color }) => (
    <div className={`p-4 rounded-xl bg-gradient-to-r ${color} backdrop-blur-sm`}>
        <h3 className="text-lg font-semibold text-white">{manager}</h3>
        <p className="text-sm text-gray-400">{team} Manager</p>
    </div>
);

const StatBadge = ({ title, value }) => (
    <div className="px-3 py-1 bg-yellow-400/10 rounded-full text-sm">
        <span className="text-yellow-400 font-medium">{value}</span>{' '}
        <span className="text-gray-400">{title}</span>
    </div>
);

const TeamLineup = ({ team, color }) => (
    <div className={`bg-gray-800/50 p-6 rounded-2xl border border-${color}-400/20 backdrop-blur-sm`}>
        <h2 className={`text-2xl font-bold mb-6 bg-gradient-to-r from-${color}-400 to-${color}-600 text-transparent bg-clip-text`}>
            {team?.name} Lineup
        </h2>
        <div className="grid gap-4">
            {team?.playerList?.map((player) => {
                // Assumes performance details for the relevant tournament use the first element
                const stats = player.tournament[0] || {};
                return (
                    <div key={player._id} className="flex items-center justify-between p-4 bg-gray-700/10 rounded-xl hover:bg-gray-700/20 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full bg-${color}-400/10 flex items-center justify-center`}>
                                <span className={`text-${color}-400 font-medium`}>{stats.jersey_no}</span>
                            </div>
                            <div>
                                <Link href={`/players/${player._id}`} passHref>
                                    <div className="font-medium text-white group-hover:text-${color}-300 transition-colors">
                                        {player.fname} {player.lname}
                                    </div>
                                </Link>
                                <p className="text-sm text-gray-400">{player.position}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex gap-4">
                                <div className="text-sm">
                                    <span className="text-green-400">{stats.goals_scored}</span> G
                                </div>
                                <div className="text-sm">
                                    <span className="text-blue-400">{stats.assists}</span> A
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                {stats.match_played} apps
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);

export async function getServerSideProps(context) {
    const { id } = context.params;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        // Fetch fixture data with response validation
        const resFixture = await fetch(`${backendUrl}/api/fixtures/${id}`);
        if (!resFixture.ok) throw new Error(`Request failed with status ${resFixture.status}`);
        let fixtureData;
        try {
            fixtureData = await resFixture.json();
        } catch (jsonError) {
            console.error("Failed to parse fixture JSON:", jsonError);
            throw jsonError;
        }
        const fixture = fixtureData.data || fixtureData;

        // Ensure stats exist
        if (!fixture.stats) {
            fixture.stats = {
                home: { possession: 0, shots: 0, shots_on_target: 0, corners: 0, fouls: 0, offsides: 0 },
                away: { possession: 0, shots: 0, shots_on_target: 0, corners: 0, fouls: 0, offsides: 0 }
            };
        }

        // Fetch player details for home team
        const homeTeamPlayers = await Promise.all(
            fixture.homeTeam.playerList.map(async (playerId) => {
                try {
                    const res = await fetch(`${backendUrl}/api/players/${playerId}`);
                    if (!res.ok) {
                        // If not found, skip this player (returns null)
                        console.warn(`Player ${playerId} not found (status ${res.status}). Skipping.`);
                        return null;
                    }
                    const playerData = await res.json();
                    return playerData.data || playerData;
                } catch (error) {
                    console.error(`Error fetching player ${playerId}:`, error);
                    return null;
                }
            })
        );
        // Filter out any null values
        const filteredHomeTeamPlayers = homeTeamPlayers.filter(Boolean);

        // Fetch player details for away team
        const awayTeamPlayers = await Promise.all(
            fixture.awayTeam.playerList.map(async (playerId) => {
                try {
                    const res = await fetch(`${backendUrl}/api/players/${playerId}`);
                    if (!res.ok) {
                        console.warn(`Player ${playerId} not found (status ${res.status}). Skipping.`);
                        return null;
                    }
                    const playerData = await res.json();
                    return playerData.data || playerData;
                } catch (error) {
                    console.error(`Error fetching player ${playerId}:`, error);
                    return null;
                }
            })
        );
        const filteredAwayTeamPlayers = awayTeamPlayers.filter(Boolean);

        return {
            props: {
                fixture: {
                    ...fixture,
                    homeTeam: {
                        ...fixture.homeTeam,
                        playerList: filteredHomeTeamPlayers
                    },
                    awayTeam: {
                        ...fixture.awayTeam,
                        playerList: filteredAwayTeamPlayers
                    }
                },
                homeTeam: {
                    ...fixture.homeTeam,
                    playerList: filteredHomeTeamPlayers
                },
                awayTeam: {
                    ...fixture.awayTeam,
                    playerList: filteredAwayTeamPlayers
                }
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            notFound: true
        };
    }
}

export default ResultDetails;
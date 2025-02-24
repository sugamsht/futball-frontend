import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiArrowLeft, FiClock, FiCalendar, FiMapPin, FiUsers, FiActivity } from 'react-icons/fi';
import { FaRecycle } from 'react-icons/fa';
import { GiSoccerBall } from 'react-icons/gi';
import { TbRectangleVerticalFilled } from "react-icons/tb";


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

    // Compute performance
    const playerPerformance = {};
    fixture.events.forEach(event => {
        if (event.player && event.player !== 'Unknown Player') {
            let points = 0;
            if (event.type === 'Goal') {
                points = 3;
            } else if (event.type === 'YellowCard') {
                points = -1;
            } else if (event.type === 'RedCard') {
                points = -3;
            }
            // You can add more conditions here
            playerPerformance[event.player] = (playerPerformance[event.player] || 0) + points;
        }
    });

    // Determine the best performing player by points
    const bestPlayerEntry = Object.entries(playerPerformance).reduce(
        (best, entry) => entry[1] > best[1] ? entry : best,
        ['', -Infinity]
    );
    const bestPlayerName = bestPlayerEntry[0] || 'TBD';

    // Calculate goals scored by the player of the match from events
    const playerGoals = fixture.events.filter(
        e => e.player === bestPlayerName && e.type === 'Goal'
    ).length;

    // Find the full player object from the available roster
    const computedPlayerOfTheMatch = allPlayers.find(
        p => `${p.fname} ${p.lname}` === bestPlayerName
    ) || bestPlayerName;

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
                                color="from-purple-400/20 to-purple-600/20"
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
                                    {typeof computedPlayerOfTheMatch === 'object' ? (
                                        <>
                                            <h3 className="text-xl font-bold text-white">
                                                {computedPlayerOfTheMatch.fname} {computedPlayerOfTheMatch.lname}
                                            </h3>
                                            <p className="text-gray-400">
                                                {computedPlayerOfTheMatch.position} • {computedPlayerOfTheMatch.tournament?.[0]?.team_name}
                                            </p>
                                        </>
                                    ) : (
                                        <h3 className="text-xl font-bold text-white">{computedPlayerOfTheMatch}</h3>
                                    )}
                                    <div className="flex gap-4 mt-2">
                                        <StatBadge title="Goals" value={playerGoals} />
                                        {/* <StatBadge title="Assists" value={playerOfTheMatch?.tournament[0]?.assists} /> */}
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

                {/* Match Events Section */}
                <div className="mt-6">
                    <h2 className="flex items-center text-2xl font-bold mb-4 text-gray-300">
                        <FiActivity className="mr-2 text-gray-400" /> Match Events
                    </h2>
                    {fixture.events && fixture.events.length ? (  /* Added check for fixture.events being defined */
                        <div className="space-y-2">
                            {[...fixture.events].reverse().map((event, index) => {
                                let eventStyles = {
                                    borderColor: 'border-gray-700',
                                    gradient: 'from-gray-800/50 to-gray-900/50',
                                    badgeGradient: 'from-gray-700 to-gray-700',
                                    icon: <FiClock className="text-gray-400" />
                                };

                                switch (event.type) {
                                    case 'Goal':
                                        eventStyles = {
                                            borderColor: 'border-green-500',
                                            gradient: 'from-gray-800/50 to-gray-900/50',
                                            badgeGradient: 'from-green-500 to-green-600',
                                            icon: <GiSoccerBall className="text-green-400" />,
                                        };
                                        break;
                                    case 'YellowCard':
                                        eventStyles = {
                                            borderColor: 'border-amber-500',
                                            gradient: 'from-gray-800/50 to-gray-900/50',
                                            badgeGradient: 'from-amber-500 to-amber-600',
                                            icon: <TbRectangleVerticalFilled className="text-amber-400" />,
                                        };
                                        break;
                                    case 'RedCard':
                                        eventStyles = {
                                            borderColor: 'border-red-500',
                                            gradient: 'from-gray-800/50 to-gray-900/50',
                                            badgeGradient: 'from-red-500 to-red-600',
                                            icon: <TbRectangleVerticalFilled className="text-red-400" />,
                                        };
                                        break;
                                    case 'Substitution':
                                        eventStyles = {
                                            borderColor: 'border-blue-500',
                                            gradient: 'from-gray-800/50 to-gray-900/50',
                                            badgeGradient: 'from-blue-500 to-blue-600',
                                            icon: <FaRecycle className="text-blue-400" />,
                                        };
                                }

                                return (
                                    <div
                                        key={event._id || index}
                                        className={`group flex items-center p-2 rounded-md border-l-2 ${eventStyles.borderColor} bg-gradient-to-r ${eventStyles.gradient} hover:bg-gray-800 transition-colors duration-200`}
                                    >
                                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-black/30 flex items-center justify-center mr-2">
                                            {eventStyles.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center gap-1">
                                                <span className="text-sm font-medium text-gray-100">Min {event.minute}'</span>
                                                <span className={`px-1.5 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r ${eventStyles.badgeGradient} text-gray-900`}>
                                                    {event.type}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-300 truncate">
                                                <span className="text-gray-200 group-hover:text-white transition-colors">{event.player}</span> • {event.team}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic text-sm">No events recorded for this match.</p>
                    )}
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

const TeamLineup = ({ team, color }) => {
    // Find the relevant tournament stats for each player
    const playersWithStats = team.playerList.map(player => {
        const tournamentStats = player.tournament?.[0] || {};
        return {
            ...player,
            tournamentStats
        };
    });

    return (
        <div className={`bg-gray-800/50 p-6 rounded-2xl border border-${color}-400/20 backdrop-blur-sm`}>
            <h2 className={`text-2xl font-bold mb-6 bg-gradient-to-r from-${color}-400 to-${color}-600 text-transparent bg-clip-text`}>
                {team.name} Lineup
            </h2>
            <div className="grid gap-4">
                {playersWithStats.map((player) => (
                    <div key={player._id} className="flex items-center justify-between p-4 bg-gray-700/10 rounded-xl hover:bg-gray-700/20 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full bg-${color}-400/10 flex items-center justify-center`}>
                                <span className={`text-${color}-400 font-medium`}>
                                    {player.tournamentStats.jersey_no}
                                </span>
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
                                    <span className="text-green-400">
                                        {player.tournamentStats.goals_scored}
                                    </span> G
                                </div>
                                <div className="text-sm">
                                    <span className="text-blue-400">
                                        {player.tournamentStats.assists}
                                    </span> A
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                {player.tournamentStats.match_played} apps
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        // Fetch fixture data
        const resFixture = await fetch(`${backendUrl}/api/fixtures/${id}`);
        if (!resFixture.ok) throw new Error(`Fixture request failed with status ${resFixture.status}`);
        const fixtureData = await resFixture.json();
        const fixture = fixtureData.data || fixtureData;

        // Fetch team data in parallel
        const [homeRes, awayRes] = await Promise.all([
            fetch(`${backendUrl}/api/teams/${fixture.homeTeam._id || fixture.homeTeam}`),
            fetch(`${backendUrl}/api/teams/${fixture.awayTeam._id || fixture.awayTeam}`)
        ]);

        if (!homeRes.ok || !awayRes.ok) {
            throw new Error('Failed to fetch team data');
        }

        const homeTeam = await homeRes.json();
        const awayTeam = await awayRes.json();

        // Process events using team data
        if (fixture.events?.length) {
            fixture.events = fixture.events.map(event => {
                const team = [homeTeam, awayTeam].find(t =>
                    t._id === event.team || t.playerList.some(p => p._id === event.player)
                );
                const player = team?.playerList.find(p => p._id === event.player);

                return {
                    ...event,
                    team: team?.name || 'Unknown Team',
                    player: player ? `${player.fname} ${player.lname}` : 'Unknown Player'
                };
            });
            // Sort events in descending order by minute
            fixture.events.sort((a, b) => a.minute - b.minute);
        }

        // Prepare final data structure
        const processedFixture = {
            ...fixture,
            homeTeam: {
                ...fixture.homeTeam,
                playerList: homeTeam.playerList || []
            },
            awayTeam: {
                ...fixture.awayTeam,
                playerList: awayTeam.playerList || []
            },
            stats: fixture.stats || {
                home: { possession: 50, shots: 0, shots_on_target: 0, corners: 0, fouls: 0, offsides: 0 },
                away: { possession: 50, shots: 0, shots_on_target: 0, corners: 0, fouls: 0, offsides: 0 }
            },
            events: fixture.events || []
        };

        return {
            props: {
                fixture: processedFixture,
                homeTeam: processedFixture.homeTeam,
                awayTeam: processedFixture.awayTeam
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { notFound: true };
    }
}

export default ResultDetails;
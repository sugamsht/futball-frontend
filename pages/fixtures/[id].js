import React from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiCalendar, FiClock, FiMapPin, FiUsers, FiBarChart2 } from 'react-icons/fi';
import Link from 'next/link';

const FixturePage = ({
    fixture,
    team1,
    team2,
    headToHead,
    team1RecentForm,
    team2RecentForm,
    team1AvgGoalsFromResults,
    team2AvgGoalsFromResults,
    error,
}) => {
    const router = useRouter();

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Failed to Load Fixture Data</h2>
                    <p className="text-gray-400">{error}</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-6 px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-500 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!fixture || !team1 || !team2) {
        return (
            <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Loading...</h2>
                    <p className="text-gray-400">Fetching fixture details.</p>
                </div>
            </div>
        );
    }

    const matchDate = new Date(fixture.matchDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Navigation */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Fixtures
                </button>

                {/* Main Match Card */}
                <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 rounded-2xl p-8 backdrop-blur-sm border border-white/10 shadow-2xl mb-12 hover:shadow-3xl transition-shadow">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <TeamInfo team={team1} />
                        <MatchInfo fixture={fixture} matchDate={matchDate} />
                        <TeamInfo team={team2} />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        title="Previous Meetings"
                        value={headToHead.length}
                        icon={<FiUsers />}
                        color="from-purple-400 to-pink-400"
                    />
                    <StatCard
                        title={`${team1.name} Wins`}
                        value={headToHead.filter(m => m.winner === team1._id).length}
                        icon={<FiBarChart2 />}
                        color="from-blue-400 to-cyan-400"
                    />
                    <StatCard
                        title={`${team2.name} Wins`}
                        value={headToHead.filter(m => m.winner === team2._id).length}
                        icon={<FiBarChart2 />}
                        color="from-yellow-400 to-orange-400"
                    />
                </div>

                <div className="grid md:grid-cols-12 gap-6 mb-12">
                    {/* Left Column: Team Statistics & Recent Meetings */}
                    <div className="col-span-12 md:col-span-4 space-y-6">
                        {/* Team Statistics */}
                        <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                                Team Statistics
                            </h2>
                            <StatComparison
                                title="Current Form"
                                team1={team1RecentForm}
                                team2={team2RecentForm}
                            />
                            <StatComparison
                                title="League Position"
                                team1={team1.leaguePosition}
                                team2={team2.leaguePosition}
                            />
                            <StatComparison
                                title="Average Goals"
                                team1={team1AvgGoalsFromResults}
                                team2={team2AvgGoalsFromResults}
                            />
                        </div>
                        {/* Recent Meetings */}
                        {headToHead.length > 0 && (
                            <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
                                    Recent Meetings
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {headToHead.slice(0, 4).map((match, index) => (
                                        <MatchResult key={index} match={match} team1={team1} team2={team2} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Right Column: Expected Lineups */}
                    <div className="col-span-12 md:col-span-8 bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
                            Expected Lineups
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <TeamLineup team={team1} color="blue" />  {/* swapped color */}
                            <TeamLineup team={team2} color="purple" /> {/* swapped color */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const TeamInfo = ({ team }) => (
    <div className="text-center">
        <img
            src={`/logo/${team.logo || 'default_logo.png'}`}
            alt={team.name}
            className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 hover:scale-105 transition-transform"
            onError={(e) => (e.target.src = '/logo/default_logo.png')}
        />
        <Link href={`/teams/${encodeURIComponent(team.name)}`}>
            <div className="text-2xl md:text-3xl font-bold text-white hover:text-purple-400 transition-colors">
                {team.name}
            </div>
        </Link>
        <p className="text-gray-400 mt-2">
            <FiMapPin className="inline-block mr-2" /> {team.location || 'Unknown Location'}
        </p>
    </div>
);

const MatchInfo = ({ fixture, matchDate }) => (
    <div className="text-center">
        <div className="mb-4">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                {fixture.tournament.title}
            </h1>
            <div className="mt-2 flex items-center justify-center gap-4 text-gray-300">
                <FiCalendar className="inline-block" /> <span>{matchDate}</span>
                <FiClock className="inline-block" /> <span>{fixture.time}</span>
            </div>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-purple-400">VS</div>
        <div className="mt-4 px-6 py-2 bg-gray-800/50 rounded-full inline-flex items-center gap-2">
            <FiMapPin className="text-purple-400" /> <span className="text-gray-300">{fixture.stadium}</span>
        </div>
    </div>
);

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

const StatComparison = ({ title, team1, team2 }) => (
    <div className="flex justify-between items-center p-3 bg-gray-700/10 rounded-lg">
        <span className="text-gray-400">{title}</span>
        <div className="flex gap-4">
            <span className="text-white">{team1}</span>
            <span className="text-gray-400">-</span>
            <span className="text-white">{team2}</span>
        </div>
    </div>
);

const TeamLineup = ({ team, color }) => (
    <div className={`bg-gray-800/50 p-6 rounded-2xl border border-${color}-400/20 backdrop-blur-sm`}>
        <h2 className={`text-2xl font-bold mb-6 bg-gradient-to-r from-${color}-400 to-${color}-600 text-transparent bg-clip-text`}>
            {team?.name} Lineup
        </h2>
        <div className="grid gap-4">
            {team?.playerList && team.playerList.length > 0 ? (
                team.playerList.map((player) => (
                    <div key={player._id} className="flex items-center justify-between p-4 bg-gray-700/10 rounded-xl hover:bg-gray-700/20 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full bg-${color}-400/10 flex items-center justify-center`}>
                                <span className={`text-${color}-400 font-medium`}>
                                    {player.tournament?.[0]?.jersey_no || '-'}
                                </span>
                            </div>
                            <div>
                                <Link href={`/players/${player._id}`} passHref>
                                    <div className="font-medium text-white group-hover:text-[var(--color)] transition-colors">
                                        {player.fullName}
                                    </div>
                                </Link>
                                <p className="text-sm text-gray-400">{player.position}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex gap-4">
                                <div className="text-sm">
                                    <span className="text-green-400">{player.tournament?.[0]?.goals_scored || 0}</span> G
                                </div>
                                <div className="text-sm">
                                    <span className="text-blue-400">{player.tournament?.[0]?.assists || 0}</span> A
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                {player.tournament?.[0]?.match_played || 0} apps
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div>No players found.</div>
            )}
        </div>
    </div>
);

const MatchResult = ({ match, team1, team2 }) => (
    <div className="p-4 bg-gray-700/10 rounded-xl hover:bg-gray-700/20 transition-colors w-full">
        <div className="text-sm text-gray-400 mb-2">
            {new Date(match?.date).toLocaleDateString()}
        </div>
        <div className="flex items-center justify-evenly">
            <span className="text-white w-1/3 text-center">{team1.name}</span>
            <div className="w-1/3 flex justify-center items-center">
                <span className="text-xl font-bold text-yellow-400">{match?.score?.home}</span>
                <span className="mx-1 text-gray-400">-</span>
                <span className="text-xl font-bold text-yellow-400">{match?.score?.away}</span>
            </div>
            <span className="text-white w-1/3 text-center">{team2.name}</span>
        </div>
    </div>
);

export async function getServerSideProps(context) {
    const { id } = context.params;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        // 1. Fetch Fixture Data
        const fixtureRes = await fetch(`${backendUrl}/api/fixtures/${id}`);
        if (!fixtureRes.ok) throw new Error(`Failed to fetch fixture: ${fixtureRes.status}`);
        const fixture = await fixtureRes.json();

        // 2. Fetch Team Data
        const fetchTeam = async (teamId) => {
            const res = await fetch(`${backendUrl}/api/teams/${teamId}`);
            if (!res.ok) throw new Error(`Team fetch failed: ${res.status}`);
            return await res.json();
        };

        const team1 = await fetchTeam(fixture.homeTeam._id);
        const team2 = await fetchTeam(fixture.awayTeam._id);

        // 3. Fetch Head-to-Head Data
        const h2hRes = await fetch(
            `${backendUrl}/api/fixtures/h2h?team=${encodeURIComponent(team1.name)}&team=${encodeURIComponent(team2.name)}&status=Completed`
        );
        if (!h2hRes.ok) {
            throw new Error(`Failed to fetch head-to-head data: ${h2hRes.status} ${h2hRes.statusText}`);
        }
        const headToHeadResponse = await h2hRes.json();
        const headToHead = headToHeadResponse.matches || []; // use the 'matches' array from the response

        // Process head-to-head data to determine winners
        const processedHeadToHead = headToHead.map(match => {
            if (match.score && typeof match.score.home === 'number' && typeof match.score.away === 'number') {
                return {
                    ...match,
                    winner: match.score.home > match.score.away
                        ? team1._id
                        : match.score.home < match.score.away
                            ? team2._id
                            : null
                };
            }
            return match;
        });

        // 4. Calculate Average Goals from head-to-head data
        let totalTeam1Goals = 0, totalTeam2Goals = 0, matchesCount = 0;
        processedHeadToHead.forEach(match => {
            if (match.score && typeof match.score.home === 'number' && typeof match.score.away === 'number') {
                totalTeam1Goals += match.score.home;
                totalTeam2Goals += match.score.away;
                matchesCount++;
            }
        });
        const team1AvgGoalsFromResults = matchesCount ? (totalTeam1Goals / matchesCount).toFixed(2) : 0;
        const team2AvgGoalsFromResults = matchesCount ? (totalTeam2Goals / matchesCount).toFixed(2) : 0;

        // 5. Calculate Recent Form based on Head-to-Head Data
        const validMatches = processedHeadToHead.filter(match => match.score && typeof match.score.home === 'number' && typeof match.score.away === 'number');
        const sortedMatches = validMatches.sort((a, b) => new Date(b.date) - new Date(a.date));
        const team1RecentForm = sortedMatches
            .slice(0, 5)
            .map(match => (match.winner === team1._id ? 'W' : match.winner === null ? 'D' : 'L'))
            .join('');
        const team2RecentForm = sortedMatches
            .slice(0, 5)
            .map(match => (match.winner === team2._id ? 'W' : match.winner === null ? 'D' : 'L'))
            .join('');

        // 6. Fetch League Table Data using tournament title from fixture.tournament.title
        const tableRes = await fetch(
            `${backendUrl}/api/tables?tournament_title=${encodeURIComponent(fixture.tournament.title)}`
        );
        if (!tableRes.ok) {
            throw new Error(`Failed to fetch league table data: ${tableRes.status} ${tableRes.statusText}`);
        }
        const tableResponse = await tableRes.json();
        const tableData = Array.isArray(tableResponse.message)
            ? tableResponse.message
            : Array.isArray(tableResponse.data)
                ? tableResponse.data
                : [];
        if (tableData.length === 0) {
            team1.leaguePosition = "N/A (No table data)";
            team2.leaguePosition = "N/A (No table data)";
        } else {
            tableData.sort((a, b) => b.points - a.points || b.gd - a.gd);
            const team1LeaguePos = tableData.findIndex(item => item.team_name.toLowerCase() === team1.name.toLowerCase());
            const team2LeaguePos = tableData.findIndex(item => item.team_name.toLowerCase() === team2.name.toLowerCase());
            team1.leaguePosition = team1LeaguePos === -1 ? "N/A" : team1LeaguePos + 1;
            team2.leaguePosition = team2LeaguePos === -1 ? "N/A" : team2LeaguePos + 1;
        }

        return {
            props: {
                fixture,
                team1,
                team2,
                headToHead: processedHeadToHead,
                team1AvgGoalsFromResults,
                team2AvgGoalsFromResults,
                team1RecentForm,
                team2RecentForm,
            },
        };
    } catch (error) {
        console.error("Error in getServerSideProps:", error);
        return {
            props: { error: "Failed to load data. Please try again later." },
        };
    }
}


export default FixturePage;
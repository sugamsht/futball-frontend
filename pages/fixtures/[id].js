import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiCalendar, FiClock, FiMapPin, FiUsers, FiBarChart2 } from 'react-icons/fi';
import Link from 'next/link';

const FixturePage = ({ fixture, team1, team2, headToHead, team1RecentForm, team2RecentForm, team1AvgGoalsFromResults, team2AvgGoalsFromResults, fixtureScore, error }) => {
    const router = useRouter();
    // Use optional chaining to safely access fixture.date
    const isCompleted = new Date(fixture?.date) < new Date();
    const [isLoading, setIsLoading] = useState(false); // Loading state

    useEffect(() => {
        setIsLoading(false); //  Set loading to false after initial render, data is fetched server-side
    }, []);

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Failed to Load Fixture Data</h2>
                    <p className="text-gray-400">{error}</p>
                    <button onClick={() => router.back()} className="mt-6 px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-500 transition-colors">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Add conditional rendering to handle cases where fixture is undefined
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


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <button onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Fixtures
                </button>

                <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 rounded-2xl p-8 backdrop-blur-sm border border-white/10 shadow-2xl mb-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <TeamInfo team={team1} />
                        <MatchInfo fixture={fixture} isCompleted={isCompleted} team1={team1} team2={team2} fixtureScore={fixtureScore} />
                        <TeamInfo team={team2} />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <StatCard title="Previous Meetings" value={headToHead.length} icon={<FiUsers />} color="from-purple-400 to-pink-400" />
                    <StatCard title={`${team1.name} Wins`} value={headToHead.filter(m => m.winner === team1._id).length} icon={<FiBarChart2 />} color="from-blue-400 to-cyan-400" />
                    <StatCard title={`${team2.name} Wins`} value={headToHead.filter(m => m.winner === team2._id).length} icon={<FiBarChart2 />} color="from-yellow-400 to-orange-400" />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Team Statistics</h2>
                        <StatComparison title="Current Form" team1={team1RecentForm} team2={team2RecentForm} />
                        <StatComparison title="League Position" team1={team1.leaguePosition} team2={team2.leaguePosition} />
                        <StatComparison title="Average Goals" team1={team1AvgGoalsFromResults} team2={team2AvgGoalsFromResults} />
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Expected Lineups</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <TeamLineup team={team1} color="purple" />
                            <TeamLineup team={team2} color="blue" />
                        </div>
                    </div>
                </div>

                {headToHead.length > 0 && (
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">Recent Meetings</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {headToHead.slice(0, 3).map((match, index) => (
                                <MatchResult key={index} match={match} team1={team1} team2={team2} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


// Updated TeamInfo: wraps the team name in a clickable Link that sends the team name.
const TeamInfo = ({ team }) => (
    <div className="text-center">
        <img
            src={`/logo/${team.logo}`}
            alt={team.name}
            className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 hover:scale-105 transition-transform"
            onError={(e) => (e.target.src = '/logo/default_logo.png')}
        />
        <Link href={`/teams/${encodeURIComponent(team.name)}`}>
            <div className="text-2xl md:text-3xl font-bold text-white hover:text-purple-400 transition-colors">
                {team.name}
            </div>
        </Link>
    </div>
);

const MatchInfo = ({ fixture, isCompleted, team1, team2, fixtureScore }) => {
    // fixtureScore prop is now used to display the score
    return (
        <div className="text-center">
            <div className="mb-4">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">{fixture?.tournament_title}</h1>
                <div className="mt-2 flex items-center justify-center gap-4 text-gray-300">
                    <FiCalendar className="inline-block" /> <span>{new Date(fixture?.date).toLocaleDateString()}</span>
                    <FiClock className="inline-block" /> <span>{fixture?.time}</span>
                </div>
            </div>

            {isCompleted ? (
                <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">{fixtureScore?.[0] || 0} - {fixtureScore?.[1] || 0}</div>
            ) : (
                <div className="text-2xl md:text-3xl font-bold text-purple-400">VS</div>
            )}

            <div className="mt-4 px-6 py-2 bg-gray-800/50 rounded-full inline-flex items-center gap-2">
                <FiMapPin className="text-purple-400" /> <span className="text-gray-300">{fixture?.stadium}</span>
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
    <div>
        <h3 className={`text-lg font-semibold mb-3 text-${color}-400`}>{team.name}</h3>
        <div className="space-y-2">
            {team.playerList.slice(0, 6).map((player) => (
                <div key={player._id} className="flex items-center gap-2 p-2 bg-gray-700/10 rounded-lg">
                    <span className={`text-sm text-${color}-400`}>{player.tournament[0].jersey_no}</span>
                    <span className="text-gray-300 truncate">{player.fname} {player.lname}</span>
                </div>
            ))}
        </div>
    </div>
);

const MatchResult = ({ match, team1, team2 }) => (
    <div className="p-4 bg-gray-700/10 rounded-xl hover:bg-gray-700/20 transition-colors">
        <div className="text-sm text-gray-400 mb-2">
            {new Date(match?.date).toLocaleDateString()}
        </div>
        <div className="flex items-center justify-between">
            <span className="text-white">{team1.name}</span>
            <span className="text-xl font-bold text-yellow-400 mx-2">{match?.score?.[0]}</span>
            <span className="text-gray-400">-</span>
            <span className="text-xl font-bold text-yellow-400 mx-2">{match?.score?.[1]}</span>
            <span className="text-white">{team2.name}</span>
        </div>
    </div>
);

export async function getServerSideProps(context) {
    const { id } = context.params;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    let fixtureScore = null; // Initialize fixtureScore

    try {
        // 1. Fetch Fixture Data
        const fixtureRes = await fetch(`${backendUrl}/api/fixtures/${id}`);
        if (!fixtureRes.ok) {
            // Improved error message for fixture fetch failure
            throw new Error(`Failed to fetch fixture data: ${fixtureRes.status} ${fixtureRes.statusText}`);
        }
        const fixtureResponse = await fixtureRes.json();
        const fixture = fixtureResponse.data || fixtureResponse;

        // 2. Fetch Team Data
        // Extract team IDs from query parameters or fixture object
        const team1Id = context.query.team1Id ?? (typeof fixture?.team1Object?.[0] === 'object' ? fixture.team1Object[0]._id : fixture.team1Object[0]);
        const team2Id = context.query.team2Id ?? (typeof fixture?.team2Object?.[0] === 'object' ? fixture.team2Object[0]._id : fixture.team2Object[0]);

        const [team1Res, team2Res] = await Promise.all([
            fetch(`${backendUrl}/api/teams/${team1Id}`),
            fetch(`${backendUrl}/api/teams/${team2Id}`),
        ]);

        if (!team1Res.ok || !team2Res.ok) {
            // Improved error message for team data fetch failure
            throw new Error(`Failed to fetch team data: Team 1 Status: ${team1Res.status} ${team1Res.statusText}, Team 2 Status: ${team2Res.status} ${team2Res.statusText}`);
        }

        const team1Response = await team1Res.json();
        const team1 = team1Response.data || team1Response;
        const team2Response = await team2Res.json();
        const team2 = team2Response.data || team2Response;

        // 3. Fetch Head-to-Head Data (No changes needed here as it's for H2H results)
        const h2hRes = await fetch(
            `${backendUrl}/api/results/search?team1=${encodeURIComponent(team1.name)}&team2=${encodeURIComponent(team2.name)}`
        );
        if (!h2hRes.ok) {
            // Improved error message for head-to-head fetch failure
            throw new Error(`Failed to fetch head-to-head data: ${h2hRes.status} ${h2hRes.statusText}`);
        }
        const headToHeadResponse = await h2hRes.json();
        let headToHead = headToHeadResponse.data || headToHeadResponse;

        // Process Head-to-Head data (winner calculation)
        headToHead = headToHead.map(match => {
            if (match.score && match.score.length === 2) {
                const [score1, score2] = match.score;
                return { ...match, winner: score1 > score2 ? team1._id : score1 < score2 ? team2._id : null };
            }
            return match;
        });

        // 4. Calculate Average Goals from Head-to-Head results (No changes needed)
        let totalTeam1Goals = 0, totalTeam2Goals = 0, matchesCount = 0;
        headToHead.forEach(match => {
            if (match.score && match.score.length === 2) {
                totalTeam1Goals += match.score[0];
                totalTeam2Goals += match.score[1];
                matchesCount++;
            }
        });
        const team1AvgGoalsFromResults = matchesCount ? (totalTeam1Goals / matchesCount).toFixed(2) : 0;
        const team2AvgGoalsFromResults = matchesCount ? (totalTeam2Goals / matchesCount).toFixed(2) : 0;

        // 5. Calculate Recent Form based on Head-to-Head results (No changes needed)
        const validMatches = headToHead.filter(match => match.score && match.score.length === 2);
        const sortedMatches = validMatches.sort((a, b) => new Date(b.date) - new Date(a.date));
        const team1RecentForm = sortedMatches.slice(0, 5).map(match => match.winner === team1._id ? 'W' : match.winner === null ? 'D' : 'L').join('');
        const team2RecentForm = sortedMatches.slice(0, 5).map(match => match.winner === team2._id ? 'W' : match.winner === null ? 'D' : 'L').join('');

        // 6. Fetch League Table Data (No changes needed)
        const tableRes = await fetch(
            `${backendUrl}/api/tables?tournament_title=${encodeURIComponent(fixture?.tournament_title)}`
        );

        if (!tableRes.ok) {
            // Improved error message for table data fetch failure
            throw new Error(`Failed to fetch league table data: ${tableRes.status} ${tableRes.statusText}`);
        }

        const tableResponse = await tableRes.json();
        const tableData = Array.isArray(tableResponse.message) ? tableResponse.message : Array.isArray(tableResponse.data) ? tableResponse.data : [];

        // Handle case where no table data is available (No changes needed)
        if (tableData.length === 0) {
            team1.leaguePosition = "N/A (No table data)";
            team2.leaguePosition = "N/A (No table data)";
        } else {
            // Sort table data by points and then goal difference
            tableData.sort((a, b) => b.points - a.points || b.gd - a.gd);

            // Calculate league positions based on sorted table
            const team1LeaguePos = tableData.findIndex(item => item.team_name.toLowerCase() === team1.name.toLowerCase());
            const team2LeaguePos = tableData.findIndex(item => item.team_name.toLowerCase() === team2.name.toLowerCase());

            team1.leaguePosition = team1LeaguePos === -1 ? "N/A" : team1LeaguePos + 1;
            team2.leaguePosition = team2LeaguePos === -1 ? "N/A" : team2LeaguePos + 1;
        }

        // 7. Fetch Fixture Result (Score) from Results API using search endpoint
        const resultsSearchRes = await fetch(
            `${backendUrl}/api/results/search?fixname=${encodeURIComponent(`${team1.name} vs ${team2.name}`)}&date=${encodeURIComponent(fixture.date)}`
        );
        if (!resultsSearchRes.ok) {
            console.warn(`Failed to fetch fixture result from search API: ${resultsSearchRes.status} ${resultsSearchRes.statusText}`);
            fixtureScore = null;
        } else {
            const resultsSearchResponse = await resultsSearchRes.json();
            const resultsData = resultsSearchResponse.data || resultsSearchResponse;

            if (Array.isArray(resultsData) && resultsData.length > 0) {
                // Find the result that matches the fixture ID (if fixtureResult is available in results)
                const matchingResult = resultsData.find(result => result.fixtureResult === id); // Assuming 'fixtureResult' is the field name in results API

                if (matchingResult) {
                    fixtureScore = matchingResult.score || null;
                } else {
                    // If no result matches fixtureId, take the first result based on fixname and date
                    fixtureScore = resultsData[0].score || null; // Take the score from the first match found
                    if (!fixtureScore) {
                        console.warn("Score not found in the results API response, even for the first match.");
                        fixtureScore = null;
                    }
                }
            } else {
                console.warn("No results found in results API response for fixname and date.");
                fixtureScore = null;
            }
        }


        return {
            props: {
                fixture,
                team1,
                team2,
                headToHead,
                team1AvgGoalsFromResults,
                team2AvgGoalsFromResults,
                team1RecentForm,
                team2RecentForm,
                fixtureScore, // Pass fixtureScore as prop
            },
        };
    } catch (error) {
        console.error("Error in getServerSideProps:", error); // Log detailed error to console
        return {
            props: { error: "Failed to load data. Please try again later." }, // User-friendly error message
        };
    }
}

export default FixturePage;
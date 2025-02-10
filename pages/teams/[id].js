import React from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiMapPin, FiUsers, FiCalendar, FiAward, FiBarChart2 } from 'react-icons/fi';

const TeamPage = ({ team, results, fixtures }) => {
    const router = useRouter();

    // Calculate team statistics
    const stats = {
        winRate: ((team.win / team.played) * 100).toFixed(1),
        avgGoals: (team.playerList.reduce((acc, player) =>
            acc + player.tournament[0].goals_scored, 0) / team.played).toFixed(1)
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
                    Back to Teams
                </button>

                {/* Team Header */}
                <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 rounded-2xl p-8 backdrop-blur-sm border border-white/10 shadow-2xl mb-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <img
                            src={`/logo/${team.logo}`}
                            alt={team.name}
                            className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/20 hover:scale-105 transition-transform"
                        />
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{team.name}</h1>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300">
                                <FiMapPin className="text-purple-400" />
                                <span>{team.location}</span>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                                <div className="px-4 py-2 bg-gray-800/50 rounded-full flex items-center gap-2">
                                    <FiUsers className="text-blue-400" />
                                    <span className="text-white">Manager: {team.manager}</span>
                                </div>
                                <div className="px-4 py-2 bg-gray-800/50 rounded-full flex items-center gap-2">
                                    <FiAward className="text-yellow-400" />
                                    <span className="text-white">Points: {team.points}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        title="Matches Played"
                        value={team.played}
                        icon={<FiCalendar className="w-6 h-6" />}
                        color="from-blue-400 to-cyan-400"
                    />
                    <StatCard
                        title="Win Rate"
                        value={`${stats.winRate}%`}
                        icon={<FiBarChart2 className="w-6 h-6" />}
                        color="from-purple-400 to-pink-400"
                    />
                    <StatCard
                        title="Avg Goals/Match"
                        value={stats.avgGoals}
                        icon={<FiAward className="w-6 h-6" />}
                        color="from-yellow-400 to-orange-400"
                    />
                </div>

                {/* Recent Results & Upcoming Fixtures */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                            Recent Results
                        </h2>
                        <div className="space-y-4">
                            {results.slice(0, 3).map((result, index) => (
                                <ResultItem key={index} result={result} teamName={team.name} />
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
                            Upcoming Fixtures
                        </h2>
                        <div className="space-y-4">
                            {fixtures.slice(0, 3).map((fixture, index) => (
                                <FixtureItem key={index} fixture={fixture} teamId={team._id} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Squad Section */}
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
                        Squad & Players
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {team.playerList.map((player) => (
                            <PlayerCard key={player._id} player={player} />
                        ))}
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

const ResultItem = ({ result, teamName }) => {
    // Split the fixtureResult string to extract team names
    const [homeTeam, awayTeam] = result.fixtureResult.split(' vs ');
    // Compare with the team name from props to decide if it's home or away
    const isHome = homeTeam === teamName;
    const score = isHome ? result.score : [result.score[1], result.score[0]];

    return (
        <div className="p-4 bg-gray-700/10 rounded-xl hover:bg-gray-700/20 transition-colors">
            <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">{new Date(result.createdAt).toLocaleDateString()}</span>
                <span className="text-sm text-gray-400">{isHome ? 'Home' : 'Away'}</span>
            </div>
            <div className="mt-2 flex justify-between items-center">
                <span className="text-white">{isHome ? homeTeam : awayTeam}</span>
                <span className="text-xl font-bold text-yellow-400">{score[0]} - {score[1]}</span>
                <span className="text-white">{isHome ? awayTeam : homeTeam}</span>
            </div>
        </div>
    );
};

const FixtureItem = ({ fixture, teamId }) => {
    const isHome = fixture.team1Object[0]._id === teamId;
    const opponent = isHome ? fixture.team2 : fixture.team1;

    return (
        <div className="p-4 bg-gray-700/10 rounded-xl hover:bg-gray-700/20 transition-colors">
            <div className="flex justify-between items-center text-gray-400 text-sm">
                <span>{new Date(fixture.date).toLocaleDateString()}</span>
                <span>{fixture.time}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
                <span className="text-white">{isHome ? 'Home' : 'Away'}</span>
                <span className="text-purple-400 mx-2">vs</span>
                <span className="text-white">{opponent}</span>
            </div>
            <div className="mt-2 text-center text-sm text-gray-400">
                <FiMapPin className="inline-block mr-2" />
                {fixture.stadium}
            </div>
        </div>
    );
};

const PlayerCard = ({ player }) => (
    <div className="p-4 bg-gray-700/10 rounded-xl hover:bg-gray-700/20 transition-colors">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-400/10 flex items-center justify-center">
                <span className="text-purple-400 font-bold">{player.tournament[0].jersey_no}</span>
            </div>
            <div>
                <h3 className="font-semibold text-white">{player.fname} {player.lname}</h3>
                <p className="text-sm text-gray-400">{player.position}</p>
            </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <StatBadge title="Goals" value={player.tournament[0].goals_scored} />
            <StatBadge title="Assists" value={player.tournament[0].assists} />
            <StatBadge title="Apps" value={player.tournament[0].match_played} />
        </div>
    </div>
);

const StatBadge = ({ title, value }) => (
    <div className="p-2 bg-gray-800/50 rounded-lg">
        <p className="text-sm font-semibold text-white">{value}</p>
        <p className="text-xs text-gray-400">{title}</p>
    </div>
);

export async function getServerSideProps(context) {
    const { id } = context.params; // id is now the team name
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Fetch team data using team name search endpoint
    const teamRes = await fetch(`${backendUrl}/api/teams/search/${encodeURIComponent(id)}`);
    const teamResult = await teamRes.json();

    if (!teamResult.data || teamResult.data.length < 1) {
        return { notFound: true };
    }
    // Use the first matching team
    const team = teamResult.data[0];

    // Fetch team's results using team name
    const resultsRes = await fetch(`${backendUrl}/api/results/search?team=${encodeURIComponent(team.name)}`);
    const results = await resultsRes.json();

    // Fetch team's fixtures using team name
    const fixturesRes = await fetch(`${backendUrl}/api/fixtures/search?team=${encodeURIComponent(team.name)}`);
    const fixturesData = await fixturesRes.json();

    return {
        props: {
            team,
            results: results.data || [],
            fixtures: fixturesData.data || []
        }
    };
}

export default TeamPage;
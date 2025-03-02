import React from 'react';
import { FiInfo, FiCalendar, FiMapPin, FiUsers, FiAward, FiStar, FiClock } from 'react-icons/fi';
import Link from 'next/link';
import CustomImage from '../../components/CustomImage';

const TournamentPage = ({ tournament, leagueInfo, fixtures }) => {
    if (!tournament) return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8 text-center">
            Tournament not found
        </div>
    );

    const isCompleted = tournament.status === 'Completed';
    const displayFixtures = fixtures.filter(fixture =>
        isCompleted ? fixture.status === 'Completed' : fixture.status === 'Scheduled'
    );

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6 md:p-12">
            {/* Tournament Header */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                    {/* Tournament Logo */}
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full p-2 bg-gray-400 shadow-lg">
                            <CustomImage
                                src={tournament.logo ? `/logo/${tournament.logo}` : '/logo/default_logo.png'}
                                alt={`${tournament.title} logo`}
                                width={200}
                                height={200}
                                className="rounded-full object-contain"
                            />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                        {tournament.title}
                    </h1>

                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-full">
                            <FiInfo className="text-purple-400" />
                            <span className="capitalize text-gray-100">{tournament.status}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-full">
                            <FiMapPin className="text-blue-400" />
                            <span className="text-gray-100">{tournament.stadium.join(', ')}</span>
                        </div>
                    </div>

                    {leagueInfo?.description && (
                        <div className="mt-8 max-w-3xl mx-auto text-gray-300 text-center">
                            <p className="text-lg leading-relaxed">{leagueInfo.description}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
                {/* Standings Table */}
                <div className="md:col-span-2">
                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-purple-400">
                            <FiAward className="inline-block" /> League Standings
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-gray-400 text-sm border-b border-gray-700">
                                        <th className="py-3 px-2 text-left">#</th>
                                        <th className="py-3 px-4 text-left">Team</th>
                                        <th className="py-3 px-2 text-center">P</th>
                                        <th className="py-3 px-2 text-center">W</th>
                                        <th className="py-3 px-2 text-center">D</th>
                                        <th className="py-3 px-2 text-center">L</th>
                                        <th className="py-3 px-2 text-center">GD</th>
                                        <th className="py-3 px-2 text-center">Pts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tournament.teamList
                                        .sort((a, b) => b.points - a.points || b.gd - a.gd)
                                        .map((team, index) => (
                                            <tr key={team._id} className="border-b border-gray-700 hover:bg-gray-700/20 transition-colors">
                                                <td className="py-4 px-2 text-gray-200">{index + 1}</td>
                                                <td className="py-4 px-4">
                                                    <Link href={`/teams/${team._id}`}>
                                                        <div className="flex items-center gap-3">
                                                            <CustomImage
                                                                src={team.logo ? `/logo/${team.logo}` : '/logo/default_logo.png'}
                                                                alt={team.name}
                                                                width={32}
                                                                height={32}
                                                                className="w-8 h-8 object-contain"
                                                            />
                                                            <span className="font-medium text-gray-100">{team.name}</span>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="py-4 px-2 text-center text-gray-200">{team.played}</td>
                                                <td className="py-4 px-2 text-center text-gray-200">{team.win}</td>
                                                <td className="py-4 px-2 text-center text-gray-200">{team.draw}</td>
                                                <td className="py-4 px-2 text-center text-gray-200">{team.lost}</td>
                                                <td className="py-4 px-2 text-center text-gray-200">{team.gd}</td>
                                                <td className="py-4 px-2 text-center font-bold text-gray-100">{team.points}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Participating Teams */}
                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-400">
                            <FiUsers className="inline-block" /> Teams
                        </h2>
                        <div className="space-y-4">
                            {tournament.teamList.map((team) => (
                                <Link
                                    key={team._id}
                                    href={`/teams/${team._id}`}
                                >
                                    <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-xl hover:bg-gray-700/20 transition-colors">
                                        <CustomImage
                                            src={team.logo ? `/logo/${team.logo}` : '/logo/default_logo.png'}
                                            alt={team.name}
                                            width={48}
                                            height={48}
                                            className="w-12 h-12 object-contain"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-100">{team.name}</h3>
                                            <p className="text-sm text-gray-400">{team.location}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Venues */}
                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-cyan-400">
                            <FiMapPin className="inline-block" /> Venues
                        </h2>
                        <div className="space-y-3">
                            {tournament.stadium.map((stadium) => (
                                <div key={stadium} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                                    <FiStar className="text-yellow-400" />
                                    <span className="text-gray-100">{stadium}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixtures/Results Section */}
            <div className="max-w-7xl mx-auto mt-12">
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-400">
                        <FiCalendar className="inline-block" />
                        {isCompleted ? 'Final Results' : 'Upcoming Fixtures'}
                    </h2>

                    {displayFixtures.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-4">
                            {displayFixtures.map((fixture) => (
                                <Link
                                    key={fixture._id}
                                    href={fixture.status === 'Completed' ? `/results/${fixture._id}` : `/fixtures/${fixture._id}`}
                                >
                                    <div className="bg-gray-700 rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-400">
                                                {new Date(fixture.matchDate).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                            <span className="text-sm text-gray-400 flex items-center gap-1">
                                                <FiClock className="inline-block" /> {fixture.time}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <CustomImage
                                                    src={fixture.homeTeam.logo ? `/logo/${fixture.homeTeam.logo}` : '/logo/default_logo.png'}
                                                    alt={fixture.homeTeam.name}
                                                    width={40}
                                                    height={40}
                                                    className="w-10 h-10 object-contain"
                                                />
                                                <span className="font-medium text-gray-100">{fixture.homeTeam.name}</span>
                                            </div>

                                            <div className="text-xl font-bold mx-4">
                                                {fixture.status === 'Completed' ? (
                                                    <span className="text-gray-100">
                                                        {fixture.score.home} - {fixture.score.away}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">vs</span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className="font-medium text-gray-100">{fixture.awayTeam.name}</span>
                                                <CustomImage
                                                    src={fixture.awayTeam.logo ? `/logo/${fixture.awayTeam.logo}` : '/logo/default_logo.png'}
                                                    alt={fixture.awayTeam.name}
                                                    width={40}
                                                    height={40}
                                                    className="w-10 h-10 object-contain"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-3 text-center text-sm text-gray-400">
                                            <FiMapPin className="inline-block mr-1" /> {fixture.stadium}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            No {isCompleted ? 'results' : 'fixtures'} available yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params || {};
    const { leagueTitle } = context.query || {};
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    let tournament;

    try {
        if (leagueTitle) {
            const tournamentRes = await fetch(
                `${backendUrl}/api/tournaments?title=${encodeURIComponent(leagueTitle)}`
            );
            const tournamentData = await tournamentRes.json();
            tournament = tournamentData.data && tournamentData.data.length > 0
                ? tournamentData.data[0]
                : null;
        } else if (id) {
            const tournamentRes = await fetch(`${backendUrl}/api/tournaments/${id}`);
            const tournamentData = await tournamentRes.json();
            tournament = tournamentData.data || tournamentData;
        }

        if (!tournament) {
            return { notFound: true };
        }

        const leagueRes = await fetch(
            `${backendUrl}/api/leagues?title=${encodeURIComponent(tournament.title)}`
        );
        const leagueData = await leagueRes.json();
        const leagueInfo = leagueData.data?.[0] || null;

        const fixturesRes = await fetch(`${backendUrl}/api/fixtures?tournament=${tournament._id}`);
        const fixturesData = await fixturesRes.json();
        const fixtures = fixturesData.data || fixturesData;

        return {
            props: {
                tournament,
                leagueInfo,
                fixtures
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                tournament: null,
                leagueInfo: null,
                fixtures: []
            }
        };
    }
}

export default TournamentPage;
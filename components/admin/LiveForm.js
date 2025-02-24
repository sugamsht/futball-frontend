// LiveForm.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

const LiveForm = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // State declarations
    const [fixtures, setFixtures] = useState([]);
    const [selectedFixture, setSelectedFixture] = useState(null);
    const [referee, setReferee] = useState('');
    const [scoreboard, setScoreboard] = useState({
        id: null,
        team1: 'Home Team',
        team2: 'Away Team',
        score1: 0,
        score2: 0,
        timer: 1,
        qtr: '1st Half',
        team1Id: null,
        team2Id: null,
        stats: {
            home: {
                shots: 0,
                shots_on_target: 0,
                possession: 50,
                corners: 0,
                fouls: 0,
                offsides: 0,
                yellowCards: 0,
                redCards: 0
            },
            away: {
                shots: 0,
                shots_on_target: 0,
                possession: 50,
                corners: 0,
                fouls: 0,
                offsides: 0,
                yellowCards: 0,
                redCards: 0
            }
        }
    });
    const [playerLists, setPlayerLists] = useState({ team1: [], team2: [] });
    const [selectedLineup, setSelectedLineup] = useState({ team1: [], team2: [] });
    const [startingLineups, setStartingLineups] = useState({ team1: [], team2: [] });
    const [selectedPlayerTeam1, setSelectedPlayerTeam1] = useState('');
    const [selectedPlayerTeam2, setSelectedPlayerTeam2] = useState('');
    const [eventType, setEventType] = useState('goal');
    const [tournamentTitle, setTournamentTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [clockRunning, setClockRunning] = useState(false);
    const [clockIntervalId, setClockIntervalId] = useState(null);
    const [events, setEvents] = useState([]);
    const [showLineups, setShowLineups] = useState(false);

    // Helper to update scoreboard state from API response data
    const updateScoreboardState = (data) => {
        setScoreboard(prev => ({
            ...prev,
            id: data._id,
            team1: data.fixture.homeTeam.name,
            team2: data.fixture.awayTeam.name,
            team1Id: data.fixture.homeTeam._id,
            team2Id: data.fixture.awayTeam._id,
            score1: Number(data.score.home),
            score2: Number(data.score.away),
            timer: Number(data.timer),
            qtr: data.qtr || '1st Half',
            stats: data.stats || prev.stats
        }));
        setPlayerLists({
            team1: data.fixture.homeTeam.playerList || [],
            team2: data.fixture.awayTeam.playerList || []
        });
        setStartingLineups({
            team1: data.homeLineup || [],
            team2: data.awayLineup || []
        });
        setTournamentTitle(data.fixture.tournament.title || '');
    };

    // Helper for error handling
    const handleAxiosError = (err, defaultMsg) => {
        if (err.response) {
            console.error('Server error:', err.response.data);
            alert(`Server error: ${err.response.data.message || defaultMsg}`);
        } else if (err.request) {
            console.error('Network error:', err.request);
            alert('Network error. Please check your connection.');
        } else {
            console.error('Error:', err.message);
            alert(defaultMsg || 'An unexpected error occurred.');
        }
    };

    // Fetch fixtures on mount
    useEffect(() => {
        axios.get(`${backendUrl}/api/fixtures`)
            .then(res => {
                const data = res.data.data || res.data;
                data.sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));
                const today = new Date(new Date().toDateString());
                setFixtures(data.filter(fix => new Date(fix.matchDate) >= today).slice(0, 5));
            })
            .catch(err => {
                console.error('Fixture fetch error:', err);
                alert('Error fetching fixtures');
            });
    }, [backendUrl]);

    // Clear clock interval on unmount
    useEffect(() => {
        return () => clockIntervalId && clearInterval(clockIntervalId);
    }, [clockIntervalId]);

    // Fixture selection handler – validates and resets related state
    const handleFixtureChange = (e) => {
        const fixtureId = e.target.value;
        const fix = fixtures.find(f => f._id === fixtureId);
        if (fix && fix.homeTeam && fix.awayTeam && fix.tournament) {
            setSelectedFixture(fix);
            setScoreboard({
                id: null,
                team1: 'Home Team',
                team2: 'Away Team',
                score1: 0,
                score2: 0,
                timer: 1,
                qtr: '1st Half',
                team1Id: null,
                team2Id: null,
                stats: {
                    home: {
                        shots: 0,
                        shots_on_target: 0,
                        possession: 50,
                        corners: 0,
                        fouls: 0,
                        offsides: 0,
                        yellowCards: 0,
                        redCards: 0
                    },
                    away: {
                        shots: 0,
                        shots_on_target: 0,
                        possession: 50,
                        corners: 0,
                        fouls: 0,
                        offsides: 0,
                        yellowCards: 0,
                        redCards: 0
                    }
                }
            });
            setSelectedLineup({ team1: [], team2: [] });
            setEvents([]);
        } else {
            alert('Invalid fixture data. Please select another fixture.');
        }
    };

    // Scoreboard initialization with loading state
    const handleFixtureSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFixture || isLoading) return;
        setIsLoading(true);
        try {
            let res = await axios.get(`${backendUrl}/api/scoreboard?limit=1`);
            let data = res.data.data ? res.data.data[0] : res.data[0];
            if (data && data.fixture && data.fixture._id === selectedFixture._id) {
                updateScoreboardState(data);
            } else {
                await axios.post(`${backendUrl}/api/scoreboard`, {
                    fixture: selectedFixture._id,
                    score: { home: 0, away: 0 },
                    timer: "1",
                    referee,
                    lineup: "",
                    stats: scoreboard.stats
                });
                res = await axios.get(`${backendUrl}/api/scoreboard?limit=1`);
                data = res.data.data ? res.data.data[0] : res.data[0];
                updateScoreboardState(data);
            }
        } catch (err) {
            handleAxiosError(err, 'Error initializing scoreboard');
        } finally {
            setIsLoading(false);
        }
    };

    // Helper for event type conversion
    const eventTypeMap = {
        goal: 'Goal',
        yellow: 'YellowCard',
        red: 'RedCard',
        sub: 'Substitution'
    };

    // Increment score and post event
    const handleIncrementScore = async (teamKey) => {
        if (!scoreboard.id) return alert('No scoreboard record found. Please submit the fixture first.');
        const isTeam1 = teamKey === 'score1';
        const selectedPlayer = isTeam1 ? selectedPlayerTeam1 : selectedPlayerTeam2;
        if (!selectedPlayer) return alert('Please select a player from the dropdown for this team.');
        const minute = Number(scoreboard.timer);
        const newEvent = {
            minute,
            player: selectedPlayer,
            type: eventTypeMap[eventType] || eventType,
            team: isTeam1 ? scoreboard.team1Id : scoreboard.team2Id
        };
        const payload = {
            score: {
                home: isTeam1 ? Number(scoreboard.score1) + 1 : Number(scoreboard.score1),
                away: !isTeam1 ? Number(scoreboard.score2) + 1 : Number(scoreboard.score2)
            },
            timer: scoreboard.timer.toString(),
            referee,
            events: [newEvent] // only send the new event
        };

        // Optimistic update
        setScoreboard(prev => ({ ...prev, [teamKey]: Number(prev[teamKey]) + 1 }));
        setEvents(prev => ([...prev, newEvent]));

        try {
            await axios.patch(`${backendUrl}/api/scoreboard/${scoreboard.id}`, payload);
        } catch (err) {
            handleAxiosError(err, 'Failed to update scoreboard');
        }
    };

    // Post event manually
    const handlePostEvent = async () => {
        if (!scoreboard.id) return alert('No scoreboard record found. Please submit the fixture first.');
        const selectedPlayer = selectedPlayerTeam1 || selectedPlayerTeam2;
        if (!selectedPlayer || !eventType) return alert('Please select a player and event type.');
        const minute = Number(scoreboard.timer);
        const team = selectedPlayerTeam1 ? scoreboard.team1Id : scoreboard.team2Id;
        const newEvent = {
            minute,
            player: selectedPlayer,
            type: eventTypeMap[eventType] || eventType,
            team
        };
        try {
            await axios.patch(`${backendUrl}/api/scoreboard/${scoreboard.id}`, {
                timer: scoreboard.timer.toString(),
                referee,
                events: [newEvent] // only send the new event rather than [...events, newEvent]
            });
            setEvents(prev => ([...prev, newEvent]));
        } catch (err) {
            handleAxiosError(err, 'Failed to post event');
        }
    };

    // Manual score update
    const updateScore = (teamKey, value) =>
        setScoreboard(prev => ({ ...prev, [teamKey]: Number(value) }));

    // Clock functions
    const startStopClock = () => {
        if (!clockRunning) {
            const id = setInterval(() => setScoreboard(prev => ({ ...prev, timer: Number(prev.timer) + 1 })), 60000);
            setClockIntervalId(id);
            setClockRunning(true);
        } else {
            clearInterval(clockIntervalId);
            setClockRunning(false);
        }
    };
    const incrementTimer = () => setScoreboard(prev => ({ ...prev, timer: Number(prev.timer) + 1 }));
    const decrementTimer = () => setScoreboard(prev => ({ ...prev, timer: Math.max(Number(prev.timer) - 1, 0) }));
    const resetClock = () => setScoreboard(prev => ({ ...prev, timer: 1 }));

    // Toggle player selection for lineup
    const togglePlayerSelection = (team, player) =>
        setSelectedLineup(prev => {
            const current = prev[team] || [];
            return current.some(p => p._id === player._id)
                ? { ...prev, [team]: current.filter(p => p._id !== player._id) }
                : { ...prev, [team]: [...current, player] };
        });

    // Finalize lineups with validation (minimum 11 players per team)
    const finalizeLineups = async () => {
        if (!scoreboard.id)
            return alert('No scoreboard record found. Please submit the fixture first.');
        if (selectedLineup.team1.length < 1 || selectedLineup.team2.length < 1)
            return alert('Please select at least 1 players for each team.');
        try {
            await axios.patch(`${backendUrl}/api/scoreboard/${scoreboard.id}`, {
                timer: scoreboard.timer.toString(),
                homeLineup: selectedLineup.team1.map(player => player._id),
                awayLineup: selectedLineup.team2.map(player => player._id)
            });
            // Instead of updating the full playerLists,
            // Update startingLineup so the dropdown only shows the finalized starters.
            setStartingLineups({
                team1: selectedLineup.team1,
                team2: selectedLineup.team2
            });
            alert('Lineups finalized successfully.');
        } catch (err) {
            handleAxiosError(err, 'Failed to finalize lineups');
        }
    };

    // Finalize match by transferring scoreboard data to fixture
    const handleResults = async () => {
        if (!selectedFixture) return alert('Please select a fixture first.');
        try {
            const payload = {
                score: {
                    home: scoreboard.score1,
                    away: scoreboard.score2
                },
                stats: scoreboard.stats,
                events: events,
                status: "Completed"
            };
            await axios.patch(`${backendUrl}/api/fixtures/${selectedFixture._id}/complete`, payload);
            alert("Result submitted successfully.");
        } catch (err) {
            handleAxiosError(err, 'Error submitting result');
        }
    };

    // New function: updateStat for updating a stat value
    const updateStat = async (team, stat, value) => {
        const newValue = Math.max(Number(value), 0);
        const newStats = {
            ...scoreboard.stats,
            [team]: {
                ...scoreboard.stats[team],
                [stat]: newValue
            }
        };

        setScoreboard(prev => ({
            ...prev,
            stats: newStats
        }));

        if (scoreboard.id) {
            try {
                await axios.patch(`${backendUrl}/api/scoreboard/${scoreboard.id}`, { stats: newStats });
            } catch (err) {
                handleAxiosError(err, 'Failed to update stats');
            }
        }
    };

    // New component: StatsControls to render stat update buttons and inputs
    const StatsControls = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-400">Match Statistics</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="font-medium">Stat</div>
                <div className="text-center">{scoreboard.team1}</div>
                <div className="text-center">{scoreboard.team2}</div>

                {Object.keys(scoreboard.stats.home).map(stat => (
                    <React.Fragment key={stat}>
                        <div className="flex items-center font-medium">
                            {stat.replace(/_/g, ' ').toUpperCase()}
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                            <button
                                onClick={() => updateStat('home', stat, scoreboard.stats.home[stat] - 1)}
                                className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={scoreboard.stats.home[stat]}
                                onChange={(e) => updateStat('home', stat, e.target.value)}
                                className="w-16 text-center bg-gray-800 rounded p-1"
                            />
                            <button
                                onClick={() => updateStat('home', stat, scoreboard.stats.home[stat] + 1)}
                                className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                            >
                                +
                            </button>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                            <button
                                onClick={() => updateStat('away', stat, scoreboard.stats.away[stat] - 1)}
                                className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={scoreboard.stats.away[stat]}
                                onChange={(e) => updateStat('away', stat, e.target.value)}
                                className="w-16 text-center bg-gray-800 rounded p-1"
                            />
                            <button
                                onClick={() => updateStat('away', stat, scoreboard.stats.away[stat] + 1)}
                                className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                            >
                                +
                            </button>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-gray-100 space-y-8">
            {/* Header */}
            <header className="pb-6 border-b border-gray-700">
                <h1 className="text-3xl font-bold text-emerald-400">Live Match Controller</h1>
                <p className="text-gray-400 mt-2">Manage live match data in real-time</p>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Fixture Card */}
                    <section className="bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-emerald-400">Match Setup</h2>
                        <form onSubmit={handleFixtureSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Select Fixture</label>
                                <select
                                    onChange={handleFixtureChange}
                                    className="w-full p-2 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-emerald-400"
                                >
                                    <option value="">Choose Fixture...</option>
                                    {fixtures.map(fix => (
                                        <option key={fix._id} value={fix._id}>
                                            {`${fix.homeTeam.name} vs ${fix.awayTeam.name}`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Referee</label>
                                <input
                                    type="text"
                                    value={referee}
                                    onChange={e => setReferee(e.target.value)}
                                    className="w-full p-2 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Initializing...' : 'Start Match Session'}
                            </button>
                        </form>
                    </section>

                    {/* Lineups Card */}
                    <section className="bg-gray-800 p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-emerald-400">Team Lineups</h2>
                            <button
                                onClick={() => setShowLineups(!showLineups)}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                {showLineups ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        {showLineups && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">{scoreboard.team1} Lineup</h3>
                                        <div id="lineup_div" className="pl-4 space-y-1">
                                            {playerLists.team1.map(player => (
                                                <label key={player._id} className="block">
                                                    <input type="checkbox" onChange={() => togglePlayerSelection('team1', player)}
                                                        checked={selectedLineup.team1?.some(p => p._id === player._id) || false} className="mr-2" />
                                                    {player.tournament?.[0]?.jersey_no || '---'}. {player.fname} {player.lname}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{scoreboard.team2} Lineup</h3>
                                        <div id="lineup_div1" className="pl-4 space-y-1">
                                            {playerLists.team2.map(player => (
                                                <label key={player._id} className="block">
                                                    <input type="checkbox" onChange={() => togglePlayerSelection('team2', player)}
                                                        checked={selectedLineup.team2?.some(p => p._id === player._id) || false} className="mr-2" />
                                                    {player.tournament?.[0]?.jersey_no || '---'}. {player.fname} {player.lname}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={finalizeLineups}
                                    className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors"
                                >
                                    Finalize Lineups
                                </button>
                            </div>
                        )}
                    </section>

                    {/* Final Score Section moved below Team Lineups */}
                    <div id="result" className="mt-4 space-y-4">
                        <input
                            type="text"
                            id="resultTitle"
                            name="tournament_title"
                            value={tournamentTitle}
                            readOnly
                            className="p-2 bg-gray-700 border border-gray-600 rounded w-full"
                        />
                        <button
                            onClick={handleResults}
                            id="gotoresults"
                            className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 transition"
                        >
                            Final Score to Fixture
                        </button>
                    </div>
                </div>

                {/* Main Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Scoreboard Card */}
                    <section className="bg-gray-800 p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-emerald-400">Live Scoreboard</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400">{scoreboard.qtr}</span>
                                <div className="px-3 py-1 bg-gray-700 rounded-full">
                                    {scoreboard.timer}'
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center mb-8">
                            <div className="space-y-2">
                                <div className="text-2xl font-bold">{scoreboard.team1}</div>
                                <div className="text-5xl font-mono">{scoreboard.score1}</div>
                            </div>
                            <div className="text-gray-400 text-4xl self-center">-</div>
                            <div className="space-y-2">
                                <div className="text-2xl font-bold">{scoreboard.team2}</div>
                                <div className="text-5xl font-mono">{scoreboard.score2}</div>
                            </div>
                        </div>

                        {/* Clock Controls */}
                        <div className="flex justify-center gap-3 mb-8">
                            <button
                                onClick={startStopClock}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                {clockRunning ? '⏸ Pause' : '▶ Start'}
                            </button>
                            <button
                                onClick={incrementTimer}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                            >
                                +1 Min
                            </button>
                            <button
                                onClick={decrementTimer}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                            >
                                -1 Min
                            </button>
                        </div>

                        {/* Score Controls */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex flex-col items-center space-y-2">
                                <div className="text-sm font-medium">{scoreboard.team1}</div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleIncrementScore('score1')}
                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg"
                                    >
                                        + Goal
                                    </button>
                                    <input
                                        type="number"
                                        value={scoreboard.score1}
                                        onChange={e => updateScore('score1', e.target.value)}
                                        className="w-20 px-2 py-1 bg-gray-700 rounded text-center"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <div className="text-sm font-medium">{scoreboard.team2}</div>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={scoreboard.score2}
                                        onChange={e => updateScore('score2', e.target.value)}
                                        className="w-20 px-2 py-1 bg-gray-700 rounded text-center"
                                    />
                                    <button
                                        onClick={() => handleIncrementScore('score2')}
                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg"
                                    >
                                        + Goal
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <StatsControls />
                    </section>

                    {/* Events Card */}
                    <section className="bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-emerald-400">Match Events</h2>
                        <div id="event" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex flex-col space-y-2">
                                <label>Team1 Player</label>
                                <select id="selectPlayer1" className="p-2 bg-gray-700 border border-gray-600 rounded"
                                    value={selectedPlayerTeam1} onChange={e => setSelectedPlayerTeam1(e.target.value)}>
                                    <option value="">Choose Player</option>
                                    {(startingLineups.team1.length > 0 ? startingLineups.team1 : []).map(player => (
                                        <option key={player._id} value={player._id}>
                                            {player.tournament?.[0]?.jersey_no || '---'}. {player.fname} {player.lname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label>Team2 Player</label>
                                <select id="selectPlayer2" className="p-2 bg-gray-700 border border-gray-600 rounded"
                                    value={selectedPlayerTeam2} onChange={e => setSelectedPlayerTeam2(e.target.value)}>
                                    <option value="">Choose Player</option>
                                    {(startingLineups.team2.length > 0 ? startingLineups.team2 : []).map(player => (
                                        <option key={player._id} value={player._id}>
                                            {player.tournament?.[0]?.jersey_no || '---'}. {player.fname} {player.lname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label>Event Type</label>
                                <select id="selectEvent" className="p-2 bg-gray-700 border border-gray-600 rounded"
                                    value={eventType} onChange={e => setEventType(e.target.value)}>
                                    <option value="goal">Goal</option>
                                    <option value="yellow">Yellow Card</option>
                                    <option value="red">Red Card</option>
                                    <option value="sub">Substitution</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button onClick={handlePostEvent} id="postEvent" className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 transition">
                                Post Event
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default LiveForm;

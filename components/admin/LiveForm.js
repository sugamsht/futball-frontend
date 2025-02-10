import { useState, useEffect } from 'react';
import axios from 'axios';

const LiveForm = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Fixture & Referee state
    const [fixtures, setFixtures] = useState([]);
    const [selectedFixture, setSelectedFixture] = useState(null);
    const [referee, setReferee] = useState('');

    // Scoreboard state with numeric values and team names
    const [scoreboard, setScoreboard] = useState({
        team1: 'MANCHESTER CITY',
        team2: 'MANCHESTER UNITED',
        score1: 0,
        score2: 0,
        timer: 1,
        qtr: '1st Half',
        // You could also store fixname here if needed.
    });

    // Player lists and lineup selections
    const [playerLists, setPlayerLists] = useState({ team1: [], team2: [] });
    const [selectedLineup, setSelectedLineup] = useState({ team1: [], team2: [] });
    const [showLineup1, setShowLineup1] = useState(false);
    const [showLineup2, setShowLineup2] = useState(false);

    // New state for selected players, event type, and tournament title
    const [selectedPlayerTeam1, setSelectedPlayerTeam1] = useState('');
    const [selectedPlayerTeam2, setSelectedPlayerTeam2] = useState('');
    const [eventType, setEventType] = useState('goal');
    const [tournamentTitle, setTournamentTitle] = useState('');

    // Clock controls
    const [clockRunning, setClockRunning] = useState(false);
    const [clockIntervalId, setClockIntervalId] = useState(null);

    // (Optional) Events state for future enhancements
    const [events, setEvents] = useState([]);

    // Fetch fixtures on mount
    useEffect(() => {
        axios.get(`${backendUrl}/api/fixtures`)
            .then((res) => {
                const data = res.data;
                data.sort((a, b) => new Date(a.date) - new Date(b.date));
                const today = new Date(new Date().toDateString());
                const futureFixtures = data.filter(fix => new Date(fix.date) >= today).slice(0, 5);
                setFixtures(futureFixtures);
            })
            .catch(err => {
                console.error('Fixture fetch error:', err);
                alert('Error fetching fixtures');
            });
    }, [backendUrl]);

    // Cleanup interval on component unmount
    useEffect(() => {
        return () => {
            if (clockIntervalId) {
                clearInterval(clockIntervalId);
            }
        };
    }, [clockIntervalId]);

    // Fixture selection handler
    const handleFixtureChange = (e) => {
        const fixName = e.target.value;
        const fix = fixtures.find(f => f.fixname[0] === fixName);
        setSelectedFixture(fix);
    };

    // On fixture submission, update header and ensure the backend scoreboard record reflects the chosen fixture.
    // If the fetched scoreboard fixture differs from the newly selected one, create a new scoreboard record.
    const handleFixtureSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFixture) return;

        const newFixtureName = selectedFixture.fixname[0];
        const [team1Name, team2Name] = newFixtureName.split(' vs ').map(s => s.trim());

        try {
            // Fetch the current scoreboard record from the backend.
            const res = await axios.get(`${backendUrl}/api/scoreboard`);
            const data = res.data[0];

            if (data && data.fixname === newFixtureName) {
                // Same fixture found; update local state with existing data.
                setScoreboard(prev => ({
                    ...prev,
                    team1: team1Name,
                    team2: team2Name,
                    score1: Number(data.score1),
                    score2: Number(data.score2),
                    timer: Number(data.timer),
                }));
                const team1Players = data.fixObject?.team1Object?.[0]?.playerList || [];
                const team2Players = data.fixObject?.team2Object?.[0]?.playerList || [];
                setPlayerLists({ team1: team1Players, team2: team2Players });
                setTournamentTitle(data.fixObject?.tournament_title || '');
            } else {
                // Different fixture selected: create a new scoreboard record.
                const payload = {
                    fixname: newFixtureName,
                    score1: 0,
                    score2: 0,
                    timer: 1,
                    referee: referee,
                    // You can include initial lineup fields if needed.
                    line1: "",
                    liney2: ""
                };
                await axios.post(`${backendUrl}/api/scoreboard`, payload);
                // After creating a new scoreboard record, fetch it.
                const resNew = await axios.get(`${backendUrl}/api/scoreboard`);
                const dataNew = resNew.data[0];
                setScoreboard(prev => ({
                    ...prev,
                    team1: team1Name,
                    team2: team2Name,
                    score1: Number(dataNew.score1),
                    score2: Number(dataNew.score2),
                    timer: Number(dataNew.timer),
                }));
                const team1Players = dataNew.fixObject?.team1Object?.[0]?.playerList || [];
                const team2Players = dataNew.fixObject?.team2Object?.[0]?.playerList || [];
                setPlayerLists({ team1: team1Players, team2: team2Players });
                setTournamentTitle(dataNew.fixObject?.tournament_title || '');
            }
        } catch (err) {
            console.error('Scoreboard fetch/update error:', err);
            alert('Error fetching/updating scoreboard data');
        }
    };

    // Function: increment score and post event using /editScoreboard/ endpoint
    const handleIncrementScore = async (teamKey) => {
        const isTeam1 = teamKey === 'score1';
        const selectedPlayer = isTeam1 ? selectedPlayerTeam1 : selectedPlayerTeam2;
        if (!selectedPlayer) {
            alert('Please select a player from the dropdown for this team.');
            return;
        }
        const minute = Number(scoreboard.timer);
        // Prepare payload for /editScoreboard/
        const payload = {
            fixname: selectedFixture.fixname[0],
            score1: isTeam1 ? Number(scoreboard.score1) + 1 : Number(scoreboard.score1),
            score2: !isTeam1 ? Number(scoreboard.score2) + 1 : Number(scoreboard.score2),
            timer: Number(scoreboard.timer),
            referee: referee,
            eventtype: eventType,
            tournament_title: tournamentTitle,
        };
        if (isTeam1) {
            payload.playername1 = selectedPlayer;
        } else {
            payload.playername2 = selectedPlayer;
        }
        // Optimistically update local state.
        setScoreboard(prev => ({
            ...prev,
            [teamKey]: Number(prev[teamKey]) + 1
        }));
        const eventDescription = `${minute}' ${selectedPlayer} ${eventType}`;
        setEvents(prev => ([...prev, eventDescription]));

        try {
            await axios.post(`${backendUrl}/api/editScoreboard/`, payload);
        } catch (err) {
            console.error('Error updating scoreboard:', err);
            alert('Failed to update scoreboard. Please try again.');
            // Optionally, revert the optimistic update here.
        }
    };

    // Function: manually post event after selecting event type
    const handlePostEvent = async () => {
        let payload = {
            fixname: selectedFixture.fixname[0],
            score1: Number(scoreboard.score1),
            score2: Number(scoreboard.score2),
            timer: Number(scoreboard.timer),
            referee: referee,
            eventtype: eventType,
            tournament_title: tournamentTitle,
        };
        if (selectedPlayerTeam1) {
            payload.playername1 = selectedPlayerTeam1;
        } else if (selectedPlayerTeam2) {
            payload.playername2 = selectedPlayerTeam2;
        } else {
            alert('Please select a player from one of the dropdowns.');
            return;
        }
        const minute = Number(scoreboard.timer);
        const selectedPlayer = selectedPlayerTeam1 || selectedPlayerTeam2;
        const eventDescription = `${minute}' ${selectedPlayer} ${eventType}`;
        setEvents(prev => ([...prev, eventDescription]));

        try {
            await axios.post(`${backendUrl}/api/editScoreboard/`, payload);
        } catch (err) {
            console.error('Error posting event:', err);
            alert('Failed to post event. Please try again.');
        }
    };

    // Score update handler for manual input
    const updateScore = (teamKey, value) => {
        setScoreboard(prev => ({ ...prev, [teamKey]: Number(value) }));
    };

    // Clock control functions
    const startStopClock = () => {
        if (!clockRunning) {
            const id = setInterval(() => {
                setScoreboard(prev => ({ ...prev, timer: Number(prev.timer) + 1 }));
            }, 60000);
            setClockIntervalId(id);
            setClockRunning(true);
        } else {
            clearInterval(clockIntervalId);
            setClockRunning(false);
        }
    };

    const incrementTimer = () => {
        setScoreboard(prev => ({ ...prev, timer: Number(prev.timer) + 1 }));
    };

    const decrementTimer = () => {
        setScoreboard(prev => ({ ...prev, timer: Math.max(Number(prev.timer) - 1, 0) }));
    };

    // Toggle player selection for lineup (could be extracted into a separate component)
    const togglePlayerSelection = (team, player) => {
        setSelectedLineup(prev => {
            const current = prev[team] || [];
            if (current.some(p => p._id === player._id)) {
                return { ...prev, [team]: current.filter(p => p._id !== player._id) };
            } else {
                return { ...prev, [team]: [...current, player] };
            }
        });
    };

    // Finalize lineups: builds lineup strings from selected players and updates the scoreboard's lineup field.
    const finalizeLineups = async () => {
        // Construct lineup strings for team1 and team2
        const lineupTeam1 = selectedLineup.team1
            .map(player => `${player.tournament[0].jersey_no}. ${player.fname} ${player.lname}`)
            .join(', ');
        const lineupTeam2 = selectedLineup.team2
            .map(player => `${player.tournament[0].jersey_no}. ${player.fname} ${player.lname}`)
            .join(', ');

        // Create payload without event or player-specific event data
        const payload = {
            fixname: selectedFixture.fixname[0],
            lineup: [lineupTeam1, lineupTeam2],
            score1: Number(scoreboard.score1),
            score2: Number(scoreboard.score2),
            timer: Number(scoreboard.timer),
        };

        try {
            await axios.post(`${backendUrl}/api/editScoreboard/`, payload);
            alert('Lineups finalized successfully.');
        } catch (err) {
            console.error('Error finalizing lineups:', err);
            alert('Failed to finalize lineups. Please try again.');
        }
    };

    const handleResults = async () => {
        if (!selectedFixture) {
            alert('Please select a fixture first.');
            return;
        }

        const payload = {
            fixtureResult: selectedFixture.fixname[0],
            tournament_title: tournamentTitle,
            score: [scoreboard.score1, scoreboard.score2],
            referee: referee,
            fouls: [],
            offsides: [],
            corners: [],
            shots: [],
            lineup: {
                team1: selectedLineup.team1.map(player => `${player.tournament[0].jersey_no}. ${player.fname} ${player.lname}`),
                team2: selectedLineup.team2.map(player => `${player.tournament[0].jersey_no}. ${player.fname} ${player.lname}`),
            },
        };

        try {
            await axios.post(`${backendUrl}/api/results`, payload);
            alert("Result submitted successfully.");
            // Optionally, redirect to the results page:
            // router.push(`/results/${newResultId}`); // newResultId could come from the response if needed.
        } catch (err) {
            console.error("Error submitting result:", err);
            alert("Error submitting result. Please try again.");
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-xl shadow-lg text-white space-y-8">
            {/* Header */}
            <div className="border-b border-gray-700 pb-4">
                <h2 className="text-3xl font-bold">Live Score Management</h2>
            </div>

            {/* Fixture & Referee Card */}
            <div className="bg-gray-900 p-4 rounded-lg shadow-md">
                <form onSubmit={handleFixtureSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1">Fixture</label>
                        <select
                            id="selectFixture"
                            name="fixname"
                            onChange={handleFixtureChange}
                            className="p-2 rounded bg-gray-700 border border-gray-600"
                        >
                            <option value="">Choose Fixture</option>
                            {fixtures.map(fix => (
                                <option key={fix._id} value={fix.fixname[0]}>{fix.fixname[0]}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Match Referee</label>
                        <input
                            type="text"
                            name="referee"
                            value={referee}
                            onChange={(e) => setReferee(e.target.value)}
                            className="p-2 rounded bg-gray-700 border border-gray-600"
                        />
                    </div>
                    <div className="sm:col-span-2 text-right">
                        <button type="submit" id="fixButton" className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition">
                            Submit Fixture
                        </button>
                    </div>
                </form>
            </div>

            {/* Scoreboard Display */}
            <div id="scoreboard" className="bg-gradient-to-r from-gray-700 to-gray-600 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                    <div id="team1" className="flex flex-col items-start">
                        <span className="font-semibold text-xl">{scoreboard.team1}</span>
                        <span id="team1_score" className="text-5xl font-bold">{scoreboard.score1}</span>
                    </div>
                    <div id="clock" className="text-center">
                        <span id="clock_min" className="text-3xl">{scoreboard.timer} min</span>
                        <div className="text-sm">{scoreboard.qtr}</div>
                    </div>
                    <div id="team2" className="flex flex-col items-end">
                        <span className="font-semibold text-xl">{scoreboard.team2}</span>
                        <span id="team2_score" className="text-5xl font-bold">{scoreboard.score2}</span>
                    </div>
                </div>
            </div>

            {/* Control Area Card */}
            <div id="control_area" className="bg-gray-900 p-6 rounded-lg shadow-md space-y-6">
                {/* Score Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <span>Team1 Score:</span>
                        <input
                            type="number"
                            id="team1_score_input"
                            name="score1"
                            value={scoreboard.score1}
                            onChange={(e) => updateScore('score1', e.target.value)}
                            className="p-2 rounded bg-gray-700 border border-gray-600 w-20"
                        />
                        <button onClick={() => handleIncrementScore('score1')} id="team1_plus1" className="px-3 py-1 bg-cyan-500 rounded hover:bg-cyan-600 transition">
                            +1
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span>Team2 Score:</span>
                        <input
                            type="number"
                            id="team2_score_input"
                            name="score2"
                            value={scoreboard.score2}
                            onChange={(e) => updateScore('score2', e.target.value)}
                            className="p-2 rounded bg-gray-700 border border-gray-600 w-20"
                        />
                        <button onClick={() => handleIncrementScore('score2')} id="team2_plus1" className="px-3 py-1 bg-cyan-500 rounded hover:bg-cyan-600 transition">
                            +1
                        </button>
                    </div>
                </div>

                {/* Clock Controls */}
                <div className="flex items-center space-x-4">
                    <span>Clock:</span>
                    <button onClick={startStopClock} id="clock_start" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition">
                        {clockRunning ? 'Stop Clock' : 'Start Clock'}
                    </button>
                    <button onClick={incrementTimer} id="clock_plus" className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition">
                        +
                    </button>
                    <button onClick={decrementTimer} id="clock_minus" className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition">
                        -
                    </button>
                </div>

                {/* Event & Player Selection Section */}
                <div id="event" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-2">
                        <label>Team1 Player</label>
                        <select
                            id="selectPlayer1"
                            className="p-2 bg-gray-700 border border-gray-600 rounded"
                            value={selectedPlayerTeam1}
                            onChange={(e) => setSelectedPlayerTeam1(e.target.value)}
                        >
                            <option value="">Choose Player</option>
                            {playerLists.team1.map(player => (
                                <option key={player._id} value={`${player.tournament[0].jersey_no}. ${player.fname} ${player.lname}`}>
                                    {player.tournament[0].jersey_no}. {player.fname} {player.lname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label>Team2 Player</label>
                        <select
                            id="selectPlayer2"
                            className="p-2 bg-gray-700 border border-gray-600 rounded"
                            value={selectedPlayerTeam2}
                            onChange={(e) => setSelectedPlayerTeam2(e.target.value)}
                        >
                            <option value="">Choose Player</option>
                            {playerLists.team2.map(player => (
                                <option key={player._id} value={`${player.tournament[0].jersey_no}. ${player.fname} ${player.lname}`}>
                                    {player.tournament[0].jersey_no}. {player.fname} {player.lname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label>Event Type</label>
                        <select
                            id="selectEvent"
                            className="p-2 bg-gray-700 border border-gray-600 rounded"
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                        >
                            <option value="goal">Goal</option>
                            <option value="yellow">Yellow Card</option>
                            <option value="red">Red Card</option>
                            <option value="sub">Substitution</option>
                        </select>
                    </div>
                </div>

                {/* Button for manually posting event */}
                <div>
                    <button
                        onClick={handlePostEvent}
                        id="postEvent"
                        className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 transition"
                    >
                        Post Event
                    </button>
                </div>

                {/* Lineup Selection Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold">{scoreboard.team1} Lineup</h3>
                        <div id="lineup_div" className="pl-4 space-y-1">
                            {playerLists.team1.map(player => (
                                <label key={player._id} className="block">
                                    <input
                                        type="checkbox"
                                        onChange={() => togglePlayerSelection('team1', player)}
                                        checked={selectedLineup.team1?.some(p => p._id === player._id) || false}
                                        className="mr-2"
                                    />
                                    {player.tournament[0].jersey_no}. {player.fname} {player.lname}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{scoreboard.team2} Lineup</h3>
                        <div id="lineup_div1" className="pl-4 space-y-1">
                            {playerLists.team2.map(player => (
                                <label key={player._id} className="block">
                                    <input
                                        type="checkbox"
                                        onChange={() => togglePlayerSelection('team2', player)}
                                        checked={selectedLineup.team2?.some(p => p._id === player._id) || false}
                                        className="mr-2"
                                    />
                                    {player.tournament[0].jersey_no}. {player.fname} {player.lname}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    onClick={finalizeLineups}
                    id="finalizeLineupsButton"
                    className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition mt-4"
                >
                    Finalize Lineups
                </button>

                {/* Result Section */}
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
                        Final Score to Result
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LiveForm;

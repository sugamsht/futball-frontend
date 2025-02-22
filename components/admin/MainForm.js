import { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const tabs = [
    { key: 'fixtures', label: 'Fixtures' },
    { key: 'player', label: 'Player' },
    { key: 'team', label: 'Team' },
    { key: 'result', label: 'Result' },
    { key: 'tournament', label: 'Tournament' },
];

const inputClass = "w-full p-2 rounded bg-gray-700 border border-gray-600";

const FormCard = ({ title, children }) => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {children}
    </div>
);

const Input = ({ type = "text", placeholder, value, onChange }) => (
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={inputClass} />
);

const Select = ({ value, onChange, children }) => (
    <select value={value} onChange={onChange} className={inputClass}>
        {children}
    </select>
);

const MainForm = () => {
    // Common state
    // Now tournamentTitle holds the tournament id
    const [tournamentTitle, setTournamentTitle] = useState("");
    const [tournamentNames, setTournamentNames] = useState([]);
    const [teams, setTeams] = useState([]);
    const [fixtures, setFixtures] = useState([]);
    const [activeTab, setActiveTab] = useState("fixtures");

    // Fetch common data on mount
    useEffect(() => {
        axios.get(`${backendUrl}/api/teams`)
            .then(res => {
                const teamsArray = res.data && res.data.data ? res.data.data : res.data;
                setTeams(teamsArray);
            })
            .catch(console.error);

        axios.get(`${backendUrl}/api/fixtures`)
            .then(res => {
                const fixturesArray = res.data && res.data.data ? res.data.data : res.data;
                setFixtures(fixturesArray);
            })
            .catch(console.error);

        axios.get(`${backendUrl}/api/tournaments`)
            .then(res => {
                const tournamentsArray = res.data && res.data.data ? res.data.data : res.data;
                setTournamentNames(tournamentsArray);
            })
            .catch(console.error);
    }, []);

    // Fixture Form state
    const [fixtureTeam1, setFixtureTeam1] = useState("");
    const [fixtureTeam2, setFixtureTeam2] = useState("");
    const [stadium, setStadium] = useState("Dasthrath Stadium");
    const [fixtureDate, setFixtureDate] = useState("");
    const [fixtureTime, setFixtureTime] = useState("");

    // Player Form state
    const [playerTeam, setPlayerTeam] = useState("");
    const [playerFname, setPlayerFname] = useState("");
    const [playerLname, setPlayerLname] = useState("");
    const [playerDOB, setPlayerDOB] = useState("");
    const [playerPosition, setPlayerPosition] = useState("GK");
    const [playerJersey, setPlayerJersey] = useState("");

    // Team Form state
    const [teamName, setTeamName] = useState("");
    const [teamLocation, setTeamLocation] = useState("");
    const [teamLogo, setTeamLogo] = useState("");
    const [teamManager, setTeamManager] = useState("");

    // Result Form state
    const [resultFixture, setResultFixture] = useState("");
    const [resultScore1, setResultScore1] = useState("");
    const [resultScore2, setResultScore2] = useState("");
    const [resultOffsides1, setResultOffsides1] = useState("");
    const [resultOffsides2, setResultOffsides2] = useState("");
    const [resultFouls1, setResultFouls1] = useState("");
    const [resultFouls2, setResultFouls2] = useState("");
    const [resultCorners1, setResultCorners1] = useState("");
    const [resultCorners2, setResultCorners2] = useState("");
    const [resultShots1, setResultShots1] = useState("");
    const [resultShots2, setResultShots2] = useState("");
    const [resultShotsOnTarget1, setResultShotsOnTarget1] = useState("");
    const [resultShotsOnTarget2, setResultShotsOnTarget2] = useState("");


    // Tournament Form state
    const [newTournamentTitle, setNewTournamentTitle] = useState("");
    const [newTournamentStadium, setNewTournamentStadium] = useState("");

    // Generic submit handler
    const handleSubmit = async (e, endpoint, payload, method = "post") => {
        e.preventDefault();
        try {
            if (method === "put") {
                await axios.put(`${backendUrl}${endpoint}`, payload);
            } else {
                await axios.post(`${backendUrl}${endpoint}`, payload);
            }
            alert("Submitted successfully.");
        } catch (err) {
            console.error(err);
            alert("Submission failed.");
        }
    };

    return (
        <div className="p-4 text-white space-y-8">
            {/* Common Tournament Dropdown */}
            <div>
                <label className="block mb-2 text-lg font-bold">Tournament</label>
                <Select value={tournamentTitle} onChange={(e) => setTournamentTitle(e.target.value)}>
                    <option value="">Select Tournament</option>
                    {tournamentNames.map(t => (
                        // option value holds the tournament id
                        <option key={t._id} value={t._id}>{t.title}</option>
                    ))}
                </Select>
            </div>

            {/* Tab Navigation */}
            <ul className="flex space-x-4 border-b border-gray-600 mb-4">
                {tabs.map(tab => (
                    <li key={tab.key} onClick={() => setActiveTab(tab.key)}
                        className={`cursor-pointer px-4 py-2 ${activeTab === tab.key ? "border-b-2 border-green-500" : ""}`}>
                        {tab.label}
                    </li>
                ))}
            </ul>

            {/* Fixtures Tab */}
            {activeTab === "fixtures" && (
                <FormCard title="Fixtures">
                    <div className="grid grid-cols-2 gap-4">
                        <Select value={fixtureTeam1} onChange={(e) => setFixtureTeam1(e.target.value)}>
                            <option value="">Select Team 1</option>
                            {teams.map(team => (
                                // Changed value from team.name to team._id
                                <option key={team._id} value={team._id}>
                                    {team.name}
                                </option>
                            ))}
                        </Select>
                        <Select value={fixtureTeam2} onChange={(e) => setFixtureTeam2(e.target.value)}>
                            <option value="">Select Team 2</option>
                            {teams.map(team => (
                                // Changed value from team.name to team._id
                                <option key={team._id} value={team._id}>
                                    {team.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <Select value={stadium} onChange={(e) => setStadium(e.target.value)}>
                        <option value="Dasthrath Stadium">Dasthrath Stadium</option>
                        <option value="Pokhara Stadium">Pokhara Stadium</option>
                        <option value="ANFA Stadium">ANFA Stadium</option>
                    </Select>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="date" value={fixtureDate} onChange={(e) => setFixtureDate(e.target.value)} />
                        <Input type="time" value={fixtureTime} onChange={(e) => setFixtureTime(e.target.value)} />
                    </div>
                    <button onClick={(e) => handleSubmit(e, "/api/fixtures", {
                        // send the tournament id as "tournament"
                        tournament: tournamentTitle,
                        homeTeam: fixtureTeam1,
                        awayTeam: fixtureTeam2,
                        stadium,
                        matchDate: new Date(fixtureDate),
                        time: fixtureTime,
                    })} className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">Submit Fixture</button>
                </FormCard>
            )}

            {/* Player Tab */}
            {activeTab === "player" && (
                <FormCard title="Player Detail">
                    <Select value={playerTeam} onChange={(e) => setPlayerTeam(e.target.value)}>
                        <option value="">Select Team</option>
                        {teams.map(team => (
                            <option key={team._id} value={team.name}>
                                {team.name}
                            </option>
                        ))}
                    </Select>
                    <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="First Name" value={playerFname} onChange={(e) => setPlayerFname(e.target.value)} />
                        <Input placeholder="Last Name" value={playerLname} onChange={(e) => setPlayerLname(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="date" value={playerDOB} onChange={(e) => setPlayerDOB(e.target.value)} />
                        <Select value={playerPosition} onChange={(e) => setPlayerPosition(e.target.value)}>
                            <option value="GK">GoalKeeper</option>
                            <option value="DF">Defender</option>
                            <option value="MD">Midfielder</option>
                            <option value="FW">Forward</option>
                        </Select>
                    </div>
                    <Input type="number" placeholder="Jersey Number" value={playerJersey} onChange={(e) => setPlayerJersey(e.target.value)} />
                    <button onClick={(e) => handleSubmit(e, "/api/players", {
                        tournament_title: tournamentTitle,
                        team_name: playerTeam,
                        fname: playerFname,
                        lname: playerLname,
                        dob: playerDOB,
                        position: playerPosition,
                        jersey_no: playerJersey,
                    })} className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">Submit Player Detail</button>
                </FormCard>
            )}

            {/* Team Tab */}
            {activeTab === "team" && (
                <FormCard title="Team Detail">
                    <Input placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                    <Input placeholder="Location" value={teamLocation} onChange={(e) => setTeamLocation(e.target.value)} />
                    <Input placeholder="Logo URL" value={teamLogo} onChange={(e) => setTeamLogo(e.target.value)} />
                    <Input placeholder="Manager" value={teamManager} onChange={(e) => setTeamManager(e.target.value)} />
                    <button onClick={(e) => handleSubmit(e, "/api/teams", {
                        // Look up tournament title from tournamentNames using tournamentTitle id selection
                        tournament_title: tournamentNames.find(t => t._id === tournamentTitle)?.title,
                        name: teamName,
                        location: teamLocation,
                        logo: teamLogo,
                        manager: teamManager,
                    })} className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">Submit Team Detail</button>
                </FormCard>
            )}

            {/* Result Tab */}
            {activeTab === "result" && (
                <FormCard title="Result">
                    <Select value={resultFixture} onChange={(e) => setResultFixture(e.target.value)}>
                        <option value="">Select Fixture</option>
                        {fixtures
                            .filter(fixture => fixture.status === "Completed")
                            .map(fixture => (
                                <option key={fixture._id} value={fixture._id}>
                                    {fixture.homeTeam?.name} vs {fixture.awayTeam?.name}
                                </option>
                            ))}
                    </Select>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="number" placeholder="Score Team1" value={resultScore1} onChange={(e) => setResultScore1(e.target.value)} />
                        <Input type="number" placeholder="Score Team2" value={resultScore2} onChange={(e) => setResultScore2(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="number" placeholder="Offsides Team1" value={resultOffsides1} onChange={(e) => setResultOffsides1(e.target.value)} />
                        <Input type="number" placeholder="Offsides Team2" value={resultOffsides2} onChange={(e) => setResultOffsides2(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="number" placeholder="Fouls Team1" value={resultFouls1} onChange={(e) => setResultFouls1(e.target.value)} />
                        <Input type="number" placeholder="Fouls Team2" value={resultFouls2} onChange={(e) => setResultFouls2(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="number" placeholder="Corners Team1" value={resultCorners1} onChange={(e) => setResultCorners1(e.target.value)} />
                        <Input type="number" placeholder="Corners Team2" value={resultCorners2} onChange={(e) => setResultCorners2(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="number" placeholder="Shots Team1" value={resultShots1} onChange={(e) => setResultShots1(e.target.value)} />
                        <Input type="number" placeholder="Shots Team2" value={resultShots2} onChange={(e) => setResultShots2(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="number" placeholder="Shots on Target Team1" value={resultShotsOnTarget1} onChange={(e) => setResultShotsOnTarget1(e.target.value)} />
                        <Input type="number" placeholder="Shots on Target Team2" value={resultShotsOnTarget2} onChange={(e) => setResultShotsOnTarget2(e.target.value)} />
                    </div>
                    <button
                        onClick={(e) =>
                            handleSubmit(e, `/api/fixtures/${resultFixture}`, {
                                score: { home: resultScore1, away: resultScore2 },
                                stats: {
                                    home: {
                                        offsides: resultOffsides1,
                                        fouls: resultFouls1,
                                        corners: resultCorners1,
                                        shots: resultShots1,
                                        shots_on_target: resultShotsOnTarget1,
                                    },
                                    away: {
                                        offsides: resultOffsides2,
                                        fouls: resultFouls2,
                                        corners: resultCorners2,
                                        shots: resultShots2,
                                        shots_on_target: resultShotsOnTarget2,
                                    },
                                },
                            }, "put")
                        }
                        className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
                    >
                        Submit Result
                    </button>
                </FormCard>
            )}

            {/* Tournament Tab */}
            {activeTab === "tournament" && (
                <FormCard title="Tournament">
                    <Input placeholder="Tournament Title" value={newTournamentTitle} onChange={(e) => setNewTournamentTitle(e.target.value)} />
                    <Input placeholder="Stadium" value={newTournamentStadium} onChange={(e) => setNewTournamentStadium(e.target.value)} />
                    <button onClick={(e) => handleSubmit(e, "/api/tournaments", {
                        title: newTournamentTitle,
                        stadium: newTournamentStadium,
                    })} className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">Submit Tournament</button>
                </FormCard>
            )}
        </div>
    );
};

export default MainForm;
// components/admin/MainForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const tabs = [
    { key: 'fixtures', label: 'Fixtures' },
    { key: 'player', label: 'Player' },
    { key: 'team', label: 'Team' },
    { key: 'result', label: 'Result' },
    { key: 'editFixture', label: 'Edit Fixture' },
    { key: 'editResult', label: 'Edit Results' },
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
    const [tournamentTitle, setTournamentTitle] = useState("");
    const [tournamentNames, setTournamentNames] = useState([]);
    const [teams, setTeams] = useState([]);
    const [fixtures, setFixtures] = useState([]);
    const [activeTab, setActiveTab] = useState("fixtures");

    // Fetch common data on mount
    useEffect(() => {
        axios.get(`${backendUrl}/api/teams`).then(res => setTeams(res.data)).catch(console.error);
        axios.get(`${backendUrl}/api/fixtures`).then(res => setFixtures(res.data)).catch(console.error);
        axios.get(`${backendUrl}/api/tournamentnames`)
            .then(res => { if (res.data.success) setTournamentNames(res.data.data); })
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

    // Edit Fixture state
    const [editFixture, setEditFixture] = useState("");
    const [editPostponed, setEditPostponed] = useState(false);
    const [editFixtureDate, setEditFixtureDate] = useState("");
    const [editFixtureTime, setEditFixtureTime] = useState("");
    const [editStadium, setEditStadium] = useState("Dasthrath Stadium");

    // Edit Result state
    const [editResultFixture, setEditResultFixture] = useState("");
    const [editOffsides1, setEditOffsides1] = useState("");
    const [editOffsides2, setEditOffsides2] = useState("");
    const [editFouls1, setEditFouls1] = useState("");
    const [editFouls2, setEditFouls2] = useState("");
    const [editCorners1, setEditCorners1] = useState("");
    const [editCorners2, setEditCorners2] = useState("");
    const [editShots1, setEditShots1] = useState("");
    const [editShots2, setEditShots2] = useState("");

    // Tournament Form state
    const [newTournamentTitle, setNewTournamentTitle] = useState("");
    const [newTournamentStadium, setNewTournamentStadium] = useState("");

    // Generic submit handler
    const handleSubmit = async (e, endpoint, payload) => {
        e.preventDefault();
        try {
            await axios.post(`${backendUrl}${endpoint}`, payload);
            alert("Submitted successfully.");
        } catch (err) {
            console.error(err);
            alert("Submission failed.");
        }
    };

    return (
        <div className="p-4 space-y-8">
            {/* Common Tournament Dropdown */}
            <div>
                <label className="block mb-2 text-lg font-bold">Tournament</label>
                <Select value={tournamentTitle} onChange={(e) => setTournamentTitle(e.target.value)}>
                    <option value="">Select Tournament</option>
                    {tournamentNames.map(t => <option key={t._id} value={t.title}>{t.title}</option>)}
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
                            {teams.map(team => <option key={team._id} value={team.name}>{team.name}</option>)}
                        </Select>
                        <Select value={fixtureTeam2} onChange={(e) => setFixtureTeam2(e.target.value)}>
                            <option value="">Select Team 2</option>
                            {teams.map(team => <option key={team._id} value={team.name}>{team.name}</option>)}
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
                        tournament_title: tournamentTitle,
                        team1: fixtureTeam1,
                        team2: fixtureTeam2,
                        stadium,
                        date: fixtureDate,
                        time: fixtureTime,
                    })} className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">Submit Fixture</button>
                </FormCard>
            )}

            {/* Player Tab */}
            {activeTab === "player" && (
                <FormCard title="Player Detail">
                    <Select value={playerTeam} onChange={(e) => setPlayerTeam(e.target.value)}>
                        <option value="">Select Team</option>
                        {teams.map(team => <option key={team._id} value={team.name}>{team.name}</option>)}
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
                        tournament_title: tournamentTitle,
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
                        {fixtures.map(fixture => <option key={fixture._id} value={fixture.fixname[0]}>{fixture.fixname[0]}</option>)}
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
                    <button onClick={(e) => handleSubmit(e, "/api/results", {
                        tournament_title: tournamentTitle,
                        fixtureResult: resultFixture,
                        score: [resultScore1, resultScore2],
                        offsides: [resultOffsides1, resultOffsides2],
                        fouls: [resultFouls1, resultFouls2],
                        corners: [resultCorners1, resultCorners2],
                        shots: [resultShots1, resultShots2],
                    })} className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">Submit Result</button>
                </FormCard>
            )}

            {/* Edit Fixture Tab */}
            {activeTab === "editFixture" && (
                <FormCard title="Edit Fixture">
                    <Select value={editFixture} onChange={(e) => setEditFixture(e.target.value)}>
                        <option value="">Select Fixture</option>
                        {fixtures.map(fixture => <option key={fixture._id} value={fixture.fixname[0]}>{fixture.fixname[0]}</option>)}
                    </Select>
                    <label className="flex items-center space-x-2">
                        <span>Postponed?</span>
                        <input type="checkbox" checked={editPostponed} onChange={(e) => setEditPostponed(e.target.checked)} />
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="date" value={editFixtureDate} onChange={(e) => setEditFixtureDate(e.target.value)} />
                        <Input type="time" value={editFixtureTime} onChange={(e) => setEditFixtureTime(e.target.value)} />
                    </div>
                    <Select value={editStadium} onChange={(e) => setEditStadium(e.target.value)}>
                        <option value="Dasthrath Stadium">Dasthrath Stadium</option>
                        <option value="Pokhara Stadium">Pokhara Stadium</option>
                        <option value="ANFA Stadium">ANFA Stadium</option>
                    </Select>
                    <button onClick={(e) => handleSubmit(e, "/api/editFixtures/", {
                        fixname: editFixture,
                        postponed: editPostponed,
                        date: editFixtureDate,
                        time: editFixtureTime,
                        stadium: editStadium,
                    })} className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">Submit Edit Fixture</button>
                </FormCard>
            )}

            {/* Edit Results Tab */}
            {activeTab === "editResult" && (
                <FormCard title="Edit Results">
                    <Select value={editResultFixture} onChange={(e) => setEditResultFixture(e.target.value)}>
                        <option value="">Select Fixture</option>
                        {fixtures.map(fixture => <option key={fixture._id} value={fixture.fixname[0]}>{fixture.fixname[0]}</option>)}
                    </Select>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="number" placeholder="Offsides Team1" value={editOffsides1} onChange={(e) => setEditOffsides1(e.target.value)} />
                        <Input type="number" placeholder="Offsides Team2" value={editOffsides2} onChange={(e) => setEditOffsides2(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="number" placeholder="Fouls Team1" value={editFouls1} onChange={(e) => setEditFouls1(e.target.value)} />
                        <Input type="number" placeholder="Fouls Team2" value={editFouls2} onChange={(e) => setEditFouls2(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="number" placeholder="Corners Team1" value={editCorners1} onChange={(e) => setEditCorners1(e.target.value)} />
                        <Input type="number" placeholder="Corners Team2" value={editCorners2} onChange={(e) => setEditCorners2(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="number" placeholder="Shots Team1" value={editShots1} onChange={(e) => setEditShots1(e.target.value)} />
                        <Input type="number" placeholder="Shots Team2" value={editShots2} onChange={(e) => setEditShots2(e.target.value)} />
                    </div>
                    <button onClick={(e) => handleSubmit(e, "/api/editResults/", {
                        fixtureResult: editResultFixture,
                        offsides: [editOffsides1, editOffsides2],
                        fouls: [editFouls1, editFouls2],
                        corners: [editCorners1, editCorners2],
                        shots: [editShots1, editShots2],
                    })} className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">Submit Edit Results</button>
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

import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const config = {
  fixtures: {
    endpoint: '/fixtures',
    fields: [
      { name: 'tournament', label: 'Tournament', type: 'text' },
      { name: 'homeTeam', label: 'Home Team', type: 'text' },
      { name: 'awayTeam', label: 'Away Team', type: 'text' },
      { name: 'stadium', label: 'Stadium', type: 'text' },
      { name: 'matchDate', label: 'Date', type: 'date' },
      { name: 'time', label: 'Time', type: 'time' }
    ]
  },
  results: {
    // Using the fixtures endpoint with status "Completed"
    endpoint: '/fixtures',
    fields: [
      { name: 'tournament', label: 'Tournament', type: 'text' },
      { name: 'homeTeam', label: 'Home Team', type: 'text' },
      { name: 'awayTeam', label: 'Away Team', type: 'text' },
      { name: 'stadium', label: 'Stadium', type: 'text' },
      { name: 'matchDate', label: 'Date', type: 'date' },
      { name: 'time', label: 'Time', type: 'time' },
      // Instead of score1/score2, use homeScore and awayScore for both tabs
      { name: 'homeScore', label: 'Home Score', type: 'number' },
      { name: 'awayScore', label: 'Away Score', type: 'number' }
    ]
  },
  teams: {
    endpoint: '/teams',
    fields: [
      { name: 'tournament_title', label: 'Tournament Title', type: 'text' },
      { name: 'name', label: 'Team Name', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'logo', label: 'Logo URL', type: 'text' },
      { name: 'manager', label: 'Manager', type: 'text' }
    ]
  },
  players: {
    endpoint: '/players',
    fields: [
      { name: 'team_name', label: 'Team Name', type: 'text' },
      { name: 'fname', label: 'First Name', type: 'text' },
      { name: 'lname', label: 'Last Name', type: 'text' },
      { name: 'dob', label: 'Date of Birth', type: 'date' },
      { name: 'position', label: 'Position', type: 'text' }
    ]
  },
  scoreboard: {
    endpoint: '/scoreboard',
    fields: [
      // Now using homeScore and awayScore directly.
      { name: 'homeScore', label: 'Home Score', type: 'number' },
      { name: 'awayScore', label: 'Away Score', type: 'number' },
      { name: 'timer', label: 'Timer', type: 'text' },
      { name: 'fixture', label: 'Fixture', type: 'text' },
      { name: 'referee', label: 'Referee', type: 'text' },
      { name: 'lineup', label: 'Lineup (comma separated)', type: 'text' }
    ]
  }
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('fixtures');
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch data whenever activeTab changes
  useEffect(() => {
    fetchData();
    setFormData({});
    setEditingId(null);
    setMessage('');
  }, [activeTab]);

  const fetchData = async () => {
    try {
      // Append a query parameter based on selected tab
      let url = baseUrl + config[activeTab].endpoint;
      if (activeTab === 'fixtures') {
        url += '?status=Scheduled';
      } else if (activeTab === 'results') {
        url += '?status=Completed';
      }
      const res = await axios.get(url);
      const items = res.data.data || res.data || [];
      setData(items);
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Error fetching data.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Prepare payload for submission, setting status based on activeTab
  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = { ...formData };
    let endpoint = config[activeTab].endpoint;

    if (activeTab === 'scoreboard') {
      // Only include score, timer and referee for scoreboard.
      payload = {
        score: {
          home: Number(formData.homeScore),
          away: Number(formData.awayScore)
        },
        timer: formData.timer,
        referee: formData.referee
      };
    } else if (activeTab === 'results') {
      // Merge the two score fields into an object for results.
      payload.score = {
        home: Number(formData.homeScore),
        away: Number(formData.awayScore)
      };
      delete payload.homeScore;
      delete payload.awayScore;
      delete payload.fixture;
      delete payload.events;
      payload.status = "Completed";
    } else if (activeTab === 'fixtures') {
      payload.status = "Scheduled";
    }

    try {
      if (editingId) {
        if (activeTab === 'scoreboard') {
          // For scoreboard, use PATCH for updates.
          await axios.patch(`${baseUrl}${endpoint}/${editingId}`, payload);
        } else {
          // For results and fixtures, use PUT for updates.
          await axios.put(`${baseUrl}${endpoint}/${editingId}`, payload);
        }
        setMessage('Updated successfully!');
      } else {
        await axios.post(baseUrl + endpoint, payload);
        setMessage('Added successfully!');
      }
      fetchData();
      setFormData({});
      setEditingId(null);
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('Submission failed.');
    }
  };

  // Prepopulate form data when editing—now both results and scoreboard use homeScore/awayScore.
  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData(
      (activeTab === 'results' || activeTab === 'scoreboard')
        ? {
          ...item,
          homeScore: item.score ? item.score.home : '',
          awayScore: item.score ? item.score.away : ''
        }
        : { ...item }
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}${config[activeTab].endpoint}/${id}`);
      setMessage('Deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('Deletion failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 shadow-lg">
        <div className="p-6 text-2xl font-bold text-white border-b border-gray-600">
          Dashboard
        </div>
        <nav className="mt-4">
          {Object.keys(config).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-6 py-3 transition 
                ${activeTab === tab
                  ? 'bg-gray-600 font-bold text-white border-l-4 border-blue-500'
                  : 'hover:bg-gray-700 text-gray-300'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4 capitalize text-gray-100">
          {activeTab} Management
        </h1>
        {message && (
          <div className="mb-4 p-3 bg-green-800 text-green-300 rounded">
            {message}
          </div>
        )}

        {/* Data Table */}
        <div className="overflow-x-auto mb-8">
          {data.length > 0 ? (
            <table className="min-w-full bg-gray-800 shadow rounded-lg">
              <thead>
                <tr>
                  {config[activeTab].fields.map((field) => {
                    // In Results, skip showing the second score field if needed.
                    if (activeTab === 'results' && field.name === 'awayScore') return null;
                    return (
                      <th key={field.name} className="px-4 py-2 border-b text-left text-gray-300">
                        {field.label}
                      </th>
                    );
                  })}
                  <th className="px-4 py-2 border-b text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-700">
                    {config[activeTab].fields.map((field) => {
                      // In Results, skip rendering the awayScore column.
                      if (activeTab === 'results' && field.name === 'awayScore') return null;
                      return (
                        <td key={field.name} className="px-4 py-2 border-b text-gray-300">
                          {(() => {
                            if (activeTab === 'scoreboard') {
                              if (field.name === 'homeScore') {
                                return item.score ? item.score.home : '';
                              }
                              if (field.name === 'awayScore') {
                                return item.score ? item.score.away : '';
                              }
                              if (field.name === 'fixture') {
                                if (item.fixture) {
                                  const tournament = item.fixture.tournament ? item.fixture.tournament.title : '';
                                  const homeTeam = item.fixture.homeTeam ? item.fixture.homeTeam.name : '';
                                  const awayTeam = item.fixture.awayTeam ? item.fixture.awayTeam.name : '';
                                  const date = item.fixture.matchDate ? new Date(item.fixture.matchDate).toLocaleDateString() : '';
                                  const stadium = item.fixture.stadium || '';
                                  const time = item.fixture.time || '';
                                  return `${tournament}: ${homeTeam} vs ${awayTeam} at ${stadium} on ${date} @ ${time}`;
                                }
                                return '';
                              }
                              return item[field.name] ? item[field.name].toString() : '';
                            }
                            if (activeTab === 'players' && field.name === 'team_name') {
                              return item.tournament && item.tournament.length > 0
                                ? item.tournament[0].team_name
                                : '';
                            }
                            if (activeTab === 'results' && field.name === 'homeScore') {
                              const homeVal = item.score ? item.score.home : '';
                              const awayVal = item.score ? item.score.away : '';
                              return `${homeVal} - ${awayVal}`;
                            }
                            if (field.name === 'tournament' && item.tournament) {
                              return item.tournament.title;
                            }
                            if (field.name === 'homeTeam' && item.homeTeam) {
                              return item.homeTeam.name;
                            }
                            if (field.name === 'awayTeam' && item.awayTeam) {
                              return item.awayTeam.name;
                            }
                            if (field.name === 'matchDate' && item.matchDate) {
                              return new Date(item.matchDate).toLocaleDateString();
                            }
                            return item[field.name] ? item[field.name].toString() : '';
                          })()}
                        </td>
                      );
                    })}
                    <td className="px-4 py-2 border-b">
                      <button onClick={() => handleEdit(item)} className="text-blue-400 hover:underline mr-2">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400">No records found.</p>
          )}
        </div>

        {/* Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {editingId ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config[activeTab].fields.map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="mb-1 font-medium text-gray-300">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={
                    field.type === 'date' && formData[field.name]
                      ? formData[field.name].toString().slice(0, 10)
                      : formData[field.name] || ''
                  }
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-600 bg-gray-700 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div className="md:col-span-2 flex space-x-4 mt-4">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                {editingId ? 'Update' : 'Add'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({});
                  }}
                  className="bg-gray-600 text-gray-200 px-6 py-2 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
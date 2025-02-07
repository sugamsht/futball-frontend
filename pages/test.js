import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

// Configuration for Fixtures, Results, Teams, Players, and Scoreboard
const config = {
  fixtures: {
    endpoint: '/fixtures',
    updateEndpoint: '/editFixtures/',
    fields: [
      { name: 'tournament_title', label: 'Tournament Title', type: 'text' },
      { name: 'team1', label: 'Team 1', type: 'text' },
      { name: 'team2', label: 'Team 2', type: 'text' },
      { name: 'stadium', label: 'Stadium', type: 'text' },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'time', label: 'Time', type: 'time' }
    ]
  },
  results: {
    endpoint: '/results',
    fields: [
      { name: 'tournament_title', label: 'Tournament Title', type: 'text' },
      { name: 'fixtureResult', label: 'Fixture Result', type: 'text' },
      { name: 'score1', label: 'Score 1', type: 'number' },
      { name: 'score2', label: 'Score 2', type: 'number' },
      { name: 'fouls1', label: 'Fouls 1', type: 'number' },
      { name: 'fouls2', label: 'Fouls 2', type: 'number' },
      { name: 'offsides1', label: 'Offsides 1', type: 'number' },
      { name: 'offsides2', label: 'Offsides 2', type: 'number' },
      { name: 'corners1', label: 'Corners 1', type: 'number' },
      { name: 'corners2', label: 'Corners 2', type: 'number' },
      { name: 'shots1', label: 'Shots 1', type: 'number' },
      { name: 'shots2', label: 'Shots 2', type: 'number' }
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
      { name: 'fname', label: 'First Name', type: 'text' },
      { name: 'lname', label: 'Last Name', type: 'text' },
      { name: 'dob', label: 'Date of Birth', type: 'date' },
      { name: 'position', label: 'Position', type: 'text' }
    ]
  },
  scoreboard: {
    endpoint: '/scoreboard',
    updateEndpoint: '/editScoreboard/',
    fields: [
      { name: 'score1', label: 'Score 1', type: 'number' },
      { name: 'score2', label: 'Score 2', type: 'number' },
      { name: 'timer', label: 'Timer', type: 'text' },
      { name: 'fixname', label: 'Fixture Name', type: 'text' },
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
      const res = await axios.get(baseUrl + config[activeTab].endpoint);
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

  // Prepare payload for submission, merging separate inputs for array fields (results tab)
  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = { ...formData };
    if (activeTab === 'results') {
      payload.score = [Number(formData.score1), Number(formData.score2)];
      payload.fouls = [Number(formData.fouls1), Number(formData.fouls2)];
      payload.offsides = [Number(formData.offsides1), Number(formData.offsides2)];
      payload.corners = [Number(formData.corners1), Number(formData.corners2)];
      payload.shots = [Number(formData.shots1), Number(formData.shots2)];
      delete payload.score1;
      delete payload.score2;
      delete payload.fouls1;
      delete payload.fouls2;
      delete payload.offsides1;
      delete payload.offsides2;
      delete payload.corners1;
      delete payload.corners2;
      delete payload.shots1;
      delete payload.shots2;
    }
    try {
      if (editingId) {
        if (config[activeTab].updateEndpoint) {
          await axios.post(baseUrl + config[activeTab].updateEndpoint, payload);
        } else {
          await axios.put(`${baseUrl + config[activeTab].endpoint}/${editingId}`, payload);
        }
        setMessage('Updated successfully!');
      } else {
        await axios.post(baseUrl + config[activeTab].endpoint, payload);
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

  // Prepopulate form data when editing, handling arrays for results
  const handleEdit = (item) => {
    setEditingId(item._id);
    if (activeTab === 'results') {
      setFormData({
        ...item,
        score1: Array.isArray(item.score) ? item.score[0] : '',
        score2: Array.isArray(item.score) ? item.score[1] : '',
        fouls1: Array.isArray(item.fouls) ? item.fouls[0] : '',
        fouls2: Array.isArray(item.fouls) ? item.fouls[1] : '',
        offsides1: Array.isArray(item.offsides) ? item.offsides[0] : '',
        offsides2: Array.isArray(item.offsides) ? item.offsides[1] : '',
        corners1: Array.isArray(item.corners) ? item.corners[0] : '',
        corners2: Array.isArray(item.corners) ? item.corners[1] : '',
        shots1: Array.isArray(item.shots) ? item.shots[0] : '',
        shots2: Array.isArray(item.shots) ? item.shots[1] : ''
      });
    } else {
      setFormData({ ...item });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl + config[activeTab].endpoint}/${id}`);
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
                  {config[activeTab].fields.map((field) => (
                    <th
                      key={field.name}
                      className="px-4 py-2 border-b text-left text-gray-300"
                    >
                      {field.label}
                    </th>
                  ))}
                  <th className="px-4 py-2 border-b text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-700">
                    {config[activeTab].fields.map((field) => (
                      <td key={field.name} className="px-4 py-2 border-b text-gray-300">
                        {(() => {
                          if (activeTab === 'results') {
                            if (
                              ['score1', 'fouls1', 'offsides1', 'corners1', 'shots1'].includes(
                                field.name
                              )
                            ) {
                              const base = field.name.slice(0, -1);
                              const value1 = Array.isArray(item[base]) ? item[base][0] : '';
                              const value2 = Array.isArray(item[base]) ? item[base][1] : '';
                              return `${value1} / ${value2}`;
                            }
                          }
                          return item[field.name] ? item[field.name].toString() : '';
                        })()}
                      </td>
                    ))}
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-400 hover:underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-400 hover:underline"
                      >
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
                <label className="mb-1 font-medium text-gray-300">
                  {field.label}
                </label>
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
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
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

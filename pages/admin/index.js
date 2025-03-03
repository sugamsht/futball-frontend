//// filepath: /D:/apps/Nepscore/futball-frontend/pages/admin/index.js
import { parse } from 'cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StoryForm from '../../components/admin/StoryForm';
import GalleryForm from '../../components/admin/GalleryForm';
import LeagueForm from '../../components/admin/LeagueForm';
import LiveForm from '../../components/admin/LiveForm';
import MainForm from '../../components/admin/MainForm';

export async function getServerSideProps({ req }) {
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    if (!cookies.sessionId) {
        return {
            props: {
                error: 'Login first to view this page',
            },
        };
    }
    // Verify that the session id matches a valid session on the backend
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        // Pass along the cookie header for session verification
        const verifyRes = await fetch(`${backendUrl}/api/verify-session`, {
            headers: { cookie: req.headers.cookie }
        });
        if (verifyRes.status !== 200) {
            return {
                props: {
                    error: 'Invalid session. Login first to view this page',
                },
            };
        }
    } catch (error) {
        console.error('Error verifying session:', error);
        return {
            props: {
                error: 'Error verifying session. Login first to view this page',
            },
        };
    }
    return { props: {} };
}

const AdminDashboard = ({ error }) => {
    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <h1 className="text-2xl text-white">{error}</h1>
            </div>
        );
    }

    const [activeTab, setActiveTab] = useState('stories');
    const [stories, setStories] = useState([]);
    const [galleryItems, setGalleryItems] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Fetch initial data for stories, gallery, and leagues
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [storiesRes, galleryRes, leaguesRes] = await Promise.all([
                axios.get(`${backendUrl}/api/stories`),
                axios.get(`${backendUrl}/api/gallery`),
                axios.get(`${backendUrl}/api/leagues`)
            ]);
            setStories(storiesRes.data.data);
            setGalleryItems(galleryRes.data.data);
            setLeagues(leaguesRes.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Common delete handler
    const handleDelete = async (endpoint, id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`${backendUrl}/api/${endpoint}/${id}`);
                fetchData(); // Refresh data after deletion
                alert('Item deleted successfully');
            } catch (error) {
                console.error('Delete error:', error);
                alert('Error deleting item');
            }
        }
    };

    // Common edit handler
    const handleEdit = (item, type) => {
        setEditingItem({ ...item, type });
    };

    // Handle form submission (both create and update)
    const handleFormSubmit = () => {
        setEditingItem(null);
        fetchData(); // Refresh data after submission
    };

    // DashboardCard remains unchanged
    const DashboardCard = ({ title, tab, gradient, description }) => (
        <div
            className={`bg-gradient-to-r ${gradient} p-4 rounded-xl shadow-xl cursor-pointer transition-all ${activeTab === tab ? 'ring-2 ring-white scale-105' : 'opacity-90 hover:scale-105'
                }`}
            onClick={() => setActiveTab(tab)}
        >
            <div className="flex flex-col justify-between h-full">
                <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
                <p className="text-gray-200 text-sm">{description}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-8">
                    Admin Dashboard
                </h1>

                {/* Dashboard Cards Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    <DashboardCard
                        title="Main"
                        tab="main"
                        gradient="from-green-600 to-emerald-600"
                        description="Manage core football data"
                    />
                    <DashboardCard
                        title="Stories"
                        tab="stories"
                        gradient="from-purple-600 to-pink-600"
                        description="Manage news and articles"
                    />
                    <DashboardCard
                        title="Gallery"
                        tab="gallery"
                        gradient="from-cyan-600 to-blue-600"
                        description="Handle match photos and videos"
                    />
                    <DashboardCard
                        title="Leagues"
                        tab="leagues"
                        gradient="from-orange-600 to-amber-600"
                        description="Update league information"
                    />
                    <DashboardCard
                        title="Live"
                        tab="live"
                        gradient="from-indigo-600 to-violet-600"
                        description="Manage live score interactions"
                    />
                </div>

                {/* Content Sections */}
                <div className="bg-gray-800 rounded-2xl shadow-2xl p-6">
                    {/* Stories Management */}
                    {activeTab === 'stories' && (
                        <>
                            <StoryForm
                                editData={editingItem?.type === 'story' ? editingItem : null}
                                onSubmit={handleFormSubmit}
                            />
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {stories.map((story) => (
                                    <div key={story._id} className="bg-gray-700/50 p-4 rounded-xl backdrop-blur-sm">
                                        <h3 className="text-xl font-semibold text-gray-100 mb-2">{story.title}</h3>
                                        <p className="text-gray-400 line-clamp-3 mb-4">{story.content}</p>
                                        <div className="flex gap-2">
                                            <button
                                                className="bg-cyan-600/90 text-white px-3 py-1 rounded-lg hover:bg-cyan-700 transition"
                                                onClick={() => handleEdit(story, 'story')}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-600/90 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                                                onClick={() => handleDelete('stories', story._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Gallery Management */}
                    {activeTab === 'gallery' && (
                        <>
                            <GalleryForm
                                editData={editingItem?.type === 'gallery' ? editingItem : null}
                                onSubmit={handleFormSubmit}
                            />
                            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {galleryItems.map((item) => (
                                    <div key={item._id} className="group relative aspect-square bg-gray-700 rounded-xl overflow-hidden">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.caption}
                                            className="w-full h-full object-cover transform transition duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end">
                                            <p className="text-white text-sm truncate">{item.caption}</p>
                                        </div>
                                        <div className="absolute top-2 right-2 flex gap-2">
                                            <button
                                                className="bg-cyan-600/90 text-white p-1.5 rounded-lg hover:bg-cyan-700 backdrop-blur-sm"
                                                onClick={() => handleEdit(item, 'gallery')}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="bg-red-600/90 text-white p-1.5 rounded-lg hover:bg-red-700 backdrop-blur-sm"
                                                onClick={() => handleDelete('gallery', item._id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Leagues Management */}
                    {activeTab === 'leagues' && (
                        <>
                            <LeagueForm
                                editData={editingItem?.type === 'league' ? editingItem : null}
                                onSubmit={handleFormSubmit}
                            />
                            <div className="mt-8 overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-700/50 backdrop-blur-sm">
                                        <tr>
                                            <th className="p-3 text-left text-cyan-400">League Name</th>
                                            <th className="p-3 text-left text-cyan-400">Teams</th>
                                            <th className="p-3 text-left text-cyan-400">Status</th>
                                            <th className="p-3 text-left text-cyan-400">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leagues.map((league) => (
                                            <tr key={league._id} className="border-b border-gray-700/30 hover:bg-gray-700/10 transition">
                                                <td className="p-3 text-gray-100">{league.title}</td>
                                                <td className="p-3 text-gray-300">{league.teamList?.length || 0}</td>
                                                <td className="p-3">
                                                    <span className="bg-green-600/90 text-white px-2 py-1 rounded text-sm">
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="p-3 flex gap-2">
                                                    <button
                                                        className="bg-cyan-600/90 text-white px-3 py-1 rounded-lg hover:bg-cyan-700 transition"
                                                        onClick={() => handleEdit(league, 'league')}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-red-600/90 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                                                        onClick={() => handleDelete('leagues', league._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeTab === 'main' && (
                        <div className="space-y-8">
                            <MainForm />
                        </div>
                    )}

                    {/* Live Score Management */}
                    {activeTab === 'live' && (
                        <>
                            <LiveForm />
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
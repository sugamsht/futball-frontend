import { useState, useEffect } from 'react';

const LeagueForm = ({ editData, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        logo: '',
    });

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        if (editData) {
            setFormData({
                title: editData.title || '',
                description: editData.description || '',
                logo: editData.logo || '',
            });
        }
    }, [editData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editData
            ? `${backendUrl}/api/admin/leagues/${editData._id}`
            : `${backendUrl}/api/admin/leagues`;

        const method = editData ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    onSubmit();
                    setFormData({ title: '', description: '', logo: '' });
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl space-y-4">
            <input
                type="text"
                placeholder="League Title"
                className="w-full p-2 bg-gray-700 text-white rounded"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
                placeholder="Description"
                className="w-full p-2 bg-gray-700 text-white rounded"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows="2"
            />
            <input
                type="text"
                placeholder="Logo URL"
                className="w-full p-2 bg-gray-700 text-white rounded"
                value={formData.logo}
                onChange={e => setFormData({ ...formData, logo: e.target.value })}
            />
            <button
                type="submit"
                className="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 transition"
            >
                {editData ? 'Update League' : 'Create League'}
            </button>
        </form>
    );
};

export default LeagueForm;
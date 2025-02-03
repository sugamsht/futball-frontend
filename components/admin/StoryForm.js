import { useState, useEffect } from 'react';

const StoryForm = ({ editData, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: ''
    });

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        if (editData) {
            setFormData({
                title: editData.title || '',
                content: editData.content || '',
                image: editData.image || ''
            });
        }
    }, [editData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editData
            ? `${backendUrl}/api/admin/stories/${editData._id}`
            : `${backendUrl}/api/admin/stories`;

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
                    setFormData({ title: '', content: '', image: '' });
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl space-y-4">
            <input
                type="text"
                placeholder="Story Title"
                className="w-full p-2 bg-gray-700 text-white rounded"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
                placeholder="Story Content"
                className="w-full p-2 bg-gray-700 text-white rounded"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                rows="4"
            />
            <input
                type="text"
                placeholder="Image URL"
                className="w-full p-2 bg-gray-700 text-white rounded"
                value={formData.image}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
            />
            <button
                type="submit"
                className="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 transition"
            >
                {editData ? 'Update Story' : 'Add Story'}
            </button>
        </form>
    );
};

export default StoryForm;
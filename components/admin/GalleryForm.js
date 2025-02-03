import { useState, useEffect } from 'react';

const GalleryForm = ({ editData, onSubmit }) => {
    const [formData, setFormData] = useState({
        imageUrl: '',
        caption: ''
    });

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        if (editData) {
            setFormData({
                imageUrl: editData.imageUrl || '',
                caption: editData.caption || ''
            });
        }
    }, [editData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editData
            ? `${backendUrl}/api/admin/gallery/${editData._id}`
            : `${backendUrl}/api/admin/gallery`;

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
                    setFormData({ imageUrl: '', caption: '' });
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl space-y-4">
            <input
                type="text"
                placeholder="Image URL"
                className="w-full p-2 bg-gray-700 text-white rounded"
                value={formData.imageUrl}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
            />
            <textarea
                placeholder="Caption"
                className="w-full p-2 bg-gray-700 text-white rounded"
                value={formData.caption}
                onChange={e => setFormData({ ...formData, caption: e.target.value })}
                rows="2"
            />
            <button
                type="submit"
                className="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 transition"
            >
                {editData ? 'Update Gallery Item' : 'Add to Gallery'}
            </button>
        </form>
    );
};

export default GalleryForm;
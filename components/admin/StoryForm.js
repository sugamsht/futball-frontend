// StoryForm.js
import { useState, useEffect } from 'react';

const StoryForm = ({ editData, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        images: []
    });
    const [newImage, setNewImage] = useState('');
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        if (editData) {
            setFormData({
                title: editData.title || '',
                content: editData.content || '',
                images: editData.images || []
            });
        }
    }, [editData]);

    const handleAddImage = () => {
        if (newImage.trim()) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, newImage.trim()]
            }));
            setNewImage('');
        }
    };

    const handleRemoveImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editData
            ? `${backendUrl}/api/stories/${editData._id}`
            : `${backendUrl}/api/stories`;

        const method = editData ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                // Ensure images array is properly sent
                images: formData.images.filter(url => url.trim() !== '')
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    onSubmit();
                    setFormData({ title: '', content: '', images: [] });
                    setNewImage('');
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
                required
            />

            <textarea
                placeholder="Story Content"
                className="w-full p-2 bg-gray-700 text-white rounded"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                rows="4"
                required
            />

            <div className="space-y-2">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Image URL"
                        className="flex-1 p-2 bg-gray-700 text-white rounded"
                        value={newImage}
                        onChange={e => setNewImage(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={handleAddImage}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Add Image
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {formData.images.map((url, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={url}
                                alt={`Story image ${index + 1}`}
                                className="w-full h-24 object-cover rounded"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 p-1 bg-red-600/90 text-white rounded-full backdrop-blur-sm hover:bg-red-700 transition"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>

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
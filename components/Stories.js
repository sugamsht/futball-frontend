import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Story from './Story';

function Stories() {
    const [stories, setStories] = useState([]);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isStoryOpen, setIsStoryOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/admin/stories`);
                // Temporarily remove the filter for debugging
                setStories(response.data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, [backendUrl]);

    const handleStoryClick = (index) => {
        setCurrentStoryIndex(index);
        setCurrentImageIndex(0);
        setIsStoryOpen(true);
    };

    const handleClose = () => {
        setIsStoryOpen(false);
        setCurrentImageIndex(0);
    };

    const handleNext = () => {
        const currentStory = stories[currentStoryIndex];
        if (!currentStory) return;

        if (currentImageIndex < (currentStory.images?.length || 1) - 1) {
            setCurrentImageIndex(prev => prev + 1);
        } else {
            setCurrentStoryIndex(prev => (prev + 1) % stories.length);
            setCurrentImageIndex(0);
        }
    };

    const handlePrev = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
        } else {
            const newStoryIndex = (currentStoryIndex - 1 + stories.length) % stories.length;
            setCurrentStoryIndex(newStoryIndex);
            const newStoryImages = stories[newStoryIndex]?.images || [];
            setCurrentImageIndex(newStoryImages.length - 1);
        }
    };

    if (loading) {
        return (
            <div className="w-full p-6 text-center text-cyan-400 animate-pulse">
                Loading stories...
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full p-6 text-center text-red-400">
                Error loading stories: {error}
            </div>
        );
    }

    if (stories.length === 0) {
        return (
            <div className="w-full p-6 text-center text-gray-400">
                No stories available. Create one in the admin dashboard.
            </div>
        );
    }

    return (
        <div className='relative w-full'>
            <div className='flex space-x-4 pb-4 overflow-x-auto'>
                {stories.map((story, index) => (
                    <div
                        key={story._id}
                        className="relative group flex-shrink-0 w-40 h-56 cursor-pointer transition-all duration-300 hover:scale-105"
                        onClick={() => handleStoryClick(index)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0.5 bg-gray-800 rounded-xl overflow-hidden">
                            {(story.images?.length > 0) ? (
                                <img
                                    src={story.images[0]}
                                    alt={story.title}
                                    className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                    <span className="text-gray-400 text-sm">No images</span>
                                </div>
                            )}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900/90 to-transparent">
                            <h3 className="text-sm font-semibold text-white truncate">
                                {story.title}
                            </h3>
                            <p className="text-xs text-gray-400 truncate">
                                {new Date(story.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {isStoryOpen && stories[currentStoryIndex] && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center">
                    <div className="relative w-full max-w-2xl aspect-[9/16] bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                        <Story
                            story={stories[currentStoryIndex]}
                            currentImageIndex={currentImageIndex}
                            onImageChange={setCurrentImageIndex}
                            onClose={handleClose}
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Stories;
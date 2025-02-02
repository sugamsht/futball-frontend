import React, { useState, useEffect } from 'react';
import Story from './Story';

function Stories() {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [isStoryOpen, setIsStoryOpen] = useState(false);

    const handleStoryClick = (index) => {
        setCurrentStoryIndex(index);
        setIsStoryOpen(true);
    };

    const handleClose = () => {
        setIsStoryOpen(false);
    };

    const handleNextStory = () => {
        setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % 4);
    };

    const handlePrevStory = () => {
        setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                handleNextStory();
            } else if (event.key === 'ArrowLeft') {
                handlePrevStory();
            } else if (event.key === 'Escape') {
                handleClose();
            }
        };

        if (isStoryOpen) {
            window.addEventListener('keydown', handleKeyDown);
        } else {
            window.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isStoryOpen]);

    return (
        <div className='relative w-full'>
            <div className='flex space-x-4 pb-4 overflow-x-auto'>
                {[0, 1, 2, 3].map((index) => (
                    <div
                        key={index}
                        className="relative group flex-shrink-0 w-40 h-56 cursor-pointer transition-all duration-300 hover:scale-105"
                        onClick={() => handleStoryClick(index)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0.5 bg-gray-800 rounded-xl overflow-hidden">
                            <img
                                src="./sheru.jpg"
                                alt={`Story Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900/90 to-transparent">
                            <h3 className="text-sm font-semibold text-white truncate">
                                Story Title {index + 1}
                            </h3>
                            <p className="text-xs text-gray-400 truncate">
                                Updated 2h ago
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {isStoryOpen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center">
                    <div className="relative w-full max-w-2xl aspect-[9/16] bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-gray-800/50 hover:bg-gray-700/80 rounded-full backdrop-blur-sm transition-all"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <button
                            onClick={handlePrevStory}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 p-2 bg-gray-800/50 hover:bg-gray-700/80 rounded-full backdrop-blur-sm transition-all"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={handleNextStory}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 p-2 bg-gray-800/50 hover:bg-gray-700/80 rounded-full backdrop-blur-sm transition-all"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <Story
                            storyIndex={currentStoryIndex}
                            onClose={handleClose}
                            handleNextStory={handleNextStory}
                            handlePrevStory={handlePrevStory}
                            setCurrentStoryIndex={setCurrentStoryIndex}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Stories;
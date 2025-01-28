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
        <div className='relative flex flex-1 col-span-7 lg:col-span-4 items-center justify-start h-70 w-auto bg-red-400 my-2 overflow-x-scroll overflow-y-hidden scrollbar-hide'>
            <div className="flex">
                {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="relative w-32 lg:w-40 h-52 overflow-hidden rounded-2xl bg-gray-200 mx-2">
                        <img
                            src="./sheru.jpg"
                            alt={`Story Thumbnail ${index + 1}`}
                            className="absolute inset-0 w-full h-full object-cover hover:opacity-75 transition duration-150 ease-in-out"
                            onClick={() => handleStoryClick(index)}
                        />
                    </div>
                ))}
            </div>
            {isStoryOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
                >
                    <Story
                        storyIndex={currentStoryIndex}
                        onClose={handleClose}
                    />
                </div>
            )}
        </div>
    );
}

export default Stories;
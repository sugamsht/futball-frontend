import React from 'react';
import Stories from 'react-insta-stories';

function Story({ story, currentImageIndex, onImageChange, onClose, handleNext, handlePrev }) {
    if (!story) return null;

    // Create default content if no images
    const formattedStories = story.images?.length > 0
        ? story.images.map((image) => ({
            content: () => (
                <div className="relative h-full w-full">
                    <img
                        src={image}
                        alt={story.title}
                        className="object-cover h-full w-full"
                    />
                    <div className="absolute bottom-6 left-6 right-6 text-center backdrop-blur-sm bg-gray-900/50 p-4 rounded-xl">
                        <h3 className="text-xl font-bold text-white mb-2">
                            {story.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                            {story.content}
                        </p>
                    </div>
                </div>
            )
        }))
        : [{
            content: () => (
                <div className="w-full h-full bg-gray-700 flex flex-col items-center justify-center p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                        {story.title}
                    </h3>
                    <p className="text-gray-300 text-sm text-center">
                        {story.content}
                    </p>
                    <div className="mt-4 text-gray-400 text-sm">
                        No images available
                    </div>
                </div>
            )
        }];

    return (
        <div className="relative w-full h-full">
            <Stories
                stories={formattedStories}
                currentIndex={currentImageIndex}
                defaultInterval={8000}
                onStoryStart={(index) => onImageChange(index)}
                onAllStoriesEnd={onClose}
                width="100%"
                height="100%"
                keyboardNavigation
                preventDefault
                storyContainer="rounded-2xl overflow-hidden"
                progressWrapperStyles={{
                    height: '3px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    margin: '0 2px'
                }}
                progressStyles={{
                    background: 'linear-gradient(to right, #34d399, #22d3ee)',
                    height: '100%'
                }}
            />

            {/* Navigation buttons */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-gray-800/50 hover:bg-gray-700/80 rounded-full backdrop-blur-sm transition-all"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-gray-800/50 hover:bg-gray-700/80 rounded-full backdrop-blur-sm transition-all"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 bg-gray-800/50 hover:bg-gray-700/80 rounded-full backdrop-blur-sm transition-all"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}

export default Story;
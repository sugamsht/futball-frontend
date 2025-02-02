import React from 'react';
import Stories from 'react-insta-stories';

const storiesData = [
    {
        content: ({ action, isPaused }) => {
            return (
                <div className="relative h-full w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10" />
                    <img
                        src="./sheru.jpg"
                        alt="Story 1"
                        className="object-cover h-full w-full"
                    />
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                        <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                            Match Highlights
                        </h2>
                        <p className="text-gray-300 text-sm">
                            Relive the best moments from today's thrilling encounter
                        </p>
                    </div>
                </div>
            );
        }
    },
    {
        content: ({ action, isPaused }) => {
            return (
                <div className="relative h-full w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10" />
                    <img
                        src="./sheru.jpg"
                        alt="Story 2"
                        className="object-cover h-full w-full"
                    />
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                        <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                            Player Focus
                        </h2>
                        <p className="text-gray-300 text-sm">
                            Star performer's incredible display throughout the match
                        </p>
                    </div>
                </div>
            );
        }
    },
    {
        url: './video.mp4',
        type: 'video',
        duration: 10000,
        header: {
            heading: 'Match Analysis',
            subheading: 'Posted 2h ago',
            profileImage: './logo.png'
        }
    },
    {
        content: ({ action, isPaused }) => {
            return (
                <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-emerald-500 to-cyan-500">
                    <div className="text-center p-6 max-w-md">
                        <div className="inline-block bg-gray-900/30 rounded-xl p-6 backdrop-blur-sm">
                            <h1 className="text-3xl font-bold text-white mb-4 drop-shadow-md">
                                Thanks for watching! 🎉
                            </h1>
                            <p className="text-gray-200 text-sm">
                                Stay tuned for more updates and highlights
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
    }
];

function Story({ storyIndex, onClose }) {
    return (
        <div className="relative w-full h-full">
            <Stories
                stories={storiesData}
                defaultInterval={8000}
                width="100%"
                height="100%"
                currentIndex={storyIndex}
                onAllStoriesEnd={onClose}
                storyContainer="rounded-2xl overflow-hidden"
                progressContainerStyles={{
                    padding: '1.5rem',
                    paddingBottom: '1rem',
                    maxWidth: '800px',
                    margin: '0 auto',
                }}
                progressWrapperStyles={{
                    height: '4px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    margin: '0 4px',
                    borderRadius: '2px',
                    overflow: 'hidden'
                }}
                progressStyles={{
                    background: 'linear-gradient(to right, #34d399, #22d3ee)',
                    height: '100%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
                storyStyles={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    borderRadius: '1rem'
                }}
                // Add these new props for animation
                progressWrapStyles={{
                    position: 'relative',
                    overflow: 'visible'
                }}
                storyInnerContainerStyles={{
                    position: 'relative',
                    overflow: 'hidden'
                }}
                keyboardNavigation
                preventDefault
            />
        </div>
    );
}

export default Story;
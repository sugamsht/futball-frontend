import React from 'react';
import Stories from 'react-insta-stories';

const storiesData = [
    {
        content: ({ action, isPaused }) => {
            var src = "./sheru.jpg";
            return (
                <div className='flex items-center justify-center h-full w-full'>
                    <img src={src} alt="Story 1" className="object-cover h-full w-full" />
                </div>
            );
        }
    },
    {
        content: ({ action, isPaused }) => {
            var src = "./sheru.jpg";
            return (
                <div className='flex items-center justify-center h-full w-full'>
                    <img src={src} alt="Story 2" className="object-cover h-full w-full" />
                </div>
            );
        }
    },
    {
        url: './video.mp4',
        type: 'video',
    },
    {
        content: ({ action, isPaused }) => {
            return (
                <div className='flex items-center justify-center h-full w-full' style={{ background: "Aquamarine", color: "#16161d" }}>
                    <h1>Hope you like Sugam's story 😄.</h1>
                </div>
            );
        }
    }
];

function Story({ storyIndex, onClose }) {
    return (
        <div className="relative w-full max-w-screen-lg h-full">
            <button
                type="button"
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full z-50"
                onClick={onClose}
                style={{ zIndex: 1000 }}
            >
                Close
            </button>
            <Stories
                stories={storiesData}
                defaultInterval={15000}
                width="100%"
                height="100%"
                currentIndex={storyIndex}
                onAllStoriesEnd={onClose}
            />
        </div>
    );
}

export default Story;
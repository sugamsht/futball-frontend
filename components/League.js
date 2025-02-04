import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    appendDots: dots => (
        <div className="slick-dots-container pb-6">
            <ul className="flex justify-center space-x-2">{dots}</ul>
        </div>
    ),
    customPaging: i => (
        <div className="w-2.5 h-2.5 bg-gray-600 rounded-full transition-all duration-300 hover:scale-125" />
    ),
    dotsClass: "slick-dots",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
};

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/50 hover:bg-gray-700/80 rounded-full backdrop-blur-sm transition-all shadow-xl hover:scale-110"
        >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    );
}

function NextArrow(props) {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/50 hover:bg-gray-700/80 rounded-full backdrop-blur-sm transition-all shadow-xl hover:scale-110"
        >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
}

function League() {
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/admin/leagues`);
                setLeagues(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLeagues();
    }, [backendUrl]);

    if (loading) {
        return (
            <div className="w-full bg-gray-800 rounded-2xl p-8 text-center">
                <div className="text-cyan-400 animate-pulse">
                    Loading leagues...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-gray-800 rounded-2xl p-8 text-center text-red-400">
                Error loading leagues: {error}
            </div>
        );
    }

    return (
        <div className='w-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl overflow-hidden relative'>
            {leagues.length > 0 ? (
                <Slider {...settings}>
                    {leagues.map((league) => (
                        <div key={league._id} className='px-4 md:px-8 py-8 h-full'>
                            <div className='flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8'>
                                <div className='md:w-1/2 space-y-6'>
                                    <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-3xl md:text-4xl font-bold'>
                                        {league.title}
                                    </h2>
                                    <p className='text-gray-300 text-sm md:text-base leading-relaxed'>
                                        {league.description}
                                    </p>
                                </div>
                                <div className='relative group md:w-1/2 flex justify-center'>
                                    {league.logo && (
                                        <div className='relative w-full max-w-xs lg:max-w-sm overflow-hidden rounded-2xl bg-gray-900/20 backdrop-blur-sm border border-white/10 p-4'>
                                            <img
                                                src={league.logo}
                                                alt={`${league.title} Logo`}
                                                className='w-full h-auto object-contain transform transition duration-500 group-hover:scale-105'
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className="p-8 text-center text-gray-400">
                    No leagues available
                </div>
            )}

            {/* Mobile Swipe Indicator */}
            <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1 text-gray-400">
                <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <span className="text-sm">Swipe to explore</span>
            </div>
        </div>
    );
}


export default League;
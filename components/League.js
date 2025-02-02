import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    return (
        <div className='w-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl overflow-hidden relative'>
            <Slider {...settings}>
                {/* NSL 2023 Slide */}
                <div className='px-4 md:px-8 py-8 h-full'>
                    <div className='flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8'>
                        <div className='md:w-1/2 space-y-6'>
                            <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-3xl md:text-4xl font-bold'>
                                NSL 2023
                            </h2>
                            <p className='text-gray-300 text-sm md:text-base leading-relaxed'>
                                The 2023 Nepal Super League is the second season of Nepal's premier franchise-based football competition.
                                Featuring nine teams including three new franchises, the tournament was held at Dasharath Rangasala from
                                24 November to 30 December 2023.
                                <span className='block mt-4'>
                                    Kathmandu Rayzrs emerged champions in the inaugural season, while this edition saw participation from
                                    Jhapa FC, Sporting Ilam De Mechi FC, and Birgunj United FC as new entrants. The league continues to
                                    showcase emerging Nepali football talent through its unique city-based franchise system.
                                </span>
                            </p>
                        </div>
                        <div className='relative group md:w-1/2 flex justify-center'>
                            <div className='relative w-full max-w-xs lg:max-w-sm overflow-hidden rounded-2xl bg-gray-900/20 backdrop-blur-sm border border-white/10 p-4'>
                                <img
                                    src='/Nepal_Super_League_logo.png'
                                    alt="NSL Logo"
                                    className='w-full h-auto object-contain transform transition duration-500 group-hover:scale-105'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* A Division League Slide */}
                <div className='px-4 md:px-8 py-8 h-full'>
                    <div className='flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8'>
                        <div className='md:w-1/2 space-y-6'>
                            <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-3xl md:text-4xl font-bold'>
                                A Division League
                            </h2>
                            <p className='text-gray-300 text-sm md:text-base leading-relaxed'>
                                Nepal's historic top-tier football competition, officially known as the Qatar Airways Martyr's Memorial
                                A-Division League, features 12-16 clubs in a double round-robin format with promotion/relegation system.
                                <span className='block mt-4'>
                                    Running annually from November to March, the league has been the foundation of Nepali football since 1954.
                                    Clubs like Manang Marsyangdi and Three Star Club have dominated recent editions, while the league continues
                                    to serve as the primary talent pipeline for the national team.
                                </span>
                            </p>
                        </div>
                        <div className='relative group md:w-1/2 flex justify-center'>
                            <div className='relative w-full max-w-xs lg:max-w-sm overflow-hidden rounded-2xl bg-gray-900/20 backdrop-blur-sm border border-white/10 p-4'>
                                <img
                                    src='/Adiv_logo.png'
                                    alt="A division League Logo"
                                    className='w-full h-auto object-contain transform transition duration-500 group-hover:scale-105'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>

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
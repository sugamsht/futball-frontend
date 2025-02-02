import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Gallery() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
        appendDots: dots => (
            <div className="slick-dots-container pb-4">
                <ul className="flex justify-center space-x-2">{dots}</ul>
            </div>
        ),
        customPaging: i => (
            <div className="w-2.5 h-2.5 bg-gray-600 rounded-full transition-all duration-300 hover:scale-125" />
        ),
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <div className="w-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl overflow-hidden p-6">
            <Slider {...settings}>
                {[1, 2, 3].map((item) => (
                    <div key={item} className="relative group">
                        <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-2xl border border-white/10">
                            <img
                                src={`https://mdbootstrap.com/img/Photos/Slides/img%20(${item === 1 ? 15 : item === 2 ? 22 : 23}).jpg`}
                                className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
                                alt={`Slide ${item}`}
                            />
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 text-center backdrop-blur-sm bg-gray-900/50 p-4 rounded-xl space-y-2">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                                Match Highlight {item}
                            </h3>
                            <p className="text-gray-300 text-sm hidden md:block">
                                Exciting moments from recent matches
                            </p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/50 hover:bg-gray-700/80 rounded-full backdrop-blur-sm transition-all shadow-xl hover:scale-110"
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
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/50 hover:bg-gray-700/80 rounded-full backdrop-blur-sm transition-all shadow-xl hover:scale-110"
        >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
}

export default Gallery;
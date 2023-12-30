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
};

function League() {
    return (
        <div className='w-full h-[40rem] bg-emerald-500'>
            <Slider {...settings}>
                <div className='grid grid-cols-2 overflow-hidden h-full mx-2 xl:mx-5'>
                    <h1 className='col-span-2 text-blue-600 text-center font-extrabold text-5xl mt-6'>NSL 2023</h1>
                    <br />
                    <div>
                        <p className='text-xs md:text-sm lg:text-xl'>
                            The 2023 Nepal Super League is the second season of the Nepal Super League, the top flight franchise based club football league of Nepal.
                            A total of nine franchises participated in the tournament played at the Dasharath Rangasala from 24 November to 30 December 2023. Kathmandu Rayzrs won the inaugural season after beating Dhangadhi FC in the final on 15 May 2021.
                            In addition to the seven founding members, three new franchises were added. Jhapa FC will represent Jhapa, Province No. 1, Sporting Ilam De Mechi FC the Ilam, Province No. 1 and Birgunj United FC the Birgunj, Province No. 2.
                            One of the founding member Biratnagar City decided to withdraw from the tournament resulting in only nine teams participating in this edition.
                        </p>
                        <div className='grid place-items-center mt-2' >
                            <img className='min-h-[10rem] w-[10vw] min-w-[12rem]' src='/Nepal_Super_League_logo.png' alt="NSL Logo" />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 overflow-hidden h-full mx-2 xl:mx-5'>
                    <h1 className='col-span-2 text-blue-600 text-center font-extrabold text-5xl mt-6'>A Division League</h1>
                    <div>
                        <p className='pr-5 text-xs md:text-sm lg:text-xl'>
                            Martyr's Memorial A-Division League (Nepali: शहीद स्मारक ए- डिभिजन लिग; formerly known as the Kathmandu League Championship) is the top tier of football in Nepal. Contested by 12 to 16 clubs, it operates on a system of promotion and relegation within the Martyr's Memorial B-Division League. The season usually runs from November to March with every team playing each other twice. It is officially known as the Qatar Airways Martyr's Memorial A-Division League.
                        </p>
                        <div className='grid place-items-center mt-2' >
                            <img className='min-h-[10rem] w-[10vw] min-w-[12rem]' src='/Adiv_logo.png' alt="A division League Logo" />
                        </div>
                    </div>
                </div>
                {/* Add more slides as needed */}
            </Slider>
        </div>
    );
}

export default League;
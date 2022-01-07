import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Gallery() {
    return (
        <div className='col-span-6 md:col-span-4 lg:col-span-4 h-[30rem] m-2 items-center justify-center bg-yellow-300'>
            <Carousel showThumbs={false}>
                <div>
                    <img className='w-full h-[30rem]' src="https://c4.wallpaperflare.com/wallpaper/362/276/920/nature-4k-pc-full-hd-wallpaper-preview.jpg" />
                </div>
                <div>
                    <img className='w-full h-[30rem]' src="https://images3.alphacoders.com/823/thumb-1920-82317.jpg" />
                </div>
                <div>
                    <img className='w-full h-[30rem]' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg" />
                </div>
            </Carousel>
        </div>
    )
}

export default Gallery

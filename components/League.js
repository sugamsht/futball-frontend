import React from 'react'

function League() {
    return (
        <div className='w-full h-[40rem] bg-emerald-500'>
            <div className='grid grid-cols-2 overflow-hidden h-full mx-2 xl:mx-5'>
                <h1 className='col-span-2 text-blue-600 text-center font-extrabold text-5xl mt-6'>A Division League</h1>
                <div>
                    <p className='pr-5 text-xs md:text-sm lg:text-xl'>Martyr's Memorial A-Division League (Nepali: शहीद स्मारक ए- डिभिजन लिग; formerly known as the Kathmandu League Championship) is the top tier of football in Nepal. Contested by 12 to 16 clubs, it operates on a system of promotion and relegation within the Martyr's Memorial B-Division League. The season usually runs from November to March with every team playing each other twice. It is officially known as the Qatar Airways Martyr's Memorial A-Division League.
                    </p>
                    <div className='grid place-items-center mt-2' >
                        <img className='min-h-[10rem] w-[20vw] min-w-[12rem]'
                            src='/Adiv_logo.png'
                            alt="A division League Logo">
                        </img>
                    </div>
                </div>
                <div>
                    <p className='text-xs md:text-sm lg:text-xl'> The league operates on a round-robin format, where all teams play against each other twice, once at home and once away. The teams earn points based on the results (win, draw, or loss) of their matches, and at the end of the season, the team with the highest number of points is crowned the league champion.

The A Division League is highly regarded in Nepalese football and serves as a platform for developing and showcasing talented players. The league has contributed to the growth and popularity of football in Nepal and has a significant following among football enthusiasts in the country.
<br /><br />
Some notable clubs that have participated in the Nepal A Division include Manang Marshyangdi Club, Three Star Club, Nepal Police Club, and Tribhuvan Army Club. These clubs have had success in domestic competitions and have represented Nepal in international tournaments.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default League

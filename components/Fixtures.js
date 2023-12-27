import Fixture from './Fixture'
import React, { useEffect, useState } from 'react';

function Fixtures({ fixture }) {
    if (!fixture) return null;
    fixture.sort(function (a, b) {
        var dateA = new Date(a.date), dateB = new Date(b.date)
        return dateA - dateB
    });

    var fullDay = new Date();
    var today = new Date(fullDay.toDateString());

    const [showFixture, setShowFixture] = useState([]);
    const [theDay, setTheDay] = useState('');

    let leng = fixture.length;


    //NoFixtures
    const NoFixtures = () => {
        return (
            <div>
                <h1 className='flex justify-center text-xl items-center mt-5'>No Fixtures today</h1>
            </div>
        )
    }

    useEffect(() => {
        for (let j = 0; j < leng; j++) {
            var datea = new Date(fixture[j].date);
            if (datea >= today) {
                setShowFixture(fixture.slice(j, j + 7));
                setTheDay(j);
                break;
            }
            else {
                setTheDay(leng);
            }
        }
    }, []);

    if (typeof window !== "undefined") {
        // browser code
        window.addEventListener('load', function () {
            var i = theDay;
            document.getElementById('prev_button').addEventListener('click', function (e) {
                i >= 7 && (i = i - 7)
                setShowFixture(fixture.slice(i, i + 7));
            }
            );

            document.getElementById('next_button').addEventListener('click', function (e) {
                i < leng - 7 && (i = i + 7);
                setShowFixture(fixture.slice(i, i + 7));
            }
            );
        });
    }

    return (
        <div className='flex flex-col justify-center items-center mt-2 w-full h-auto bg-green-500 overflow-y-scroll scrollbar-hide rounded-lg shadow-lg p-6'>
            <h1 className='text-blue-600 font-extrabold text-4xl mt-5'>Fixtures</h1>
            <div className='sm:w-full md:w-full px-[1vw] md:px-[5vw] lg:w-full 2xl:w-3/4 2xl:px-0 mb-4' >
                {
                    (showFixture.length == 0) ? NoFixtures() :
                        showFixture.map((fixture, index) => (
                            <Fixture team1={fixture.team1} key={index} team2={fixture.team2} time={fixture.time} date={fixture.date} />
                        ))
                }
            </div>
            <div className='sm:w-full md:w-full px-[1vw] md:px-[5vw] lg:w-full 2xl:w-3/4 2xl:px-0 mb-4 flex justify-center'>
                <button className='p-4 mx-2 mb-4 bg-white rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-200' id="prev_button">Previous</button>
                <button className='p-4 mx-2 mb-4 bg-white rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-200' id="next_button">Next!</button>
            </div>
        </div>
    )

}

export default Fixtures

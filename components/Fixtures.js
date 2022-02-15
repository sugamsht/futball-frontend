import Fixture from './Fixture'
import React, { useEffect } from 'react';

function Fixtures({ fixture }) {
    // console.log(fixture);

    fixture.sort(function (a, b) {
        var dateA = new Date(a.date), dateB = new Date(b.date)
        return dateA - dateB
    });

    const [showFixture, setShowFixture] = React.useState([]);

    let leng = fixture.length;
    useEffect(() => {
        setShowFixture(fixture.slice(leng - 7, leng));
    }, [fixture]);



    if (typeof window !== "undefined") {

        // browser code
        window.addEventListener('load', function () {
            var i = 0;
            document.getElementById('prev_button').addEventListener('click', function (e) {
                i <= leng - 14 && (i = i + 7);
                console.log("Prev", i)
                setShowFixture(fixture.slice(leng - (i + 7), leng - i));
            }
            );

            document.getElementById('next_button').addEventListener('click', function (e) {
                console.log("Next ", i)
                i > 1 && (i = i - 7);
                setShowFixture(fixture.slice(leng - (i + 7), leng - i));
            }
            );

        });
    }

    return (
        <div className='flex flex-col justify-center items-center my-2 w-full h-auto bg-green-500 overflow-y-scroll scrollbar-hide'>
            <h1 className='text-blue-600 font-extrabold text-4xl mt-5'>Fixtures</h1>
            <h2 className='text-gray-600 font-bold text-2xl mt-5'>Match Week 9</h2>
            <div className='sm:w-full md:w-full md:px-[10vw] lg:w-full 2xl:w-3/4 2xl:px-0 mb-10' >
                {
                    showFixture.map((fixture, index) => (
                        <Fixture team1={fixture.team1} key={index} team2={fixture.team2} time={fixture.time} date={fixture.date} />
                    ))}
            </div>
            <div>
                <button className='p-2 mx-2 bg-white' id="prev_button">Previous</button>
                <button className='p-2 mx-2 bg-white' id="next_button">Next!</button>
            </div>
        </div>
    )
}

export default Fixtures

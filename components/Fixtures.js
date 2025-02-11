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

    // NoFixtures
    const NoFixtures = () => {
        return (
            <div className="flex justify-center items-center py-8">
                <h1 className="text-xl font-semibold bg-gradient-to-r from-red-400 to-pink-400 text-transparent bg-clip-text">
                    No Upcoming Fixtures
                </h1>
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
            });

            document.getElementById('next_button').addEventListener('click', function (e) {
                i < leng - 7 && (i = i + 7);
                setShowFixture(fixture.slice(i, i + 7));
            });
        });
    }

    return (
        <div className="w-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl p-6">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-3xl md:text-4xl font-bold text-center mb-8">
                Upcoming Fixtures
            </h1>

            <div className="px-2 md:px-6 lg:px-12 xl:px-16 2xl:px-24 mb-6 space-y-4">
                {showFixture.length === 0 ?
                    <NoFixtures /> :
                    showFixture.map((fixture, index) => (
                        <Fixture
                            key={index}
                            id={fixture._id}
                            team1={fixture.team1}
                            team2={fixture.team2}
                            time={fixture.time}
                            date={fixture.date}
                        />
                    ))
                }
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/80 rounded-xl backdrop-blur-sm transition-all 
                             text-white font-semibold shadow-lg hover:scale-105"
                    id="prev_button"
                >
                    Previous
                </button>
                <button
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                             text-white font-semibold rounded-xl shadow-lg transition-all hover:scale-105"
                    id="next_button"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Fixtures;
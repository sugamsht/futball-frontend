import Fixture from './Fixture'
import axios from 'axios'
import React, { useState, useEffect } from 'react';

function Fixtures() {

    const [fixture, setFixture] = useState([]);

    useEffect(() => {
        // document.title = "Results occured"
        axios.get('http://localhost:5000/api/fixtures')
            .then(function (response) {
                // handle success
                const data = response.data.data;
                setFixture(data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, []);

    var leng = fixture.length;
    const showFixture = fixture.slice(leng - 7, leng)

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
        </div>
    )
}

export default Fixtures

import Result from './Result'
import axios from 'axios'
import React, { useState, useEffect } from 'react';

function Results() {

    const [result, setResult] = useState([]);

    useEffect(() => {
        // document.title = "Results occured"
        axios.get('http://localhost:3000/api/results')
            .then(function (response) {
                // handle success
                const data = response.data;
                setResult(data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, []);

    // var size = 7;
    var leng = result.length;
    const showResult = result.slice(leng - 7, leng)

    return (
        <div className='bg-pink-300 flex flex-1 items-center justify-start w-full h-40 m-2 overflow-x-scroll overflow-y-hidden scrollbar-hide'>
            {
                showResult.map((result, index) => (
                    <Result result={result.fixtureResult} key={index} score1={result.score[0]} score2={result.score[1]} />
                ))}
        </div>
    )
}

export default Results

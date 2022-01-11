import axios from 'axios'
import React, { useState, useEffect } from 'react';

function Result() {
    const [resu, setResu] = useState([]);
  
    useEffect(() => {
      // document.title = "Results occured"
      axios.get('http://localhost:3000/api/results')
        .then(function (response) {
          // handle success
          const data = response.data;
          console.log("yo sabai ayo hai", data)
          setResu(data)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }, []);
  
    // return (
    //     <Reesults resu={resu} />
    // )
    const Reesults = resu.map((resul, id) => {
      return <div key={id}>
        <h2>{resul.fixtureResult}</h2>
        <p>{resul.score[0]}-{resul.score[1]}</p>
      </div>
    })
    return(
      <>
        <div className="flex items-center justify-start w-full h-full m-2">
            <div className="relative w-28 lg:w-full h-36 overflow-hidden rounded-3xl">
                {/* <img
                    src="https://lh3.ggpht.com/p/AF1QipOm6RtYU_9B9HqdC2VBA5qAhHHpu7SEjcjTMmpY=s512"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-bottom"
                /> */}
                <div className="absolute inset-0 h-full w-full bg-[#2699FB]" ></div>
                <div className="relative h-full w-full flex justify-center items-center">
                    <div className='text-center'>
                        <p className="font-bold text-white">Results</p>
                        <div className="w-full h-full text-sm md:text-1xl lg:text-2xl font-semibold tracking-tight text-white " >
                        {Reesults}</div>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}


export default Result

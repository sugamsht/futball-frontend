import React from 'react'
import Fixture from './Fixture'

function Fixtures() {
    return (
        <div className='flex flex-col justify-start items-center m-2 w-screen h-[30rem] bg-green-500 overflow-y-scroll'>
            <h1 className='text-blue-600 font-extrabold text-4xl mt-5'>Fixtures</h1>
            <h2 className='text-gray-600 font-bold text-2xl mt-5'>Match Week 9</h2>
            <div className='sm:w-full md:2-full lg:w-2/3'>
                <Fixture />
                <Fixture />
                <Fixture />
                <Fixture />
                <Fixture />
                <Fixture />
                <Fixture />
            </div>
        </div>
    )
}

export default Fixtures

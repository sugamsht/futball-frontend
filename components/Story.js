import React from 'react'

function Story() {
    return (
        <div className='flex items-center justify-start h-full m-2'>
            <div className="relative w-32 lg:w-40 h-52 overflow-hidden rounded-2xl bg-green-500 mx-2">
                <img
                    src="https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgzODkzMjM5NzUxNzgwMDQx/sipa_35072412.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-bottom"
                />
            </div>
        </div>
    )
}

export default Story

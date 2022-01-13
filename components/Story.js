import React from 'react'
import Stories from 'react-insta-stories';

function Story() {

    const stories = [
        {
            url: 'https://images.unsplash.com/photo-1546608235-3310a2494cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=638&q=80',
        },
        {
            url: 'https://images.unsplash.com/photo-1570498839593-e565b39455fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
        },
    ];

    return (
        <div className='flex items-center justify-start h-full m-2'>
            <div className="relative w-32 lg:w-40 h-52 overflow-hidden rounded-2xl bg-gray-200 mx-2">
                <img
                    src="https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgzODkzMjM5NzUxNzgwMDQx/sipa_35072412.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-bottom hover:opacity-75 transition duration-150 ease-in-out"
                    data-bs-toggle="modal" data-bs-target="#centeredStory"
                />
                <div className="modal fade fixed top-6 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="centeredStory" tabIndex="-1" aria-labelledby="centeredStory" aria-modal="true" role="dialog">
                    <div className="modal-dialog relative w-auto pointer-events-none">
                        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto rounded-md outline-none text-current">
                            <div className="modal-body relative p-4">
                                <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 float-right text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close"></button>
                                <div className='m-0'>
                                    <Stories
                                        loop
                                        keyboardNavigation
                                        stories={stories}
                                        defaultInterval={2000}
                                        width={'100%'}
                                        height={'85vh'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Story

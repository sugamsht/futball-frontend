import React, { useState } from 'react'
import StoryComponent from 'react-insta-stories';


function Story({ storyIndex }) {

    const [story, setStory] = useState(false);

    const story1 = [
        {
            content: ({ action, isPaused }) => {
                var src = "https://i.ibb.co/fY1DmQW/8aacdef9ba37db60c7a96271877cfbb5.jpg"
                return (
                    <div>
                        <h1>Hey All 👋</h1>
                        <img src={src} />
                        <h4>Buttom text</h4>
                    </div>
                );
            }
        }];

    const story2 = [
        {
            content: ({ action, isPaused }) => {
                var src = "https://i.ibb.co/fY1DmQW/8aacdef9ba37db60c7a96271877cfbb5.jpg";
                return (
                    <div>
                        <img src={src} />
                    </div>
                );
            }
        },
    ];
    const story3 = [
        {
            url: './video.mp4',
            type: 'video',
        },
    ];

    const story4 = [
        {
            content: ({ action, isPaused }) => {
                return (
                    <div
                        style={{ background: "Aquamarine", color: "#16161d" }}
                    >
                        <h1>Hope you like Sugam's story 😄.</h1>
                    </div>
                );
            }
        }]

    const array = [story1, story2, story3, story4];

    const image = {
        display: "block",
        maxWidth: "100%",
        borderRadius: 4
    };


    return (
        <div className='flex items-center justify-start h-full m-2'>
            <div className="relative w-32 lg:w-40 h-52 overflow-hidden rounded-2xl bg-gray-200 mx-2">
                <img
                    src="https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgzODkzMjM5NzUxNzgwMDQx/sipa_35072412.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-bottom hover:opacity-75 transition duration-150 ease-in-out"
                    data-bs-toggle="modal" data-bs-target={'#centeredStory' + storyIndex}
                    onClick={() => setStory(true)}
                />
                <div
                    className="modal fade fixed top-6 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                    id={'centeredStory' + storyIndex} tabIndex="-1" aria-labelledby={'centeredStory' + storyIndex} aria-modal="true" role="dialog"
                    style={{
                        background: "rgba(6, 2, 5, 0.4)",
                        display: story ? 'block' : 'none'
                    }}
                    onClick={() => setStory(false)}
                >
                    <div className="modal-dialog relative w-screen pointer-events-none" >
                        {story &&
                            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto rounded-md outline-none text-current">
                                <div className="modal-body relative p-4" >
                                    <button type="button"
                                        className="btn-close box-content w-4 h-4 p-1 float-right text-black border-none rounded-none opacity-90 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                        data-bs-dismiss="modal" aria-label="Close"
                                        onClick={() => setStory(false)}
                                    ></button>
                                    <div className='m-0'>
                                        <StoryComponent
                                            keyboardNavigation
                                            defaultInterval={3000}
                                            stories={array[storyIndex]}
                                            width={'100%'}
                                            height={'85vh'}
                                            onStoryEnd={() => setStory(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Story

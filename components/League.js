import React from 'react'

function League() {
    return (
        <div className='w-full h-[40rem] bg-emerald-500'>
            <div className='grid grid-cols-2 overflow-hidden h-full mx-2 xl:mx-5'>
                <h1 className='col-span-2 text-blue-600 text-center font-extrabold text-5xl mt-6'>A Division League</h1>
                <div>
                    <p className='pr-5 text-xs md:text-sm lg:text-xl'>Aenean urna risus, pellentesque id tincidunt in, euismod non lorem. Sed fringilla est vel malesuada euismod. Cras felis lectus, condimentum non dapibus eu, maximus ac justo. Vestibulum nisi massa,
                        vestibulum ut odio ut, scelerisque blandit libero. Nullam pretium commodo nisl eget ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                        Fusce cursus ante eu ante cursus rutrum. Curabitur bibendum dapibus ligula, a vestibulum sapien dapibus sit amet. Ut eget sollicitudin nibh. Sed vel maximus odio.
                    </p>
                    <div className='grid place-items-center mt-2' >
                        <img className='h-[30vh] w-[20vw] min-w-[12rem]' src='https://www.goalnepal.com/uploads/news/1545192691.png'
                            alt="A division League Logo"></img>
                    </div>
                </div>
                <div>
                    <p className='text-xs md:text-sm lg:text-xl'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis feugiat risus, eget tincidunt velit fermentum et. Etiam tellus nibh,
                        gravida ac lacinia ac, elementum a ex. Vivamus risus magna, volutpat lacinia erat ac, porta congue ipsum. Aenean rutrum id risus nec pulvinar. Sed augue ex, maximus tincidunt nisl eu,
                        faucibus scelerisque nulla. Duis bibendum vulputate ante at aliquam. Morbi at felis odio. Proin non lobortis nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras viverra ornare condimentum. Nunc elementum elit non ipsum sagittis, vitae tempus ex tempor.
                        Nulla ornare blandit nisi, eget eleifend tellus condimentum vitae. Vivamus rhoncus lorem dui, quis placerat orci accumsan id. Nulla aliquam, neque ac porttitor elementum,
                        velit lacus feugiat eros, nec ultrices eros risus at ante. Duis et tincidunt metus.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default League

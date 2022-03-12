import React from 'react'

function Footer() {
    return (
        <footer className="bg-[#121212]">
            <div
                className="
          container
          flex flex-col flex-wrap
          px-4
          py-16
          mx-auto
          md:items-center
          lg:items-start
          md:flex-row md:flex-nowrap
        "
            >
                <div
                    className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left"
                >
                    <a
                        className="
              flex
              items-center
              justify-center
              text-4xl
              font-bold
              text-blue-700
              md:justify-start
            "
                    >
                        Logo
                    </a>
                    <p className="mt-2 text-sm text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
                        at sequi cum, impedit fuga in placeat illo eum minima possimus est
                        perferendis distinctio explicabo eos natus consequuntur blanditiis
                        odio optio?
                    </p>
                </div>
                <div className="justify-between w-full mt-4 text-center lg:flex hover: cursor-pointer">
                    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-white">
                            Useful Links
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <a className="text-white hover:text-gray-200 hover:underline">Home</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-200 hover:underline">About Us</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-200 hover:underline">Blogs</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-200 hover:underline">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-white">
                            Useful Links
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <a className="text-white hover:text-gray-200 hover:underline">Home</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-200 hover:underline">About Us</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-200 hover:underline">Blogs</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-200 hover:underline">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-white">
                            Useful Links
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <a className="text-white hover:text-gray-200 hover:underline">Home</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-200 hover:underline">About Us</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-200 hover:underline">Blogs</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-200 hover:underline">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <p className="text-base text-gray-400">
                    All rights reserved by @Terobau company 2021
                </p>
            </div>
        </footer>
    )
}

export default Footer

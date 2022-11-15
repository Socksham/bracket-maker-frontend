import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [clicked, setClicked] = useState(false)

    return (
        <div className="py-2 w-full">
            <div className="">
                <div className="flex justify-between items-center">
                    <div className="lg:hidden flex space-x-4 items-center">
                        <div className="">
                            <p className="sm:text-3xl font-bold text-black">Bracket Maker</p>
                        </div>
                    </div>
                    <div className='hidden lg:flex items-center w-full justify-between'>
                        <div>
                            <p className="sm:text-3xl font-bold text-black">Bracket Maker</p>
                        </div>
                        <div className='flex items-center'>
                            <div className='flex space-x-16 text-lg items-center justify-end'>
                                <p><a href='/'>Home</a></p>
                                <p><a href='/mentors'>Mentors</a></p>
                                <p><a href='/programs'>Programs</a></p>
                                <p><a href='/scrapbook'>Scrapbook</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="flex lg:hidden mb-1 cursor-pointer">
                        <label onClick={() => {
                            console.log("ERIRE")
                            setClicked(!clicked)
                        }} for="menu-toggle" className="pointer-cursor block lg:hidden block"><svg className="fill-current text-gray-900 w-10 h-10" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg></label>
                        <input className="hidden" type="checkbox" id="menu-toggle" />
                    </div>
                </div>
                <div className="">
                    {
                        clicked
                            ?
                            <div className="lg:hidden w-full justify-end text-black" id="menu">
                                <nav>
                                    <ul className="cursor-pointer text-base text-gray-700 pt-4 items-end">
                                        <a className="flex justify-end py-3 px-0 block border-b-2 hover:border-indigo-400 space-x-1" href="/">
                                            Home
                                        </a>
                                        <a className="flex justify-end py-3 px-0 block border-b-2 hover:border-indigo-400" href="/mentors">Mentors</a>
                                        <a className="flex justify-end py-3 px-0 block border-b-2 hover:border-indigo-400" href="/programs">
                                            Programs</a>
                                        <a className="flex justify-end py-3 px-0 block border-b-2 hover:border-indigo-400" href="/scrapbook">
                                            Scrapbook</a>
                                    </ul>
                                </nav>
                            </div>
                            :
                            <div className="hidden w-full" id="menu">

                            </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default Navbar
"use client"
import { useState, useEffect } from 'react'
import { useSidebar } from './SidebarContext'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useSession, signIn, signOut } from "next-auth/react"


const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setShowdropdown] = useState(false)
    const item = useSelector(i => i.Cart.items)


    const pathname = usePathname();
    // helper to check if a link path matches the current pathname
    const isActiveLink = (path) => pathname === path;

    const { toggleSidebar, isSidebarOpen } = useSidebar();

    const [handleplaceholder, sethandleplaceholder] = useState();
    const [posteractive, setPosterActive] = useState(false);
    const [stickeractive, setStickerActive] = useState(false);
    const [deltaY, setdeltaY] = useState(0);

    useEffect(() => {
        const handleScroll = (e) => {
            if (!isSidebarOpen) {
                setdeltaY(e.deltaY);
                if (e.deltaY < 0) {
                    setPosterActive(false)
                    setStickerActive(false)
                }
            }
        };
        window.addEventListener("wheel", handleScroll);
        return () => window.removeEventListener("wheel", handleScroll);
    }, [isSidebarOpen]);

    useEffect(() => {
        let startY = 0;

        // --- Touch Event Fallback Handlers ---
        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (!isSidebarOpen) {
                const currentY = e.touches[0].clientY;
                setdeltaY(startY - currentY);
            }
        };

        const handleTouchEnd = () => {
            startY = 0
        };


        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);

        // Cleanup on unmount
        return () => {

            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isSidebarOpen]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if ((posteractive || stickeractive) && !e.target.closest('.dropdown')) {
                setPosterActive(false);
                setStickerActive(false)
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [posteractive, stickeractive]);

    return (
        <>
            <nav className={`min-[815px]:hidden top-0 z-30 bg-white h-[10vh] sidebar  px-3 py-3 flex items-center justify-between ${deltaY >= 0 ? "relative" : "sticky"} `}>
                <svg onClick={toggleSidebar} className={`${isSidebarOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="44" height="44" viewBox="0 0 60 60">
                    <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                </svg>
                <svg onClick={toggleSidebar} className={`${isSidebarOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="44" height="44" viewBox="0 0 24 24">
                    <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                </svg>
                <Link href=''><Image width={400} height={400} src="/logo.gif" alt="Posterized logo" className="  sm:w-[35vw]  sm:h-[10vh] w-[30vw] h-[10vh] " /></Link>
                <div className="flex items-center  justify-center gap-6 ">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon hover:w-[1.35rem] icon-account cursor-pointer w-5 hidden min-[425px]:block" viewBox="0 0 18 19"><path fill="currentColor" fillRule="evenodd" d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15M9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35" clipRule="evenodd"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon hover:w-[2.59rem] icon-cart-empty cursor-pointer w-10" viewBox="0 0 40 40"><path fill="currentColor" fillRule="evenodd" d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1-9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"></path></svg>
                </div>
                <div className={`absolute flex flex-col  top-[100%] overflow-scroll  left-0 w-[70vw] max-[425px]:w-full  shadow-black h-[100vh]  z-10   bg-white ${isSidebarOpen ? 'block' : 'hidden'} dropdown`} >
                    <div className=" overflow-scroll flex-grow  px-4 mt-2">
                        <li className="list-none h-fit ">
                            <p
                                onClick={() => {
                                    setStickerActive(!stickeractive)
                                }
                                }
                                className="text-[1.1rem] side my-4 mx-2 flex items-center overflow-scroll justify-between"
                            >
                                Sticker <Image width={16} height={16} src="/Png/arrow.png" alt="" className="w-5" />
                            </p>
                            <ul className={` ${stickeractive ? "block" : "hidden"}`}>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Devotional Collection</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Cars</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Marvel Collection</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >DC Collection</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Movies</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >TV Series </Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Football</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Cricket</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >F1 </Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Games </Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Music</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Motivation</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Creative Wall Art Poster Kit</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Anime</Link></div>
                            </ul>
                        </li>
                        <li className="list-none">
                            <p onClick={() => {
                                setPosterActive(!posteractive)
                            }
                            } className="text-[1.1rem] my-4 mx-2 flex items-center justify-between">Poster <Image width={16} height={16} src="/Png/arrow.png" alt="" className="w-5" /></p>
                            <ul className={` ${posteractive ? "block" : "hidden"}`}>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href=''
                                    to={{
                                        pathname: '/poster',
                                        // search:'?=motivation'
                                    }}
                                >Devotional Collection</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Cars</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Marvel Collection</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >DC Collection</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Movies</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >TV Series </Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Football</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Cricket</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >F1 </Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Games </Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Music</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Motivation</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Creative Wall Art Poster Kit</Link></div>
                                <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Anime</Link></div>
                            </ul>
                        </li>
                        {/* <p className="text-xl my-4 mx-2 flex items-center justify-between">Polaroid </p> */}
                        <p className="text-[1.1rem] my-4 mx-2 flex items-center justify-between">Custom Design </p>
                        <p className="text-[1.1rem] my-4 mx-2 flex items-center justify-between">Wall Collage</p>
                    </div>
                    <div className="bg-gray-100   flex-shrink-0  h-[30vh]  ">
                        <p className="mt-6  min-[425px]:hidden flex items-center gap-3 mx-4" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon hover:w-[1.35rem] icon-account cursor-pointer w-6 " viewBox="0 0 18 19"><path fill="currentColor" fillRule="evenodd" d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15M9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35" clipRule="evenodd"></path></svg>Log in</p>
                        <p className=" flex mt-6  items-center gap-2 ">
                            <img src="https://img.icons8.com/?size=100&id=59813&format=png&color=000000" alt="" className="size-7   cursor-pointer  mx-4" />
                            Instagram
                        </p>
                    </div>
                </div>
            </nav >
            <nav className={`hidden   top-0 z-30 bg-white shadow-md w-full min-[815px]:flex   justify-between items-center  px-10 py-3 gap-10 ${deltaY >= 0 ? "relative" : "sticky"} dropdown`}>
                <Link href='/' ><Image width={400} height={400} src="/logo.gif" alt="Posterized logo" className=" w-[15vw] h-[10vh]  " /></Link>
                <div className="flex flex-wrap items-center justify-center text-center gap-10">
                    <button
                        onClick={() => {
                            setPosterActive(!posteractive)
                            setStickerActive(false)
                        }
                        }
                        className={
                            ` flex items-center justify-center gap-1  hover:underline hover:underline-offset-4 hover:decoration-0 ${posteractive && !stickeractive ? `font-semibold underline underline-offset-4 decoration-1` : ""} `
                        }
                    >
                        Poster
                        <Image width={16} height={16} src="/Png/darrow.png" alt="" className={`w-4 ${posteractive && !stickeractive ? "rotate-180" : ""} ${isActiveLink('/Poster') ? `font-semibold underline underline-offset-4 decoration-1` : ""}`} />
                    </button>
                    <button
                        onClick={() => {
                            setStickerActive(!stickeractive)
                            setPosterActive(false)
                        }}
                        to=""
                        className={
                            ` flex items-center justify-center  gap-1 hover:underline hover:underline-offset-4 hover:decoration-0  
                            ${stickeractive && !posteractive ? ` font-semibold underline underline-offset-4 decoration-1` : ""}
                            ${isActiveLink('/Sticker') ? `font-semibold underline underline-offset-4 decoration-1` : ""}`
                        }
                    >
                        Sticker
                        <Image width={16} height={16} src="/Png/darrow.png" alt="" className={`w-4 ${stickeractive && !posteractive ? "rotate-180" : ""} ${isActiveLink('/Custom') ? `font-semibold underline underline-offset-4 decoration-1` : ""} `} />
                    </button>
                    {/* <Link href=''
                        to="/polaroid"
                        className={({ isActive }) =>
                            `flex items-center justify-center  hover:underline hover:underline-offset-4 hover:decoration-0 opacity-80 ${isActive ? `font-semibold  underline underline-offset-4 decoration-1` : ""}`
                        }
                    >
                        Polaroid
                    </Link> */}
                    <Link href='/Custom'
                        className={
                            `hover:underline hover:underline-offset-4 hover:decoration-0  ${isActiveLink('/Custom') ? `font-semibold underline underline-offset-4 decoration-1` : ""}`
                        }
                    >
                        Custom Design
                    </Link>
                    <Link href='/collage'
                        className={
                            `hover:underline hover:underline-offset-4  hover:decoration-0  ${isActiveLink('/collage') ? `font-semibold underline underline-offset-4 decoration-1` : ""}`
                        }
                    >
                        Wall Collage
                    </Link>
                </div>
                <div className='relative flex justify-center items-center  md:block gap-4'>
                    {session && <>
                        <button onClick={() => setShowdropdown(!showdropdown)} onBlur={() => {
                            setTimeout(() => {
                                setShowdropdown(false)
                            }, 100);
                        }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Account<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                    
                        <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page {`${session.user.name}`} </Link>
                                </li>
                                <li>
                                    <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                                </li>
                            </ul>
                        </div></>
                    }
                    {
                        session && <button onClick={() => { signOut() }} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Log Out</button>
                    }

                    {!session && <Link href={'/login'}>
                        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
                    </Link>}

                </div>
                <div className={`absolute left-0 w-full  h-[70vh] bg-white top-[100%] dropdown shadow-md  ${!stickeractive && posteractive ? "block" : "hidden"}  `}>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href={{
                        pathname: '/Poster',
                        search: "?type=motivation"
                    }}
                        onClick={() => { setPosterActive(!posteractive) }}
                    >Devotional Collection</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='/sticker/cars' >Cars</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='/sticker/marvel' >Marvel Collection</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='/sticker/dc' >DC Collection</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='/sticker/movies' >Movies</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='/sticker/tv-series' >TV Series </Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='/sticker/football' >Football</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='/sticker/cricket' >Cricket</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='/sticker/f1' >F1 </Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='/sticker/games' >Games </Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='/sticker/music' >Music</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='/sticker/motivation' >Motivation</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='/sticker/wall-art-kit' >Creative Wall Art Poster Kit</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='/sticker/anime' >Anime</Link></div>
                </div>
                <div className={`absolute left-0 w-full  h-[70vh] bg-white top-[100%] shadow-md ${stickeractive && !posteractive ? "block" : "hidden"} dropdown `}>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href={{
                        pathname: '/Sticker',
                        search: "?type=motivation"
                    }}
                        onClick={() => { setStickerActive(!stickeractive) }}
                    >Devotional Collection</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Cars</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Marvel Collection</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >DC Collection</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Movies</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href=''
                        onClick={() => { setStickerActive(!stickeractive) }}
                        to={{
                            pathname: '/sticker',
                            search: "?type=Series"
                        }}>TV Series </Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Football</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Cricket</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >F1 </Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Games </Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Music</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Motivation</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href='' >Creative Wall Art Poster Kit</Link></div>
                    <div className="opacity-80 px-10 my-2 hover:underline hover:underline-offset-4  hover:decoration-0 "><Link href=''
                        onClick={() => { setStickerActive(!stickeractive) }}
                        to={{
                            pathname: '/sticker',
                            search: "?type=Anime"
                        }}>Anime</Link></div>
                </div>
                <div className="flex items-center gap-4">
                    {/* <input type="text" name="" id="search" placeholder="Search" className="border-[1px] placeholder-gray-800 outline-none w-[15vw] focus:placeholder:translate-y-[-1rem] focus:placeholder:text-xs  focus:placeholder:duration-200 focus:placeholder:opacity-75 border-black px-4 py-3 rounded-3xl " /> */}
                    <div className="relative group">
                        <input type="text" id="search"
                            className={`border-[1px] bg-transparent  placeholder-gray-800 outline-none w-[15vw] border-black px-4 py-3 rounded-3xl
                            `}
                            onChange={(e) => { e.target.value ? sethandleplaceholder(true) : sethandleplaceholder(false) }}
                        />
                        <p className={`absolute bottom-3 left-4  group-focus-within:translate-y-[-1rem] group-focus-within:text-xs group-focus-within:opacity-80  ${handleplaceholder ? "translate-y-[-1rem] opacity-80 text-xs " : ""}`}>
                            Search
                        </p>
                    </div>
                    <Link href='/Login'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon hover:w-[1.35rem] icon-account cursor-pointer w-5" viewBox="0 0 18 19"><path fill="currentColor" fillRule="evenodd" d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15M9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35" clipRule="evenodd"></path></svg>
                    </Link>
                    <Link href='/Cart' >
                        <div className={`relative `} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon  hover:w-[2.59rem] icon-cart-empty cursor-pointer w-10" viewBox="0 0 35 40"><path fill="currentColor" fillRule="evenodd" d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1-9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"></path></svg>
                            <p className="absolute bottom-0 right-0  bg-black text-white  px-2  rounded-[50%] ">{item.length > 0 ? item.length : ""}</p>
                        </div>
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar

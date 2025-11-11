import React from 'react'
import gsap from "gsap";
import { useEffect } from "react";



const Marquee = () => {
    useEffect(() => {
        gsap.to(".marquee", {
            xPercent: -100,
            duration: 13,
            repeat: -1,
            ease: "linear"
        });

        // animation according to the scrool of wheel   
        // window.addEventListener("wheel", (e) => {
        //     if (e.deltaY<=0) {
        //         gsap.to(".marquee", {
        //             transform:"translate(-107%)",
        //             duration: 10,
        //             repeat: -1,
        //             ease: "linear"
        //         });
        //     }
        //     else if(e.deltaY>0) {
        //         gsap.to(".marquee", {
        //             transform:"translate(7%)",
        //             duration: 10,
        //             repeat: -1,
        //             // ease: "linear"
        //         });
        //     }
        // }
        // )
    }, [])
    return (
        <>
            <div className="marquee  whitespace-nowrap  flex  ">
                <div className="bg-black  flex shrink-0 font-bold text-xs py-2 px-3 text-white gap-4">
                    ➜ FREE DELIVERY FOR PREPAID ORDERS!
                    <div className="display:inline-block; width:10px;"></div>
                    BUY 4 GET 3 FREE!
                    <div className="display:inline-block; width:15px;"></div>
                    BUY 5 GET 5 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 6 GET 12 FREE!<div className="display:inline-block; width:15px;"></div>
                    BUY 10 GET 20 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 20 GET 50 FREE!<div className="display:inline-block; width:15px;"></div>
                </div>
                <div className="bg-black  flex shrink-0 font-bold text-xs py-2 px-3 text-white gap-4">
                    ➜ FREE DELIVERY FOR PREPAID ORDERS!
                    <div className="display:inline-block; width:10px;"></div>
                    BUY 4 GET 3 FREE!
                    <div className="display:inline-block; width:15px;"></div>
                    BUY 5 GET 5 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 6 GET 12 FREE!<div className="display:inline-block; width:15px;"></div>
                    BUY 10 GET 20 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 20 GET 50 FREE!<div className="display:inline-block; width:15px;"></div>
                </div>
                <div className="bg-black  flex shrink-0 font-bold text-xs py-2 px-3 text-white gap-4">
                    ➜ FREE DELIVERY FOR PREPAID ORDERS!
                    <div className="display:inline-block; width:10px;"></div>
                    BUY 4 GET 3 FREE!
                    <div className="display:inline-block; width:15px;"></div>
                    BUY 5 GET 5 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 6 GET 12 FREE!<div className="display:inline-block; width:15px;"></div>
                    BUY 10 GET 20 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 20 GET 50 FREE!<div className="display:inline-block; width:15px;"></div>
                </div>
                <div className="bg-black  flex shrink-0 font-bold text-xs py-2 px-3 text-white gap-4">
                    ➜ FREE DELIVERY FOR PREPAID ORDERS!
                    <div className="display:inline-block; width:10px;"></div>
                    BUY 4 GET 3 FREE!
                    <div className="display:inline-block; width:15px;"></div>
                    BUY 5 GET 5 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 6 GET 12 FREE!<div className="display:inline-block; width:15px;"></div>
                    BUY 10 GET 20 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 20 GET 50 FREE!<div className="display:inline-block; width:15px;"></div>
                </div>
                <div className="bg-black  flex shrink-0 font-bold text-xs py-2 px-3 text-white gap-4">
                    ➜ FREE DELIVERY FOR PREPAID ORDERS!
                    <div className="display:inline-block; width:10px;"></div>
                    BUY 4 GET 3 FREE!
                    <div className="display:inline-block; width:15px;"></div>
                    BUY 5 GET 5 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 6 GET 12 FREE!<div className="display:inline-block; width:15px;"></div>
                    BUY 10 GET 20 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 20 GET 50 FREE!<div className="display:inline-block; width:15px;"></div>
                </div>
                <div className="bg-black  flex shrink-0 font-bold text-xs py-2 px-3 text-white gap-4">
                    ➜ FREE DELIVERY FOR PREPAID ORDERS!
                    <div className="display:inline-block; width:10px;"></div>
                    BUY 4 GET 3 FREE!
                    <div className="display:inline-block; width:15px;"></div>
                    BUY 5 GET 5 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 6 GET 12 FREE!<div className="display:inline-block; width:15px;"></div>
                    BUY 10 GET 20 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 20 GET 50 FREE!<div className="display:inline-block; width:15px;"></div>
                </div>
                <div className="bg-black  flex shrink-0 font-bold text-xs py-2 px-3 text-white gap-4">
                    ➜ FREE DELIVERY FOR PREPAID ORDERS!
                    <div className="display:inline-block; width:10px;"></div>
                    BUY 4 GET 3 FREE!
                    <div className="display:inline-block; width:15px;"></div>
                    BUY 5 GET 5 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 6 GET 12 FREE!<div className="display:inline-block; width:15px;"></div>
                    BUY 10 GET 20 FREE!<div className="display:inline-block; width:10px;"></div>
                    BUY 20 GET 50 FREE!<div className="display:inline-block; width:15px;"></div>
                </div>
            </div>
        </>
    )
}

export default Marquee

/* eslint-disable @next/next/no-img-element */
"use client"
import { Swiper, SwiperSlide, } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import Card from '../Components/Card'
import Marquee from '../Components/Marquee'
import { useState, useEffect } from 'react';
import axios from "axios";


const Home = () => {
    const [poster, setposter] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getdata = async () => {
            try {
                setLoading(true);
                const res = await axios.get('/api/Poster');
                setposter(res.data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch posters:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getdata();
    }, []);
    return (
        <>
            <div >
                <div className="overflow-x-hidden">
                    <img  src="/Banner/banner.png" alt="banner" className="max-[455px]:h-[40vh] " />
                    <Marquee />
                </div>
                <Swiper
                    spaceBetween={-50}
                    loop={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 3.5,
                            spaceBetween: -50
                        },
                        480: {
                            slidesPerView: 5,
                            spaceBetween: -50
                        },
                        768: {
                            slidesPerView: 7,
                            spaceBetween: -50
                        },
                        1024: {
                            slidesPerView: 9,
                            spaceBetween: -50
                        },
                        1280: {
                            slidesPerView: 12,
                            spaceBetween: -50
                        }
                    }}
                    className="my-8  w-full  font-semibold"
                >
                    <SwiperSlide><div className=" flex flex-col cursor-pointer gap-2 justify-center text-center text-xs items-center">
                        <img  src="/Type/Custommade.jpg" alt="" className="w-[55%] " />
                        Custom <br /> Poster
                    </div></SwiperSlide>
                    <SwiperSlide><div className=" flex flex-col cursor-pointer gap-2 justify-center text-center text-xs items-center">
                        <img  src="/Type/Car.jpg" alt="" className="w-[55%]" />
                        Car <br /> Collections
                    </div></SwiperSlide>
                    <SwiperSlide><div className=" flex flex-col cursor-pointer gap-2 justify-center text-center text-xs items-center">
                        <img  src="/Type/Movie.jpg" alt="" className="w-[55%]" />
                        Movie <br /> Collections
                    </div></SwiperSlide>
                    <SwiperSlide><div className=" flex flex-col cursor-pointer gap-2 justify-center text-center text-xs items-center">
                        <img  src="/Type/Series.jpg" alt="" className="w-[55%]" />
                        Tv-Series <br /> Collections
                    </div></SwiperSlide>
                    <SwiperSlide><div className=" flex flex-col cursor-pointer gap-2 justify-center text-center text-xs items-center">
                        <img  src="/Type/Music.png" alt="" className="w-[55%]" />
                        Music <br /> Collections
                    </div></SwiperSlide>
                    <SwiperSlide><div className=" flex flex-col cursor-pointer gap-2 justify-center text-center text-xs items-center">
                        <img  src="/Type/Game.jpg" alt="" className="w-[55%]" />
                        Video Game <br /> Collections
                    </div></SwiperSlide>
                    <SwiperSlide><div className=" flex flex-col cursor-pointer gap-2 justify-center text-center text-xs items-center">
                        <img  src="/Type/Motivate.jpg" alt="" className="w-[55%]" />
                        Motivate <br /> Collections
                    </div></SwiperSlide>
                    <SwiperSlide><div className=" flex flex-col cursor-pointer gap-2 justify-center text-center text-xs items-center">
                        <img  src="/Type/Cricket.jpg" alt="" className="w-[55%]" />
                        Cricket <br /> Collections
                    </div></SwiperSlide>
                    <SwiperSlide><div className=" flex flex-col cursor-pointer gap-2 justify-center text-center text-xs items-center">
                        <img  src="/Type/Football.jpg" alt="" className="w-[55%]" />
                        Football <br /> Collections
                    </div></SwiperSlide>
                    <SwiperSlide><div className=" flex flex-col cursor-pointer gap-2 justify-center text-center text-xs items-center">
                        <img  src="/Type/F1.jpg" alt="" className="w-[55%]" />
                        F1 <br /> Collections
                    </div></SwiperSlide>
                    <SwiperSlide><div className=" flex flex-col cursor-pointer gap-2 justify-center text-center  text-xs items-center">
                        <img  src="/Type/Hero.jpg" alt="" className="w-[55%]" />
                        Superhero <br /> Collections
                    </div></SwiperSlide>
                    <SwiperSlide><div className=" flex flex-col cursor-pointer gap-2 justify-center text-center text-xs items-center">
                        <img  src="/Type/Explore.png" alt="" className="w-[55%]" />
                        Explore More !
                    </div></SwiperSlide>
                </Swiper>

                <div className="flex flex-col justify-center items-center my-4 ">
                    <img  src="/Png/Multi.png" className="md:w-[45%] sm:w-[65%] w-[75%] " alt="" />
                    <div className="max-md:mb-20 max-sm:mb-13">
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img  src="/Png/New.png" className="md:w-[45%] sm:w-[65%] w-[75%] " alt="" />
                </div>
                <Swiper
                    spaceBetween={0}
                    loop={true}
                    className=" w-full mx-auto "
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                        350: {
                            slidesPerView: 2,
                            spaceBetween: 0
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 0
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 0,
                        }
                    }}>
                    {loading ? (
                        <div className="w-full text-center py-8">Loading posters...</div>
                    ) : error ? (
                        <div className="w-full text-center py-8 text-red-500">Error: {error}</div>
                    ) : poster && Array.isArray(poster) ? (
                        poster.map((element, idx) => (
                            <SwiperSlide className='mx-2 flex items-center justify-center max-[350px]:mx-auto' key={idx}>
                                <Card
                                    key={idx}
                                    id={element._id}
                                    url={element.url}
                                    name={element.name}
                                    subtype={element.subtype}
                                    sizes={element.sizes}
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className="w-full text-center py-8">No posters found</div>
                    )}
                </Swiper>

                <div className=" flex flex-col justify-center items-center">
                    <img  src="/Png/Best.png" className="md:w-[50%] sm:w-[65%] w-[75%]" alt="" />
                    <div className="max-md:mb-20 max-sm:mb-15">
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center  ">
                    <img  src="/Banner/Banner1.jpg" className="max-[530px]:h-[50vh] my-10 " alt="" />
                    <img  src="/Png/Collection.png" className="md:w-[45%] sm:w-[65%] w-[75%] m-4" alt="" />
                </div>


                <Swiper
                    spaceBetween={-10}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={'true'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]
                    }
                    breakpoints={{
                        0: {
                            slidesPerView: 3,
                            spaceBetween: 0
                        },
                        480: {
                            slidesPerView: 4,
                        },

                    }}
                    className="mySwiper  lg:h-[60vh] md:h-[55vh] sm:h-[50vh] h-[36vh] w-[95vw] mx-auto "
                >
                    <SwiperSlide className="relative overflow-hidden   ">
                        <img  src="/Collection/Customc.jpg" alt="" className="h-full w-[370px]  " /><p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white ">EXPLORE</p>
                    </SwiperSlide>
                    <SwiperSlide className="relative overflow-hidden"><img  src="/Collection/Cricketc.jpg" alt="" className="h-full w-[370px]" /><p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white ">EXPLORE</p></SwiperSlide>
                    <SwiperSlide className="relative overflow-hidden"><img  src="/Collection/Footballc.jpg" alt="" className="h-full w-[370px]" /><p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white">EXPLORE</p></SwiperSlide>
                    <SwiperSlide className="relative overflow-hidden"><img  src="/Collection/F1c.jpg" alt="" className="h-full w-[370px]" /><p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white ">EXPLORE</p></SwiperSlide>
                    <SwiperSlide className="relative overflow-hidden"><img  src="/Collection/Musicc.jpg" alt="" className="h-full w-[370px]" /><p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white ">EXPLORE</p></SwiperSlide>
                    <SwiperSlide className="relative overflow-hidden"><img  src="/Collection/Moviesc.jpg" alt="" className="h-full w-[370px]" /><p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white ">EXPLORE</p></SwiperSlide>
                    <SwiperSlide className="relative overflow-hidden"><img  src="/Collection/Quotesc.jpg" alt="" className="h-full w-[370px]" /><p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white ">EXPLORE</p></SwiperSlide>
                    <SwiperSlide className="relative overflow-hidden"><img  src="/Collection/Gymc.jpg" alt="" className="h-full w-[370px]" /><p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white ">EXPLORE</p></SwiperSlide>
                    <SwiperSlide className="relative overflow-hidden"><img  src="/Collection/Superheroc.jpg" alt="" className="h-full w-[370px]" /><p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white ">EXPLORE</p></SwiperSlide>
                </Swiper>
                <img  src="/Png/Why.png" alt="" className="md:w-[40%] sm:w-[50%] w-[55%] h-auto mb-10 mt-16 mx-auto" />
                <div className=" max-[515px]:flex-col flex flex-wrap items-center justify-center w-full mx-auto my-5" >
                    <div className="flex  flex-col max-[515px]:w-[100%] my-5 lg:w-[23vw] w-[45%] h-[20vh]   items-center">
                        <img  src="/Png/Quality.png" alt="" className="w-[10%]" />
                        <p className="font-semibold text-[.9rem] mt-2">Quality Guranteed</p>
                        <p className="text-xs text-center mx-6 my-2">quality is our top priority. Each poster <br /> is meticulously crafted using premium materials</p>
                    </div>
                    <div className="flex flex-col max-[515px]:w-[100%] my-5 lg:w-[23vw] w-[45%] h-[20vh]  items-center">
                        <img  src="/Png/Exclusive.png" alt="" className="w-[12%]" />
                        <p className="font-semibold text-[.9rem] mt-2"> Custom Creation</p>
                        <p className="text-xs text-center mx-6 my-2">Upload your own designs and <br />create personalized order that reflect you.</p>
                    </div>
                    <div className="flex flex-col max-[515px]:w-[100%] my-5 lg:w-[23vw] w-[45%] h-[20vh]  items-center ">
                        <img  src="/Png/Creation.png" alt="" className="w-[10%]" />
                        <p className="font-semibold mt-2 text-[.9rem]">Exclusive Offers</p>
                        <p className="text-xs text-center mx-6 my-2">we&apos;re constantly rolling out exciting offers to <br /> help you save big on your favorite designs.</p>
                    </div>
                    <div className="flex flex-col max-[515px]:w-[100%] my-5 lg:w-[23vw] w-[45%]  h-[20vh]  items-center ">
                        <img  src="/Png/Star.png" alt="" className="w-[10%]" />
                        <p className="font-semibold mt-2 text-[.9rem]">Exclusive Offers</p>
                        <p className="text-xs text-center mx-6 my-2">we&apos;re constantly rolling out exciting offers to <br /> help you save big on your favorite designs.</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home
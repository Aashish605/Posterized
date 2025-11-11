/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide, } from 'swiper/react';


const CustomDesign = () => {
    const [type, settype] = useState('Poster');
    const [selectedSize, setSelectedSize] = useState("A4");
    const [fileName, setFileName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [displayImg, setdisplayImg] = useState('./Custom/3.jpg');
    const [Quantity, setQuantity] = useState(1);
    const [payload, setpayload] = useState();

    const uploadFile = async () => {
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("upload_preset", "image_preset");
        try {
            const cloudName = "drsfbaluf";
            const resourceType = "image";
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
            console.log(api)
            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            return secure_url;
        } catch (error) {
            console.error(`Error uploading ${type}:`, error.response?.data || error.message);
            throw error;
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const imgUrl = await uploadFile();
            console.log("Image URL okay:", imgUrl);

            // Build payload locally (don't rely on async state update)
            const payloadObj = type === 'Poster'
                ? { type, size: selectedSize, Quantity, url: imgUrl }
                : { type, size: '', Quantity, url: imgUrl };

            setpayload(payloadObj);
            console.log('payload to send:', payloadObj);

            // Use absolute path and await the request. Match the API folder casing if you keep it uppercase.
            const res = await axios.post('/api/Custom', payloadObj);
            console.log('server response:', res.data);

            // Reset form state
            setQuantity(1);
            setSelectedSize('A4');
            settype('Poster');
            setSelectedFile(null);
            setFileName('');
        } catch (error) {
            console.error("Error during submission:", error.message);
        } finally {
        }
    };

    return (
        <>
            <div className='flex max-md:flex-col justify-center my-10 md:mx-10 '>
                {/* left section */}
                <section className='md:w-[60%] w-[99vw]'>
                    <div className='max-md:hidden'>
                        <img src={displayImg} alt="" className=' scroll-m-11  rounded-xl max-h-[160vh] object-cover   w-full border border-gray-400' />
                        <div className='flex my-2 w-full justify-center gap-4 '>
                            <img onClick={() => { setdisplayImg('./Custom/1.jpg') }} src="./Custom/1.jpg" alt="" className='rounded-md  w-auto  max-h-[25vh] object-cover object-center ' />
                            <img onClick={() => { setdisplayImg('./Custom/2.jpg') }} src="./Custom/2.jpg" alt="" className='rounded-md  w-auto max-h-[25vh] object-cover object-center ' />
                            <img onClick={() => { setdisplayImg('./Custom/3.jpg') }} src="./Custom/3.jpg" alt="" className='rounded-md w-auto   max-h-[25vh] object-cover object-center ' />
                        </div>
                    </div>
                    <div className='md:hidden'>
                        <Swiper
                            spaceBetween={5}
                            loop={true}
                            slidesPerView={2}
                        >
                            <SwiperSlide>
                                <img src="./Custom/1.jpg" alt="" className='rounded-md w-auto max-h-[75vh]  object-cover object-center ' />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="./Custom/2.jpg" alt="" className='rounded-md w-auto max-h-[75vh]  object-cover object-center ' />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="./Custom/3.jpg" alt="" className='rounded-md w-auto max-h-[75vh]  object-cover object-center ' />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>
                {/* Right Section */}
                <section className=' md:w-[40%] max-md:my-10 text-left mx-[5vh]  '>
                    <div className=' sticky top-6  '>
                        <p className='text-4xl lg:text-5xl '>Customize Your Wall Poster and Sticker</p>
                        <div className='flex  items-center mt-3 gap-4 text-[1.1rem] '>
                            {type === 'Poster' ?
                                <div className='flex  items-center gap-4'>
                                    <h1 className='line-through opacity-65'>Rs{selectedSize === 'A4' ? 179 : selectedSize === 'A5' ? 149 : selectedSize === 'A3' ? 210 : 249}</h1>
                                    <h1>Rs {selectedSize === 'A4' ? 129 : selectedSize === 'A5' ? 99 : selectedSize === 'A3' ? 159 : 179} </h1></div>
                                :
                                <div className='flex  items-center gap-4'>
                                    <h1 className='line-through opacity-65'>Rs 50</h1>
                                    <h1>Rs 45 </h1></div>}
                            <button className='bg-black text-white py-[1px] px-3 rounded-xl'>sale</button>
                        </div>
                        <p className='opacity-65 my-1'>Taxes included shipping calculated at checkout</p>
                        <p className='opacity-65 my-4 text-left'>Type</p>
                        <div className='flex  items-center gap-4 text-[1.1rem]  '>
                            <button
                                onClick={() => settype("Poster")}
                                className={`border border-gray-500 py-1 px-3 rounded-xl ${type === "Poster" ? "bg-black text-white" : ""}`}
                            >Poster</button>
                            <button
                                onClick={() => settype("Sticker")}
                                className={`border border-gray-500 py-1 px-3 rounded-xl ${type === "Sticker" ? "bg-black text-white" : ""}`}
                            >Sticker</button>
                        </div>
                        <p className='opacity-65 my-4 text-left'>Size</p>
                        {type === 'Poster' ? <div className='flex  items-center gap-4 text-[1.1rem]  '>
                            <button
                                onClick={() => setSelectedSize("A3")}
                                className={`border border-gray-500 py-1 px-3 rounded-xl ${selectedSize === "A3" ? "bg-black text-white" : ""}`}
                            >A3</button>
                            <button
                                onClick={() => setSelectedSize("A4")}
                                className={`border border-gray-500 py-1 px-3 rounded-xl ${selectedSize === "A4" ? "bg-black text-white" : ""}`}
                            >A4</button>
                            <button
                                onClick={() => setSelectedSize("A5")}
                                className={`border border-gray-500 py-1 px-3 rounded-xl ${selectedSize === "A5" ? "bg-black text-white" : ""}`}
                            >A5</button>
                            <button
                                onClick={() => setSelectedSize("13X19")}
                                className={`border border-gray-500 py-1 px-3 rounded-xl ${selectedSize === "13X19" ? "bg-black text-white" : ""}`}
                            >13X19&apos;</button>
                        </div> :
                            <div className='text-xl opacity-45'>
                                Size not availabel for sticker
                            </div>}
                        <p className='opacity-65 mt-4'>Quantity</p>
                        <div className=" flex gap-2 mt-3 ">
                            <button aria-label="decrease" onClick={() => setQuantity(Quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-400">
                                −
                            </button>
                            <input
                                type="number"
                                min={1}
                                value={Quantity}
                                onChange={e => setQuantity(e.target.value)}
                                className="w-10 text-center py-1 outline-none border-none"
                            />
                            <button
                                aria-label="increase"
                                onClick={() => setQuantity(Quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-400"
                            >
                                +
                            </button>
                        </div>
                        <p className='text-2xl my-6 '>Choose Image Here</p>
                        <div className='flex flex-col mb-6 '>
                            <label htmlFor="custom-img-upload" className="bg-black text-xl text-center py-2 px-6 rounded-2xl text-white cursor-pointer transition duration-200 hover:bg-gray-800 shadow-lg">
                                {fileName ? `Selected: ${fileName?.name}` : "Upload your image"}
                            </label>
                            <input
                                type="file"
                                id="custom-img-upload"
                                name="custom-img"
                                className="hidden"
                                onChange={e => {
                                    setFileName(e.target.files[0] || "");
                                    setSelectedFile(e.target.files[0] || null);
                                }}
                            />
                        </div>
                        {/* <div className='my-4 mx-auto'>
                            {selectedFile
                                ? <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="mt-2 rounded-md mx-auto h-[40vh] object-cover object-center" />
                                : ""}
                        </div> */}
                        <button onClick={handleUpload} className='w-full bg-black py-3 px-6 rounded-2xl text-white'>Add to cart</button>
                    </div>
                </section>
            </div>
            <div className=' w-full  flex  justify-center'>
                <img src="./Collection/COLLECTION.svg" className='w-[50vh] ' alt="" />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 px-6 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-4 items-center justify-center'>
                <div className="relative overflow-hidden   h-[60vh] ">
                    <img src="./Collection/Customc.jpg" alt="" className=" h-full w-full hover:scale-105 transition-transform hover:ease-linear  " />
                    <p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white">EXPLORE</p>
                </div>
                <div className=" relative overflow-hidden h-[60vh] ">
                    <img src="./Collection/Cricketc.jpg" alt="" className="h-full w-full hover:scale-105 transition-transform hover:ease-linear " />
                    <p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white">EXPLORE</p>
                </div>
                <div className=" relative overflow-hidden h-[60vh] ">
                    <img src="./Collection/Footballc.jpg" alt="" className="h-full w-full hover:scale-105 transition-transform hover:ease-linear " />
                    <p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white">EXPLORE</p>
                </div>
                <div className="relative overflow-hidden  h-[60vh] ">
                    <img src="./Collection/F1c.jpg" alt="" className="h-full w-full hover:scale-105 transition-transform hover:ease-linear " />
                    <p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white">EXPLORE</p>
                </div>
                <div className="relative overflow-hidden  h-[60vh] ">
                    <img src="./Collection/Musicc.jpg" alt="" className="h-full w-full hover:scale-105 transition-transform hover:ease-linear " />
                    <p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white">EXPLORE</p>
                </div>
                <div className=" relative overflow-hidden h-[60vh] ">
                    <img src="./Collection/Moviesc.jpg" alt="" className="h-full w-full hover:scale-105 transition-transform hover:ease-linear " />
                    <p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white">EXPLORE</p>
                </div>
                <div className="relative overflow-hidden  h-[60vh] ">
                    <img src="./Collection/Quotesc.jpg" alt="" className="h-full w-full hover:scale-105 transition-transform hover:ease-linear " />
                    <p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white">EXPLORE</p>
                </div>
                <div className=" relative overflow-hidden h-[60vh] ">
                    <img src="./Collection/Gymc.jpg" alt="" className="h-full w-full hover:scale-105 transition-transform hover:ease-linear " />
                    <p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white">EXPLORE</p>
                </div>
                <div className=" relative overflow-hidden h-[60vh] ">
                    <img src="./Collection/Superheroc.jpg" alt="" className="h-full w-full hover:scale-105 transition-transform hover:ease-linear " />
                    <p className="text-xl hover:bg-white hover:text-black absolute bottom-0 left-1/2 -translate-x-1/2 py-2 px-3 text-center text-white">EXPLORE</p>
                </div>
            </div>
        </>
    )
}

export default CustomDesign

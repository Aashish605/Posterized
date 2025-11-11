"use client"
import { useEffect, useState } from 'react'
import Marquee from '@/Components/Marquee'
import axios from 'axios'
import Card from '@/Components/Card'
import { useSearchParams } from 'next/navigation'

const Sticker = () => {
    const [sticker, setsticker] = useState();

    const queryParams  = useSearchParams()
    const type = queryParams.get("type")
    console.log(type);
    

    useEffect(() => {
        const getdata = async () => {
            try {
                const res = await axios.get(`/api/Sticker${type ? `?type=${type}` : ''}`)
                setsticker(res.data)
            } catch (error) {
                console.error('Error fetching sticker data:', error)
            }
        }
        getdata()
    }, [type]); 


    return (
        <>
            <Marquee />
            {/* <div className='w-full max-w-[1440px] px-4 flex items-center justify-between mx-auto mt-4'>
                <label className="flex items-center gap-2" htmlFor="subtype">Filter :
                    <select type="text"
                        required
                        // value={subtype}
                        className="block w-fit px-3 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" >
                        <option value="" hidden>Type</option>
                        <option value="Devotional">Devotional</option>
                        <option value="Cars">Cars</option>
                        <option value="Marvel">Marvel</option>
                        <option value="DC">DC</option>
                        <option value="Movies">Movies</option>
                        <option value="TV Series">TV Series</option>
                        <option value="Football">Football</option>
                        <option value="Cricket">Cricket</option>
                        <option value="F1">F1</option>
                        <option value="Games">Games</option>
                        <option value="Music">Music</option>
                        <option value="Motivation">Motivation</option>
                        <option value="Anime">Anime</option>
                    </select>
                </label>
                <div className=' flex items-center gap-4'>
                    <label className=" flex items-center gap-2" htmlFor="subtype">Sort by :
                        <select type="text"
                            required
                            // value={subtype}
                            className="block w-fit px-3 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" >
                            <option value="" hidden>Date</option>
                            <option value="Devotional">Devotional</option>
                            <option value="Cars">Cars</option>
                            <option value="Marvel">Marvel</option>
                            <option value="DC">DC</option>
                            <option value="Movies">Movies</option>
                        </select>
                    </label>
                    <p className='opacity-75'>17 products</p>
                </div>
            </div> */}
            <div className=' flex items-center justify-center flex-col mx-2 '>
                <div className=' grid gap-2 grid-cols-2  max-[410px]:grid-cols-1  lg:grid-cols-3 xl:grid-cols-4  my-4  '>
                    {
                        sticker && Array.isArray(sticker)
                            ? sticker.map((element, idx) => (
                                <Card
                                    key={idx}
                                    id={element._id}
                                    url={element.url}
                                    name={element.name}
                                    subtype={element.subtype}
                                    sizes={element.sizes}
                                />
                            ))
                            : ""
                    }
                </div>
            </div>
        </>
    )
}

export default Sticker

'use client';
import { useEffect, useState, Suspense } from 'react';
import Marquee from '@/Components/Marquee';
import axios from 'axios';
import Card from '@/Components/Card';
import { useSearchParams } from 'next/navigation';

function StickerContent() {
    const [sticker, setSticker] = useState();

    const queryParams = useSearchParams();
    const type = queryParams.get('type');
    console.log(type);

    useEffect(() => {
        const getdata = async () => {
            try {
                const res = await axios.get(`/api/Sticker${type ? `?type=${type}` : ''}`);
                setSticker(res.data);
            } catch (error) {
                console.error('Error fetching sticker data:', error);
            }
        };
        getdata();
    }, [type]);

    return (
        <>
            <Marquee />
            <div className='flex items-center justify-center flex-col mx-2'>
                <div className='grid gap-2 grid-cols-2 max-[410px]:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 my-4'>
                    {sticker && Array.isArray(sticker)
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
                        : ''}
                </div>
            </div>
        </>
    );
}

export default function Sticker() {
    return (
        <Suspense fallback={<div className="text-center text-white py-10">Loading stickers...</div>}>
            <StickerContent />
        </Suspense>
    );
}

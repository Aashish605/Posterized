"use client"
import { useState } from "react";
import axios from "axios";

const Upload = () => {
    const [img, setImg] = useState();
    const [video, setVideo] = useState();
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        name: "",
        type: "",
        subtype: "",
        url: "",
        sizes: []
    });



    const handleChange = (e, index = null) => {
        const { name, value } = e.target;
        if (index !== null) {
            const updateSizes = [...payload.sizes]
            updateSizes[index][name] = value;
            setPayload({ ...payload, sizes: updateSizes })
        }
        else {
            setPayload({ ...payload, [name]: value })
        }
    }


    const uploadFile = async (type) => {
        const data = new FormData();
        data.append("file", type === "image" ? img : video);
        data.append("upload_preset", type === "image" ? "image_preset" : "video_preset");
        try {
            const cloudName = "drsfbaluf";
            const resourceType = type === "image" ? "image" : "video";
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
            setLoading(true);
            const imgUrl = await uploadFile("image");
            // const videoUrl = await uploadFile("video");
            console.log("Image URL okay:", imgUrl);
            payload.url = imgUrl;
            console.log(payload);
            const backend = axios.post(`api/${payload.type}`, payload)
            console.log(backend);
            setImg(null);
            setVideo(null);
        } catch (error) {
            console.error("Error during submission:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const addsize = (params) => {
        setPayload(state => ({
            ...state,
            sizes: [...state.sizes, { size: "", price: "" }]
        }))
    }


    return (
        <>
            <form onSubmit={handleUpload} className="h-fit  mb-20 mt-10 items-center justify-center flex flex-col ">
                <div>
                    <label className="block mb-2 text-gray-900 dark:text-white text-center">Name</label>
                    <input required type="text" name="name" value={payload.name} onChange={handleChange} className="block w-full  px-3 py-2 text-gray-900 border border-gray-300  rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                </div>

                <label className="mt-6" htmlFor="type">Type :</label>
                <select
                    name='type'
                    required
                    type="text"
                    value={payload.type}
                    onChange={handleChange}
                    className="block  w-[13vw] px-3 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" >
                    <option value="" hidden>Select an option</option>
                    <option value="Poster">Poster</option>
                    <option value="Sticker">Sticker</option>
                    <option value="Wall Collage">Wall Collage</option>
                </select>

                <label className="mt-6" htmlFor="subtype">Sub-Type :
                    <select type="text"
                        name="subtype"
                        required
                        value={payload.subtype}
                        onChange={handleChange}
                        className="block w-[13vw] px-3 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" >
                        <option value="" hidden>Select an option</option>
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
                        <option value="Creative Wall Art Poster Kit">Creative Wall Art Poster Kit</option>
                        <option value="Anime">Anime</option>
                    </select>
                </label>

                <div className="mt-6">
                    <input required type="file" accept="image/*" id="img" onChange={(e) => setImg(e.target.files[0])} className="block w-full  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                </div>

                <div>
                    {payload.sizes.map((s, i) => (
                        <div key={i} className="space-y-4">
                            <div className="flex flex-col">
                                <label className="text-lg font-medium mb-2">Size:</label>
                                <input
                                    type="text"
                                    name="size"
                                    value={s.size}
                                    onChange={(e) => handleChange(e, i)}
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-lg font-medium mb-2">Price:</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={s.price}
                                    onChange={(e) => handleChange(e, i)}
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <p className="my-10" onClick={addsize}>add sizes</p>

                <button type="submit" className="mt-14 bg-gray-400 px-3 py-2 rounded-lg"  >
                    {loading ? "Uploading..." : "Upload"}
                </button>

            </form>
        </>
    );
};

export default Upload;



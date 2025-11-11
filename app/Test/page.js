"use client"
import Fuse from "fuse.js";
import React, { useState } from "react";
import searchData from '@/lib/search-data.json';

const posts = searchData;
const [input, setInput] = useState({})
const handleSearch = (event) => {
    const { value } = event.target;

    const fuse = new Fuse(posts, {
        keys: ["title", "description"],
    });


    const results = fuse.search(value);
    const items = results.map((r)=>r.item)
    setInput(items)

    if (condition) {
        
    } else {
        
    }
};
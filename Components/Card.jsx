import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Cart/CartSlice';
import { useState } from 'react'

const Card = ({ url, name, subtype, id, sizes }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            id,
            url,
            name,
            subtype,
            quantity: 1,
            sizpri
        }));
        console.log(sizpri)
    };

    const [sizpri, setSizpri] = useState(`${sizes[0].price}|${sizes[0].size}`);



    return (
        <div className=" flex flex-col  my-2  duration-500 group hover:translate-y-[-1.5vh]  h-[82vh] max-[500px]:min-w-[190px] max-[500px]:max-w-[220px] max-[500px]:h-[75vh]  max-[375px]:h-[75vh] max-[410px]:max-w-[70vw] mx-auto ">
            <img src={url} alt={name} className="w-full h-[60vh] overflow-hidden  my-4 object-cover rounded-md" />

            <p className="text-[.9rem]  mx-4 text-center text-gray-800">
                {name}
            </p>
            {/* <p className="text-center text-[1.1rem] text-gray-900">{subtype}</p> */}
            <p className="text-center text-[.9rem] text-gray-900">From Rs.{sizes[0].price || "99.00"}</p>
            <div className="">
                <select
                    onChange={(e) => { setSizpri(e.target.value) }}
                    className="w-full h-fit outline-none border-[1px] rounded-xl appearance-auto border-black my-2 px-2 py-3 mx-auto text-gray-800"
                >
                    {sizes.map((i, id) => (
                        <option key={id} value={`${i.price}|${i.size}`}>
                            {i.size ? `${i.size} -` : ""}   Rs. {i.price}
                        </option>
                    ))}
                </select>
            </div>
            <button
                className="w-full h-[6vh] bg-black text-white rounded-xl py-3 px-2 font-semibold hover:bg-gray-800"
                onClick={handleAddToCart}
            >
                Add to cart
            </button>
        </div>
    )
}

export default Card

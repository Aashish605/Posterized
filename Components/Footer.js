import Link from "next/link";

const Footer = () => {
    return (
        <>


            <div className="bg-black text-white">
                <div className="min-[550px]:flex justify-center w-full">
                    <div className="min-[375px]:w-1/2 m-10">
                        <p className="text-xl max-[550px]:pt-8">About Us</p>
                        <p className="mt-3 text-wrap text-gray-300">
                            Welcome to Posterized.in where creativity meets artistry in the form of stunning customized and designer posters. We believe that every wall has a story to tell, and we are here to help you tell yours.
                        </p>
                    </div>
                    <div className="w-1/2 m-10">
                        <p className="text-xl">Quick Links</p>
                        <div className="text-gray-300 text-[0.9rem]">
                            <li className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 cursor-pointer list-none mt-5">About Us</li>
                            <li className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 cursor-pointer list-none mt-2">Contact Us</li>
                            <li className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 cursor-pointer list-none mt-2">Terms and Conditions</li>
                            <li className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 cursor-pointer list-none mt-2">Cancellation and Shipping Policy</li>
                            <li className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 cursor-pointer list-none mt-2">Affiliate</li>
                            <li className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 cursor-pointer list-none mt-2">FAQs</li>
                        </div>
                    </div>
                </div>
                <div className="bg-black text-white mx-10 flex items-center justify-between max-[376px]:block">
                    <div>
                        <label className="block text-[1.1rem] max-[376px]:text-[1rem] max-[376px]:text-center" htmlFor="email">
                            Subscribe to our emails
                        </label>
                        <div className="flex justify-center min-[377px]:block">
                            <input type="text" className="bg-transparent px-2 py-3 mt-3 rounded-3xl max-[376px]:w-[65vw] min-w-[25vw] placeholder:text-white border-[1px]" placeholder="Email" id="email" />
                        </div>
                    </div>
                    <p className="flex justify-center min-[377px]:block max-[376px]:my-5">
                        <img src="https://img.icons8.com/?size=100&id=32292&format=png&color=ffffff" alt="" className="size-5 hover:size-6 max-[425px]:my-6 cursor-pointer" />
                    </p>
                </div>
                <div className="h-[2px] w-[95%] mx-auto mt-8 bg-gray-800"></div>
                <div className="mx-10 py-10 flex flex-wrap items-center gap-4 text-xs">
                    <li className="text-gray-300 list-none">
                        &copy;2025, <Link href='' className="hover:underline hover:underline-offset-4">Posterized</Link>
                    </li>
                    <li>
                        <Link href='' className="w-fit text-gray-300 hover:underline hover:underline-offset-4">Refund Policy</Link>
                    </li>
                    <li>
                        <Link href='' className="w-fit text-gray-300 hover:underline hover:underline-offset-4">Terms of Service</Link>
                    </li>
                    <li>
                        <Link href='' className="w-fit text-gray-300 hover:underline hover:underline-offset-4">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href='' className="w-fit text-gray-300 hover:underline hover:underline-offset-4">Shipping Policy</Link>
                    </li>
                    <li>
                        <Link href='' className="w-fit text-gray-300 hover:underline hover:underline-offset-4">Contact Information</Link>
                    </li>
                </div>
            </div>
        </>
    );
};

export default Footer;


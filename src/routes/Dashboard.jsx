import React from "react";
import { Copy, Code } from 'lucide-react'
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate=useNavigate();
    const handlechatbot=()=>{
        navigate("/home")
    }

    const handleQR=()=>{
        navigate("/qrgenerator")
    }

    return(
        <>
            <div className="flex flex-col items-center p-4 md:p-8 rounded grow overflow-hidden mt-16">
                <div className="flex items-center justify-center w-full mt-3 mb-3">
                    <div className="p-4 md:p-8 rounded bg-[#f7f7f7] w-full max-w-7xl flex flex-col">
                        <div className="mx-auto max-w-7xl px-2 lg:px-8">
                        <div className="flex justify-center items-center h-40">
                        <div className="mb-4 max-w-lg flex flex-col items-center text-center">
                            <p className="text-sm font-semibold uppercase tracking-widest text-black">
                            100+ Tailwind Components
                            </p>
                            <h2 className="mt-6 text-3xl font-bold leading-tight text-black">
                            DevUI makes it easy to build beautiful websites
                            </h2>
                        </div>
                        </div>
                            <hr />
                            <div className="mt-8 grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-2">
                                <div className="flex items-start">
                                    <Copy className="h-9 w-9 text-gray-700" />
                                    <div className="ml-5">
                                        <h3 className="text-xl font-semibold text-black">Simply Copy & Paste</h3>
                                        <p className="mt-3 text-base text-gray-600">
                                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                                        </p>
                                        <a href="" onClick={handleQR} className="font-semibold text-black transition-all duration-200 hover:underline cursor-pointer">Click here</a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Code className="h-9 w-9 text-gray-700" />
                                    <div className="ml-5">
                                        <h3 className="text-xl font-semibold text-black">Easy to Customize</h3>
                                        <p className="mt-3 text-base text-gray-600">
                                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                                        </p>
                                        <a href="" onClick={handlechatbot} className="font-semibold text-black transition-all duration-200 hover:underline cursor-pointer">Click here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
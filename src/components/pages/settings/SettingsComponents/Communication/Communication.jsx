import React from 'react';
import { Link } from 'react-router-dom';

const Communication = () => {
    return (
        <div className='container p-4 bg-[#f8fafc]'>
            <h1 className='mx-3 font-semibold text-lg grid1-item'>Communication</h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4  gap-4 mt-4">
                <Link
                    to="/whatsapp">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                Whatsapp
                            </p>
                        </div>
                    </div>

                </Link>
                <Link
                    to="/email">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                Email
                            </p>
                        </div>
                    </div>

                </Link>
            </div>
        </div>
    )
}

export default Communication
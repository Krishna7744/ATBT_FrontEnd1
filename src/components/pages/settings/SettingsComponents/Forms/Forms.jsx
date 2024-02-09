import React from 'react';
import { Link } from 'react-router-dom';

const Forms = () => {
    return (
        <div className='container p-4 bg-[#f8fafc]'>
            <h1 className='mx-3 font-semibold text-lg grid1-item'>Forms</h1>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4  gap-4 mt-4">

                <Link
                    to="/settingentityform">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                Entity Form
                            </p>
                        </div>
                    </div>

                </Link>

                <Link to="/settingboardmeetingform">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                Broad Meeting Form
                            </p>
                        </div>
                    </div>
                </Link>
                <Link
                    to="/settinguserform">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                UserForm
                            </p>
                        </div>
                    </div>

                </Link>

                <Link to="/settingteamsform">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                Teams Form
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Forms
import React from 'react';
import { Link } from 'react-router-dom';

const Integrations = () => {
    return (
        <div className='container p-4 bg-[#f8fafc]'>
            <p className="text-xl font-semibold"> Integrations</p>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4  gap-4 mt-4">

                <Link
                    to="/whatsappintegration">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                Whatsapp
                            </p>
                        </div>
                    </div>

                </Link>

                <Link to="/emailintegration">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                Email
                            </p>
                        </div>
                    </div>
                </Link>
                <Link to="/api">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                API
                            </p>
                        </div>
                    </div>
                </Link>
                <Link to="/webhook">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                Web Hook
                            </p>
                        </div>
                    </div>
                </Link>
                <Link to="/sms">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                Sms
                            </p>
                        </div>
                    </div>
                </Link>
                <Link to="/paymentgateway">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                Payment GateWay
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Integrations;

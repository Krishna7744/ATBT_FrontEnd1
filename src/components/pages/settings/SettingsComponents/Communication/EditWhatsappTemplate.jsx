import React from 'react';

const EditWhatsappTemplate = () => {
    return (
        <div className="container p-2 bg-[#f8fafc]">
            <h4 className=' font-semibold text-lg grid1-item'>Edit Whatsapp Templates</h4>
            <form className='px-2 mt-3'>
                <div className='grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
                    <div className='grid1-item'>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Template Name</label>
                            <div className="">
                                <input id="templatename" name="templatename" type="text" required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div className='grid1-item'>
                        <label htmlFor="venue" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Template Type</label>
                        <div className="relative inline-block text-left w-full">
                            <select className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
                                <option value="selected" className="hover:bg-orange-600">Select Template Type</option>
                                <option value="hi-teccity">dsgsad</option>

                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='grid1-item'>
                        <label htmlFor="venue" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Template Language</label>
                        <div className="relative inline-block text-left w-full">
                            <select className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
                                <option value="selected" className="hover:bg-orange-600">Select Template Language</option>
                                <option value="hi-teccity">telugu</option>

                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div >
                    <label htmlFor="name" className=" block text-sm my-2 font-medium leading-6 text-gray-900" >Content</label>
                    <div className=''>
                        <textarea name='Description' className=" bg-gray-50 rounded-md text-sm p-2 w-full h-44 border-2 border-gray-200 focus:outline-none focus:border-orange-400"></textarea>
                    </div>
                </div>
                <div>
                    <label htmlFor="footer" className="block text-sm font-medium leading-6  my-2 text-gray-900">Footer</label>
                    <div className="">
                        <input id="footer" name="footer" type="text" required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                    </div>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'>
                    <div className='grid1-item'>
                        <label htmlFor="venue" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Buttons</label>
                        <div className="relative inline-block text-left w-full">
                            <select className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
                                <option value="selected" className="hover:bg-orange-600">Select Button</option>
                                <option value="hi-teccity">dsgsad</option>

                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-start my-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border " required />
                    </div>
                    <label for="remember" className="ms-2 text-sm font-medium text-gray-900 ">Active / Enabled</label>
                </div>
                <div className='flex justify-end'>
                    <button type="submit"
                        className="me-5 rounded-md px-8 py-1.5 text-sm font-semibold border-2 border-orange-600 leading-6 text-orange-600 shadow-sm hover:bg-dark-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Cancel</button>
                    <button type="submit"
                        className="rounded-md bg-orange-600 px-8 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Save</button>
                </div>
            </form>
        </div>
    );
}

export default EditWhatsappTemplate;

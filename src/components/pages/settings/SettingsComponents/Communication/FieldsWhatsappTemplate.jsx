import React from 'react';

const FieldsWhatsappTemplate = () => {
    return (
        <div className='p-4'>
            <p className='text-lg font-semibold'>Body Variable Mapping</p>
            <form className="space-y-6" method="POST">
                <div className=' grid grid-cols-4 gap-4 mt-2'>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Variable</label>
                        <div className="mt-2">
                            <input id="text" name="text" placeholder='{{1}}' type="text" autoComplete="email" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="variables" className="text-sm font-medium text-gray-900 mr-2">Project Fields</label>
                        <div className="relative">
                            <select className="mt-2 p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6">
                                <option value="option1">Last Name</option>
                                <option value="option2">1</option>
                                <option value="option3">2</option>
                                <option value="option4">3</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="subject" className="text-sm font-medium text-gray-900 mr-2"> Fallback Values</label>
                        <div className='mt-2'>
                            <input
                                id="subject"
                                name="subject"
                                placeholder="Student"
                                type="text"
                                autoComplete="subject"
                                required
                                className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className=' grid grid-cols-4 gap-4 mt-2'>
                    <div>
                        <div className="mt-2">
                            <input id="text" name="text" placeholder='{{2}}' type="text" autoComplete="email" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="">
                        <div className="relative">
                            <select className="mt-2 p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6">
                                <option value="option1">Owner</option>
                                <option value="option2">1</option>
                                <option value="option3">2</option>
                                <option value="option4">3</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className='mt-2'>
                            <input
                                id="subject"
                                name="subject"
                                placeholder="Fallback Value"
                                type="text"
                                autoComplete="subject"
                                required
                                className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-4'>
                    <div className='col-span-4 text-end'>
                        <button type="submit"
                            className="me-5 rounded-md px-8 py-1.5 text-sm font-semibold border-2 border-orange-600 leading-6 text-orange-600 shadow-sm hover:bg-dark-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Cancel</button>

                        <button type="submit"
                            className="rounded-md bg-orange-600 px-8 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FieldsWhatsappTemplate;

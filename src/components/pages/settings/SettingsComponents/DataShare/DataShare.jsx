import React from 'react'
import { Link } from 'react-router-dom';
const DataShare = () => {
    return (
        <div className=' p-3 bg-[#f8fafc] overflow-hidden'>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-col-3 gap-2 mt-2'>
                <h1 className='font-semibold text-lg grid1-item'>Data Share</h1>
                <div className='grid1-item  text-start'>
                    <label
                        for='default-search'
                        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                    >
                        Search
                    </label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 start-0 flex items-center p-2 pointer-events-none'>
                            <svg
                                className='w-4 h-4 text-gray-500 dark:text-gray-400'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    stroke='currentColor'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    stroke-width='2'
                                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                />
                            </svg>
                        </div>
                        <input
                            type='search'
                            id='default-search'
                            className='block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none '
                            placeholder='Search here...'
                            required
                        // onChange={(event) => {
                        //   console.log(event.target.value);
                        //   params(`search=${event.target.value}`);
                        // }}
                        // onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className='grid1-item  sm:text-start md:text-end lg:text-end xl:text-end flex justify-end'>

                    <Link to='adddatashare'>
                        <button className='mt-1 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white '>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className='w-5 h-5 '
                            >
                                <path d='M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z' />
                            </svg>
                            Add
                        </button>
                    </Link>
                </div>
            </div>
            {/* table */}
            <div className='mt-8'>
                <div className='max-h-[457px] overflow-y-scroll'>
                    <table className='w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md'>
                        <thead>
                            <tr>
                                <th className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'>
                                    S.No
                                </th>
                                <th className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'>
                                    Name
                                </th>
                                <th className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'>
                                    Description
                                </th>
                                <th className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 '>
                                    Actions{' '}
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                            <tr>
                                <td>bhavitha</td>
                                <td>bhavitha</td>
                                <td>bhavitha</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DataShare
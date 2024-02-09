import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { UserDataContext } from '../../../../../contexts/usersDataContext/usersDataContext';
import useDebounce from '../../../../../hooks/debounce/useDebounce';
import * as actions from '../../../../../contexts/usersDataContext/utils/usersActions';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const OrganizationProfile = () => {
    const { usersState: { settings }, usersDispatch, deleteUser, setSortBy, toggleUser } = useContext(UserDataContext);
    const { debouncedSetPage, debouncedSetSearch } = useDebounce(usersDispatch);
    const handlePerPageChange = (event) => {
        const selectedValue = parseInt(event.target.value, 10);
        usersDispatch({
            type: 'SET_PER_PAGE',
            payload: {
                conext: 'SETTINGS',
                data: selectedValue
            }
        });
    };
    useEffect(() => {
        // usersDispatch(actions.setPerPage(10))
        return () => {
            usersDispatch({
                type: "SET_SEARCH",
                payload: {
                    data: "",
                    context: "SEIINGS"
                }
            })
            //   usersDispatch(actions.setPerPage(5))
        }
    }, [])
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    // choose photo adding
    const [imageSrc, setImageSrc] = useState(null);
    const [displayImage, setDisplayImage] = useState()
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setDisplayImage(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(file);
                setSelectedFileName(file.name);

            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        // console.log("imageSrc", imageSrc)
    })
    const handleChooseFileClick = () => {
        document.getElementById('fileInput').click();
    };


    // for number scrolling disable
    $('input[type=number]').on('mousewheel', function (e) {
        $(e.target).blur();
    });

    const handleDeleteUser = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this user!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ea580c',
            cancelButtonColor: '#fff',
            confirmButtonText: 'Delete',
            customClass: {
                popup: 'custom-swal2-popup',
                title: 'custom-swal2-title',
                content: 'custom-swal2-content',
            },
        });

        if (confirmDelete.isConfirmed) {
            try {
                const result = await deleteUser(id);
            } catch (error) {
                Swal.fire('Error', 'Unable to delete user 🤯', 'error');
            }
        }
    };


    return (
        <div className='container lg:p-4 bg-[#f8fafc]'>
            <h1 className='mx-3 font-semibold text-lg grid1-item'>Organization Profile</h1>

            <div className="flex justify-start overflow-auto rounded-sm border-1">
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 1 ? 'border-b-2 border-orange-600  text-black' : ''
                        }`}
                    onClick={() => handleTabClick(1)}>Overview
                </div>
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 2 ? 'border-b-2 border-orange-600 text-black' : ''
                        }`}
                    onClick={() => handleTabClick(2)}>Organization&nbsp;Logo
                </div>
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 3 ? 'border-b-2 border-orange-600 text-black' : ''
                        }`}
                    onClick={() => handleTabClick(3)}>Edit
                </div>
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 4 ? 'border-b-2 border-orange-600 text-black' : ''
                        }`}
                    onClick={() => handleTabClick(4)}>Users
                </div>
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 5 ? 'border-b-2 border-orange-600 text-black' : ''
                        }`}
                    onClick={() => handleTabClick(5)}>Activity&nbsp;Log
                </div>
            </div>
            <hr />
            {/* 1st tab */}
            {activeTab === 1 && <div className="mt-4">
                <div className='lg:flex lg:justify-center lg:mt-8'>
                    <div className='shadow border-2 bg-gray-52 rounded-md sm:w-full lg:w-5/6'>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr class="bg-gray-50 dark:bg-gray-800">
                                        <td class="px-3 py-3 text-sm  w-3/6 font-medium text-gray-800 border border-gray-200">Organization Name</td>
                                        <td class="px-3 py-3 text-sm text-gray-800 border border-gray-200">ATBT</td>
                                    </tr>
                                    <tr class="bg-white dark:bg-gray-900">
                                        <td class="px-3 py-3 text-sm font-medium text-gray-800 border-r border-gray-200">Office Address</td>
                                        <td class="px-3 py-3 text-sm text-gray-800">Hyderabad</td>
                                    </tr>
                                    <tr class="bg-gray-50 dark:bg-gray-800">
                                        <td class="px-3 py-3 text-sm font-medium text-gray-800 border-r border-gray-200">Office Whatsapp Number</td>
                                        <td class="px-3 py-3 text-sm text-gray-800 border border-gray-200">0987654321</td>
                                    </tr>
                                    <tr class="bg-white dark:bg-gray-900">
                                        <td class="px-3 py-3 text-sm font-medium text-gray-800 border-r border-gray-200">Office Landline Number</td>
                                        <td class="px-3 py-3 text-sm text-gray-800 border border-gray-200">01927</td>
                                    </tr>
                                    <tr class="bg-gray-50 dark:bg-gray-800">
                                        <td class="px-3 py-3 text-sm font-medium text-gray-800 border-r border-gray-200">Office Email</td>
                                        <td class="px-3 py-3 text-sm text-gray-800 border border-gray-200">atbt123@gmail.com</td>
                                    </tr>
                                    <tr class="bg-white dark:bg-gray-900">
                                        <td class="px-3 py-3 text-sm font-medium text-gray-800 border-r border-gray-200">Own Domain / Sub Domain</td>
                                        <td class="px-3 py-3 text-sm text-gray-800 border border-gray-200">https://erp.atbt.com</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>}
            {/* 2nd tab */}
            {activeTab === 2 && <div className="mt-4">
                <div className='flex justify-center mt-5'>
                    {displayImage && (
                        <img
                            src={URL.createObjectURL(displayImage)}
                            alt="Selected"
                            style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }}
                        />
                    )}
                </div><br /><br />
                <div className='flex justify-center'>
                    <div className="mb-3 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                        <input className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={handleFileChange} />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                    </div>
                </div>
            </div>}
            {/* 3rd tab */}
            {activeTab === 3 && <div className="mt-4">
                <div className='flex justify-center mt-5'>
                    <div class='grid lg:grid-cols-2 sm:grid-cols-1 gap-6 lg:p-5 w-4/5 '>
                        <div>
                            <label class='text-sm text-gray-800 pt-1'>Organization Name</label>
                            <input id="name" name="entityname" type="text" autoComplete="name" required class="mt-1 p-2 w-full text-xs block bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        </div>
                        <div>
                            <label class='text-sm text-gray-800 pt-1'>Office Address</label>
                            <input id="name" name="entityname" type="text" autoComplete="name" required class="mt-1 p-2 w-full text-xs block bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        </div>
                        <div>
                            <label class='text-sm text-gray-800 pt-1'>Office Whatsapp Number</label>
                            <input id="name" name="entityname" type="number" autoComplete="name" required class="mt-1 p-2 w-full text-xs block bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" style={{ "-moz-appearance": "textfield" }} />
                        </div>
                        <div>
                            <label class='text-sm text-gray-800 pt-1'>Office Landline Number</label>
                            <input id="name" name="entityname" type="number" autoComplete="name" required class="mt-1 p-2 w-full text-xs block bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        </div>
                        <div>
                            <label class='text-sm text-gray-800 pt-1'>Office Email</label>
                            <input id="name" name="entityname" type="email" autoComplete="name" required class="mt-1 p-2 w-full text-xs block bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        </div>
                        <div>
                            <label class='text-sm text-gray-800 pt-1'>Own Domain / Sub Domain</label>
                            <input id="name" name="entityname" type="text" autoComplete="name" required class="mt-1 p-2 w-full text-xs block bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        </div>
                    </div>
                </div>
            </div>}
            {/*4 th tab search bar and filter */}
            {activeTab === 4 &&
                <div className="overflow-x-auto">
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-col-3 gap-2 mt-2'>
                        <h1 className='font-semibold text-lg grid1-item'></h1>
                        <div className='grid1-item mx-3 text-start'>
                            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative mb-2">
                                <div className="absolute inset-y-0 start-0 flex items-center p-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input onChange={(e) => debouncedSetSearch({ context: 'SETTINGS', data: e.target.value })} type="search" id="default-search" className="block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none " placeholder="Search here..." required />
                            </div>
                        </div>
                        <div className='grid1-item text-end filter_pagination  mb-2'>
                            <select defaultValue="10" onChange={handlePerPageChange} className="focus:outline-none me-3 gap-x-1.5 rounded-md bg-gray-50 px-1 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="250">250</option>
                                <option value="500">500</option>
                            </select>
                            <Menu as="div" className="relative inline-block me-2 ">
                                <div className=''>
                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50">
                                        Filters
                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <p
                                                        onClick={() => {
                                                            usersDispatch(setSortBy("createdAt", 'SETTINGS'))
                                                        }}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Date
                                                    </p>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <p
                                                        onClick={() => {
                                                            usersDispatch(setSortBy("name", 'SETTINGS'))
                                                        }}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Email
                                                    </p>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <p
                                                        onClick={() => {
                                                            usersDispatch(setSortBy("email", 'SETTINGS'))
                                                        }}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Name
                                                    </p>
                                                )}
                                            </Menu.Item>

                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                    {/* table */}
                    <div className="min-w-full inline-block align-middle">
                        <div className="overflow-y-scroll max-h-[440px]">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse border border-[#e5e7eb] rounded-md ">
                                <thead className='top-0'>
                                    <tr className=''>
                                        <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Name</th>
                                        <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb]">Email</th>
                                        <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb]">Phone Number</th>
                                        <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Entity Name</th>
                                        <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Designation</th>
                                        <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Role </th>
                                        <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Actions </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                                    {settings?.paginatedUsers?.map(user => (
                                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <td className="px-6 py-1.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{user.userName}</td>
                                            <td className="px-6 py-1.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{user.email}</td>
                                            <td className="px-6 py-1.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{user.phone}</td>
                                            <td className="px-6 py-1.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{user.EntityName ? user.EntityName : 'none'}</td>
                                            <td className="px-6 py-1.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{user.Designation ? user.Designation : 'none'}</td>
                                            <td className="px-6 py-1.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{user.Role ? user.Role : 'none'}</td>
                                            <td className="px-6 py-1.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800  flex justify-evenly">
                                                <Link to={`/userlandingpage/${user.id}`}>
                                                    <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                            <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </Link>
                                                <Link>
                                                    <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                            <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                                                        </svg>
                                                    </button>
                                                </Link>
                                                <button type="button" onClick={() => handleDeleteUser(user.id)} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                        <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
                                                    </svg>
                                                </button>
                                                <button type="button" onClick={() => toggleUser(user.id)} className="relative inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" checked={user.User_status} value="" className="sr-only peer" />
                                                        <div className="w-7 h-4 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>
                                                    </label>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* pagination */}
                    <div className="flex items-center justify-between px-4 py-2 sm:px-6 ">
                        {/* hidden pagination only for mobile */}
                        <div className="flex flex-1 justify-between sm:hidden">
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Previous
                            </a>
                            <a
                                href="#"
                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Next
                            </a>
                        </div>
                        {/*only for big screen pagination */}
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between ">
                            {/* pagination data */}



                            {/* <div>
                            {!settings?.paginatedUsers || settings?.paginatedUsers?.length === 0 ? "no data to show" : settings.loading ? "Loading..." : <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{settings?.startUser}</span> to
                                <span className="font-medium"> {settings?.endUser}</span> of {settings?.totalUsers} users
                            </p>}
                        </div> */}
                            {/* prev and next for big screens */}
                            <div className="flex justify-end absolute inset-x-0 bottom-2 mt-1 me-4">
                                <section className="isolate inline-flex rounded-md shadow-sm mt-1" aria-label="Pagination">
                                    {/* previos button */}
                                    <button
                                        disabled={settings.loading ? true : false || settings.currentPage === 1}
                                        onClick={() => debouncedSetPage({ context: 'SETTINGS', data: settings.currentPage - 1 })}
                                        href="#"
                                        className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${settings.loading ? 'cursor-wait' : settings.currentPage === 1 ? 'cursor-not-allowed' : 'cursor-auto'}`}
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                                        </svg>

                                    </button>
                                    {/* next button */}
                                    <button
                                        disabled={settings.loading ? true : false || settings.currentPage === settings.totalPages}
                                        onClick={() => debouncedSetPage({ context: 'SETTINGS', data: settings.currentPage + 1 })}
                                        className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${settings.loading ? 'cursor-wait' : settings.currentPage === settings.totalPages ? 'cursor-not-allowed' : 'cursor-auto'}`}
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>}
            {/* 5th page */}
            {activeTab === 5 && <div className="mt-4 overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-y-scroll max-h-[500px]">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse border border-[#e5e7eb] rounded-md ">
                            <thead className='sticky top-0 z-50'>
                                <tr>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Login Time</th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600   border-collapse border border-[#e5e7eb]">IP Address</th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600   border-collapse border border-[#e5e7eb]">Browser</th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Employee Name</th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600   border-collapse border border-[#e5e7eb] ">Entity Name</th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">22-1-2023 (9:00AM)</td>
                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">irndf32432</td>
                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Chrome</td>
                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Bhavitha</td>
                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]"> Inofz IT</td>


                                    {/* <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800  flex justify-evenly">
                                            <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                    <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                                                </svg>

                                            </button>
                                            <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
                                                </svg>

                                            </button>
                                        </td> */}
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}

        </div >
    )
}

export default OrganizationProfile
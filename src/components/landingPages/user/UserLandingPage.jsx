import React, {
  useState,
  Fragment,
  useRef,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import '../LandingPageCommon.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Dialog, Transition, Menu } from '@headlessui/react';
import defprop from '../../../Images/defprof.svg';
import { Link, redirect, useLoaderData, useParams } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import useInitializePerPage from '../../../hooks/initializePerPage/useInitializePerPage';
import useDebounce from '../../../hooks/debounce/useDebounce';
import { UserDataContext } from '../../../contexts/usersDataContext/usersDataContext';
import axios from 'axios';
import { getUserById } from '../../../contexts/usersDataContext/utils/usersApis';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export const userLandingLoader = async ({ params }) => {
  try {
    // const hasPermission = false;
    const { data } = await getUserById(params?.id);
    console.log(data, 'id data');
    // if (!hasPermission) {
    //   throw new Response('No permission', { status: 401 });
    // }
    return data;
  } catch (error) {
    console.error('Error loading dashboard:', error);
    throw redirect(`/${error.status}`);
  }
};

const UserLandingPage = () => {
  const { id } = useParams();
  const data = useLoaderData();
  console.log(data.user.customFieldsData, 'rrd');
  const customFormField = data.user.customFieldsData;
  console.log(customFormField, 'rdd');
  const {
    usersState: { users },
    getUser,
  } = useContext(UserDataContext);
  const [singleUser, setSingleUser] = useState({});

  console.log(singleUser);

  // const findUserById = useCallback((users, userId) => {
  //   return users?.users?.find(user => user.id === parseInt(userId, 10));
  // }, []);

  // const user = useMemo(() => findUserById(users, id), [findUserById, users, id]);

  // if(!user) {

  // }

  // const getuserById = async () => {
  //   try {
  //     const userById = users?.users?.find(
  //       (user) => user.id === parseInt(id, 10)
  //     );
  //     if (!userById) {
  //       const product = await getUser(id);
  //       setSingleUser(product?.user);
  //     } else {
  //       setSingleUser(userById);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  // useEffect(() => {
  //   getuserById();
  // }, [id]);

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  // for calendar
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const [events, setEvents] = useState([
    {
      title: 'Event 1',
      start: new Date(2024, 0, 17, 10, 0),
      end: new Date(2024, 0, 17, 12, 0),
    },
  ]);
  useEffect(() => {
    console.log('events', events);
  }, [events]);
  const [newtask, setNewTask] = useState('');
  const [newtaskStartDate, setnewtaskStartDate] = useState('');
  const [newtaskEndDate, setnewtaskEndDate] = useState('');
  const handleSelect = ({ start, end }) => {
    setOpen(true);
    setnewtaskStartDate(start);
    setnewtaskEndDate(end);
    setNewTask('');
  };

  const handleSave = () => {
    setOpen(false);

    if (newtask) {
      const newEvent = {
        title: newtask,
        start: newtaskStartDate,
        end: newtaskEndDate,
      };
      setEvents([...events, newEvent]);
      setNewTask('');
    }
  };
  // ----
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  // full screen
  const [expand, setExpand] = useState(false);

  // let [customFormField, setCustomFormField] = useState();

  // useEffect(() => {
  //   axios
  //     .get(`https://atbtmain.teksacademy.com/user/list/${id}`)
  //     .then((response) => {
  //       // Handle the successful response
  //       console.log('response', response.data.user.customFieldsData);
  //       setCustomFormField(response.data.user.customFieldsData);
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
  return (
    <div className='container p-4 bg-[#f8fafc]'>
      <div className='flex justify-between my-2'>
        <p className='text-xl font-semibold'>User Landing Page</p>
        <div className='flex justify-end gap-3 '>
          <Link to='/users'>
            <button
              type='submit'
              className='create-btn px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1'
            >
              Back
            </button>
          </Link>
        </div>
      </div>
      <div className=''>
        <div className='flex overflow-auto'>
          <div
            className={`cursor-pointer px-1 py-1 text-md font-semibold  ${
              activeTab === 1 ? 'border-b-2 border-orange-600 text-black' : ''
            }`}
            onClick={() => handleTabClick(1)}
          >
            Overview
          </div>

          <div
            className={`cursor-pointer px-5 py-1 text-md font-semibold  ${
              activeTab === 2 ? 'border-b-2 border-orange-600 text-black' : ''
            }`}
            onClick={() => handleTabClick(2)}
          >
            List
          </div>
          <div
            className={`cursor-pointer px-5 py-1 text-md font-semibold  ${
              activeTab === 3 ? 'border-b-2 border-orange-600 text-black' : ''
            }`}
            onClick={() => handleTabClick(3)}
          >
            Calendar
          </div>
          <div
            className={`cursor-pointer px-5 py-1 text-md font-semibold ${
              activeTab === 4 ? 'border-b-2 border-orange-600 text-black' : ''
            }`}
            onClick={() => handleTabClick(4)}
          >
            Dashboard
          </div>
          <div
            className={`cursor-pointer px-5 py-1 text-md font-semibold  ${
              activeTab === 5 ? 'border-b-2 border-orange-600 text-black' : ''
            }`}
            onClick={() => handleTabClick(5)}
          >
            Messages
          </div>
          <div
            className={`cursor-pointer px-5 py-1 text-md font-semibold  ${
              activeTab === 6 ? 'border-b-2 border-orange-600 text-black' : ''
            }`}
            onClick={() => handleTabClick(6)}
          >
            Attachments
          </div>
        </div>
        <hr />
      </div>
      {activeTab === 1 && (
        <div className='mt-4 flex justify-center '>
          <div className='h-[500px] lg:w-3/6 shadow-md p-5 border-2 rounded-md bg-[#f8fafc]'>
            {customFormField &&
              customFormField.length > 0 &&
              customFormField.map((item) => (
                <div className='relative'>
                  {/* predefined fields */}
                  {item.type === 'text' &&
                    item.inputname == 'name' &&
                    item.field === 'predefined' && (
                      <div className='absolute left-36 top-10'>
                        {item.value ? (
                          <p className='text-2xl'>
                            {' '}
                            {item.value.toUpperCase()}
                          </p>
                        ) : (
                          <p className='text-2xl text-gray-400'> USER NAME</p>
                        )}
                      </div>
                    )}

                  {item.type === 'file' &&
                    item.inputname == 'image' &&
                    item.field === 'predefined' && (
                      <div className=' border-y-2 border-e-2 border-gray-200'>
                        {item.value ? (
                          <img
                            src={item.value}
                            name='EntityPhoto'
                            alt='Selected User Photo'
                            className='w-32 h-32 rounded-sm aspect-[1/1] object-cover'
                          />
                        ) : (
                          <img
                            className='w-32 h-32 rounded-sm aspect-[1/1] object-cover'
                            src={defprop}
                            alt='Neil image'
                          />
                          // <img
                          //   src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          //   alt="Default User Photo"
                          //   className="rounded-full w-12 h-12 mr-4"
                          // />
                        )}
                      </div>
                    )}

                  <div className='flex justify-between flex-wrap  '>
                    <span>
                      {item.type === 'email' &&
                        item.inputname == 'email' &&
                        item.field == 'predefined' && (
                          <div className='absolute mt-5 ms-3 '>
                            {item.value ? (
                              <p className='flex gap-2'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke-width='1.5'
                                  stroke='currentColor'
                                  class='w-7 h-7 '
                                >
                                  <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
                                  />
                                </svg>
                                <span className='text-lg'> {item.value}</span>
                              </p>
                            ) : (
                              <p className='flex gap-2'>
                                {' '}
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke-width='1.5'
                                  stroke='currentColor'
                                  class='w-7 h-7 '
                                >
                                  <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
                                  />
                                </svg>
                                <span className='text-lg  text-gray-400'>
                                  Eg : abcd@gmail.com{' '}
                                </span>
                              </p>
                            )}
                          </div>
                        )}
                    </span>

                    <span className='mt-2 me-3'>
                      {item.type === 'number' &&
                        item.inputname == 'phonenumber' &&
                        item.field == 'predefined' && (
                          <div className=''>
                            {item.value ? (
                              <p className='flex gap-2'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke-width='1.5'
                                  stroke='currentColor'
                                  class='w-7 h-7 '
                                >
                                  <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z'
                                  />
                                </svg>
                                <span className='text-lg mt-1 '>
                                  {' '}
                                  {item.value}{' '}
                                </span>
                              </p>
                            ) : (
                              <p className='flex gap-2'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke-width='1.5'
                                  stroke='currentColor'
                                  class='w-7 h-7 '
                                >
                                  <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z'
                                  />
                                </svg>
                                <span className='text-lg  text-gray-400'>
                                  {' '}
                                  123 456 7890{' '}
                                </span>
                              </p>
                            )}
                          </div>
                        )}
                    </span>
                  </div>
                  <div></div>

                  <div className='flex justify-between flex-wrap mt-2  '>
                    <div>
                      {item.type === 'select' &&
                        item.inputname == 'entityname' &&
                        item.field == 'predefined' && (
                          <div className=' absolute mt-4 ms-3'>
                            {item.value ? (
                              <p className='flex gap-2'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke-width='1.5'
                                  stroke='currentColor'
                                  class='w-7 h-7'
                                >
                                  <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    d='M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25'
                                  />
                                </svg>
                                <span className='text-lg  '>
                                  {' '}
                                  {item.value}{' '}
                                </span>
                              </p>
                            ) : (
                              <p className='flex gap-2'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke-width='1.5'
                                  stroke='currentColor'
                                  class='w-7 h-7'
                                >
                                  <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    d='M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25'
                                  />
                                </svg>
                                <span className='text-lg  text-gray-400'>
                                  {' '}
                                  Eg : Infoz IT
                                </span>
                              </p>
                            )}
                          </div>
                        )}
                    </div>
                    <div>
                      {item.type === 'select' &&
                        item.inputname == 'designation' &&
                        item.field == 'predefined' && (
                          <div className='me-3'>
                            {item.value ? (
                              <p className='flex gap-2'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke-width='1.5'
                                  stroke='currentColor'
                                  class='w-7 h-7'
                                >
                                  <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                                  />
                                </svg>
                                <span className='text-lg  '>
                                  {' '}
                                  {item.value}{' '}
                                </span>
                              </p>
                            ) : (
                              <p className='flex gap-2'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke-width='1.5'
                                  stroke='currentColor'
                                  class='w-7 h-7'
                                >
                                  <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                                  />
                                </svg>
                                <span className='text-lg  text-gray-400'>
                                  {' '}
                                  Eg : Development
                                </span>
                              </p>
                            )}
                          </div>
                        )}
                    </div>
                  </div>

                  {/* {item.type === 'email' && item.inputname == "email" && item.field == "predefined" && (
                         <div className=''>
                           {item.value ? (
                             <p> {item.value}</p>
                           ) : (
                             <p> email id</p>
                           )}
     
                         </div>
                       )}
                       {item.type === 'number' && item.inputname == "phonenumber" && item.field == "predefined" && (
                         <div className=''>
                           {item.value ? (
                             <p> {item.value}</p>
                           ) : (
                             <p> Phone number</p>
                           )}
     
                         </div>
                       )} */}
                  {/* 
                       {item.type === 'select' && item.inputname == "designation" && item.field == "predefined" && (
                         <div className=''>
                           {item.value ? (
                             <p> {item.value}</p>
                           ) : (
                             <p> user Designation</p>
                           )}
     
                         </div>
                       )} */}
                  {/* {item.type === 'select' && item.inputname == "role" && item.field == "predefined" && (
                         <div className=''>
                           {item.value ? (
                             <p> {item.value}</p>
                           ) : (
                             <p> roles</p>
                           )}
     
                         </div>
                       )} */}

                  {/* custom fields */}
                  {item.type === 'text' && item.field == 'custom' && (
                    <div>{item.value}</div>
                  )}
                  {item.type === 'email' && item.field == 'custom' && (
                    <div>{item.value}</div>
                  )}
                  {item.type === 'password' && item.field == 'custom' && (
                    <div>{item.value}</div>
                  )}
                  {item.type === 'number' && item.field == 'custom' && (
                    <div>{item.value}</div>
                  )}
                  {item.type === 'textarea' && item.field == 'custom' && (
                    <div>{item.value}</div>
                  )}
                  {item.type === 'file' && item.field == 'custom' && (
                    <div className='flex gap-4'>
                      <div className='group h-10 '>
                        {/* <spna>{item.label}</spna> */}
                        {item.value ? (
                          <img
                            src={item.value}
                            name='EntityPhoto'
                            alt='Selected User Photo'
                            className='rounded-lg w-10 h-10 mr-4'
                          />
                        ) : (
                          <img
                            className='w-10 h-10 rounded-lg '
                            src={defprop}
                            alt='Neil image'
                          />
                          // <img
                          //   src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          //   alt="Default User Photo"
                          //   className="rounded-full w-12 h-12 mr-4"
                          // />
                        )}
                      </div>

                      {/* <p className="text-lg font-black text-gray-800 mt-2">{ }</p> */}
                      <hr className='my-3' />
                    </div>
                  )}
                  {item.type === 'date' && item.field == 'custom' && (
                    <div>{item.value}</div>
                  )}
                  {item.type === 'select' && item.field == 'custom' && (
                    <div>{item.value}</div>
                  )}

                  {/* multiselect incomplte */}
                  {item.type === 'multiselect' && item.field == 'custom' && (
                    <div>{item.value}</div>
                  )}
                  {item.type === 'checkbox' && item.field == 'custom' && (
                    <div>{item.value}</div>
                  )}
                  {item.type === 'range' && item.field == 'custom' && (
                    <div>{item.value}</div>
                  )}
                  {item.type === 'time' && item.field == 'custom' && (
                    <div>{item.value}</div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className=''>
          <div className='flex justify-end my-2'>
            <Menu
              as='div'
              className='relative inline-block ms-3 mt-1'
            >
              <div className=''>
                <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50'>
                  Filters
                  <ChevronDownIcon
                    className='-mr-1 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Account settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Support
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          License
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu
              as='div'
              className='relative inline-block ms-3 mt-1'
            >
              <div className=''>
                <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50'>
                  Sort
                  <ChevronDownIcon
                    className='-mr-1 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Start
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Due
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Assigned
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div>
              <button className=' ms-2 create-btn mt-1 inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  text-orange-foreground shadow hover:bg-orange/90 h-9 px-3 py-1 shrink-0 bg-orange-600 text-white gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='w-5 h-5 '
                >
                  <path d='M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z' />
                </svg>
                Add Task
              </button>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse border border-slate-200 mt-1 table-auto'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='py-2 text-sm text-white bg-orange-600  border-collapse border border-[#e5e7eb] '
                  >
                    Task Name
                  </th>
                  <th
                    scope='col'
                    className='py-2 text-sm text-white bg-orange-600  border-collapse border border-[#e5e7eb] '
                  >
                    Assignee
                  </th>
                  <th
                    scope='col'
                    className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb]'
                  >
                    Due Date
                  </th>
                  <th
                    scope='col'
                    className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb]'
                  >
                    Board Meeting
                  </th>
                  <th
                    scope='col'
                    className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb] '
                  >
                    Status
                  </th>
                  <th
                    scope='col'
                    className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb] '
                  >
                    Created by Admin
                  </th>
                  <th
                    scope='col'
                    className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb] '
                  >
                    Updated by Admin{' '}
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                <tr className='text-center text-gray-500'>
                  <td
                    scope='col'
                    onClick={toggleDrawer}
                    className='flex justify-between py-2 text-sm border-collapse border border-[#e5e7eb]'
                  >
                    <div className='flex'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        className='w-5 h-5 ms-2'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                        />
                      </svg>
                      <span className='text-sm ms-2'>Draft task brief</span>
                    </div>
                    <div className=''>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-5 h-5 text-end'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </td>
                  <td
                    scope='col'
                    className='py-2 text-sm border-collapse border border-[#e5e7eb]'
                  >
                    Assignee
                  </td>
                  <td
                    scope='col'
                    className='py-2 text-sm border-collapse border border-[#e5e7eb]'
                  >
                    Due Date
                  </td>
                  <td
                    scope='col'
                    className='py-2 text-sm border-collapse border border-[#e5e7eb]'
                  >
                    Board Meeting
                  </td>
                  <td
                    scope='col'
                    className='py-2 text-sm border-collapse border border-[#e5e7eb] '
                  >
                    Status
                  </td>
                  <td
                    scope='col'
                    className='py-2 text-sm border-collapse border border-[#e5e7eb] '
                  >
                    Created by Admin{' '}
                  </td>
                  <td
                    scope='col'
                    className='py-2 text-sm border-collapse border border-[#e5e7eb] '
                  >
                    Updated by Admin{' '}
                  </td>
                </tr>
                <div
                  className={`fixed inset-0 transition-all duration-500 bg-gray-800 bg-opacity-50 z-50 ${
                    isOpen ? '' : 'hidden'
                  }`}
                >
                  <div
                    className={`${
                      expand ? 'w-5/6' : 'w-1/2'
                    } p-3 fixed inset-y-0 right-0 w-1/2 bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out`}
                  >
                    <div className='flex justify-start'>
                      <div className='relative inline-block ms-2'>
                        <select className='block appearance-none w-full bg-white text-sm border border-gray-300 hover:border-gray-300 px-1 py-1.5 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                          <option value='option1'>Select Status</option>
                          <option value='option2'>Complete</option>
                          <option value='option3'>Inprogress</option>
                          <option value='option4'>To Do</option>
                        </select>
                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                          <svg
                            className='fill-current h-4 w-4'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                          >
                            <path d='M7 7l3-3 3 3m0 6l-3 3-3-3'></path>
                          </svg>
                        </div>
                      </div>
                      <div className='absolute top-4 right-4 flex flex-row'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke-width='1.5'
                          stroke='currentColor'
                          className='w-5 h-5 me-4 text-gray-500'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
                          />
                        </svg>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='me-4 w-5 h-5 text-gray-500'
                        >
                          <path
                            fill-rule='evenodd'
                            d='M18.97 3.659a2.25 2.25 0 0 0-3.182 0l-10.94 10.94a3.75 3.75 0 1 0 5.304 5.303l7.693-7.693a.75.75 0 0 1 1.06 1.06l-7.693 7.693a5.25 5.25 0 1 1-7.424-7.424l10.939-10.94a3.75 3.75 0 1 1 5.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 0 1 5.91 15.66l7.81-7.81a.75.75 0 0 1 1.061 1.06l-7.81 7.81a.75.75 0 0 0 1.054 1.068L18.97 6.84a2.25 2.25 0 0 0 0-3.182Z'
                            clip-rule='evenodd'
                          />
                        </svg>
                        <svg
                          onClick={() => setExpand((e) => !e)}
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='w-5 h-5 me-4 text-gray-500'
                        >
                          <path
                            fillRule='evenodd'
                            d='M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <button
                          onClick={toggleDrawer}
                          className=''
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='w-5 h-5 text-gray-500'
                          >
                            <path
                              fillRule='evenodd'
                              d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className='mt-5 ms-3'>
                      <p className='text-xl font-semibold'>Bhavitha</p>
                      <div className='mt-5 flex flex-row'>
                        <p className='basis-1/4 text-sm text-gray-600'>
                          Assignee
                        </p>
                        <p className='basis-1/2 text-sm  flex flex-row'>
                          {' '}
                          <p className='bg-yellow-500 text-black py-1.5 w-8 h-8  rounded-full'>
                            <span className='flex justify-center text-gray-800 text-sm'>
                              BA
                            </span>
                          </p>
                          <span className='ms-2 mt-1 text-sm'>
                            {' '}
                            Bhavitha Agrawal
                          </span>
                        </p>
                      </div>
                      <div className='mt-5 flex flex-row'>
                        <p className='basis-1/4 text-sm text-gray-600'>
                          Due Date
                        </p>
                        <p className='basis-1/2 text-sm'>24/1/2024</p>
                      </div>
                      <div className='mt-5 flex flex-row'>
                        <p className='basis-1/4 text-sm text-gray-600'>
                          Entity
                        </p>
                        <p className='basis-1/2 text-sm'>Entity Text</p>
                      </div>
                      <div className='mt-5 flex flex-row'>
                        <p className='basis-1/4 text-sm text-gray-600'>
                          Board Meeting
                        </p>
                        <p className='basis-1/2 text-sm'>Board Meeting Text</p>
                      </div>
                      <div className='mt-5 flex flex-row'>
                        <p className='basis-1/4 text-sm text-gray-600  mt-1'>
                          Priority
                        </p>
                        <p className='basis-1/2'>
                          <div className='relative inline-block'>
                            <select className='block appearance-none w-full bg-white border text-sm border-gray-300 hover:border-gray-300 px-1 py-1.5 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                              <option value='option1'>Select Priority</option>
                              <option value='option2'>Low</option>
                              <option value='option3'>Medium</option>
                              <option value='option4'>High</option>
                            </select>
                            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                              <svg
                                className='fill-current h-4 w-4'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                              >
                                <path d='M7 7l3-3 3 3m0 6l-3 3-3-3'></path>
                              </svg>
                            </div>
                          </div>
                        </p>
                      </div>
                      <div className='mt-5 flex flex-row'>
                        <p className='basis-1/4 text-sm text-gray-600'>
                          Description
                        </p>
                        <p className='basis-1/2'></p>
                      </div>
                      <div className='mt-5'>
                        <textarea
                          placeholder='What is this task about ?'
                          className='p-3 text-sm resize-none shadow-sm rounded-md w-full h-32 focus:outline-none focus:border-orange-400'
                        ></textarea>
                      </div>
                      <div className='flex mt-5'>
                        <div className='me-2'>
                          <p className='bg-yellow-500 text-black py-1.5 w-8 h-8  rounded-full'>
                            <span className='flex justify-center text-gray-800 text-sm'>
                              BA
                            </span>
                          </p>
                        </div>
                        <div className='flex-1 w-86'>
                          <textarea
                            placeholder='Add a comment'
                            className='p-2 border-2 text-sm resize-none shadow-sm rounded-md w-full h-24 focus:outline-none focus:border-orange-400'
                          ></textarea>
                          <div className='me-2 flex flex-row'>
                            <p className='text-sm mt-1'>Collaborators</p>
                            <p className='ms-2 bg-yellow-500 text-black py-1.5 w-8 h-8 rounded-full'>
                              <span className='flex justify-center text-gray-800 text-sm'>
                                BA
                              </span>
                            </p>
                            <p className='ms-2 bg-white border-dashed border-2 border-gray-600 text-gray-600  py-1 w-7 h-7 rounded-full'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke-width='1.5'
                                stroke='currentColor'
                                className='ms-1 w-4 h-4'
                              >
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                                />
                              </svg>
                            </p>
                            <p className='ms-2 bg-white border-dashed border-2 border-gray-600 text-gray-600  py-1 w-7 h-7 rounded-full'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke-width='1.5'
                                stroke='currentColor'
                                className='ms-1 w-4 h-4'
                              >
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                                />
                              </svg>
                            </p>
                            <p>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-4 h-4 mt-2 ms-2'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M12 4.5v15m7.5-7.5h-15'
                                />
                              </svg>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <tr className='text-center text-gray-500'>
                  <td className='py-2 border-slate-200 flex justify-start ms-4 text-sm'>
                    <input
                      className='w-full bg-gray-50 border-none focus:outline-none'
                      type='text'
                      placeholder='Add Task ..'
                    />
                  </td>
                  <td
                    className='border text-sm'
                    colspan='7'
                  ></td>
                </tr>
              </tbody>
            </table>

            <div></div>
          </div>
        </div>
      )}
      {activeTab === 3 && (
        <div className='mt-4'>
          <div>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor='start'
              endAccessor='end'
              style={{ height: 500 }}
              selectable
              onSelectSlot={handleSelect}
            />

            <Transition.Root
              show={open}
              as={Fragment}
            >
              <Dialog
                as='div'
                className='relative z-10'
                initialFocus={cancelButtonRef}
                onClose={setOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                  <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-out duration-300'
                      enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                      enterTo='opacity-100 translate-y-0 sm:scale-100'
                      leave='ease-in duration-200'
                      leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                      leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                      <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                        <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                          <div className='sm:flex sm:items-start'>
                            <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-600 sm:mx-0 sm:h-10 sm:w-10'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className='w-5 h-5 text-white'
                              >
                                <path d='M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z' />
                              </svg>
                            </div>
                            <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                              <Dialog.Title
                                as='h3'
                                className='text-base font-semibold leading-6 text-gray-900'
                              >
                                Create New Task
                              </Dialog.Title>
                              <div className='mt-2'>
                                <input
                                  placeholder='Enter Task Here'
                                  className='focus:outline-none ps-1 border-b-2 border-gray-200'
                                  onChange={(e) => setNewTask(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2'>
                          <button
                            type='button'
                            className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                          <button
                            type='button'
                            className='inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm  text-white shadow-sm  sm:ml-3 sm:w-auto'
                            onClick={handleSave}
                          >
                            Save
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </div>
        </div>
      )}
      {activeTab === 4 && <div className='mt-4'>Dashboard</div>}
      {activeTab === 5 && (
        <div className='mt-4'>
          Messages
          {/* <div className='flex flex-col '>
          <div className='flex justify-center'>
            <div className='flex flex-start rounded-md border-2 border-gray-200 px-3 py-2'>
              <img className="w-8 h-8 rounded-full mx-3 my-3" src={defprop} alt="Neil image" />
              <div className='mt-2 mr-2'>
                <input className='px-2 py-2 w-96 focus:outline-none bg-[#f8fafc] rounded-md border-2 border-gray-200 ' type='text' placeholder='Enter Your Message' />
              </div>
              <div className=''> <button className='mt-4 text-lg'> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
              </svg>
              </button></div>
            </div>
          </div>
        </div> */}
        </div>
      )}
      {activeTab === 6 && <div className='mt-4'>Attachments</div>}
    </div>
  );
};

export default UserLandingPage;

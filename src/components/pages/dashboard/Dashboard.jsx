
import React from 'react';
import './Dashboard.css';
import { getDate } from '../../../utils/utils';
import UserDashboard from './userDashboard/UserDashboard';
import EntityDashboard from './entityDashboard/EntityDashboard';
import BoardMeetingDashboard from './BoardMettingDashboard/BoardMeetingDashboard';
import TeamsDashboard from './TeamsDashboard/TeamsDashboard';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Dashboard() {
  const localStorageData = JSON.parse(localStorage.getItem("data"));
  return (
    <div className="container p-2 bg-[#f8fafc] ">
      <h1 className='lg:m-2 font-semibold sm:text-xs md:text-base lg:text-lg xl:text-xl'>Home</h1>
      <div className='text-center'>
        <h6 className="text-sm date_time">{getDate()}</h6>
        <h4 className=" text-2xl font-normal dark:text-white welcome_user">Welcome {localStorageData?.user?.userName ?? "user"}</h4>
        <div className='flex flex-wrap mt-2 justify-center'>
          <div className="tota_tasks border-r-2 border-black-100 bg-gray-100 p-2 rounded-s-full">
            <p className='mr-4 ml-4 px-2 pt-1 text-xs text-[#929297]'>Total Tasks</p>
            <p className='mr-4 ml-4 px-2 font-semibold'>0</p>
          </div>
          <div className=" completed_tasks border-r-2 border-black-100 bg-gray-100 p-2">
            <p className='mr-4 ml-4 px-2 pt-1 text-xs text-[#929297]'>Completed Tasks</p>
            <p className='mr-4 ml-4 px-2 font-semibold'>0</p>
          </div>
          <div className=" upcoming_tasks border-r-2 border-black-100 bg-gray-100 p-2">
            <p className='mr-4 lg:ml-4 px-2 pt-1 text-xs text-[#929297]'>Upcoming Tasks</p>
            <p className='mr-4 lg:ml-4 px-2 font-semibold'>0</p>
          </div>
          <div className=" overdue_tasks border-black-100 bg-gray-100 p-2 rounded-e-full">
            <p className='mr-4 lg:ml-4 px-2 pt-1 text-xs text-[#929297]'>Overdue Tasks</p>
            <p className='mr-4 lg:ml-4 px-2 font-semibold'>0</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-col-2 gap-10 px-7 dashboard-main'>
          <EntityDashboard />
          <UserDashboard />


        </div>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-col-2 gap-10 px-7 dashboard-main mt-4'>

          <BoardMeetingDashboard />
          <TeamsDashboard />
        </div>
      </div>
    </div>
  );

}

export default Dashboard;

import React, { useState } from 'react';
import defprop from '../../../Images/defprof.svg';
import { Link } from 'react-router-dom'

function BoardMeetingForm() {
  //  for binding data
  const [boardMeetingForm, setBoardMeetingForm] = useState({
    boardMeetingName: "",
    boardMeetingAddress: "",
    boardMeetingDate: "",
    boardMeetingTime: "",
    boardMeetingVenue: "",
    boardMeetingDescription: "",
    boardMeetingMembers: ""
  });

  const handleBoardMeetingData = (e) => {
    const { name, value } = e.target;
    setBoardMeetingForm((e) => ({
      ...e, [name]: value
    }))

  }

  return (

    <div className='container p-3 bg-[#f8fafc] '>
      <p className="text-lg font-semibold">Board Meeting</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4  mt-4">
        <div className="col-span-1 ps-5 pe-8">
          <form className="space-y-3 " method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Name</label>
              <div className="">
                <input id="name" name="boardMeetingName" value={boardMeetingForm.boardMeetingName} onChange={handleBoardMeetingData} type="text" autoComplete="name" required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
              </div>
            </div>
            <div className="max-w-md mx-auto flex gap-2">
              <span className='flex-1 '>
                <label for="datepicker" className="block text-sm my-1  font-medium text-gray-700">Select a Date:</label>
                <input type="date" id="datepicker" name="boardMeetingDate" value={boardMeetingForm.boardMeetingDate} onChange={handleBoardMeetingData} className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
              </span>
              <span className='flex-1 '>
                <label for="timepicker" className="block text-sm my-1  font-medium text-gray-700">Select a Time:</label>
                <input type="time" id="timepicker" name="boardMeetingTime" value={boardMeetingForm.boardMeetingTime} onChange={handleBoardMeetingData} className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
              </span>
            </div>

            <div>
              <label htmlFor="venue" className="block text-sm my-2  font-medium text-gray-700">Venue</label>
              <div className="relative inline-block text-left w-full">
                <select className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
                  <option value="selected" className="hover:bg-orange-600">Select Venue</option>
                  <option value="hi-teccity">Hi-Tec City</option>
                  <option value="gachibowli">Gachibowli</option>
                  <option value="miyapur">Miyapur</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="name" className=" block text-sm my-2 font-medium  text-gray-900" >Description</label>
              <div className=''>
                <textarea name='boardMeetingDescription' value={boardMeetingForm.boardMeetingDescription} onChange={handleBoardMeetingData} className="resize-none bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400"></textarea>
              </div>
            </div>
            <div className='relative'>
              <label htmlFor="email" className="block text-sm my-2 font-medium leading-6 text-gray-900">Add Member(Entity/Team/User)</label>
              <div className='border border-1 flex flex-wrap gap-1 px-1 py-1 selected-users-container relative z-50 rounded-md'>
                <span className='flex gap-1 text-xs mt-1 border-2 border-gray-200 rounded-md p-0.5 focus:border-orange-600
                    '>
                  dfgfdgf
                </span>
                <input
                  type="text"
                  tabindex="0" aria-describedby="lui_5891" aria-invalid="false"
                  style={{ border: "none" }}
                  className='bg-[#f8fafc] w-20 h-5 mt-1 focus:outline-none z-40'
                />
              </div>
            </div>
            {/* 
            <div>
              <label htmlFor="venue" className="block text-sm my-2  font-medium text-gray-700">Members(Entity/Team/User)</label>
              <div className="relative inline-block text-left w-full">
                <select className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6
               " >
                  <option value="selected" className="hover:bg-orange-600">Entity/Team/User</option>
                  <option value="infoz" className="hover:bg-orange-600">Infoz</option>
                  <option value="bhavitha">Bhavitha</option>
                  <option value="development">Development</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div> */}
            <div className=''>
              <button type="submit"
                className="mt-6 flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Create Board Meeting</button>
            </div>
          </form>
        </div>
        <div className="col-span-2 h-[500px] overflow-auto shadow-md px-6 py-4 border-2 rounded-md bg-[#f8fafc]  ">
          <div className='mb-5 mt-3'>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 gap-4">
              {/* <div className="group h-10 ">
                <img className="w-10 h-10 rounded-lg " src={defprop} alt="Neil image" />
              </div> */}
              <div className='col-span-2 '>
                <p className="text-lg font-black text-gray-800 ">{boardMeetingForm.boardMeetingName}</p>
                <p className='text-xs  text-gray-500'><span className='text-xs font-semi-bold text-gray-700'> Address:</span> Pista House Opposite, secunderabad , HYD</p>
              </div>
              <div className='col-span-1 text-end'>
                <p className='text-xs text-gray-60 '>Date : {boardMeetingForm.boardMeetingDate}</p>
                <p className='text-xs text-gray-60 my-1'>Time : {boardMeetingForm.boardMeetingTime}</p>
              </div>
            </div>
            <hr className='my-3' />
            <div className='h-20 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full  '>
              {/* <textarea className="resize-none h-20 border border-1 border-gray-200 focus:outline-none "> */}
              {boardMeetingForm.boardMeetingDescription}
              {/* </textarea> */}
            </div>


            <p className='text-md font-semibold my-3' > Members</p>

            <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-5'>
              <div className='col-span-1 flex justify-start gap-3'>
                <h5 className=' rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>


                </h5>
                <div className=' flex items-center'>

                </div>


                <h5 className='bg-[#e5e7eb] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>

                </h5>
                <div className=' flex items-center'>
                  <div className=' rounded-md  bg-[#e5e7eb] h-2 w-28'> </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default BoardMeetingForm;

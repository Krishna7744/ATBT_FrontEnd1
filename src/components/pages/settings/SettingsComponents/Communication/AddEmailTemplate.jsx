import React from 'react';
import { Link } from 'react-router-dom';

const AddEmailTemplate = () => {
  return (
    <div className='p-4'>
      <p className='text-lg font-semibold'>Add Email Template</p>
      <form className="space-y-6" method="POST">
        <div className=' grid grid-cols-2 gap-4 mt-3'>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Template Name :</label>
            <div className="mt-2">
              <input id="text" name="text" value='' type="text" autoComplete="email" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <label htmlFor="subject" className="text-sm font-medium text-gray-900 mr-2">Subject :</label>
            <div className='mt-2'>
              <input
                id="subject"
                name="subject"
                value=""
                type="text"
                autoComplete="subject"
                required
                className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="variables" className="text-sm font-medium text-gray-900 mr-2">Insert Variables :</label>
            <div className="relative">
              <select class="mt-2 p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6">
                <option value="option1">Select Insert Variables</option>
                <option value="option2">Complete</option>
                <option value="option3">Inprogress</option>
                <option value="option4">To Do</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M7 7l3-3 3 3m0 6l-3 3-3-3"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <label htmlFor="name" className=" block text-sm my-2 font-medium leading-6 text-gray-900" >Description</label>
          <div className=''>
            <textarea name='Description' value=" " class="resize-none bg-gray-50 rounded-md text-sm p-2 w-full h-44 border-2 border-gray-200 focus:outline-none focus:border-orange-400"></textarea>
          </div>
        </div>
        <div className='flex justify-end'>
          <button type="submit"
            className="rounded-md bg-orange-600 px-8 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmailTemplate;

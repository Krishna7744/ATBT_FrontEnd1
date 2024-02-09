import React from 'react'
import { Link, Outlet } from 'react-router-dom'
const Whatsapp = () => {
  return (
    <div className='p-2'>
      <div className='flex justify-between my-2'>
        <p className='text-lg font-semibold'>Whatsapp</p>
        <button type="submit"
          className="rounded-md bg-orange-600 px-8 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"><Link to="/addwhatsapptemplate" className="text-sm"> Add Whatsapp Templates</Link></button>
      </div>
      <table className="w-full table-auto min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse border border-[#e5e7eb] rounded-md ">
        <thead className='sticky top-0'>
          <tr>
            <th scope="col" className="px-3 py-2 text-center text-sm  text-black border-collapse border border-[#e5e7eb] ">Id</th>
            <th scope="col" className="px-3 py-2 text-center text-sm  text-black  border-collapse border border-[#e5e7eb]">Template</th>
            <th scope="col" className="px-3 py-2 text-center text-sm  text-black  border-collapse border border-[#e5e7eb]">Template Type</th>
            <th scope="col" className="px-3 py-2 text-center text-sm  text-black border-collapse border border-[#e5e7eb] ">Document Type</th>
            <th scope="col" className="px-3 py-2 text-center text-sm  text-black  border-collapse border border-[#e5e7eb] ">Content</th>
            <th scope="col" className="px-3 py-2 text-center text-sm  text-black  border-collapse border border-[#e5e7eb] ">Active/Inactive</th>
            <th scope="col" className="px-3 py-2 text-center text-sm  text-black  border-collapse border border-[#e5e7eb] ">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr className="">
            <td className="px-3 py-3 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">530</td>
            <td className="px-3 py-3 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Kukatpally_Verified</td>
            <td className="px-3 py-3 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Media</td>
            <td className="px-3 py-3 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Image</td>
            <td className="px-3 py-3 whitespace-nowrap text-center text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb] relative">
              <div className="relative group">
                <div className="truncate text-xs">
                  In publishing before final copy is available Wikipedia...
                </div>
                <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute bg-gray-800 text-white p-2 rounded mt-2 ml-2 max-w-xs max-h-24 overflow-hidden transition-opacity duration-300">
                  In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                </div>
              </div>
            </td>
            <td className="px-3 py-3 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Active</td>
            <td className="px-3 py-3 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
              <Link to="/fieldswhatsapptemplate"><button type="submit"
                className="rounded-md bg-blue-600 px-8 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:blue-orange-600">
                Fields</button></Link>
              <button type="submit"
                className="ms-2 rounded-md bg-blue-600 px-8 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:blue-orange-600">
                <Link to="/editwhatsapptemplate">Edit</Link> </button>
              <button type="submit"
                className="ms-2 rounded-md bg-red-600 px-8 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                Deactivate</button>
            </td>
          </tr> </tbody>
      </table>
      {/*  */}

    </div>
  )
}

export default Whatsapp
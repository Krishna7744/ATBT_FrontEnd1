import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div className='container p-4 bg-[#f8fafc]'>
  <p className="text-xl font-semibold"> Settings</p>
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4  gap-4 mt-4">
  
   <Link  
    to="/organizationprofile">
      <div className='grid1-item  text-start'>
      <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
    <p className="text-white text-base">
    Organization Profile
    </p>
  </div>
      </div>
  
   </Link>

<Link to="/forms">
<div className='grid1-item  text-start'>
    <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
    <p className="text-white text-base">
     Forms
    </p>
  </div>
</div>
</Link>
<Link to="/communication">
<div className='grid1-item  text-start'>
    <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
    <p className="text-white text-base">
     Communication
    </p>
  </div>
</div>
</Link>
<Link to="/roles">
<div className='grid1-item  text-start'>
    <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
    <p className="text-white text-base">
     Roles
    </p>
  </div>
</div>
</Link>
<Link to="/integrations">
<div className='grid1-item  text-start'>
    <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
    <p className="text-white text-base">
    Integrations
    </p>
  </div>
</div>
</Link>
    </div>
    </div>
  )
}

export default Settings


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function Settings() {
//   const [activeTab, setActiveTab] = useState(1);

//   const handleTabClick = (tabNumber) => {
//     setActiveTab(tabNumber);
//   };
//   // choose photo adding
//   const [imageSrc, setImageSrc] = useState(null);
//   const [selectedFileName, setSelectedFileName] = useState('');

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageSrc(reader.result);
//         setSelectedFileName(file.name);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleChooseFileClick = () => {
//     document.getElementById('fileInput').click();
//   };
  

//   return (
//     <div className='container p-3 bg-[#f8fafc] '>
//       <div className="w-full">
//         <div className="flex justify-start">
//           <div
//             className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 1 ? 'border-b-4 border-orange-600  text-black' : ''
//               }`}
//             onClick={() => handleTabClick(1)}>Profile
//           </div>
//           <div
//             className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 2 ? 'border-b-4 border-orange-600 text-black' : ''
//               }`}
//             onClick={() => handleTabClick(2)}>Notifications
//           </div>
//           <div
//             className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 3 ? 'border-b-4 border-orange-600 text-black' : ''
//               }`}
//             onClick={() => handleTabClick(3)}>Email Forwarding
//           </div>
//           <div
//             className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 4 ? 'border-b-4 border-orange-600 text-black' : ''
//               }`}
//             onClick={() => handleTabClick(4)}>Account
//           </div>
//           <div
//             className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 5 ? 'border-b-4 border-orange-600 text-black' : ''
//               }`}
//             onClick={() => handleTabClick(5)}>Display
//           </div>
//           <div
//             className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 6 ? 'border-b-4 border-orange-600 text-black' : ''
//               }`}
//             onClick={() => handleTabClick(6)}>Apps
//           </div>
//           <div
//             className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 7 ? 'border-b-4 border-orange-600 text-black' : ''
//               }`}
//             onClick={() => handleTabClick(7)}>Hacks
//           </div>
//         </div>

//         {activeTab === 1 && <div className="mt-4">

//           <div className="flex items-center h-28">
//             <label htmlFor="fileInput" className="cursor-pointer">
//               <input
//                 type="file"
//                 id="fileInput"
//                 className="hidden"
//                 accept="image/*"
//                 onChange={handleFileChange}
//               />
//               <div className="group">
//                 {imageSrc ? (
//                   <img
//                     src={imageSrc}
//                     alt="Selected User Photo"
//                     className="rounded-full w-24 h-24 mr-4"
//                   />
//                 ) : (
//                   <img
//                     src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                     alt="Default User Photo"
//                     className="rounded-full w-24 h-24 mr-4"
//                   />
//                 )}
//                 <p className="text-sm whitespace-nowrap leading-loose">
//                   {selectedFileName && `${selectedFileName}`}
//                 </p>
//               </div>
//             </label>
//             <div className='ms-2'>
//               <button
//                 onClick={handleChooseFileClick}
//                 className="text-md leading-loose text-indigo-500 cursor-pointer"
//               >
//                 Upload your photo
//               </button>
//               <p className='text-sm whitespace-nowrap'>Photos help your teammates recognize you in InfozIT</p>

//             </div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
//             <div className='col-span-1'>
//               <form className="space-y-3 mt-4" method="POST">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
//                   <div className="mt-2">
//                     <input id="name" name="name" type="text" autoComplete="name" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
//                   </div>
//                 </div>
//                 <div>
//                   <label htmlFor="jobtitle" className="block text-sm font-medium leading-6 text-gray-900">Job Title</label>
//                   <div className="mt-2">
//                     <input id="jobtitle" name="jobtitle" type="text" autoComplete="name" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
//                   </div>
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
//                   <div className="mt-2">
//                     <input id="email" name="email" type="email" autoComplete="email" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
//                   </div>
//                 </div>
//                 <div className=''>
//                   <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">About Me</label>
//                   <div className='mt-2'>
//                     <textarea className="resize-none border rounded-md p-2 w-full h-32 border-1 border-gray-400 focus:outline-none focus:border-orange-400"></textarea>
//                   </div>
//                 </div>
//                 <div className="mt-2">
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input type="checkbox" value="" className="sr-only peer" />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:border-orange-600 dark:peer-focus:orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
//                     <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Set out of office</span>
//                   </label>
//                   <div>
//                     <p className='text-md font-semibold'>Invite Type</p>
//                     <p>Signed up on Jan 5, 2024</p>
//                   </div>
//                   <div>
//                     <button type="submit"
//                       className="mt-4 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Create</button>

//                   </div>
//                 </div>
//               </form>
//             </div>
//             <div className='col-span-1'>
//               <form className="space-y-3 mt-4" method="POST">
//                 <div>
//                   <label htmlFor="pronouns" className="block text-sm font-medium leading-6 text-gray-900">Pronouns</label>
//                   <div className="mt-2">
//                     <input id="pronouns" name="pronouns" type="text" autoComplete="pronouns" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
//                   </div>
//                 </div>
//                 <div className='mt-2'>
//                   <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">Department or Team</label>
//                   <div className="relative inline-block text-left w-full mt-2">
//                     <select className="block appearance-none p-3 w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6">
//                       <option value="option1">Department</option>
//                       <option value="option2">Team</option>
//                     </select>
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>}
//         {activeTab === 2 && <div className="mt-4">Content for Tab 2</div>}
//         {activeTab === 3 && <div className="mt-4">Content for Tab 3</div>}
//         {activeTab === 4 && <div className="mt-4">Content for Tab 4</div>}
//         {activeTab === 5 && <div className="mt-4">Content for Tab 4</div>}
//         {activeTab === 6 && <div className="mt-4">Content for Tab 4</div>}
//         {activeTab === 7 && <div className="mt-4">Content for Tab 4</div>}

//       </div>
//     </div >
//   );
// }


// export default Settings;

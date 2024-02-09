import React, { useEffect, useState } from 'react'

const AddRoles = () => {
  const [permission, setPermission] = useState(
    [{
      name: "user", all: false, create: false, read: false, update: false, delete: false, submenus: [{
        name: "create user", all: false, create: false, read: false, update: false, delete: false
      }, {
        name: "user details", all: false, create: false, read: false, update: false, delete: false
      }]
    },
    {
      name: "entity", all: false, create: false, read: false, update: false, delete: false, submenus: [{
        name: "create entity", all: false, create: false, read: false, update: false, delete: false
      }, {
        name: "entity details", all: false, create: false, read: false, update: false, delete: false

      }]
    },
    {
      name: "teams", all: false, create: false, read: false, update: false, delete: false, submenus: [{
        name: "create teams", all: false, create: false, read: false, update: false, delete: false
      }, {
        name: "teams details", all: false, create: false, read: false, update: false, delete: false

      }]
    },
    {
      name: "boardmeeting", all: false, create: false, read: false, update: false, delete: false, submenus: [{
        name: "create boardmeeting", all: false, create: false, read: false, update: false, delete: false
      }, {
        name: "boardmeeting details", all: false, create: false, read: false, update: false, delete: false

      }]
    },
    {
      name: "task", all: false, create: false, read: false, update: false, delete: false, submenus: [{
        name: "create task", all: false, create: false, read: false, update: false, delete: false
      }, {
        name: "task details", all: false, create: false, read: false, update: false, delete: false

      }, {
        name: "create subtask", all: false, create: false, read: false, update: false, delete: false

      }, {
        name: "subtask details", all: false, create: false, read: false, update: false, delete: false

      }]
    }
    ]
  )
  useEffect(() => {
    console.log("permissions", permission)
  })

  //    for toggle active and inactive
  const handletoggle = (name, index, subindex) => {
    if (subindex == undefined) {
      let updatePermission = [...permission]
      let previosvalue = updatePermission[index][name]
      updatePermission[index][name] = !previosvalue
      setPermission(updatePermission)
    }
    if (subindex != undefined) {
      let updatePermission = [...permission]
      let previosvalue = updatePermission[index].submenus[subindex][name]
      updatePermission[index].submenus[subindex][name] = !previosvalue
      setPermission(updatePermission)
    }

  }
  // for submenu opens
  const [selected, setSelected] = useState()
  const handleSubmenuOpen = (name) => {
    if (selected == name) {
      setSelected("")
    }
    if (selected != name) {
      setSelected(name)
    }
  }

  return (
    <div className=' p-3 bg-[#f8fafc] overflow-hidden'>
      <h1 className='font-semibold text-lg grid1-item'> Add Roles</h1>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-col-2 gap-2 mt-2'>
        <div className='grid1-item text-start w-96'>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Name</label>
            <div className="">
              <input id="name" name="boardMeetingName" type="text" autoComplete="name" required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
            </div>
          </div>
        </div>
        <div className='grid1-item text-start w-96'>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Description</label>
            <div className="">
              <input id="name" name="boardMeetingName" type="text" autoComplete="name" required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
            </div>
          </div>
        </div>
      </div>
      <p className='text-md my-3 font-semibold'>Permissions</p>
      <table className=" min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse border border-[#e5e7eb] rounded-md ">
        <thead className='sticky top-0 z-10'>
          <tr>
            <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600 border-collapse border border-[#e5e7eb] ">Name</th>
            <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600 border-collapse border border-[#e5e7eb]">All</th>
            <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600 border-collapse border border-[#e5e7eb]" colSpan={4}>Access</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 ">
          <tr>
            <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]"></td>
            <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > All</td>
            <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > Create</td>
            <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > Read</td>
            <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > Update</td>
            <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > Delete</td>
          </tr>
          {permission && permission.map((item, index) => {
            return (
              <>
                <tr key={item}>
                  <td className="px-6 flex justify-between py-2.5 whitespace-nowrap text-center  text-sm font-semibold  text-gray-800 border-collapse ">{item.name} <svg onClick={() => handleSubmenuOpen(item.name)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 mt-1">
                    <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                  </svg>

                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="all" value={item.all} className="sr-only peer" checked={item.all}
                        onChange={() => handletoggle("all", index)} />
                      <div className={`w-7 h-4  ${item.all ? "bg-orange-600" : "bg-slate-300"} peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}>

                      </div>

                    </label>
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value={item.create} className="sr-only peer" checked={item.create}
                        onChange={() => handletoggle("create", index)} />
                      <div className={`w-7 h-4  ${item.create ? "bg-orange-600" : "bg-slate-300"} peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}

                      ></div>

                    </label>
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value={item.read} className="sr-only peer" checked={item.read}
                        onChange={() => handletoggle("read", index)} />
                      <div className={`w-7 h-4  ${item.read ? "bg-orange-600" : "bg-slate-300"} peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}

                      ></div>

                    </label>
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value={item.update} className="sr-only peer" checked={item.update}
                        onChange={() => handletoggle("update", index)} />
                      <div className={`w-7 h-4  ${item.update ? "bg-orange-600" : "bg-slate-300"} peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}

                      ></div>

                    </label>
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value={item.delete} className="sr-only peer" checked={item.delete}
                        onChange={() => handletoggle("delete", index)} />
                      <div className={`w-7 h-4  ${item.delete ? "bg-orange-600" : "bg-slate-300"} peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}

                      ></div>

                    </label>
                  </td>
                </tr>
                {item.name == selected && item.submenus.length > 0 && item.submenus.map((subitem, subindex) => {
                  return (
                    <tr>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs   text-gray-800 border-collapse ">{subitem.name}

                      </td>
                      <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs   text-gray-800 border-collapse border border-[#e5e7eb]"> </td>
                      <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value={subitem.create} className="sr-only peer" checked={subitem.create} onChange={() => handletoggle("create", index, subindex)}
                          />
                          <div className={`w-7 h-4  ${subitem.create ? "bg-orange-600" : "bg-slate-300"} peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}

                          ></div>

                        </label>
                      </td>
                      <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value={subitem.read} className="sr-only peer" checked={subitem.read}
                            onChange={() => handletoggle("read", index, subindex)} />
                          <div className={`w-7 h-4  ${subitem.read ? "bg-orange-600" : "bg-slate-300"} peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}

                          ></div>

                        </label>
                      </td>
                      <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value={subitem.update} className="sr-only peer" checked={subitem.update} onChange={() => handletoggle("update", index, subindex)}
                          />
                          <div className={`w-7 h-4  ${subitem.update ? "bg-orange-600" : "bg-slate-300"} peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}

                          ></div>

                        </label>
                      </td>
                      <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value={subitem.delete} className="sr-only peer" checked={subitem.delete} onChange={() => handletoggle("delete", index, subindex)}
                          />
                          <div className={`w-7 h-4  ${subitem.delete ? "bg-orange-600" : "bg-slate-300"} peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}

                          ></div>

                        </label>
                      </td>
                    </tr>
                  )
                })}
              </>

            )

          })

          }
          {/* <div className={item.all ? "w-7 h-4 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600" : ""}

            ></div> */}
        </tbody>

      </table>






    </div>
  )
}

export default AddRoles
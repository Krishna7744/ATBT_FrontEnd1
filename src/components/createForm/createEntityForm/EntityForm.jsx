import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './EntityForm.css';

import defprop from '../../../Images/defprof.svg';
import useDebounce from '../../../hooks/debounce/useDebounce';
import { UserDataContext } from '../../../contexts/usersDataContext/usersDataContext';
import { EntitiesDataContext } from '../../../contexts/entitiesDataContext/entitiesDataContext';
function EntityForm() {
  const { usersState: { users, dashboard }, usersDispatch } = useContext(UserDataContext);
  const { createEntity } = useContext(EntitiesDataContext);
  const usersEmails = dashboard.paginatedUsers?.map(user => user.email);
  const { debouncedSetPage, debouncedSetSearch } = useDebounce(usersDispatch);
  const [errors, setErrors] = useState({})
  let [openOptions, setopenOptions] = useState("")
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  let [customFormFields, setCustomFormFields] = useState()
  const handleInputChange = (e) => {
    setShowUsers(true)
    const value = e.target.value;
    setSearchTerm(() => {
      debouncedSetSearch(value);
      return value;
    });
  };
  const handleOpenOptions = (name) => {
    if (openOptions == name) {
      setopenOptions("")
    }
    if (openOptions != name) {
      setopenOptions(name)
    }
  }
  const handleClick = (value, index) => {
    setSelected((e) => [...e, value])
    const updatedFormData = [...customFormFields];
    let members = updatedFormData[index].value
    members.push(value)
    updatedFormData[index].value = members
    setCustomFormFields(updatedFormData);
    setSearchTerm('');
    setShowUsers(false);
  };

  const handleRemove = (user, index) => {
    const updatedSelected = selected.filter((selectedUser) => selectedUser !== user);
    setSelected(updatedSelected);
    const updatedMembers = customFormFields[index].value.filter((selectedUser) => selectedUser !== user);
    const updatedFormData = [...customFormFields];
    updatedFormData[index].value = updatedMembers;
    setCustomFormFields(updatedFormData);
  };

  useEffect(() => {
    axios.get(`https://atbtmain.teksacademy.com/form/list?name=entityform`)
      .then(response => {
        // Handle the successful response
        setCustomFormFields(response.data.array)
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  }, [])
  const handleChange = (index, newValue) => {

    const updatedFormData = [...customFormFields];
    if (updatedFormData[index].type != "multiselect") {
      updatedFormData[index].value = newValue;
      setCustomFormFields(updatedFormData);
    }
    if (updatedFormData[index].type == "multiselect") {
      // { item.value.includes(option) }
      let selectedoptions = updatedFormData[index].value;
      if (selectedoptions.includes(newValue)) {
        selectedoptions = selectedoptions.filter((option) => option != newValue)
      }
      else {
        selectedoptions.push(newValue);

      }
      updatedFormData[index].value = selectedoptions;
      setCustomFormFields(updatedFormData);

    }

  };
  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const name = event.target.name;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedFormData = [...customFormFields];
        updatedFormData[index].value = reader.result;
        setCustomFormFields(updatedFormData);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log("customFormFields", customFormFields)
  function handleFormSubmit(e) {
    e.preventDefault();

    for (let i = 0; i < customFormFields.length > 0; i++) {
      if (customFormFields[i].type == "text" && customFormFields[i].mandatory) {
        if (customFormFields[i].value.length == 0) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `Please Enter ${customFormFields[i].label}` }))

        }
        else if (customFormFields[i].value.length < 3) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "Name should contain atleast 3 characterssssssssssssssssssssssssssssssssssssssssssssssssssss" }))

        }
        else {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
        }
      }
      if (customFormFields[i].type == "file" && customFormFields[i].mandatory) {
        if (!customFormFields[i].value) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `Please Upload ${customFormFields[i].label}` }))

        }
        else {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
        }
      }
      if (customFormFields[i].type == "textarea" && customFormFields[i].mandatory) {
        if (customFormFields[i].value.length == 0) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `Please Enter ${customFormFields[i].label}` }))

        }
        else if (customFormFields[i].value.length < 3) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "Name should contain atleast 3 characterssssssssssssssssssssssssssssssssssssssssssssssssssss" }))

        }
        else {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
        }
      }
      if (customFormFields[i].type == "multiselect" && customFormFields[i].mandatory) {
        if (customFormFields[i].value.length < 1) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `Please Enter ${customFormFields[i].label}` }))

        }

        else {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
        }
      }
    }
    const formData = new FormData(e.target)
    formData.set("members", JSON.stringify(['get', 'dynamic', 'mails']));
    createEntity(formData)
  }
  return (
    <div className='container p-4 bg-[#f8fafc]'>
      {/* <p className="font-lg font-semibold p-3">Entity Form</p> */}
      <p className="text-lg font-semibold">New Entity</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
        <div className="col-span-1 p-3">
          <form className=" " method="POST" onSubmit={handleFormSubmit} >
            {customFormFields &&
              customFormFields.length > 0 &&
              customFormFields.map((item, index) => (
                <div key={index}>
                  {/* predefined fields */}
                  {item.type === 'text' && item.inputname == "name" && item.field === "predefined" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="text"
                        // name={item.label}
                        name={item.inputname}
                        id={item.inputname}
                        placeholder='Enter entity name'
                        // value={formData[item.label] || ''}
                        value={customFormFields[index].value || ''}
                        className="px-2 py-1.5 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-xs text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm  placeholder:text-xs"
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>
                    </div>
                  )}
                  {item.type === 'file' && item.inputname == "image" && item.field === "predefined" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="file"
                        name={item.inputname}


                        id={item.inputname}
                        className="px-2 py-1 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-xs  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6 placeholder:text-xs"
                        onChange={(event) => handleFileChange(event, index)}
                        accept="image/*"
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'textarea' && item.inputname == "description" && item.field === "predefined" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <textarea
                        name={item.inputname}
                        placeholder='Type here....'

                        id={item.inputname}

                        value={customFormFields[index].value || ''}

                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-xs  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6 placeholder:text-xs"

                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'multiselect' && item.inputname == "members" && item.field == "predefined" && (

                    <div className='relative'>
                      <label htmlFor="email" className="block text-sm  font-medium leading-6 my-2 text-gray-900">{item.label}</label>

                      <div className='border-2 border-gray-200 flex flex-wrap gap-1 p-2 selected-users-container relative z-50   rounded-md'>
                        {selected && selected.length > 0 && selected.map((result) => {

                          let mail = result.split("@")[0]
                          return (
                            <span className='flex gap-1 text-xs mt-1 border-2 border-gray-200 rounded-md  focus:border-orange-600'>
                              <img className="w-4 h-4 rounded-lg" src={defprop} alt="Neil image" /> {mail} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                className="w-4 h-4 " onClick={() => handleRemove(result, index)}>
                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                              </svg>
                            </span>
                          )
                        })}
                        <input
                          type="text"
                          placeholder='Type email id'
                          tabindex="0" aria-describedby="lui_5891" aria-invalid="false"
                          style={{ border: "none" }}
                          className='bg-[#f8fafc]  h-5  focus:outline-none z-40 placeholder:text-xs placeholder:pt-2'
                          value={searchTerm}
                          onChange={handleInputChange}
                        />
                      </div>
                      {showUsers && (
                        <ul className="user-list z-50 absolute top-full left-0  bg-gray-50 border border-1 border-gray-200 w-full">

                          {usersEmails?.filter(user => !selected.includes(user))
                            // .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
                            .map((user, ind) => (
                              <li key={ind}
                                className='px-3 py-1 text-sm hover:bg-gray-200'

                                onClick={() => handleClick(user, index)}>
                                {user}
                              </li>
                            ))}
                        </ul>
                      )}
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>

                  )}




                  {/* custom fields */}
                  {item.type === 'text' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="text"
                        // name={item.label}
                        name={item.inputname}
                        id={item.inputname}
                        // value={formData[item.label] || ''}
                        value={customFormFields[index].value || ''}
                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                    </div>
                  )}
                  {item.type === 'email' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="email"
                        name={item.inputname}
                        id={item.inputname}

                        value={customFormFields[index].value || ''}

                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                    </div>
                  )}
                  {item.type === 'password' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="password"
                        name={item.inputname}

                        id={item.inputname}
                        // value={formData[item.label] || ''}
                        value={customFormFields[index].value || ''}

                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        // onChange={handleChange}
                        onChange={(e) => handleChange(index, e.target.value)}

                      />
                    </div>
                  )}
                  {item.type === 'number' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="number"
                        name={item.inputname}

                        id={item.inputname}
                        // value={formData[item.label] || ''}
                        value={customFormFields[index].value || ''}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                      // onChange={handleChange}


                      />
                    </div>
                  )}
                  {item.type === 'checkbox' && item.field == "custom" && (
                    <div className='flex gap-2'>

                      <input
                        type="checkbox"
                        name={item.inputname}
                        id={item.inputname}
                        checked={!!customFormFields[index].value}
                        onChange={(e) => handleChange(index, e.target.checked)}

                      />  <label htmlFor={item.inputname} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                    </div>

                  )}
                  {item.type === 'date' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="date"
                        name={item.inputname}
                        id={item.inputname}
                        // value={formData[item.label] || ''}
                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        // onChange={handleChange}
                        value={customFormFields[index].value || ''}

                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                    </div>
                  )}
                  {item.type === 'time' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="time"
                        name={item.inputname}

                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        id={item.inputname}
                        // value={formData[item.label] || ''}
                        // className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        // onChange={handleChange}
                        value={customFormFields[index].value || ''}
                        onChange={(e) => handleChange(index, e.target.value)}

                      />
                    </div>
                  )}
                  {item.type === 'file' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="file"
                        name={item.inputname}


                        id={item.inputname}
                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        onChange={(event) => handleFileChange(event, index)}
                        accept="image/*"
                      />
                    </div>
                  )}

                  {item.type === 'range' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="range"
                        name={item.inputname}


                        id={item.inputname}
                        value={customFormFields[index].value || ''}

                        // className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        onChange={(e) => handleChange(index, e.target.value)}

                      />
                      {customFormFields[index].value && customFormFields[index].value}
                    </div>
                  )}
                  {item.type === 'textarea' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <textarea
                        name={item.inputname}


                        id={item.inputname}

                        value={customFormFields[index].value || ''}
                        className="bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400"

                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                    </div>
                  )}

                  {item.type === 'select' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>

                      <select
                        id={item.inputname}
                        name={item.inputname}
                        className="p-2 text-xs block w-full bg-gray-50  rounded-md py-2.5 text-gray-900   border-2 border-gray-200 shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6"
                        onChange={(e) => handleChange(index, e.target.value)}
                        value={customFormFields[index].value || ''}
                      >{item.options && item.options.map((option, index) => (
                        <option value={option}>{option}</option>
                      ))}

                      </select>
                    </div>
                  )}
                  {item.type === 'multiselect' && item.field === "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <div className='p-2 text-xs flex justify-end w-full bg-gray-50 rounded-md text-gray-900 border-2 border-gray-200 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6'>

                        <span onClick={() => handleOpenOptions(item.inputname)} >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                          </svg>
                        </span></div>
                      {openOptions === item.inputname && (
                        <div className="block  border-2 border-gray-200 px-3 h-28 overflow-y-auto">
                          {item.options.map((option, subindex) => (
                            <div key={subindex} className="mr-2 mb-2">
                              <input
                                type="checkbox"
                                id={option}
                                checked={item.value.includes(option)}
                                onChange={(e) => handleChange(index, option)}
                                className="mr-1"

                              />
                              <label htmlFor={option} className="select-none">{option}</label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            <div className=''>
              <button type="submit"
                className="mt-6 flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Create Entity</button>
            </div>
          </form>
        </div>
        {/* preview */}
        <div className='col-span-2 hidden sm:block md:block'>
          <div className='h-[500px] overflow-auto shadow-md px-6 py-4 border-2 rounded-md bg-[#f8fafc] '>
            {customFormFields && customFormFields.length > 0 && customFormFields.map((item) => (
              <div className='relative' >

                {/* predefined fields*/}
                {item.type === 'text' && item.inputname == "name" && item.field == "predefined" && (
                  <p className="text-sm font-black text-gray-800 mt-2 absolute left-12">{item.value}</p>
                )}
                {item.type === 'file' && item.inputname == "image" && item.field == "predefined" && (
                  <div className="flex gap-4">
                    <div className="group h-10 ">
                      {/* <spna>{item.label}</spna> */}
                      {item.value ? (
                        <img
                          src={item.value}
                          name="EntityPhoto"
                          alt="Selected User Photo"
                          className="rounded-lg w-10 h-10 mr-4"
                        />
                      ) : (
                        <img className="w-10 h-10 rounded-lg " src={defprop} alt="Neil image" />
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




                {item.type === 'textarea' && item.inputname == "description" && item.field == "predefined" && (
                  <div className='h-28 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full mt-4'>
                    {/* <textarea className="resize-none h-20 border border-1 border-gray-200 focus:outline-none "> */}
                    {item.value}
                    {/* </textarea> */}
                  </div>
                )}



                {item.type === 'multiselect' && item.inputname == "members" && item.field == "predefined" && (
                  <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-5'>
                    {item.value && Array.from({ length: 12 }).map((_, index) => {
                      let first = "";
                      let second = "";
                      let firstLetter;
                      let secondLetter;
                      let mail = "";
                      if (index < item.value.length) {
                        mail = item.value[index].split("@")[0]
                        if (mail.includes(".")) {
                          first = mail.split(".")[0]
                          second = mail.split(".")[1]
                          firstLetter = first[0]
                          secondLetter = second[0]
                        }
                        else {
                          firstLetter = mail[0]
                        }
                      }
                      if (mail.includes(".")) {
                        first = mail.split(".")[0]
                        second = mail.split(".")[1]
                        firstLetter = first[0]
                        secondLetter = second[0]
                      }
                      else {
                        firstLetter = mail[0]
                      }
                      //color
                      const colors = ["#818cf8", "#fb923c", "#f87171", "#0891b2", "#db2777", "#f87171", "#854d0e", "#166534"];
                      const getRandomColor = (firstLetter) => {

                        const randomIndex = firstLetter.charCodeAt(0) % colors.length


                        return colors[randomIndex];
                      };


                      return (
                        <div className='col-span-1 flex justify-start gap-3' key={index}>


                          {index + 1 <= item.value.length && <>
                            <h5 style={{ backgroundColor: `${getRandomColor(firstLetter)}` }} className=' rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>

                              {index < 11 && <>
                                {firstLetter.toUpperCase()}{secondLetter && secondLetter.toUpperCase()}</>}{index == 11 && item.value.length == 12 && <>
                                  {firstLetter.toUpperCase()}{secondLetter && secondLetter.toUpperCase()}</>} {index == 11 && item.value.length > 12 && <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                    </svg>
                                  </span>}
                            </h5>
                            <div className=' flex items-center'>

                              <div className=' '>{index < 11 && mail}{index == 11 && item.value.length == 12 && mail} {index == 11 && item.value.length > 12 && <span>+{item.value.length - 11} more</span>} </div>
                            </div>
                          </>}
                          {index + 1 > item.value.length && <>
                            <h5 className='bg-[#e5e7eb] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>

                            </h5>
                            <div className=' flex items-center'>
                              <div className=' rounded-md  bg-[#e5e7eb] h-2 w-28'> </div>
                            </div>
                          </>}
                        </div>
                      )
                    })}
                  </div>
                )}
                {/* customfields */}
                {item.type === "text" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "email" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "password" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "number" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "textarea" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === 'file' && item.field == "custom" && (
                  <div className="flex gap-4">
                    <div className="group h-10 ">
                      {/* <spna>{item.label}</spna> */}
                      {item.value ? (
                        <img
                          src={item.value}
                          name="EntityPhoto"
                          alt="Selected User Photo"
                          className="rounded-lg w-10 h-10 mr-4"
                        />
                      ) : (
                        <img className="w-10 h-10 rounded-lg " src={defprop} alt="Neil image" />
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
                {item.type === "date" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "select" && item.field == "custom" && <div>
                  {item.value}

                </div>}

                {/* multiselect incomplte */}
                {item.type === "multiselect" && item.field == "custom" && <div>

                  {item.value.join(', ')}


                </div>}
                {item.type === "checkbox" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "range" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "time" && item.field == "custom" && <div>
                  {item.value}

                </div>}

              </div>
            )

            )}
          </div>
        </div>
      </div>
    </div >
  );
}

export default EntityForm;

// import React, { useState, useRef, useContext } from 'react';
// import defprop from '../../../Images/defprof.svg';
// import './EntityForm.css';
// import { EntitiesDataContext } from '../../../contexts/entitiesDataContext/entitiesDataContext';
// import { Link } from 'react-router-dom';
// // import { UserDataContext } from '../../../contexts/usersDataContext';
// import { UserDataContext } from '../../../contexts/usersDataContext/usersDataContext';

// function EntityForm() {
//   const { usersState: { users: {users} } } = useContext(UserDataContext);
//   console.log(users, "entity form")
//   const usersEmails = users?.map(user => user.email);
//   const { entitiesState: { dashboard }, entitiesDispatch, deleteEntitybyId, createEntity } = useContext(EntitiesDataContext);

//   // choose file
//   const [imageSrc, setImageSrc] = useState(null);
//   const [selectedFileName, setSelectedFileName] = useState('');
//     //  for binding data
//     const [entityForm, setEntityForm] = useState({
//       Entite_Name: "",
//       image: null,
//       Description: "",
//       entitymembers: []
//     });


//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log(file)
//         setImageSrc(file);
//         setEntityForm((e) => ({
//           ...e, image: file
//         }))
//       // const reader = new FileReader();
//       // console.log(reader);
//       // reader.onloadend = () => {
//       //   setImageSrc(reader.result);
//       //   setEntityForm((e) => ({
//       //     ...e, image: reader.result
//       //   }))
//       //   setSelectedFileName(file.name);
//       // };
//       // reader.readAsDataURL(file);
//     }
//   };

//   const handleChooseFileClick = () => {
//     document.getElementById('fileInput').click();
//   };

//   console.log(entityForm, 'ef')

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setEntityForm((prevEntityForm) => ({
//     ...prevEntityForm,
//     [name]: value
//   }));
// };

//   const [query, setQuery] = useState('');
//   const [selected, setSelected] = useState([]);
//   const [showUsers, setShowUsers] = useState(false);

//   const handleInputChange = (value) => {
//     setQuery(value);
//     setShowUsers(true);
//   };
//   const handleClick = (value) => {
//     setSelected((e) => [...e, value])
//     // setEntityForm((e) => [...e, value])

//     setEntityForm((prevEntityForm) => ({
//       ...prevEntityForm,
//       entitymembers: [...prevEntityForm.entitymembers, value]
//     }));
//     setQuery('');
//     setShowUsers(false);
//   };
//   //  for add member input remove users
//   const handleRemove = (user) => {
//     const updatedSelected = selected.filter((selectedUser) => selectedUser !== user);
//     const updatedMembers = entityForm.entitymembers.filter((selectedUser) => selectedUser !== user);
//     setEntityForm((prevEntityForm) => ({
//       ...prevEntityForm,
//       entitymembers: updatedMembers
//     }));
//     setSelected(updatedSelected);
//   };

//   function handleFormSubmit(e){
//     e.preventDefault();
//     const formData = new FormData(e.target)
//     formData.append("entitymembers", JSON.stringify(entityForm.entitymembers))
//     console.log(formData.get("entitymembers"),"em")
//     createEntity(formData);
//   }


//   return (

//     <div className='container p-4 bg-[#f8fafc]'>
//       {/* <p className="font-lg font-semibold p-3">Entity Form</p> */}
//       <p className="text-lg font-semibold">New Entity</p>
//       <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-3  gap-6 mt-4 ">
//         <div className="col-span-1 ps-5 pe-8">
//           <form className="space-y-3" method="POST" onSubmit={handleFormSubmit}>
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Entity Name</label>
//               <div className="">
//                 <input id="name" name="Entite_Name" type="text" autoComplete="name" onChange={handleChange} value={entityForm.Entite_Name} required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium leading-6 my-2 text-gray-900">Choose Your Photo</label>
//               <input
//                 type="file"
//                 name="image"
//                 id="fileInput"
//                 className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
//                 accept="image/*"
//                 onChange={handleFileChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="name" className=" block text-sm my-2 font-medium leading-6 text-gray-900" >Description</label>
//               <div className=''>
//                 <textarea name='Description' onChange={handleChange} value={entityForm.Description} class="resize-none bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400"></textarea>
//               </div>
//             </div>

//             <div className='relative'>
//               <label htmlFor="email" className="block text-sm my-2 font-medium leading-6 text-gray-900">Add Member</label>

//               <div className='border border-1 flex flex-wrap gap-1 px-1 py-1 selected-users-container relative z-50 rounded-md'>
//                 {selected && selected.length > 0 && selected.map((result) => {

//                   let mail = result.split("@")[0]
//                   return (
//                     <span className='flex gap-1 text-xs mt-1 border-2 border-gray-200 rounded-md p-0.5 focus:border-orange-600
//                     '>
//                       <img class="w-4 h-4 rounded-lg" src={defprop} alt="Neil image" /> {mail} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
//                         class="w-4 h-4 " onClick={() => handleRemove(result)}>
//                         <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
//                       </svg>
//                     </span>
//                   )
//                 })}


//                 <input
//                   type="text"
//                   tabindex="0" aria-describedby="lui_5891" aria-invalid="false"
//                   style={{ border: "none" }}
//                   className='bg-[#f8fafc] w-20 h-5 mt-1 focus:outline-none z-40'
//                   value={query}
//                   onChange={(e) => handleInputChange(e.target.value)}
//                 />
//               </div>
//               {showUsers && (
//                 <ul className="user-list z-50 absolute top-full left-0  bg-gray-50 border border-1 border-gray-200 w-full">

//                   {usersEmails?.filter(user => !selected.includes(user))
//                     .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
//                     .map((user, index) => (
//                       <li key={index}
//                         className='px-3 pb-0.5 hover:bg-gray-200'

//                         onClick={() => handleClick(user)}>
//                         {user}
//                       </li>
//                     ))}
//                 </ul>
//               )}
//             </div>
//             <div className=''>
//               <button type="submit"
//                 className="mt-6 flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Create Entity</button>
//             </div>
//           </form>
//         </div>

//         <div className="col-span-2 h-[500px] overflow-auto shadow-md px-6 py-4 border-2 rounded-md bg-[#f8fafc]  ">
//           <div className='mb-5 mt-3'>
//             <div className="flex gap-4">
//               <div className="group h-10 ">
//                 {imageSrc ? (
//                   <img
//                     src={entityForm.image}
//                     name="image"
//                     alt="Selected User Photo"
//                     className="rounded-lg w-10 h-10 mr-4"
//                   />
//                 ) : (
//                   <img class="w-10 h-10 rounded-lg " src={defprop} alt="Neil image" />
//                   // <img
//                   //   src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                   //   alt="Default User Photo"
//                   //   className="rounded-full w-12 h-12 mr-4"
//                   // />
//                 )}
//               </div>
//               <p class="text-lg font-black text-gray-800 mt-2">{entityForm.Entite_Name}</p>

//             </div>
//             <hr className='my-3' />
//             <div className='h-20 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full  '>
//               {/* <textarea className="resize-none h-20 border border-1 border-gray-200 focus:outline-none "> */}
//               {entityForm.Description}
//               {/* </textarea> */}
//             </div>


//             <p className='text-md font-semibold my-3' > Members</p>

//             <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-5'>


//               {/* {entityform && entityform.entitymembers && entityform.entitymembers.length > 0 && entityform.entitymembers.map((member) => {
//                 let mail = member.split("@")[0]
//                 let first = "";
//                 let second = "";
//                 let firstLetter;
//                 let secondLetter;
//                 if (mail.includes(".")) {
//                   console.log("mail", mail)
//                   first = mail.split(".")[0]
//                   second = mail.split(".")[1]
//                   firstLetter = first[0]
//                   secondLetter = second[0]
//                   console.log("maivvvl", mail, first[0], second[0])
//                 }
//                 else {
//                   firstLetter = mail[0]
//                 }

//                 return (
//                   <div className='col-span-1 flex justify-start gap-3'>
//                     <h5 className='bg-[#f87171] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'> {firstLetter.toUpperCase()}&nbsp;{secondLetter && secondLetter.toUpperCase()}</h5>
//                     <p className='mt-1.5 font-thin  text-sm'>{mail}</p>
//                   </div>
//                 )

//               })} */}
//               {entityForm && entityForm.entitymembers && Array.from({ length: 12 }).map((_, index) => {
//                 let first = "";
//                 let second = "";
//                 let firstLetter;
//                 let secondLetter;
//                 let mail = "";
//                 if (index < entityForm.entitymembers.length) {
//                   mail = entityForm.entitymembers[index].split("@")[0]
//                   if (mail.includes(".")) {
//                     first = mail.split(".")[0]
//                     second = mail.split(".")[1]
//                     firstLetter = first[0]
//                     secondLetter = second[0]
//                   }
//                   else {
//                     firstLetter = mail[0]
//                   }
//                 }
//                 if (mail.includes(".")) {
//                   first = mail.split(".")[0]
//                   second = mail.split(".")[1]
//                   firstLetter = first[0]
//                   secondLetter = second[0]
//                 }
//                 else {
//                   firstLetter = mail[0]
//                 }

//                 //color

//                 const colors = ["#818cf8", "#fb923c", "#f87171", "#0891b2", "#db2777", "#f87171", "#854d0e", "#166534"];


//                 const getRandomColor = (firstLetter) => {

//                   const randomIndex = firstLetter.charCodeAt(0) % colors.length

//                   // const randomIndex = Math.floor(Math.random() * colors.length);
//                   return colors[randomIndex];
//                 };

//                 // const randomColor = getRandomColor();
//                 return (
//                   <div className='col-span-1 flex justify-start gap-3' key={index}>

//                     {index + 1 <= entityForm.entitymembers.length && <>
//                       <h5 style={{ backgroundColor: `${getRandomColor(firstLetter)}` }} className=' rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>

//                         {index < 11 && <>
//                           {firstLetter.toUpperCase()}{secondLetter && secondLetter.toUpperCase()}</>}{index == 11 && entityForm.entitymembers.length == 12 && <>
//                             {firstLetter.toUpperCase()}{secondLetter && secondLetter.toUpperCase()}</>} {index == 11 && entityForm.entitymembers.length > 12 && <span>
//                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
//                               </svg>
//                             </span>}
//                       </h5>
//                       <div className=' flex items-center'>

//                         <div className=' '>{index < 11 && mail}{index == 11 && entityForm.entitymembers.length == 12 && mail} {index == 11 && entityForm.entitymembers.length > 12 && <span>+{entityForm.entitymembers.length - 11} more</span>} </div>
//                       </div>
//                     </>}
//                     {index + 1 > entityForm.entitymembers.length && <>
//                       <h5 className='bg-[#e5e7eb] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>

//                       </h5>
//                       <div className=' flex items-center'>
//                         <div className=' rounded-md  bg-[#e5e7eb] h-2 w-28'> </div>
//                       </div>
//                     </>}
//                   </div>
//                 )

//               })}


//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default EntityForm;

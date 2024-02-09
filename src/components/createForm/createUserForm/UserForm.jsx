import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './userForm.css';
import defprop from '../../../Images/defprof.svg';
import useDebounce from '../../../hooks/debounce/useDebounce';
import { UserDataContext } from '../../../contexts/usersDataContext/usersDataContext';
import { EntitiesDataContext } from '../../../contexts/entitiesDataContext/entitiesDataContext';
function UserForm() {
  const { usersState: { users, dashboard }, usersDispatch } = useContext(UserDataContext);
  const { createEntity } = useContext(EntitiesDataContext);
  // const usersEmails = dashboard.paginatedUsers?.map(user => user.email);
  // const { debouncedSetPage, debouncedSetSearch } = useDebounce(usersDispatch);
  const [errors, setErrors] = useState({})
  let [openOptions, setopenOptions] = useState("")
  // const [searchTerm, setSearchTerm] = useState('');
  // const [selected, setSelected] = useState([]);
  // const [showUsers, setShowUsers] = useState(false);
  let [customFormFields, setCustomFormFields] = useState()
  // const handleInputChange = (e) => {
  //   setShowUsers(true)
  //   const value = e.target.value;
  //   setSearchTerm(() => {
  //     debouncedSetSearch(value);
  //     return value;
  //   });
  // };
  const handleOpenOptions = (name) => {
    if (openOptions == name) {
      setopenOptions("")
    }
    if (openOptions != name) {
      setopenOptions(name)
    }
  }
  // const handleClick = (value, index) => {
  //   setSelected((e) => [...e, value])
  //   const updatedFormData = [...customFormFields];
  //   let members = updatedFormData[index].value
  //   members.push(value)
  //   updatedFormData[index].value = members
  //   setCustomFormFields(updatedFormData);
  //   setSearchTerm('');
  //   setShowUsers(false);
  // };

  // const handleRemove = (user, index) => {
  //   const updatedSelected = selected.filter((selectedUser) => selectedUser !== user);
  //   setSelected(updatedSelected);
  //   const updatedMembers = customFormFields[index].value.filter((selectedUser) => selectedUser !== user);
  //   const updatedFormData = [...customFormFields];
  //   updatedFormData[index].value = updatedMembers;
  //   setCustomFormFields(updatedFormData);
  // };

  useEffect(() => {
    axios.get(`https://atbtmain.teksacademy.com/form/list?name=userform`)
      .then(response => {
        // Handle the successful response
        setCustomFormFields(response.data.array)
        console.log("Dsdsd", response.data.array);
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
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "Name should contain atleast 3 characters" }))

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
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "Name should contain atleast 3 characters" }))

        }
        else {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
        }
      }
      if (customFormFields[i].type == "email" && customFormFields[i].mandatory) {
        if (customFormFields[i].value.length < 1) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `Please Enter ${customFormFields[i].label}` }))

        }

        else {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
        }
      }
      if (customFormFields[i].type == "number" && customFormFields[i].mandatory) {
        if (customFormFields[i].value.length < 1) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `Please Enter ${customFormFields[i].label}` }))

        }
        else if (customFormFields[i].value.length != 10) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `Please Enter Correct ${customFormFields[i].label}` }))

        }

        else {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
        }
      }
      if (customFormFields[i].type == "select" && customFormFields[i].mandatory) {
        if (customFormFields[i].value.length < 1) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `Please Enter ${customFormFields[i].label}` }))

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
      if (customFormFields[i].type == "date" && customFormFields[i].mandatory) {
        if (!customFormFields[i].value) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `Please Enter ${customFormFields[i].label}` }))

        }

        else {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
        }
      }
      if (customFormFields[i].type == "checkbox" && customFormFields[i].mandatory) {
        if (!customFormFields[i].value) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `Please Enter ${customFormFields[i].label}` }))

        }

        else {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
        }
      }
      if (customFormFields[i].type == "range" && customFormFields[i].mandatory) {
        if (!customFormFields[i].value) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `Please Enter ${customFormFields[i].label}` }))

        }

        else {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
        }
      }
      if (customFormFields[i].type == "time" && customFormFields[i].mandatory) {
        if (!customFormFields[i].value) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `Please Enter ${customFormFields[i].label}` }))

        }

        else {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
        }
      }
      if (customFormFields[i].type == "password" && customFormFields[i].mandatory) {
        if (customFormFields[i].value.length < 1) {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `Please Enter ${customFormFields[i].label}` }))

        }

        else {
          setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
        }
      }

    }
    // const formData = new FormData(e.target)
    // console.log(formData.get("Full Name"), "em")
    // formData.set("members", JSON.stringify(['get', 'dynamic', 'mails']));
    // createEntity(formData)
  }
  return (
    <div className='container p-4 bg-[#f8fafc]'>
      {/* <p className="font-lg font-semibold p-3">Entity Form</p> */}
      <p className="text-lg font-semibold">New User</p>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3  gap-4 mt-2 ">
        <div className="col-span-1 ">
          <form className="" method="POST" onSubmit={handleFormSubmit} >
            {customFormFields &&
              customFormFields.length > 0 &&
              customFormFields.map((item, index) => (
                <div key={index}>
                  {/* predefined fields */}
                  {item.type === 'text' && item.inputname == "name" && item.field === "predefined" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="text"
                        // name={item.label}
                        name={item.inputname}
                        id={item.inputname}
                        // value={formData[item.label] || ''}
                        value={customFormFields[index].value || ''}
                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>
                    </div>
                  )}
                  {item.type === 'file' && item.inputname == "image" && item.field === "predefined" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 mt-1 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="file"
                        name={item.inputname}


                        id={item.inputname}
                        className="px-2  block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-0.5 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        onChange={(event) => handleFileChange(event, index)}
                        accept="image/*"
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'email' && item.inputname == "email" && item.field == "predefined" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 mt-1 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="email"
                        name={item.inputname}
                        id={item.inputname}

                        value={customFormFields[index].value || ''}

                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'number' && item.inputname == "phonenumber" && item.field == "predefined" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 mt-1 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="number"
                        name={item.inputname}

                        id={item.inputname}
                        // value={formData[item.label] || ''}
                        value={customFormFields[index].value || ''}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                      // onChange={handleChange}


                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'select' && item.inputname == "entityname" && item.field == "predefined" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 mt-1 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>

                      <select
                        id={item.inputname}
                        name={item.inputname}
                        className="px-2 py-1.5 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900  shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        onChange={(e) => handleChange(index, e.target.value)}
                        value={customFormFields[index].value || ''}
                      > <option value="">--select--</option>
                        {item.options && item.options.map((option, index) => (
                          <option value={option}>{option}</option>
                        ))}

                      </select>
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'select' && item.inputname == "designation" && item.field == "predefined" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 mt-1 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>

                      <select
                        id={item.inputname}
                        name={item.inputname}
                        className="px-2 py-1.5 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900  shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"

                        onChange={(e) => handleChange(index, e.target.value)}
                        value={customFormFields[index].value || ''}
                      ><option value="">--select--</option>
                        {item.options && item.options.map((option, index) => (
                          <option value={option}>{option}</option>
                        ))}

                      </select>
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'select' && item.inputname == "role" && item.field == "predefined" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 mt-1 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>

                      <select
                        id={item.inputname}
                        name={item.inputname}
                        className="px-2 py-1.5 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900  shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"

                        onChange={(e) => handleChange(index, e.target.value)}
                        value={customFormFields[index].value || ''}
                      ><option value="">--select--</option>
                        {item.options && item.options.map((option, index) => (
                          <option value={option}>{option}</option>
                        ))}

                      </select>
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
                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

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

                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

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

                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        // onChange={handleChange}
                        onChange={(e) => handleChange(index, e.target.value)}

                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

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
                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                      // onChange={handleChange}


                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'checkbox' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.inputname} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="checkbox"
                        name={item.inputname}
                        id={item.inputname}
                        checked={!!customFormFields[index].value}
                        onChange={(e) => handleChange(index, e.target.checked)}

                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

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
                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        // onChange={handleChange}
                        value={customFormFields[index].value || ''}

                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

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


                        id={item.inputname}
                        // value={formData[item.label] || ''}
                        // className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        // onChange={handleChange}
                        value={customFormFields[index].value || ''}
                        onChange={(e) => handleChange(index, e.target.value)}

                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

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
                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        onChange={(event) => handleFileChange(event, index)}
                        accept="image/*"
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

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
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

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
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

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

                        onChange={(e) => handleChange(index, e.target.value)}
                        value={customFormFields[index].value || ''}
                      >{item.options && item.options.map((option, index) => (
                        <option value={option}>{option}</option>
                      ))}

                      </select>
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'multiselect' && item.field === "custom" && (
                    <div> Multiple Select <span onClick={() => handleOpenOptions(item.inputname)}>ICON</span>
                      {openOptions === item.inputname &&
                        (
                          <div>
                            {item.options.map((option, subindex) => (
                              <div key={subindex}>
                                <input
                                  type="checkbox"
                                  id={option}
                                  checked={item.value.includes(option)}
                                  onChange={(e) => handleChange(index, option)}
                                />
                                <label htmlFor={option}>{option}</label>
                              </div>
                            ))}
                          </div>
                        )}
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

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
        <div className="col-span-2 ">
          <div className='flex justify-center items-center mt-3'>
            <div className='border border-1 p-5 w-screen border-gray-200 rounded-md shadow-md bg-[#f8fafc] h-[550px]'>
              {customFormFields && customFormFields.length > 0 && customFormFields.map((item) => (
                <div className='relative' >
                  {/* predefined fields */}

                  {item.type === 'select' && item.inputname == "entityname" && item.field == "predefined" && (
                    <div className='text-center text-4xl font-medium'>
                      {item.value}
                    </div>
                  )}


                  <div className='grid grid-col-2'>
                    <div className='grid1-items'>
                      {item.type === 'file' && item.inputname == "image" && item.field === "predefined" && (
                        <div>
                          {item.value ? (
                            <img
                              src={item.value}
                              name="EntityPhoto"
                              alt="Selected User Photo"
                              className="rounded-lg w-10 h-10 mr-4"
                            />
                          ) : (
                            <img className="w-24 h-24 rounded-sm aspect-[1/1] object-cover" src={defprop} alt="Neil image" />
                            // <img
                            //   src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            //   alt="Default User Photo"
                            //   className="rounded-full w-12 h-12 mr-4"
                            // />
                          )}

                        </div>
                      )}

                    </div>
                  </div>

                  {item.type === 'text' && item.inputname == "name" && item.field === "predefined" && (
                    <p className=''>{item.value}
                    </p>
                  )}

                  {item.type === 'email' && item.inputname == "email" && item.field == "predefined" && (
                    <div>
                      {item.value}
                    </div>
                  )}
                  {item.type === 'number' && item.inputname == "phonenumber" && item.field == "predefined" && (
                    <div>
                      {item.value}
                    </div>
                  )}

                  {item.type === 'select' && item.inputname == "designation" && item.field == "predefined" && (
                    <div>
                      {item.value}
                    </div>
                  )}
                  {item.type === 'select' && item.inputname == "role" && item.field == "predefined" && (
                    <div>
                      {item.value}
                    </div>
                  )}

                  {/* custom fields */}
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
                    {item.value}

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
            </div></div></div>
      </div>
    </div>
  );
}

export default UserForm;









// import axios from 'axios'
// import React, { useContext, useState } from 'react';
// import defprop from '../../../Images/defprof.svg';
// import { UserDataContext } from '../../../contexts/usersDataContext/usersDataContext';

// function UserForm() {
//   const { createUser } = useContext(UserDataContext);
//   const [userDetails, setUserDetails] = useState({
//     userName: "",
//     email: "",
//     phone: "",
//   });
//   function handleSubmit(e) {
//     e.preventDefault();
//     createUser(userDetails)
//   }
//   return (
//     <div>
//       <div className='container p-3 bg-[#f8fafc] '>
//         <p className="text-lg font-semibold">New User</p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
//           <div className="col-span-1 p-3">

//             <form className="space-y-3 " method="POST">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium  my-1 text-gray-900">Name</label>
//                 <div className="">
//                   <input id="name" name="userName" type="text" autoComplete="userName" required
//                     onChange={(e) => setUserDetails((prev) => ({
//                       ...prev,
//                       userName: e.target.value,
//                     }))}
//                     className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
//                 </div></div>
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium  my-1 text-gray-900">Choose Your Photo</label>
//                 <input
//                   type="file"
//                   id="fileInput"
//                   className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
//                   accept="image/*"

//                 />
//               </div>
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium  my-1 text-gray-900">Email</label>
//                 <div className="">
//                   <input id="email" name="email" type="email" autoComplete="email" required
//                     onChange={(e) => setUserDetails((prev) => ({
//                       ...prev,
//                       email: e.target.value,
//                     }))}
//                     className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
//                 </div></div>
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium  my-1 text-gray-900">Phone Number</label>
//                 <div className="">
//                   <input id="phone" name="phone" type="tel" autoComplete="phone" required
//                     onChange={(e) => setUserDetails((prev) => ({
//                       ...prev,
//                       phone: e.target.value,
//                     }))}
//                     className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
//                 </div></div>
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium  my-1 text-gray-900">Entity Name</label>
//                 <div className="">
//                   <input id="name" name="entityname" type="text" autoComplete="entityname" required
//                     // onChange={(e) => setUserDetails((prev) => ({
//                     //   ...prev,
//                     //   userName: e.target.value,
//                     // }))}
//                     className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
//                 </div></div>
//               <div>
//                 <label htmlFor="venue" className="block text-sm my-2  font-medium text-gray-700">Designation</label>
//                 <div className="relative inline-block text-left w-full">
//                   <select className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
//                     <option value="selected" className="hover:bg-orange-600 text-xs">Select Designation</option>
//                     <option value="srdeveloper" className='text-xs'>Developement</option>
//                     <option value="jrdeveoper" className='text-xs'>Marketing</option>
//                     <option value="intern" className='text-xs'>QA</option>
//                   </select>
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="venue" className="block text-sm my-2  font-medium text-gray-700">Role</label>
//                 <div className="relative inline-block text-left w-full">
//                   <select className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
//                     <option value="selected" className="hover:bg-orange-600 text-xs">Select Role</option>
//                     <option value="developer" className='text-xs'> Sr. Developer</option>
//                     <option value="jrdeveoper" className='text-xs'>Jr. Developer</option>
//                     <option value="intern" className='text-xs'>Intern</option>
//                   </select>
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* <div>
//                 <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
//                 <div className="">
//                   <input id="name" name="userName" type="text" autoComplete="userName" required value={userDetails.userName}
//                     onChange={(e) => setUserDetails((prev) => ({
//                       ...prev,
//                       userName: e.target.value,
//                     }))} className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
//                 </div>
//               </div> */}
//               {/* <div>
//                 <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
//                 <div className="">
//                   <input id="email" name="email" type="email" autoComplete="email" required value={userDetails.email}
//                     onChange={(e) => setUserDetails((prev) => ({
//                       ...prev,
//                       email: e.target.value,
//                     }))}
//                     className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
//                 </div>
//               </div> */}
//               {/* <div>
//                 <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
//                 <div className="">
//                   <input id="phone" name="phone" type="tel" autoComplete="phone" required value={userDetails.phone}
//                     onChange={(e) => setUserDetails((prev) => ({
//                       ...prev,
//                       phone: e.target.value,
//                     }))}
//                     className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
//                 </div>
//               </div> */}
//               {/* <div>
//                 <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">Designation</label>
//                 <div className="">
//                   <input id="designation" name="designation" type="text" autoComplete="designation" required value={userDetails.designation} onChange={(e) => setUserDetails((prev) => ({
//                     ...prev,
//                     designation: e.target.value,
//                   }))} className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
//                 </div>
//               </div> */}

//               {/* <div>
//                 <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">Select Entity</label>
//                 <div className="relative inline-block text-left w-full">
//                   <select className="block appearance-none p-3 w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6">
//                     <option value="option1">Option 1</option>
//                     <option value="option2">Option 2</option>
//                     <option value="option3">Option 3</option>
//                   </select>
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
//                     </svg>
//                   </div>
//                 </div>
//               </div> */}
//               <div className=''>
//                 <button onClick={handleSubmit} type="submit" className="mt-4 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
//                   Create User
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div className="col-span-2 ">
//             <div className='flex justify-center items-center mt-10'>
//               <div className='border border-1 p-5 w-screen border-gray-200 rounded-md shadow-md bg-[#f8fafc] h-[500px]'>
//                 <div className='grid grid-cols-2 gap-4 bg-gray-100'>
//                   <div className='col-span-2 flex flex-wrap'>
//                     <img className="w-24 h-24 rounded-sm aspect-[1/1] object-cover" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80' alt="Neil image" />
//                     <p className="text-xl font-black text-gray-800 mt-8 ms-3">Sri lakshmi{userDetails.userName}</p>
//                   </div>
//                 </div>

//                 <div className='grid grid-cols-2 mb-8 shadow-inner opacity-100 justify-between mt-3'>
//                   <div className='flex my-3'>
//                     <div className='border-1 p-2 bg-gray-200'>
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                         <path fillRule="evenodd" d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-4.72 4.72a.75.75 0 1 1-1.06-1.06l4.72-4.72h-2.69a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
//                         <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <p className="text-md text-gray-800 mt-1 ms-3">9966180667 {userDetails.phone}</p>
//                   </div>

//                   <div className='flex flex-row justify-start my-3'>
//                     <div className='border-1 p-2 bg-gray-200'>
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
//                         <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
//                         <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
//                       </svg>
//                     </div>
//                     <p className="text-md text-gray-800 mt-1 ms-3">srilaskhmiariveni@gmail.com{userDetails.email}</p>
//                   </div>

//                   <div className='flex flex-row justify-start my-3'>
//                     <div className='border-1 p-2 bg-gray-200'>
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
//                         <path fill-rule="evenodd" d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd" />
//                       </svg>
//                     </div>
//                     <p className="text-md text-gray-800 mt-1 ms-3"> Infoz IT</p>
//                   </div>


//                   <div className='flex  flex-row justify-start my-3'>
//                     <div className='border-1 p-2 bg-gray-200'>
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
//                         <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z" clip-rule="evenodd" />
//                         <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
//                       </svg>
//                     </div>
//                     <p className="text-md text-gray-800 mt-1 ms-3"> Developer</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default UserForm;


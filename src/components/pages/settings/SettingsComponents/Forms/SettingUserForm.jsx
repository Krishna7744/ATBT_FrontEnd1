import React, { useEffect } from "react";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import axios from "axios";
const SettingEntityForm = () => {
    const [open, setOpen] = useState(false)
    const [editIndex, setEditIndex] = useState(null);
    const cancelButtonRef = useRef(null);

    const [customForm, setCustomForm] = useState([
    ])
    const [newInputField, setNewInputField] = useState({
        label: "", type: "", inputname: "", value: "", filterable: false, mandatory: false,
    })
    useEffect(() => {
        axios.get(`https://atbtmain.teksacademy.com/form/list?name=userform`)
            .then(response => {
                // Handle the successful response
                setCustomForm(response.data.array)
                console.log(response.data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });
    }, [])
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        // this is for label for new input 
        if (name == "type") {
            let newfield = { ...newInputField }
            newfield.filterable = false
            setNewInputField(newfield)
        }
        if (name == "type" && value === "select") {
            let newfield = { ...newInputField }
            newfield.options = []
            newfield.value = ""
            setNewInputField(newfield)
        }
        if (name == "type" && value === "multiselect") {
            let newfield = { ...newInputField }
            newfield.options = []
            newfield.value = []
            setNewInputField(newfield)
        }

        if (name == "label" && editIndex == null) {
            setNewInputField((prev) => ({ ...prev, label: value, inputname: value, field: "custom" }))
        }
        if (name == "label" && editIndex != null) {
            setNewInputField((prev) => ({ ...prev, label: value, }))
        }
        else {
            setNewInputField((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value, field: "custom" }))
        }
    }

    let [selectOption, setSelectOption] = useState("")
    const addOption = (e) => {
        e.preventDefault()
        if (selectOption != "" && newInputField.options) {
            setNewInputField((prev) => ({ ...prev, options: [...prev.options, selectOption] }))

        } else if (selectOption != "") {
            setNewInputField((prev) => ({ ...prev, options: [selectOption] }))

        }
        setSelectOption("")
    }
    useEffect(() => {
        console.log("newInputField", newInputField)
    })

    const addOrUpdateInput = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            // Edit existing field
            const updatedForm = [...customForm];
            updatedForm[editIndex] = newInputField;
            setCustomForm(updatedForm);
            setEditIndex(null);
        } else {
            // Add new field
            if (newInputField.type === "text" ||
                newInputField.type === "email" ||
                newInputField.type === "password" ||
                newInputField.type === "number" ||
                newInputField.type === "textarea" ||
                newInputField.type === "file" ||
                newInputField.type === "date" ||
                newInputField.type === "checkbox" ||
                newInputField.type === "range" || newInputField.type === "time") {
                let newField = { ...newInputField }
                delete newField.options
                setCustomForm((prev) => [...prev, newField]);

            }
            else {
                setCustomForm((prev) => [...prev, newInputField]);
            }

        }

        setNewInputField({ label: '', type: '', inputname: "", value: "", filterable: false, mandatory: false });
        setOpen(false);
    };
    const handleMoveDimension = (index, direction) => {
        const updatedForm = [...customForm];
        if (direction === 'up' && index > 0) {
            [updatedForm[index], updatedForm[index - 1]] = [updatedForm[index - 1], updatedForm[index]];
        } else if (direction === 'down' && index < updatedForm.length - 1) {
            [updatedForm[index], updatedForm[index + 1]] = [updatedForm[index + 1], updatedForm[index]];
        }
        setCustomForm(updatedForm);
    };
    const deleteInput = (index) => {
        const updatedForm = [...customForm];
        updatedForm.splice(index, 1);
        setCustomForm(updatedForm);
    };


    const [inputType, setInputType] = useState(["", "text", "email", "password",
        "number", "textarea", "file", "date", "select", "multiselect", "checkbox", "range", "time"])

    const handleSubmitCustomForm = () => {
        let formData = {
            arrayOfObjects: [
                {
                    label: "Full Name",
                    inputname: "name",
                    type: "text",
                    value: "",
                    field: "predefined",
                    mandatory: true,
                    filterable: true
                },
                {
                    label: "Image",
                    inputname: "image",
                    type: "file",
                    value: "",
                    field: "predefined",
                    mandatory: true,
                    filterable: false
                },
                {
                    label: "Email",
                    inputname: "email",
                    type: "email",
                    value: "",
                    field: "predefined",
                    mandatory: true,
                    filterable: true
                },
                {
                    label: "Phone Number",
                    inputname: "phonenumber",
                    type: "number",
                    value: "",
                    field: "predefined",
                    mandatory: true,
                    filterable: true
                },


                {
                    label: "Entity Name",
                    type: "select",
                    inputname: "entityname",
                    value: "",
                    filterable: true,
                    mandatory: true,
                    field :"predefined",
                    options: [
                        "Reliace", "Infosys", "Tata consultancy",
                        "Reliace"

                    ]
                },
                {
                    label: "Designation",
                    type: "select",
                    inputname: "designation",
                    value: "",
                    filterable: true,
                    mandatory: true,
                    field: "predefined",
                    options: [
                        "Developer",
                        "Quality Analyst", "Data Analyst"
                    ]
                },
                {
                    label: "Role",
                    type: "select",
                    inputname: "role",
                    value: "",
                    filterable: true,
                    mandatory: true,
                    field: "predefined",
                    options: [
                        "Admin",
                        "Counsellor", "Accountant", "Manager"
                    ]
                },
            ]


            , Name: "userform"
        }
        axios.put(
            `https://atbtmain.teksacademy.com/form/update`,
            formData
        )
            .then(response => {
                // Handle the response here

                console.log(response);
            })
            .catch(error => {

                console.error(error);
            });
    }
    const deleteOption = (index) => {
        let updatedNewInputField = { ...newInputField };

        // Use slice to create a copy of the options array and remove the specified index
        let updatedOptions = [...updatedNewInputField.options];
        updatedOptions.splice(index, 1);

        updatedNewInputField.options = updatedOptions;
        setNewInputField(updatedNewInputField);
        console.log("updatedNewInputField", updatedNewInputField);
    };

    // let updatedOptions = updatedNewInputField.options.filter((option) => option != deleteoption)
    return (
        <div className="p-4 container bg-[#f8fafc]">
            <div className="flex justify-between">
                <p className="text-xl font-semibold">User Form</p>
                <div className='flex justify-end'>
                    <button type="submit" onClick={(e) => {
                        setEditIndex(null)
                        setNewInputField(
                            { label: "", type: "", inputname: "", value: "", filterable: false, mandatory: false })
                        setOpen(true)
                    }}
                        className="create-btn px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1">+ Add Field</button>
                </div>
            </div>
            {customForm && customForm.length > 0 && customForm.map((input, index) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 px-5 mt-2">
                    <div className="mb-2 ">
                        <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-950">Label</label>

                        <div className="">
                            <span id="name" name="boardMeetingName" type="text" autoComplete="name" required className="p-2 text-xs block w-full bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-[#6b7280] appearance-none shadow-sm font-light placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
                                {input.label.charAt(0).toUpperCase() + input.label.slice(1)}
                            </span>
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Type</label>
                        <div className="">
                            <span id="name" name="boardMeetingName" type="text" autoComplete="name" required className="p-2 text-xs block w-full bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-[#6b7280] appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
                                {input.type.charAt(0).toUpperCase() + input.type.slice(1)}
                            </span>
                        </div>
                    </div>

                    <div className=" flex items-center gap-5">
                        <svg onClick={() => handleMoveDimension(index, 'up')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clip-rule="evenodd" />
                        </svg>
                        <svg onClick={() => handleMoveDimension(index, 'down')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clip-rule="evenodd" />
                        </svg>
                        <svg onClick={() => {
                            setNewInputField(input);
                            setEditIndex(index);
                            setOpen(true);
                        }}
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                        </svg>
                        <svg onClick={() => {
                            deleteInput(index);
                        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            className={`w-5 h-5 ${input.field === "custom" ? "" : "pointer-events-none opacity-30"}
                               `}>
                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex gap-5">
                        <div className="mb-6 flex items-end gap-1">
                            <input
                                // className="mb-1"
                                type="checkbox"
                                id="mandatory"
                                name="mandatory"
                                checked={input.mandatory}
                                onChange={handleInputChange}
                            />
                            <span className="text-xs">Mandatory</span>
                        </div>
                        <div className="mb-6 flex items-end  gap-1">
                            <input

                                type="checkbox"
                                id="filterable"
                                name="filterable"
                                checked={input.filterable}
                                onChange={handleInputChange}
                            />
                            <span className="text-xs">Filterable</span>
                        </div>
                    </div>
                    {/* <div className="grid1-item flex gap-10 items-end ">
                        <div className="grid grid-cols-4 sm:grid:cols-4 md:grid:cols-4 lg:grid:cols-4 xl:grid:cols-4 gap-5">

                            <div className="grid1-item">
                                <svg onClick={() => handleMoveDimension(index, 'up')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fill-rule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div className="grid1-item">
                                <svg onClick={() => handleMoveDimension(index, 'down')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div className="grid1-item">
                                <svg onClick={() => {
                                    setNewInputField(input);
                                    setEditIndex(index);
                                    setOpen(true);
                                }}
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                                </svg>
                            </div>
                            <div className="grid1-item">
                                <svg onClick={() => {
                                    deleteInput(index);
                                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    className={`w-5 h-5 ${input.field === "custom" ? "" : "pointer-events-none opacity-30"}
                               `}>
                                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                </svg>

                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-end ">

                                <input
                                    className="mb-1"
                                    type="checkbox"
                                    id="mandatory"
                                    name="mandatory"
                                    checked={input.mandatory} // Make sure to set the checked attribute
                                    onChange={handleInputChange}
                                /> <span >Mandatory</span>
                            </div>
                            <div className="flex items-end">

                                <input
                                    className="mb-1"
                                    type="checkbox"
                                    id="filterable"
                                    name="filterable"
                                    checked={input.filterable} // Make sure to set the checked attribute
                                    onChange={handleInputChange}
                                />
                                <span >Filterable</span>



                            </div>


                        </div>
                    </div> */}


                    {/* <label htmlFor="name" className="block text-sm font-medium leading-6 mb-2  mx-2 text-gray-900">Label -  {input.type.charAt(0).toUpperCase() + input.type.slice(1)}</label> */}
                    {/* <p className="grid1-item">Label - {input.label.charAt(0).toUpperCase() + input.label.slice(1)}</p>
 
                    <p className="grid1-item">Type - {input.type.charAt(0).toUpperCase() + input.type.slice(1)}</p> */}


                </div>
            ))}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 px-2 py-5 sm:max-w-lg">
                                    <span className="flex justify-end gap-9 mb-2">
                                        {editIndex == null ? <p className="text-md  font-semibold">Add New Input Field</p > : <p className="text-md  font-semibold">Edit Input Field</p>}


                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => {
                                            setOpen(false)

                                        }} fill="currentColor" className="w-5 h-5 me-2">

                                            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                        </svg></span>


                                    {/* <p className="text-md text-center my-2 font-semibold"> Add New Input Field</p> */}

                                    <form>
                                        <div className="flex">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 mt-3 mb-2 mx-2 text-gray-900">
                                                Label
                                            </label>
                                            <div className="">
                                                <span className="mt-3 ms-3">:</span>
                                                <input
                                                    id="name"
                                                    name="label"
                                                    type="text"
                                                    autoComplete="name"
                                                    required
                                                    value={newInputField.label}
                                                    onChange={handleInputChange}
                                                    className="p-2 m-2 text-xs w-72 bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        {newInputField.field != "predefined" &&
                                            // editIndex == null && 
                                            <div >
                                                <div className="flex  gap-2">
                                                    <label htmlFor="venue" className="block text-sm font-medium leading-6 mt-3 mb-2  mx-2 text-gray-900 ">Type </label>
                                                    <div className="relative inline-block text-left ">
                                                        <span className="mt-3 ms-1">:</span>
                                                        <select name="type" className={`p-2 m-2  ms-3 text-xs w-72
                                                         bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900
                                                          appearance-none shadow-sm placeholder:text-gray-400 
                                                        focus:outline-none focus:border-orange-400 sm:text-xs 
                                                        sm:leading-6 ${editIndex == null ? "" : "pointer-events-none opacity-30"}`}

                                                            value={newInputField.type} onChange={handleInputChange}>
                                                            {inputType && inputType.map((type, index) => (
                                                                <option value={type}  >{type}</option>
                                                            ))}

                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* {newInputField.type === "select" || newInputField.type === "multiselect" && <div>
                                                <input id="" name="" type="text" required
                                                    value={selectOption} onChange={(e) => setSelectOption(e.target.value)} className="p-2 m-2 text-xs  w-52 bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                                                <button onClick={addOption}>add</button>
                                                {newInputField.options && newInputField.options.length > 0 && newInputField.options.map((option, index) => (
                                                    <div>{option}</div>
                                                ))}
                                            </div>
                                            } */}
                                                {
                                                    (newInputField.type === "select" || newInputField.type === "multiselect") && (

                                                        <div>
                                                            <p className="text-xs  flex justify-center"> Add options for  &nbsp;<span className="font-semibold text-xs">  select </span></p>
                                                            <div className="flex ">
                                                                <label htmlFor="venue" className="block text-sm font-medium leading-6 mt-3 mb-2  ms-2 text-gray-900 ">Option </label><div><span className="mt-3 ms-2">:</span>
                                                                    <input
                                                                        id=""
                                                                        name=""
                                                                        type="text"
                                                                        required
                                                                        value={selectOption}
                                                                        onChange={(e) => setSelectOption(e.target.value)}
                                                                        className="p-2 gap-2 m-2 text-xs w-56 bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6"
                                                                    />
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center rounded-md bg-orange-600 px-3 py-2 m-2 text-sm font-semibold text-white shadow-sm  "
                                                                    onClick={addOption}
                                                                >
                                                                    Add
                                                                </button>
                                                            </div>
                                                            <div className="ps-2 py-2">                                                      {newInputField.options && newInputField.options.length > 0 && (
                                                                <div class=" border border-1 w-[360px] border-gray-200 mb-3  ps-1 py-1 rounded-md">
                                                                    {newInputField.options.map((option, index) => (
                                                                        <span key={index} className="text-xs">
                                                                            {option}<span onClick={() => deleteOption(index)}> x</span>{index != newInputField.options.length - 1 && <span>, </span>}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            </div>
                                                            {/* <button onClick={addOption} >add</button> */}
                                                            {/* {newInputField.options && newInputField.options.length > 0 && newInputField.options.map((option, index) => (
                                                            <span key={index}>  {option}{index != newInputField.options.length - 1 && <span>,</span>} </span>
                                                        ))} */}




                                                        </div>
                                                    )
                                                }
                                                <div className="flex gap-5 justify-center">
                                                    <div className="mb-6 flex items-end gap-1">
                                                        <input
                                                            // className="mb-1"
                                                            type="checkbox"
                                                            id="mandatory"
                                                            name="mandatory"
                                                            checked={newInputField.mandatory} // Make sure to set the checked attribute
                                                            onChange={handleInputChange}
                                                        />
                                                        <span className="text-xs">Mandatory</span>
                                                    </div>
                                                    {<div

                                                        className={`mb-6 flex items-end gap-1
                                                         ${newInputField.type === "text" ||
                                                                newInputField.type === "email" ||
                                                                newInputField.type === "number" ||
                                                                newInputField.type === "textarea" ||
                                                                newInputField.type === "date" ||
                                                                newInputField.type === "select" ||
                                                                newInputField.type === "multiselect" ||
                                                                newInputField.type === "time" ? "" : "pointer-events-none opacity-30"}`}

                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id="filterable"
                                                            name="filterable"
                                                            checked={newInputField.filterable} // Make sure to set the checked attribute
                                                            onChange={handleInputChange}
                                                        />
                                                        <span className="text-xs">Filterable</span>
                                                    </div>}
                                                </div>

                                                {/* <div className="text-center">
                                                Mandatory

                                                <input
                                                    type="checkbox"
                                                    id="mandatory"
                                                    name="mandatory"
                                                    checked={newInputField.mandatory} // Make sure to set the checked attribute
                                                    onChange={handleInputChange}

                                                />  <span className="text-xs">Mandatory</span>
                                            </div>
                                            <div className="flex items-end  gap-1">

                                                <input
                                                    type="checkbox"
                                                    id="filterable"
                                                    name="filterable"
                                                    checked={newInputField.filterable} // Make sure to set the checked attribute
                                                    onChange={handleInputChange}

                                                />



                                            </div> */}
                                            </div>}


                                    </form>

                                    <div className="w-full ">
                                        <button
                                            type="button"
                                            className="rounded-md w-[360px] bg-orange-600 px-3 py-2 text-sm  text-white shadow-sm sm:ml-3 "
                                            onClick={addOrUpdateInput}
                                        >
                                            Submit
                                        </button>

                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>


            <div className="flex justify-end me-10 mt-2">
                <button type="submit" class="rounded-md bg-orange-600 px-8 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 " onClick={handleSubmitCustomForm}>Save</button>
            </div>


        </div >
    )
}
export default SettingEntityForm
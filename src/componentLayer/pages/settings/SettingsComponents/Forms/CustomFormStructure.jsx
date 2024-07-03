import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import $ from "jquery";
const CustomFormStructure = () => {
  let { formName } = useParams();
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const cancelButtonRef = useRef(null);
  const [customForm, setCustomForm] = useState();
  const [tableView, setTableView] = useState();
  const [newInputField, setNewInputField] = useState({
    label: "",
    type: "",
    inputname: "",
    value: "",
    filterable: false,
    mandatory: false,
    field: "custom",
  });
  console.log("newInputField",newInputField)
  useEffect(() => {
    axios
      .get(`https://atbtbeta.infozit.com/form/list?name=${formName}`)
      .then((response) => {
        // Handle the successful response
        setCustomForm(response.data.Data); 
        setTableView(response.data.Tableview);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    console.log("customform", customForm);
    console.log("tableView", tableView);
    console.log("newInputField", newInputField);
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name == "type" && value === "select") {
      let newfield = { ...newInputField };
      newfield.options = {
        type: "custom",
        value: [],
      };
      newfield.value = "";
      setNewInputField(newfield);
    }
    if (name == "type" && value === "multiselect") {
      let newfield = { ...newInputField };
      newfield.options = {
        type: "custom",
        value: [],
      };
      newfield.value = [];
      setNewInputField(newfield);
    }
    if (name == "label") {
      if (editIndex == null) {
        setNewInputField((prev) => ({
          ...prev,
          label: value,
          inputname: value.replace(/\s+/g, "").toLowerCase(),
        }));
      }
      if (editIndex != null) {
        setNewInputField((prev) => ({ ...prev, label: value }));
      }
    } else {
      setNewInputField((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  let [selectOption, setSelectOption] = useState("");

  const addOption = (e) => {
    e.preventDefault();

    if (selectOption !== "") {
      setNewInputField((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          value: [...prev.options.value, selectOption],
        },
      }));
    } else {
      console.error("No option provided!");
    }

    setSelectOption("");
  };

  // validations for popup

  const [addInputerrors, setAddInputErrors] = useState({});
  useEffect(() => {
    console.log("addInputerrors", addInputerrors);
  });
  const [isAddInputFormErrorspresent, setIsAddInputFormErrorspresent] =
    useState(false);

  const checkAddInpuValidation = () => {
    let isErrorspresent = false;

    if (!newInputField.label.trim()) {
      setAddInputErrors((prev) => ({
        ...prev,
        label: "Label is required",
      }));

      isErrorspresent = true;
    } else if (newInputField.label.trim().length < 2) {
      setAddInputErrors((prev) => ({
        ...prev,
        label: "Enter atleast 2 characters",
      }));

      isErrorspresent = true;
    } else {
      setAddInputErrors((prev) => ({
        ...prev,
        label: "",
      }));
    }
    if (editIndex == null) {
      for (let i = 0; i < customForm.length; i++) {
        if (customForm[i].inputname === newInputField.inputname) {
          setAddInputErrors((prev) => ({
            ...prev,
            label: `You can't give ${newInputField.label} as label because it is already used`,
          }));
          isErrorspresent = true;
        }
      }
    }

    if (!newInputField.type.trim()) {
      setAddInputErrors((prev) => ({
        ...prev,
        type: "Type is required",
      }));

      isErrorspresent = true;
    } else {
      setAddInputErrors((prev) => ({
        ...prev,
        type: "",
      }));
    }

    if (
      (newInputField.type === "select" ||
        newInputField.type === "multiselect") &&
      newInputField.options.value.length === 0
    ) {
      setAddInputErrors((prev) => ({
        ...prev,
        options: "At least one option is required",
      }));

      isErrorspresent = true;
    } else {
      setAddInputErrors((prev) => ({
        ...prev,
        options: "",
      }));
    }
    if (isErrorspresent) {
      setIsAddInputFormErrorspresent(true);
    }
    if (!isErrorspresent) {
      setIsAddInputFormErrorspresent(false);
    }
    return isErrorspresent;
  };
  useEffect(() => {
    if (isAddInputFormErrorspresent && newInputField) {
      checkAddInpuValidation();
    }
  }, [newInputField]);

  const addOrUpdateInput = (e) => {
    e.preventDefault();

    if (!checkAddInpuValidation()) {
      if (editIndex !== null) {
        // Edit existing field
        const updatedForm = [...customForm];
        updatedForm[editIndex] = newInputField;
        setCustomForm(updatedForm);
        if (newInputField.type &&
          newInputField.type !== "checkbox" &&
          newInputField.type !== "password" &&
          newInputField.type !== "textarea" &&
          newInputField.type !== "multiselect" 
        ) {
          setTableView((prevState) => {
            const updatedState = { ...prevState };
            updatedState[newInputField.inputname] = {
              ...updatedState[newInputField.inputname],
              label: newInputField.label,
            };

            return updatedState;
          });
        }
      } else {
        // Add new field
        if (
          newInputField.type === "text" ||
          newInputField.type === "email" ||
          newInputField.type === "password" ||
          newInputField.type === "number" ||
          newInputField.type === "phonenumber" ||
          newInputField.type === "textarea" ||
          newInputField.type === "file" ||
          newInputField.type === "date" ||
          newInputField.type === "checkbox" ||
          newInputField.type === "range" ||
          newInputField.type === "time"
        ) {
          let newField = { ...newInputField };
          delete newField.options;
          setCustomForm((prev) => [...prev, newField]);
          if (newInputField.type &&
            newInputField.type !== "checkbox" &&
            newInputField.type !== "password" &&
            newInputField.type !== "textarea" &&
            newInputField.type !== "multiselect"

          
          ) {
            setTableView((prevState) => {
              const updatedState = { ...prevState };
              updatedState[newInputField.inputname] = {
                label: newInputField.label,
                value: false,
                type: newInputField.type,
              };
              return updatedState;
            });
          }
        } else {
          setCustomForm((prev) => [...prev, newInputField]);
          if (newInputField.type &&
            newInputField.type !== "checkbox" &&
            newInputField.type !== "password" &&
            newInputField.type !== "textarea" &&
            newInputField.type !== "multiselect"


            
          ) {
            setTableView((prevState) => {
              const updatedState = { ...prevState };
              updatedState[newInputField.inputname] = {
                label: newInputField.label,
                value: false,
                type: newInputField.type,
              };
              return updatedState;
            });
          }
        }
      }
      setOpen(false);
    }
  };
  // validations end
  const handleMoveDimension = (index, direction) => {
    const updatedForm = [...customForm];
    if (direction === "up" && index > 0) {
      [updatedForm[index], updatedForm[index - 1]] = [
        updatedForm[index - 1],
        updatedForm[index],
      ];
    } else if (direction === "down" && index < updatedForm.length - 1) {
      [updatedForm[index], updatedForm[index + 1]] = [
        updatedForm[index + 1],
        updatedForm[index],
      ];
    }
    setCustomForm(updatedForm);
  };
  const deleteInput = async (index) => {
    const updatedForm = [...customForm];
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this field!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#fff",
      confirmButtonText: "Delete",
      customClass: {
        popup: "custom-swal2-popup",
        title: "custom-swal2-title",
        content: "custom-swal2-content",
      },
    });
    if (confirmDelete.isConfirmed) {
      try {
        let deletedInputName = updatedForm[index].inputname;
        let newTableView = { ...tableView };
        delete newTableView[deletedInputName];
        setTableView(newTableView);
        updatedForm.splice(index, 1);
        setCustomForm(updatedForm);
      } catch (error) {
        Swal.fire("Error", "Unable to delete user 🤯", "error");
      }
    }
  };
  const inputType = [
    { label: "Text", value: "text" },
    { label: "Email", value: "email" },
    { label: "Number", value: "number" },
    { label: "Phone Number", value: "phonenumber" },
    { label: "Text Area", value: "textarea" },
    { label: "Date", value: "date" },
    { label: "Select", value: "select" },
    { label: "Multi Select", value: "multiselect" },
    { label: "Range", value: "range" },
    { label: "Time", value: "time" },
  ];
  const handleSubmitCustomForm = async () => {
    let formData = {
      arrayOfObjects: customForm,
      Name: formName,
      Tableview: tableView,
    };
    await saveCustomForm(formData);
    console.log("formName", formData);
  };
  const saveCustomForm = async (formData) => {
    toast.promise(
      axios.put(`https://atbtbeta.infozit.com/form/${formName}`, formData),
      {
        pending: "Updating Form",
        success: {
          render({ data }) {
            let formData = {
              arrayOfObjects: customForm,
            };

            return `Form Updated`;
          },
        },
        error: "Unable to update form 🤯",
      }
    );
  };
  const deleteOption = (index) => {
    let updatedNewInputField = { ...newInputField };
    let updatedOptions = [...updatedNewInputField.options.value];
    updatedOptions.splice(index, 1);
    updatedNewInputField.options.value = updatedOptions;
    setNewInputField(updatedNewInputField);
  };

  const [filedopen, setFiledOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const handleFiledOpen = (select) => {
    if (selected == select) {
      setSelected("");
    }
    if (selected != select) {
      setSelected(select);
    }
    setFiledOpen(!filedopen);
  };

  $("input[type=number]").on("mousewheel", function (e) {
    $(e.target).blur();
  });
  return (
    <div className="p-4  bg-[#f8fafc] w-full">
      {/* for heading and back button */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <p className="col-span-1 text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">
          Custom&nbsp;
          {formName === "userform" && (
            <span className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">
              User Form
            </span>
          )}
          {formName === "entityform" && (
            <span className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">
              Entity Form
            </span>
          )}
          {formName === "boardmeetingform" && (
            <span className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">
               Meeting Form
            </span>
          )}
          {formName === "teamform" && (
            <span className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">
              Teams Form
            </span>
          )}
        </p>
        {/* sm:text-start md:text-end lg:text-end xl:text-end */}
        <div className="col-span-1 text-end mt-4 sm:mt-0">
          <button
            type="submit"
            onClick={(e) => {
              setEditIndex(null);
              setNewInputField({
                label: "",
                type: "",
                inputname: "",
                value: "",
                filterable: false,
                mandatory: false,
                field: "custom",
              });
              setOpen(true);
            }}
            className="mr-3 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white"
          >
            + Add Field
          </button>
          <Link to="/settings/forms">
            <button
              type="submit"
              className="create-btn px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1"
            >
              Back
            </button>
          </Link>
        </div>
      </div>
      {/* custom fileds */}
      <div className="flex  mt-3 ">
        <div className="w-full px-3 py-4 text-left text-xs ">
          {customForm &&
            customForm.length > 0 &&
            customForm.map((input, index) => (
              <div>
                <div role="button" className="block">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex justify-between items-center bg-[#f2f2f2] p-4 w-full">
                      <div className="flex text-black font-semibold  flex-wrap break-all ">
                        <div
                          className=" "
                          onClick={() => handleFiledOpen(input.inputname)}
                        >
                          {input.label.charAt(0).toUpperCase() +
                            input.label.slice(1)}
                        </div>
                      </div>
                      <div className="flex gap-3 md:gap-10">
                        {/* up and down moving icons */}

                        <svg
                          disabled={
                            input.field === "predefined" ||
                            (input.field === "custom" &&
                              customForm[index - 1]?.field === "predefined")
                          }
                          className={`${
                            input.field === "predefined" ||
                            (input.field === "custom" &&
                              customForm[index - 1]?.field === "predefined")
                              ? "text-gray-400 cursor-not-allowed"
                              : ""
                          } w-5 h-5`}
                          onClick={() => {
                            if (
                              !(
                                input.field === "predefined" ||
                                (input.field === "custom" &&
                                  customForm[index - 1]?.field === "predefined")
                              )
                            ) {
                              handleMoveDimension(index, "up");
                            }
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <svg
                          disabled={
                            input.field === "predefined" ||
                            (input.field === "custom" &&
                              customForm?.length === index + 1)
                          }
                          className={`${
                            input.field === "predefined" ||
                            (input.field === "custom" &&
                              customForm?.length === index + 1)
                              ? "text-gray-400 cursor-not-allowed"
                              : ""
                          } w-5 h-5 `}
                          onClick={() => {
                            if (
                              !(
                                input.field === "predefined" ||
                                (input.field === "custom" &&
                                  customForm?.length === index + 1)
                              )
                            ) {
                              handleMoveDimension(index, "down");
                            }
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        {/* Open and Close Arrow*/}
                        <svg
                          onClick={() => handleFiledOpen(input.inputname)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          {input.inputname === selected ? (
                            <path
                              fillRule="evenodd"
                              d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                              clipRule="evenodd"
                            />
                          ) : (
                            <path
                              fillRule="evenodd"
                              d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                              clipRule="evenodd"
                            />
                          )}
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {input.inputname == selected && (
                  <div className="px-6">
                    <div className="border-b border-slateStroke flex flex-wrap py-4  gap-2">
                      <div className="sm:w-full sm-py-1 md:w-1/5 lg:w-1/5 xl:w-1/5 text-body text-darkSlate01 text-md text-body pt-2">
                        Field Title
                      </div>
                      <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:1/2">
                        <div className="w-full relative m-0">
                          <div className="w-full">
                            <div className="input-mol  p-[0.5rem] w-full text-darkSlate01 text-sm rounded focus:outline-none bg-[#f8fafc] focus:shadow-none border border-slate04 focus:border-slate01!rounded-none py-3 !text-body px-4  undefined cursor-default">
                              {input.label.charAt(0).toUpperCase() +
                                input.label.slice(1)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-slateStroke flex flex-wrap py-4 gap-2">
                      <div className="sm:w-full sm-py-1 md:w-1/5 lg:w-1/5 xl:w-1/5 text-body text-darkSlate01 text-md text-body pt-2">
                        Field Type
                      </div>
                      <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:1/2">
                        <div className="relative w-full m-0">
                          <div className="w-full">
                            <div className="input-mol  p-[0.5rem] w-full text-darkSlate01 text-sm rounded focus:outline-none bg-[#f8fafc] focus:shadow-none border border-slate04 focus:border-slate01!rounded-none py-3 !text-body px-4  undefined cursor-default">
                              {input.type.charAt(0).toUpperCase() +
                                input.type.slice(1)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-4 sm:gap-0 md:gap-10">
                      <div className="w-1/5 hidden sm:block"></div>
                      <div className="flex flex-wrap pt-5  gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 mt-1"
                        >
                          {input.mandatory ? (
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          ) : (
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          )}
                        </svg>
                        <div className="text-body text-darkSlate01">
                          Mandatory
                        </div>
                      </div>
                      <div className="flex flex-wrap pt-5 gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 mt-1"
                        >
                          {input.filterable ? (
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          ) : (
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          )}
                        </svg>
                        <div className="text-body text-darkSlate01 lg:pe-20">
                          Filtered
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end w-full pb-2">
                      <div className="mr-4">
                        <button
                          className="flex  justify-center rounded-md  border-2 border-orange-600 px-3 py-2 text-sm font-medium leading-6 text-orange-600 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                          onClick={() => {
                            setNewInputField(input);
                            setEditIndex(index);
                            setOpen(true);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                      <div className="mr-4">
                        <button
                          className={`flex w-full justify-center rounded-md bg-[#dc2626] px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${
                            input.field === "custom"
                              ? ""
                              : "pointer-events-none opacity-30  cursor-not-allowed"
                          }`}
                          onClick={() => {
                            deleteInput(index);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
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
            <div className="flex items-center justify-center min-h-screen">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 px-2 py-5 ">
                  <span className="flex justify-between mb-2">
                    <span>
                      {editIndex == null ? (
                        <p className="text-md ms-16 md:ms-28 font-semibold">
                          Add New Input Field
                        </p>
                      ) : (
                        <p className="text-md   ms-20 md:ms-28 font-semibold">
                          Edit Input Field
                        </p>
                      )}
                    </span>
                    <span className="text-end">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        onClick={() => {
                          setOpen(false);
                        }}
                        fill="currentColor"
                        className="w-5 h-5 me-2 text-end"
                      >
                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                      </svg>
                    </span>
                  </span>
                  <form>
                    <div className="flex mb-3 items-start">
                      <label
                        htmlFor="name"
                        className="inline-flex text-sm font-medium leading-6 mt-2 text-gray-900"
                      >
                        Label<span className="text-[#dc2626]"> * </span>
                      </label>
                      <span className="mt-2 mx-2.5">:</span>
                      <input
                        id="name"
                        name="label"
                        type="text"
                        autoComplete="name"
                        required
                        value={newInputField.label}
                        onChange={handleInputChange}
                        className="px-2 py-2 text-sm block w-full md:w-72 lg:w-72 xl:w-72 rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-gray-400 appearance-none "
                      />
                    </div>
                    <span className=" text-[#dc2626]">
                      {addInputerrors.label && (
                        <span className="text-xs flex justify-center ms-14 md:ms-0">
                          {addInputerrors.label}
                        </span>
                      )}
                    </span>
                    {
                      <div>
                        <div className="flex items-start mb-3">
                          <label className="inline-flex text-sm font-medium leading-6 mt-2 text-gray-900">
                            Type <span className="text-[#dc2626]"> * </span>
                          </label>
                          <span className="mt-2 mx-3">:</span>

                          <div className="relative">
                            {/* p-2 mx-2  py-1.5 my-2 text-xs w-full md:w-72 lg:w-72 xl:w-72 bg-gray-50 rounded-md border-2  border-gray-200  text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs  custom-scroll */}
                            <select
                              name="type"
                              className={`px-2 py-2 text-sm block w-full md:w-72 lg:w-72 xl:w-72 rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-gray-400 appearance-none " ${
                                editIndex == null
                                  ? ""
                                  : "pointer-events-none opacity-30"
                              }`}
                              value={newInputField.type}
                              onChange={handleInputChange}
                              style={{
                                fontSize: "0.8rem",
                                color: newInputField.type
                                  ? "#111827"
                                  : "#a1a1aa",
                              }}
                            >
                              <option value="" disabled defaultValue>
                                Select
                              </option>
                              {inputType &&
                                inputType.map((type, index) => (
                                  <option
                                    value={type.value}
                                    style={{ color: "#111827" }}
                                  >
                                    {type.label}
                                  </option>
                                ))}
                            </select>
                            <svg
                              className="w-4 h-4 text-gray-700 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className=" text-[#dc2626]">
                          {addInputerrors.type && (
                            <span className="text-xs flex justify-center ms-14 md:ms-0">
                              {addInputerrors.type}
                            </span>
                          )}
                        </div>
                        {(newInputField.type === "select" ||
                          newInputField.type === "multiselect") &&
                          newInputField.options.type === "custom" && (
                            <div>
                              <p className="text-xs   ms-16 md:ms-0 md:text-center ">
                                Add options for &nbsp;
                                <span className="font-semibold text-xs">
                                  multi select
                                </span>
                              </p>
                              <div className="flex ">
                                <label
                                  htmlFor="venue"
                                  className="inline-flex text-sm font-medium leading-6 mt-3 text-gray-900 "
                                >
                                  Option{" "}
                                  <span className="text-[#dc2626]"> * </span>{" "}
                                </label>
                                <span className="mt-3 ms-4 ">:</span>
                                <input
                                  id=""
                                  name=""
                                  type="text"
                                  required
                                  value={selectOption}
                                  onChange={(e) =>
                                    setSelectOption(e.target.value)
                                  }
                                  className="p-2 m-2 text-xs w-full py-1.5  md:w-56 lg:w-56 xl:w-56 bg-gray-50 rounded-md border-2 border-gray-200  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 "
                                />
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md bg-orange-600 px-3 py-2 m-2 text-sm font-semibold text-white shadow-sm sm:text-end"
                                  onClick={addOption}
                                >
                                  Add
                                </button>
                              </div>
                              <div className=" text-[#dc2626]">
                                {addInputerrors.options && (
                                  <span className="text-xs flex justify-center ms-16 md:ms-0">
                                    {addInputerrors.options}
                                  </span>
                                )}
                              </div>
                              <div className="ps-2 py-2">
                                {newInputField.options.type === "custom" &&
                                  newInputField.options.value &&
                                  newInputField.options.value.length > 0 && (
                                    <div
                                      className="  border border-1 md:w-[360px] border-gray-200 mb-3  ps-1 py-1 rounded-md gap-2 flex flex-wrap overflow-y-auto"
                                      style={{ maxHeight: "100px" }}
                                    >
                                      {newInputField?.options?.value?.map(
                                        (option, index) => (
                                          <span
                                            key={index}
                                            className="text-xs border border-1 border-gray-200 rounded-md p-1  flex"
                                          >
                                            {option}
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 16 16"
                                              fill="currentColor"
                                              className="w-4 h-4"
                                              onClick={() =>
                                                deleteOption(index)
                                              }
                                            >
                                              <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                            </svg>
                                          </span>
                                        )
                                      )}
                                      &nbsp;
                                    </div>
                                  )}
                              </div>
                            </div>
                          )}
                        <div className="flex gap-5 justify-center">
                          <div className="mb-6 flex items-end gap-1">
                            <input
                              type="checkbox"
                              id="mandatory"
                              name="mandatory"
                              checked={newInputField.mandatory} // Make sure to set the checked attribute
                              onChange={handleInputChange}
                            />
                            <span className="text-xs">Mandatory</span>
                          </div>
                          {
                            <div
                              className={`mb-6 flex items-end gap-1
                                                         ${
                                                           newInputField.type ===
                                                             "text" ||
                                                           newInputField.type ===
                                                             "email" ||
                                                           newInputField.type ===
                                                             "number" ||
                                                           newInputField.type ===
                                                             "phonenumber" ||
                                                           newInputField.type ===
                                                             "textarea" ||
                                                           newInputField.type ===
                                                             "date" ||
                                                           newInputField.type ===
                                                             "select" ||
                                                           newInputField.type ===
                                                             "multiselect" ||
                                                           newInputField.type ===
                                                             "time"
                                                             ? ""
                                                             : "pointer-events-none opacity-30"
                                                         }`}
                            >
                              <input
                                type="checkbox"
                                id="filterable"
                                name="filterable"
                                checked={newInputField.filterable} // Make sure to set the checked attribute
                                onChange={handleInputChange}
                              />
                              <span className="text-xs">Filterable</span>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </form>
                  <div className="w-full flex justify-end  ">
                    <button
                      type="button"
                      className="rounded-md  bg-orange-600 me-2 px-3 py-2 text-sm  text-white shadow-sm sm:ml-3 "
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
      <div className="  mt-2 flex justify-end">
        <button
          className="flex justify-end rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          onClick={handleSubmitCustomForm}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomFormStructure;

/////////predefined fields

///////////userform
// [
//   {
//     "label": "Full Name",
//     "inputname": "name",
//     "type": "text",
//     "value": "",
//     "field": "predefined",
//     "mandatory": true,
//     "filterable": true
//   },
//   {
//     "label": "Image",
//     "inputname": "image",
//     "type": "file",
//     "value": "",
//     "field": "predefined",
//     "mandatory": false,
//     "filterable": false
//   },
//   {
//     "label": "Entity Name",
//     "type": "select",
//     "inputname": "entityname",
//     "value": "",
//     "filterable": true,
//     "mandatory": true,
//     "field": "predefined",
//     "options": {
//       "type":"predefined","value":"entityname"
//     }
//   },
//   {
//     "label": "Email Id",
//     "inputname": "email",
//     "type": "email",
//     "value": "",
//     "field": "predefined",
//     "mandatory": true,
//     "filterable": true
//   },
//   {
//     "label": "Phone Number",
//     "inputname": "phonenumber",
//     "type": "phonenumber",
//     "value": "",
//     "field": "predefined",
//     "mandatory": true,
//     "filterable": true
//   },
//   {
//     "label": "Designation",
//     "type": "select",
//     "inputname": "designation",
//     "value": "",
//     "filterable": true,
//     "mandatory": true,
//     "field": "predefined",
//     "options": {
//       "type":"custom","value":["developer","marketer"]
//     }
//   },
//   {
//     "label": "Role",
//     "type": "select",
//     "inputname": "role",
//     "value": "",
//     "filterable": true,
//     "mandatory": true,
//     "field": "predefined",
//     "options": {
//       "type":"predefined","value":"role"
//     }
//   }
// ]

//////////////////////predefined tableview
// {
//   "name": {
//     "label": "Name",
//     "value": true,
//     "type":"text"
//   },
//   "entityname": {
//     "label": "Entity Name",
//     "value": true,
//     "type":"select"
//   },
//   "email": {
//     "label": "Email Id",
//     "value": true,
//     "type":"email"

//   },
//   "phonenumber": {
//     "label": "Phone Number",
//     "value": true,
//     "type":"phonenumber"

//   },
//   "designation": {
//     "label": "Designation",
//     "value": true,
//     "type":"select"

//   },
//   "role": {
//     "label": "Role",
//     "value": false,
//     "type":"select"

//   }
// }

//////////////////////////////////   entityform

// [
//   {
//     "label": "Full Name",
//     "inputname": "name",
//     "type": "text",
//     "value": "",
//     "field": "predefined",
//     "mandatory": true,
//     "filterable": true
//   },
//   {
//     "label": "Image",
//     "inputname": "image",
//     "type": "file",
//     "value": "",
//     "field": "predefined",
//     "mandatory": false,
//     "filterable": false
//   },
//   {
//     "label": "Description",
//     "inputname": "description",
//     "type": "textarea",
//     "value": "",
//     "field": "predefined",
//     "mandatory": true,
//     "filterable": false
//   },
//   {
//     "label": "Add Members",
//     "inputname": "members",
//     "type": "multiselect",
//     "value": [],
//     "field": "predefined",
//     "mandatory": true,
//     "filterable": false,
//     "options": {
//             "type":"predefined","value":"users"
//           }
//   },

// ]

/////////////////////// predefined tableview
// {
//   "name": {
//       "label": "Name",
//       "value": true,
// "type":"text"
//   }
// }

///////////////////////////////////////// board meeting
//  [
//   {
//     "label": "Meeting Id",
//     "inputname": "meetingnumber",
//     "type": "text",
//     "value": "",
//     "field": "predefined",
//     "mandatory": true,
//     "filterable": true
//   },
//   {
//     "label": "Meeting Date",
//     "inputname": "date",
//     "type": "date",
//     "value": "",
//     "field": "predefined",
//     "mandatory": true,
//     "filterable": true
//   },
//   {
//     "label": "Description",
//     "inputname": "description",
//     "type": "textarea",
//     "value": "",
//     "field": "predefined",
//     "mandatory": false,
//     "filterable": false
//   },
//   {
//     "label": "Add Invitees",
//     "inputname": "members",
//     "type": "multiselect",
//     "value": [],
//     "field": "predefined",
//     "mandatory": true,
//     "filterable": false,
//     "options": {
//       "type": "predefined", "value": "users"
//     }
//   },
//   {
//         "label": "Attachment",
//         "inputname": "image",
//         "type": "file",
//         "value": "",
//         "field": "predefined",
//         "mandatory": false,
//         "filterable": false
//       },

// ],

/////////////////////// predefined tableview
// {
//   "meetingnumber": {
//       "label": "Meeting Id",
//       "value": true,
//       "type": "text"
//   },
//   "date": {
//       "label": "Initial Date of Decision",
//       "value": true,
//       "type": "date"
//   }
// },
///////////////team form

//[
//   {
//       "label": "Full Name",
//       "inputname": "name",
//       "type": "text",
//       "value": "",
//       "field": "predefined",
//       "mandatory": true,
//       "filterable": true
//   },
//   {
//       "label": "Image",
//       "inputname": "image",
//       "type": "file",
//       "value": "",
//       "field": "predefined",
//       "mandatory": false,
//       "filterable": false
//   },
//   {
//       "label": "Description",
//       "inputname": "description",
//       "type": "textarea",
//       "value": "",
//       "field": "predefined",
//       "mandatory": true,
//       "filterable": false
//   },
//   {
//       "label": "Add Members",
//       "inputname": "members",
//       "type": "multiselect",
//       "value": [],
//       "field": "predefined",
//       "mandatory": true,
//       "filterable": false,
//       "options": {
//                     "type":"predefined","value":"users"
//                   }
//   }
// ]

//////////////////
// {
//   "name": {
//       "label": "Full Name",
//       "value": true,
//       "type":"text"
//   }
// }

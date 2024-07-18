import React, { useEffect, useState, useCallback, useRef } from "react";
import Select from "react-select";
import {
  Link,
  useFetcher,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import Swal from "sweetalert2";
import { dateFormat, debounce } from "../../../../utils/utils";
import GateKeeper from "../../../../rbac/GateKeeper";
import CustomColumn from "../../../components/tableCustomization/CustomColumn";
import CustomFilter from "../../../components/tableCustomization/CustomFilter";
import atbtApi from "../../../../serviceLayer/interceptor";
import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";
let moduleOptions = [
  // { label: "User", value: "user" },
  { label: "Entity", value: "entity" },
  { label: "Team", value: "team" },
];
export async function loader({ request, params }) {
  try {
    let url = new URL(request.url);
    const [meetings, roleList, meetingFormData] = await Promise.all([
      atbtApi.get(`boardmeeting/list${url?.search ? url?.search : ""}`),
      // atbtApi.post(`public/list/boardmeeting`),
      atbtApi.post(`public/list/role`),
      atbtApi.get(`form/list?name=boardmeetingform`),
    ]);
    console.log(meetings, "meetings loaderp");
    const combinedResponse = {
      meetings: meetings?.data,
      fieldsDropDownData: {
        role: roleList?.data?.roles?.map((item) => item.name),
        // boardmeetingname: meetingList?.data?.Meetings?.map((item) => item.name),
        boardmeetingname: ["infosys", "relid"],
      },
      tableViewData: meetingFormData?.data?.Tableview,
      customForm: meetingFormData?.data?.Data,
    };
    console.log(combinedResponse, "entities response", request, params);
    return combinedResponse;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}
export async function action({ request, params }) {
  switch (request.method) {
    case "DELETE": {
      const id = (await request.json()) || null;
      console.log(id, "json", id);
      return await atbtApi.delete(`boardmeeting/delete/${id}`);
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}
function BoardMeetings() {
  document.title = "ATBT | BoardMeeting";
  const navigation = useNavigation();
  let submit = useSubmit();
  let fetcher = useFetcher();
  const data = useLoaderData();
  const { meetings, tableViewData, fieldsDropDownData, customForm } = data;
  console.log("meetings",meetings)
  const [Qparams, setQParams] = useState({
    search: "",
    page: 1,
    pageSize: 10,
  });
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    debouncedParams(Qparams);
  }, [Qparams]);
  const debouncedParams = useCallback(
    debounce((param) => {
      console.log(param);
      submit(param, { method: "get", action: "." });
    }, 500),
    []
  );
  console.log("Qparams", Qparams);
  function handleSearch(event) {
    setQParams({
      ...Qparams,
      search: event.target.value,
    });
  }
  function handlePage(page) {
    setQParams({
      ...Qparams,
      page,
    });
  }
  const handlePerPageChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    console.log(selectedValue, "sv");
    setQParams({
      ...Qparams,
      pageSize: selectedValue,
    });
  };
  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load(".");
    }
  }, [fetcher, navigation]);
  const handleDeleteUser = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Board Meeting!",
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
        fetcher.submit(id, { method: "DELETE", encType: "application/json" });
      } catch (error) {
        Swal.fire("Error", "Unable to delete board meeting 🤯", "error");
      }
    }
  };
  const [tableView, setTableView] = useState(tableViewData);
  const [visibleColumns, setvisibleColumns] = useState();
  useEffect(() => {
    let visibleColumns = Object.keys(tableView || {}).filter(
      (key) => tableView[key]?.value
    );
    setvisibleColumns(visibleColumns);
  }, [tableView]);

  let [selectedModule, setSelectedModule] = useState("");
  let [ModuleListOptions, setModuleListOptions] = useState();
  let [selectedModuleList, setSelectedModuleList] = useState();

  const [filterMeetingDate, setFilterMeetingDate] = useState({
    fromDate: "",
    toDate: "",
  });
  // const [inputType , setInputType] = useState("text")
  // const handleFocus = () => {
  //   setInputType('date');
  // };

  // const handleBlur = () => {
  //   setInputType('text');
  // };
  useEffect(() => {
    // Ensure selectedModule exists before making the API call
    if (!selectedModule || !selectedModule.value) return;

    const fetchData = async () => {
      try {
        let response;

        switch (selectedModule.value) {
          case "user":
            response = await atbtApi.post("public/list/user");
            response = response?.data?.users?.map((user) => ({
              label: user.name,
              value: user.id,
            }));
            break;
          case "entity":
            response = await atbtApi.post("public/list/entity");

            response = response?.data?.Entites?.map((entity) => ({
              label: entity.name,
              value: entity.id,
            }));
            console.log("response", response);

            break;
          case "team":
            response = await atbtApi.post("public/list/team");

            response = response?.data?.Teams?.map((team) => ({
              label: team.name,
              value: team.id,
            }));

            break;
          default:
            console.warn("No valid selected module value.");
            return;
        }

        // Update state with the data from the API response
        setModuleListOptions(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error appropriately, e.g., set an error state or show a message
      }
    };

    fetchData();
  }, [selectedModule]);
  console.log(selectedModuleList, "selectedModuleList");
  return (
    <div className=" p-3">
      {/* search & filter */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-col-6 gap-2 mt-2 items-center">
        <h1 className="font-semibold text-lg col-span-1">
          {" "}
          <BreadCrumbs />
        </h1>
        <div className="col-span-1  text-start">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center p-3 pointer-events-none">
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={handleSearch}
              value={Qparams?.search}
              type="search"
              id="default-search"
              className="block w-full px-4 py-2 ps-8 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none placeholder:text-sm"
              placeholder="Search here..."
              required
            />
          </div>
        </div>
        <div className="col-span-1 md:col-span-4  filter_pagination divide-x-2 ">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-2 items-center justify-end">
            <div className="col-span-1 md:flex items-center">
              <label className="text-sm text-gray-400 me-3"> From&nbsp;:</label>

              <input
                className=" border border-[#d1d5db]  text-black px-1.5 py-2 rounded-md  bg-[#f9fafb] focus:outline-none text-sm focus:border-orange-400   w-full"
                type="date"
                value={filterMeetingDate.fromDate}
                style={{
                  fontSize: "0.8rem",
                  WebkitAppearance: "none",
                }}
                onChange={(e) => {
                  setQParams((prev) => ({ ...prev, fromDate: e.target.value }));
                  setFilterMeetingDate((prev) => ({
                    ...prev,
                    fromDate: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="colspan-1  md:flex items-center">
              <label className="text-sm text-gray-400 me-3"> To&nbsp;:</label>

              <input
                className=" border border-[#d1d5db] text-black px-1.5 py-2 rounded-md  bg-[#f9fafb] focus:outline-none text-sm focus:border-orange-400  w-full"
                // type={inputType}
                type="date"
                placeholder="select To Date"
                value={filterMeetingDate.toDate}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                style={{
                  fontSize: "0.8rem",
                  WebkitAppearance: "none",
                }}
                onChange={(e) => {
                  setQParams((prev) => ({
                    ...prev,

                    toDate: e.target.value,
                  }));
                  setFilterMeetingDate((prev) => ({
                    ...prev,
                    toDate: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="col-span-1">
              <Select
                menuPlacement="auto"
                maxMenuHeight={170}
                options={moduleOptions}
                value={selectedModule}
                onChange={(selectedOption) => {
                  setSelectedModule(selectedOption);
                  setSelectedModuleList("");
                  setModuleListOptions();
                  // setSelectedMeeting(null)
                }}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: "#f9fafb",
                    borderWidth: state.isFocused ? "1px" : "1px",
                    borderColor: state.isFocused ? "#orange-400" : "#d1d5db",
                    cursor:"pointer",
                    boxShadow: state.isFocused ? "none" : provided.boxShadow,
                    width: "100%", // Default width for small screens
                    "@media (min-width: 640px)": {
                      // Media query for medium screens and above
                      width: "full",
                    },
                  }),

                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: "12px",
                    color: "#a9a9a9",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: state.isFocused ? "#fff" : "#000000",
                    fontSize: "12px",
                    cursor:"pointer",
                    backgroundColor: state.isFocused
                      ? "#ea580c"
                      : "transparent",

                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "#ea580c",
                    },
                  }),
                 
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,

                    primary: "#fb923c",
                  },
                })}
              />
            </div>
            <div className="col-span-1">
              <Select
                menuPlacement="auto"
                maxMenuHeight={170}
                options={ModuleListOptions}
                value={selectedModuleList}
                 classNamePrefix="select"
                onChange={(selectedOption) => {
                  setSelectedModuleList(selectedOption);
                  // setSelectedMeeting(null)
                  // handleFilterChange("listID", selectedOption.value)
                  let qparms = { ...Qparams };
                  delete qparms.user;
                  delete qparms.entity;
                  delete qparms.team;
                  setQParams({
                    ...qparms,
                    [selectedModule.value]: selectedOption.value,
                  });
                }}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: "#f9fafb",
                    borderWidth: state.isFocused ? "1px" : "1px",
                    borderColor: state.isFocused ? "#orange-400" : "#d1d5db",
                    boxShadow: state.isFocused ? "none" : provided.boxShadow,
                    cursor:"pointer",
                    width: "100%", // Default width for small screens
                    "@media (min-width: 640px)": {
                      // Media query for medium screens and above
                      width: "full",
                    },
                  }),

                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: "12px",
                    color: "#a9a9a9",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: state.isFocused ? "#fff" : "#000000",
                    fontSize:"12px",
                    cursor: "pointer",  // Ensure cursor pointer is here
                    backgroundColor: state.isFocused
                      ? "#ea580c"
                      : "transparent",

                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "#ea580c",
                    },
                  }),
                  
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,

                    primary: "#fb923c",
                  },
                })}
                //  placeholder="bhavi"
              />
            </div>
            <div className="col-span-1 text-end">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    let Qprms = { ...Qparams };
                    delete Qprms.fromDate;
                    delete Qprms.toDate;
                    delete Qprms.user;
                    delete Qprms.entity;
                    delete Qprms.team;
                    setSelectedModule("");
                    setModuleListOptions();
                    setSelectedModuleList("");

                    setQParams(Qprms);
                    setFilterMeetingDate({ toDate: "", fromDate: "" });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4 cursor-pointer hover:text-orange-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
                <CustomColumn
                  tableView={tableView}
                  setTableView={setTableView}
                  form="boardmeetingform"
                />
                <CustomFilter
                  fieldsDropDownData={fieldsDropDownData}
                  Qparams={Qparams}
                  setQParams={setQParams}
                  customForm={customForm}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* table */}
      <div className="max-h-[457px] overflow-y-auto mt-5">
        {visibleColumns && tableView && meetings?.Meetings && (
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
            <thead>
              <tr>
                {visibleColumns.map((key) => (
                  <th
                    key={key}
                    className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                  >
                    {tableView[key].label}
                  </th>
                ))}
                <th
                  scope="col"
                  className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                >
                  Total Decisions
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                >
                  To-Do Decisions
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                >
                  In-Progress Decisions
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                >
                  Overdue Decisions
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                >
                  On-Hold Decisions
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                >
                  Completed Decisions
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                  style={{ width: "5rem" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {meetings?.Meetings &&
                meetings?.Meetings?.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-100 dark:hover:bg-gray-700"
                  >
                    {visibleColumns.map((key) => {
                      let value = row[key];
                      if (tableView[key].type === "multiselect" && row[key]) {
                        value = row[key].join(", ");
                      }
                      if (tableView[key].type === "date" && row[key]) {
                        value = dateFormat(row[key])
                      }
                      if (key === "meetingnumber") {
                        return (
                          <td
                            key={key}
                            className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden hover:text-orange-500`}
                            style={{ maxWidth: "160px" }}
                            title={value}
                          >
                            <GateKeeper
                              permissionCheck={(permission) =>
                                permission.module === "meeting" &&
                                permission.canRead
                              }
                            >
                              <Link to={`${row.id}/tasks?search=&page=1&pageSize=10`}>
                                <p className="truncate text-xs"> {value}</p>
                              </Link>
                            </GateKeeper>
                          </td>
                        );
                      } else {
                        return (
                          <td
                            key={key}
                            className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                            style={{ maxWidth: "160px" }}
                            title={value}
                          >
                            <p className="truncate text-xs"> {value}</p>
                          </td>
                        );
                      }
                    })}
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden `}
                      title=""
                    >
                      <p className="truncate text-xs">
                        {" "}
                        {row.taskCounts.totalTaskCount}
                      </p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      title=""
                    >
                      <p className="truncate text-xs">
                        {" "}
                        {row.taskCounts.toDoCount}
                      </p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      title=""
                    >
                      <p className="truncate text-xs">
                        {" "}
                        {row.taskCounts.inProgressCount}
                      </p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      title=""
                    >
                      <p className="truncate text-xs">
                        {" "}
                        {row.taskCounts.overDueCount}
                      </p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      title=""
                    >
                      <p className="truncate text-xs">
                        {" "}
                        {row.taskCounts.onHoldCount}
                      </p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      title=""
                    >
                      <p className="truncate text-xs">
                        {" "}
                        {row.taskCounts.completedCount}
                      </p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      title=""
                    >
                      <div className="flex justify-start gap-4">
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === "meeting" &&
                            permission.canRead
                          }
                        >
                          <button
                            type="button"
                            className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            <Link to={`${row.id}`} title="view">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </Link>
                          </button>
                        </GateKeeper>
                        {/* <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === "meeting" &&
                            permission.canUpdate
                          }
                        >
                          <button
                            type="button"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            <Link
                              to={{
                                pathname: `/boardmeetings/${row.id}/edit`,
                                search: `?boardmeetingFor=${moduleName}&boardmeetingForID=${id}`,
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                              </svg>
                            </Link>
                          </button>
                        </GateKeeper> */}
                        {/* <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === "meeting" &&
                            permission.canDelete
                          }
                        >
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(row.id)}
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 delete-button cursor-pointer "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-4 h-4 "
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                        </GateKeeper> */}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      {/* pagination */}
      <div className="inset-x-0 bottom-0 mt-5">
        <div className="md:flex md:justify-between block text-end">
          <div className="">
            {!meetings?.Meetings || meetings?.Meetings?.length === 0 ? (
              "no data to show"
            ) : meetings.loading ? (
              "Loading..."
            ) : (
              <p className="text-sm text-gray-700">
                Showing {meetings.startMeeting} to {meetings.endMeeting} of
                <span className="text-sm"> {meetings.totalMeetings}</span>
              </p>
            )}
          </div>
          <section
            className="isolate inline-flex rounded-md  ms-4 mt-2 md:mt-0"
            aria-label="Pagination"
          >
            <select
              value={Qparams?.pageSize}
              onChange={handlePerPageChange}
              className="focus:outline-none me-3 rounded-md bg-[#f8fafc]  px-1 py-1.5 text-sm font-semibold  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 shadow-sm  text-gray-500 cursor-pointer"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
            </select>
            <button
              disabled={meetings.currentPage == 1}
              onClick={() => handlePage(meetings?.currentPage - 1)}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                meetings.loading
                  ? "cursor-wait"
                  : meetings.currentPage == 1
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            {/* <button className="border w-8 border-gray-300">
              {meetings.currentPage}
            </button> */}
            <button
              disabled={meetings.currentPage == meetings.totalPages}
              onClick={() => handlePage(meetings?.currentPage + 1)}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                meetings.loading
                  ? "cursor-wait"
                  : meetings.currentPage == meetings.totalPages
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <span className="sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
export default BoardMeetings;

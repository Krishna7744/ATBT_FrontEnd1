import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, redirect } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext/authContext";
import GateKeeper from "../../../rbac/GateKeeper";
import defprop from "../../../assets/Images/defprof.svg";
import atbtApi from "../../../serviceLayer/interceptor";
import { PermissionsContext } from "../../../rbac/PermissionsProvider";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TopBar({ open, setOpen }) {
  const { permissions, loading } = useContext(PermissionsContext);

  const { userLogout, authState } = useContext(AuthContext);
  console.log("authState", permissions);
  const [logInUserDetails, setLogInUserDetails] = useState();
  console.log(logInUserDetails, "logInUserDetails");
  const [addTask, setAddTask] = useState(false);
  const toggleAddTaskDrawer = () => {
    setAddTask(!addTask);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authState?.user?.id) {
          const { data } = await atbtApi.get(`/user/list/${authState.user.id}`);
          setLogInUserDetails(data.user);
        }
      } catch (error) {
        console.error("Error loading dashboard:", error);
        // Redirect or handle error appropriately
      }
    };

    fetchData();
  }, [authState]);
  let userPermission = permissions?.find(
    (permission) => permission.module === "user"
  );
  let entityPermission = permissions?.find(
    (permission) => permission.module === "entity"
  );
  let teamPermission = permissions?.find(
    (permission) => permission.module === "team"
  );

  return (
    <div className="topbar w-full">
      <nav className="bg-white shadow-md ">
        <div className="mx-auto max-w-screen pe-2 sm:px-6 lg:px-2">
          <div
            className={`flex h-16 items-center justify-between gap-3 cursor-pointer ${
              open ? "expand" : "close"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 cusrsor-pointer mt-2 text-black"
              onClick={() => setOpen(!open)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
            <div className="flex flex-1 items-center  sm:items-stretch sm:justify-start">
              <div>
                {/* <button id="toggle-btn" type="button" onClick={toggleSidebar}>
                <CiMenuFries className="navbar_icons" />
              </button> */}

                {/* <button
                id="toggle-btn"
                type="button"
                className="bg_white"
                onClick={toggleSidebar}
              >
                bh
              </button> */}
              </div>
              <GateKeeper
                permissionCheck={(permission) =>
                  permission.module === "user" && permission.canCreate || permission.module === "entity" && permission.canCreate || permission.module === "team" && permission.canCreate 
                }
              >
                <div className="flex flex-shrink-0 items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className=" w-full justify-center gap-x-1.5 rounded-full sm:hidden">
                        <button className="px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                          </svg>
                        </button>
                      </Menu.Button>
                      <Menu.Button className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between     ">
                        <button className="px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                          </svg>
                          Create
                        </button>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="absolute mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
      md:ml-28 md:top-0 md:left-0 md:mt-1"
                      >
                        <div className="py-1">
                          <GateKeeper
                            permissionCheck={(permission) =>
                              permission.module === "user" &&
                              permission.canCreate
                            }
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={`/users/new`}
                                  className={classNames(
                                    active
                                      ? "bg-gray-200 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  <div className="flex-row flex ">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                      />
                                    </svg>
                                    <p className="ms-2 mt-1 text-sm">User</p>
                                  </div>
                                </Link>
                              )}
                            </Menu.Item>
                          </GateKeeper>
                          <GateKeeper
                            permissionCheck={(permission) =>
                              permission.module === "entity" &&
                              permission.canCreate
                            }
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={`/entities/new`}
                                  className={classNames(
                                    active
                                      ? "bg-gray-200 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  <div className="flex-row flex">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                      />
                                    </svg>

                                    <p className="ms-2 mt-1 text-sm">Entity</p>
                                  </div>
                                </Link>
                              )}
                            </Menu.Item>
                          </GateKeeper>
                          {/* <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === "task" && permission.canCreate
                          }
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <div>
                                <Menu
                                  as="div"
                                  className="relative inline-block text-left"
                                >
                                  <div>
                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full">
                                      <div className="flex-row flex px-4 py-2">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-6 h-6"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                          />
                                        </svg>
                                        <p className="ms-2 mt-1 text-sm">
                                          Task
                                        </p>
                                      </div>
                                    </Menu.Button>
                                  </div>
                                  <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items
                                      className="absolute mt-2 ms-8 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                                      md:ml-28 md:top-0 md:left-0 md:mt-1"
                                    >
                                      <div className="py-1">
                                        <GateKeeper
                                          permissionCheck={(permission) =>
                                            permission.module === "entity" &&
                                            permission.canCreate
                                          }
                                        >
                                          <Menu.Item>
                                            {({ active }) => (
                                              <Link
                                                to={`/entities`}
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-200 text-gray-900"
                                                    : "text-gray-700",
                                                  "block px-4 py-2 text-sm"
                                                )}
                                              >
                                                <div className="flex-row flex">
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                  >
                                                    <path
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                                    />
                                                  </svg>

                                                  <p className="ms-2 mt-1 text-sm">
                                                    Entity
                                                  </p>
                                                </div>
                                              </Link>
                                            )}
                                          </Menu.Item>
                                        </GateKeeper>
                                        <GateKeeper
                                          permissionCheck={(permission) =>
                                            permission.module === "meeting" &&
                                            permission.canCreate
                                          }
                                        >
                                          <Menu.Item>
                                            {({ active }) => (
                                              <Link
                                                to={`/users`}
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-200 text-gray-900"
                                                    : "text-gray-700",
                                                  "block px-4 py-2 text-sm"
                                                )}
                                              >
                                                <div className="flex-row flex ">
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                  >
                                                    <path
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                                    />
                                                  </svg>

                                                  <p className="ms-2 mt-1 text-sm">
                                                    User
                                                  </p>
                                                </div>
                                              </Link>
                                            )}
                                          </Menu.Item>
                                        </GateKeeper>
                                        <GateKeeper
                                          permissionCheck={(permission) =>
                                            permission.module === "team" &&
                                            permission.canCreate
                                          }
                                        >
                                          <Menu.Item>
                                            {({ active }) => (
                                              <Link
                                                to={`/teams`}
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-200 text-gray-900"
                                                    : "text-gray-700",
                                                  "block px-4 py-2 text-sm"
                                                )}
                                              >
                                                <div className="flex-row flex">
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                  >
                                                    <path
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                                                    />
                                                  </svg>

                                                  <p className="ms-2 mt-1 text-sm">
                                                    Teams
                                                  </p>
                                                </div>
                                              </Link>
                                            )}
                                          </Menu.Item>
                                        </GateKeeper>
                                      </div>
                                    </Menu.Items>
                                  </Transition>
                                </Menu>
                              </div>
                            )}
                          </Menu.Item>
                        </GateKeeper> */}
                          <GateKeeper
                            permissionCheck={(permission) =>
                              permission.module === "team" &&
                              permission.canCreate
                            }
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={`/teams/new`}
                                  className={classNames(
                                    active
                                      ? "bg-gray-200 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  <div className="flex-row flex">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                                      />
                                    </svg>

                                    <p className="ms-2 mt-1 text-sm">Team</p>
                                  </div>
                                </Link>
                              )}
                            </Menu.Item>
                          </GateKeeper>
                          <GateKeeper
                            permissionCheck={(permission) =>
                              permission.module === "meeting" &&
                              permission.canCreate
                            }
                          ></GateKeeper>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </GateKeeper>

              
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center gap-2 me-3 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <button
                type="button"
                className="relative rounded-full  bg-[#475569] p-1 text-white hover:text-white focus:outline-none "
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button> */}

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded">
                    {logInUserDetails?.image ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={logInUserDetails?.image}
                        alt="profile"
                        aria-hidden="true"
                      />
                    ) : (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={defprop}
                        alt="profile"
                        aria-hidden="true"
                      />
                    )}
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  {/* for profile */}
                  <Menu.Items className="absolute right-9 z-10 mt-2 top-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/users/${authState?.user?.id}`}
                            className={classNames(
                              active
                                ? "bg-gray-200 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            <div className="flex-row flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5 mt-1"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                              <p className="ms-2 mt-1 text-sm">Profile</p>
                            </div>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/changepassword"
                            className={classNames(
                              active
                                ? "bg-gray-200 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            <div className="flex-row flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5 mt-1"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                                />
                              </svg>
                              <p className="ms-2 mt-1 text-sm">
                                Reset Password
                              </p>
                            </div>
                          </Link>
                        )}
                      </Menu.Item>
                      <form method="POST" action="#">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => userLogout()}
                              type="submit"
                              className={classNames(
                                active
                                  ? "bg-gray-200 text-gray-900"
                                  : "text-gray-700",
                                "block w-full px-4 py-2 text-left text-sm"
                              )}
                            >
                              <div className="flex-row flex">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-5 h-5 mt-1"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                                  />
                                </svg>
                                <p className="ms-2 mt-1 text-sm">Sign out</p>
                              </div>
                            </button>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <div
                className={`fixed inset-0 transition-all duration-500 bg-gray-800 bg-opacity-50 z-50 ${
                  addTask ? "" : "hidden"
                }`}
              >
                <div className=" fixed inset-y-0 right-3 w-2/6 h-2/3 top-4/2 bg-white shadow-lg transform translate-y-1/2 transition-transform duration-300 ease-in-out">
                  <div className="flex justify-between p-4">
                    <p className="text-sm text-gray-500">New Task</p>
                    <button onClick={toggleAddTaskDrawer} className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-gray-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <hr />
                  <input
                    type="text"
                    placeholder="Task Name"
                    className="p-2 text-sm block w-full  rounded-md mt-2 text-gray-900 appearance-none  placeholder:text-[#6d6e6f] placeholder:text-lg focus:outline-none  sm:text-xs sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

{
  /* 
<Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full">
                      <button className=" px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5 "
                        >
                          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                        </svg>
                        Create
                      </button>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      className="absolute ml-28 top-0 left-0 mt-1  w-56 origin-top-right 
                    rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === "user" && permission.canCreate
                          }
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/users/new`}
                                className={classNames(
                                  active
                                    ? "bg-gray-200 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                <div className="flex-row flex ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                    />
                                  </svg>
                                  <p className="ms-2 mt-1 text-sm">User</p>
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        </GateKeeper>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === "entity" &&
                            permission.canCreate
                          }
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/entities/new`}
                                className={classNames(
                                  active
                                    ? "bg-gray-200 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                <div className="flex-row flex">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                    />
                                  </svg>

                                  <p className="ms-2 mt-1 text-sm">Entity</p>
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        </GateKeeper>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === "task" && permission.canCreate
                          }
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <div
                              // className={classNames(
                              //   active
                              //     ? 'bg-gray-200 text-gray-900'
                              //     : 'text-gray-700',
                              //   'block px-4 py-2 text-sm'
                              // )}
                              >
                                <Menu
                                  as="div"
                                  className="relative inline-block text-left"
                                >
                                  <div>
                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full">
                                      <div className="flex-row flex px-4 py-2">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-6 h-6"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                          />
                                        </svg>
                                        <p className="ms-2 mt-1 text-sm">
                                          Task
                                        </p>
                                      </div>
                                    </Menu.Button>
                                  </div>
                                  <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items
                                      className="absolute ml-28 top-0  left-0 mt-1  w-56 origin-top-right 
                    rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                      <div className="py-1">
                                        <GateKeeper
                                          permissionCheck={(permission) =>
                                            permission.module === "entity" &&
                                            permission.canCreate
                                          }
                                        >
                                          <Menu.Item>
                                            {({ active }) => (
                                              <Link
                                                to={`/entities`}
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-200 text-gray-900"
                                                    : "text-gray-700",
                                                  "block px-4 py-2 text-sm"
                                                )}
                                              >
                                                <div className="flex-row flex">
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                  >
                                                    <path
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                                    />
                                                  </svg>

                                                  <p className="ms-2 mt-1 text-sm">
                                                    Entity
                                                  </p>
                                                </div>
                                              </Link>
                                            )}
                                          </Menu.Item>
                                        </GateKeeper>
                                        <GateKeeper
                                          permissionCheck={(permission) =>
                                            permission.module === "meeting" &&
                                            permission.canCreate
                                          }
                                        >
                                          <Menu.Item>
                                            {({ active }) => (
                                              <Link
                                                to={`/users`}
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-200 text-gray-900"
                                                    : "text-gray-700",
                                                  "block px-4 py-2 text-sm"
                                                )}
                                              >
                                                <div className="flex-row flex ">
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                  >
                                                    <path
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                                    />
                                                  </svg>

                                                  <p className="ms-2 mt-1 text-sm">
                                                    User
                                                  </p>
                                                </div>
                                              </Link>
                                            )}
                                          </Menu.Item>
                                        </GateKeeper>
                                        <GateKeeper
                                          permissionCheck={(permission) =>
                                            permission.module === "team" &&
                                            permission.canCreate
                                          }
                                        >
                                          <Menu.Item>
                                            {({ active }) => (
                                              <Link
                                                to={`/teams`}
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-200 text-gray-900"
                                                    : "text-gray-700",
                                                  "block px-4 py-2 text-sm"
                                                )}
                                              >
                                                <div className="flex-row flex">
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                  >
                                                    <path
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                                                    />
                                                  </svg>

                                                  <p className="ms-2 mt-1 text-sm">
                                                    Teams
                                                  </p>
                                                </div>
                                              </Link>
                                            )}
                                          </Menu.Item>
                                        </GateKeeper>
                                      </div>
                                    </Menu.Items>
                                  </Transition>
                                </Menu>
                              </div>
                            )}
                          </Menu.Item>
                        </GateKeeper>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === "team" && permission.canCreate
                          }
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/teams/new`}
                                className={classNames(
                                  active
                                    ? "bg-gray-200 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                <div className="flex-row flex">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                                    />
                                  </svg>

                                  <p className="ms-2 mt-1 text-sm">Teams</p>
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        </GateKeeper>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === "meeting" &&
                            permission.canCreate
                          }
                        ></GateKeeper>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu> */
}

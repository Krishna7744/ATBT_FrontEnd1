import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";
const EntityLandingPage = () => {
  const { id, BMid } = useParams();
  let location = useLocation();
  let [ActiveLink, setActiveLink] = useState(false);
  useEffect(() => {
    if (
      location.pathname == `/entities/${id}/tasks/runningdecisions` ||
      location.pathname == `/entities/${id}/tasks/To-Do` ||
      location.pathname == `/entities/${id}/tasks/In-Progress` ||
      location.pathname == `/entities/${id}/tasks/Over-Due` ||
      location.pathname == `/entities/${id}/tasks/Completed` ||
      location.pathname == `/entities/${id}/tasks/On-Hold` ||
      location.pathname == `/entities/${id}/tasks/Master`
    ) {
      setActiveLink(true);
    } else {
      setActiveLink(false);
    }
  }, [location]);
  return (
    <div className=" p-4 bg-[#f8fafc]">
      <div className="flex justify-between my-2">
        <p className="text-xl font-semibold">
          <BreadCrumbs />
        </p>
      </div>

      <div className="flex overflow-auto">
        {!BMid && (
          <NavLink
            to={{
              pathname: `entityboardmeetings`,
              search: `?search=&page=1&pageSize=10`,
            }}
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
             Meetings
          </NavLink>
        )}
        {BMid && (
          <NavLink
            to={`entityboardmeetings/${BMid}/tasks?search=&page=1&pageSize=10`}
            end
            isActive={(match, location) =>
              match ||
              location.pathname.startsWith(
                `/entities/${id}/entityboardmeetings`
              )
            }
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Decisions
          </NavLink>
        )}
        {!BMid && (
          <NavLink
            // to={{
            //   pathname: "tasks/To-Do",
            //   // search: `?status=To-Do`,
            // }}
            to="tasks/runningdecisions?search=&page=1&pageSize=10"

            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : ActiveLink
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Decisions
          </NavLink>
        )}
        {!BMid && (
          <NavLink
            to="documents"
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
         Attachments
          </NavLink>
        )}
        {BMid && (
          <NavLink
            to={`entityboardmeetings/${BMid}/documents`}
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Attachments
          </NavLink>
        )}
        {!BMid && (
          <NavLink
            to="."
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Overview
          </NavLink>
        )}
        {BMid && (
          <NavLink
            to={`entityboardmeetings/${BMid}`}
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
          Overview
          </NavLink>
        )}
      </div>
      <hr />
      <Outlet />
    </div>
  );
};
export default EntityLandingPage;

import React, { useEffect, useState, useCallback } from 'react';
import {
  Link,
  useFetcher,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import Swal from 'sweetalert2';
import GateKeeper from '../../../../rbac/GateKeeper';
import { debounce } from '../../../../utils/utils';
import CustomColumn from '../../../../componentLayer/tableCustomization/CustomColumn';
import CustomFilter from '../../../../componentLayer/tableCustomization/CustomFilter';
import atbtApi from '../../../../serviceLayer/interceptor';

export async function loader({ request, params }) {
  try {
    let url = new URL(request.url);
    const [teams, teamFormData] = await Promise.all([
      atbtApi.post(`team/list${url?.search ? url?.search : ''}`, {}),
      atbtApi.get(`form/list?name=teamform`),
    ]);
    console.log(teams, teamFormData, 'team data');
    const combinedResponse = {
      teams: teams?.data,
      tableViewData: teamFormData?.data?.Tableview,
      customForm: teamFormData?.data?.Data,
    };
    console.log(combinedResponse, 'entities response', request, params);
    return combinedResponse;
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  }
}

export async function action({ request, params }) {
  switch (request.method) {
    case 'DELETE': {
      const id = (await request.json()) || null;
      console.log(id, 'json', id);
      return await atbtApi.delete(`boardmeeting/delete/${id}`);
    }
    default: {
      throw new Response('', { status: 405 });
    }
  }
}

function Teams() {
  document.title = 'ATBT | Team';
  const navigation = useNavigation();
  let submit = useSubmit();
  let fetcher = useFetcher();
  const data = useLoaderData();
  const { teams, tableViewData, customForm } = data;
  const [Qparams, setQParams] = useState({
    search: '',
    page: 1,
    pageSize: 10,
  });
  useEffect(() => {
    debouncedParams(Qparams);
  }, [Qparams]);
  const debouncedParams = useCallback(
    debounce((param) => {
      console.log(param);
      submit(param, { method: 'get', action: '.' });
    }, 500),
    []
  );
  console.log('Qparams', Qparams);
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
    console.log(selectedValue, 'sv');
    setQParams({
      ...Qparams,
      pageSize: selectedValue,
    });
  };

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('.');
    }
  }, [fetcher, navigation]);
  const handleDeleteUser = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Team!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#fff',
      confirmButtonText: 'Delete',
      customClass: {
        popup: 'custom-swal2-popup',
        title: 'custom-swal2-title',
        content: 'custom-swal2-content',
      },
    });

    if (confirmDelete.isConfirmed) {
      try {
        fetcher.submit(id, { method: 'DELETE', encType: 'application/json' });
      } catch (error) {
        Swal.fire('Error', 'Unable to delete team 🤯', 'error');
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

  function formatTime(timeString) {
    const [hourStr, minuteStr] = timeString.split(':');
    const hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);
    if (isNaN(hours) || isNaN(minutes)) {
      return 'Invalid time';
    }
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Handles midnight
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Ensures minutes are two digits
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    return formattedTime;
  }

  return (
    <div className='overflow-x-auto p-3'>
      {/* search & filter */}
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-col-3 gap-2 mt-2'>
        <h1 className='font-semibold text-lg grid1-item'>
          Teams {teams.loading ? '...' : null}
        </h1>
        <div className='grid1-item mx-3 text-start'>
          <label
            for='default-search'
            className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
          >
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center p-2 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              onChange={handleSearch}
              value={Qparams?.search}
              type='search'
              id='default-search'
              className='block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none '
              placeholder='Search here...'
              required
            />
          </div>
        </div>
        <div className='grid1-item text-end md:flex md:justify-end filter_pagination'>

          <div className='grid1-item text-end flex justify-end filter_pagination divide-x-2 h-7 mt-2'>
            <CustomColumn
              tableView={tableView}
              setTableView={setTableView}
              form='boardmeetingform'
            />
            <CustomFilter
              Qparams={Qparams}
              setQParams={setQParams}
              customForm={customForm}
            />
          </div>
        </div>
      </div>

      {/* table */}
      <div className='max-h-[457px] overflow-y-scroll mt-8'>
        {visibleColumns && tableView && teams?.Teams && (
          <table className='w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md'>
            <thead>
              <tr>
                {visibleColumns.map((key) => (
                  <th
                    key={key}
                    className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'
                  >
                    {tableView[key].label}
                  </th>
                ))}
                <th
                  scope='col'
                  className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'
                >
                  Total Tasks
                </th>
                <th
                  scope='col'
                  className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'
                >
                  Completed Tasks
                </th>
                <th
                  scope='col'
                  className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'
                >
                  Upcoming Tasks
                </th>
                <th
                  scope='col'
                  className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'
                >
                  Overdue Tasks
                </th>
                <th
                  scope='col'
                  className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
              {teams?.Teams &&
                teams?.Teams?.map((row) => (
                  <tr key={row.id} className='hover:bg-slate-100 dark:hover:bg-gray-700'>
                    {visibleColumns.map((key) => {
                      let value = row[key];
                      if (tableView[key].type === 'multiselect' && row[key]) {
                        value = row[key].join(', ');
                      }
                      if (tableView[key].type === 'time' && row[key]) {
                        value = formatTime(row[key]);
                      }
                      if (tableView[key].type === 'date' && row[key]) {
                        value = new Date(row[key]);
                        const day = value.getUTCDate();
                        const monthIndex = value.getUTCMonth();
                        const year = value.getUTCFullYear();

                        const monthAbbreviations = [
                          'Jan',
                          'Feb',
                          'Mar',
                          'Apr',
                          'May',
                          'Jun',
                          'Jul',
                          'Aug',
                          'Sep',
                          'Oct',
                          'Nov',
                          'Dec',
                        ];

                        // Formatting the date
                        value = `${day < 10 ? '0' : ''}${day}-${monthAbbreviations[monthIndex]
                          }-${year}`;
                      }
                      if (key === 'name') {
                        return (
                          <td
                            key={key}
                            className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium hover:text-orange-500 overflow-hidden`}
                            style={{ maxWidth: '160px' }}
                            title={row[key]}
                          >
                            <GateKeeper
                              permissionCheck={(permission) =>
                                permission.module === 'team' &&
                                permission.canRead
                              }
                            >
                              <Link to={`${row.id}/task`}>
                                <p className='truncate text-xs'> {value}</p>
                              </Link>
                            </GateKeeper>{' '}
                          </td>
                        );
                      }
                      return (
                        <td
                          key={key}
                          className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                          style={{ maxWidth: '160px' }}
                          title={row[key]}
                        >
                          <p className='truncate text-xs'> {value}</p>
                        </td>
                      );
                    })}
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      style={{ maxWidth: '160px' }}
                      title=''
                    >
                      <p className='truncate text-xs'> 5000</p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      style={{ maxWidth: '160px' }}
                      title=''
                    >
                      <p className='truncate text-xs'> 2000</p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      style={{ maxWidth: '160px' }}
                      title=''
                    >
                      <p className='truncate text-xs'> 1000</p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      style={{ maxWidth: '160px' }}
                      title=''
                    >
                      <p className='truncate text-xs'> 500</p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      style={{ maxWidth: '160px' }}
                      title=''
                    >
                      <div className='flex justify-start gap-3'>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === 'team' && permission.canRead
                          }
                        >
                          <button
                            type='button'
                            className=' inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                          >
                            <Link to={`${row.id}`}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className='w-4 h-4'
                              >
                                <path d='M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
                                <path
                                  fill-rule='evenodd'
                                  d='M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'
                                  clip-rule='evenodd'
                                />
                              </svg>
                            </Link>
                          </button>
                        </GateKeeper>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === 'team' && permission.canUpdate
                          }
                        >
                          <button
                            type='button'
                            className='inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                          >
                            <Link to={`${row.id}/edit`}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className='w-4 h-4'
                              >
                                <path d='m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z' />
                              </svg>
                            </Link>
                          </button>
                        </GateKeeper>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === 'team' && permission.canDelete
                          }
                        >
                          <button
                            type='button'
                            onClick={() => handleDeleteUser(row.id)}
                            className=' inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 delete-button'
                          >
                          <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              className='w-4 h-4'
                            >
                              <path
                                fill-rule='evenodd'
                                d='M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z'
                                clip-rule='evenodd'
                              />
                            </svg>
                          </button>
                        </GateKeeper>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* pagination */}
      <div className='inset-x-0 bottom-0 mt-5'>
        <div className='md:flex md:justify-between block text-end'>
          <div className=''>
            {!teams?.Teams || teams?.Teams?.length === 0 ? (
              'no data to show'
            ) : teams.loading ? (
              'Loading...'
            ) : (
              <p className='text-sm text-gray-700'>
                Showing {teams.startTeam} to {teams.endTeam} of{' '}
                <span className='font-medium'>{teams.totalTeams}</span>
                <span className='font-medium'> </span> results
              </p>
            )}
          </div>
          <section
            className='isolate inline-flex rounded-md  ms-4 mt-2 md:mt-0'
            aria-label='Pagination'
          >
            <select
              defaultValue='10'
              onChange={handlePerPageChange}
              className='focus:outline-none me-3 gap-x-1.5 rounded-md bg-gray-50 px-1 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50'
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
              <option value='250'>250</option>
              <option value='500'>500</option>
            </select>
            <button
              disabled={teams.currentPage === 1}
              onClick={() => handlePage(teams?.currentPage - 1)}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${teams.loading
                ? 'cursor-wait'
                : teams.currentPage === 1
                  ? 'cursor-not-allowed'
                  : 'cursor-auto'
                }`}
            >
              <span className='sr-only'>Previous</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-5 h-5'
                aria-hidden='true'
              >
                <path
                  fill-rule='evenodd'
                  d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z'
                  clip-rule='evenodd'
                />
              </svg>
            </button>
            <button className='border w-8 border-gray-300'>
              {teams.currentPage}
            </button>
            <button
              disabled={teams.currentPage === teams.totalPages}
              onClick={() => handlePage(teams?.currentPage + 1)}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${teams.loading
                ? 'cursor-wait'
                : teams.currentPage === teams.totalPages
                  ? 'cursor-not-allowed'
                  : 'cursor-auto'
                }`}
            >
              <span className='sr-only'>Next</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-5 h-5'
                aria-hidden='true'
              >
                <path
                  fill-rule='evenodd'
                  d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
                  clip-rule='evenodd'
                />
              </svg>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Teams;
{
  /* table */
}

//  <div className='max-h-[410px] overflow-y-scroll mt-6'>
//  <table className='w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md'>
//    <thead className=''>
//      <tr>
//        <th
//          scope='col'
//          className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
//        >
//          Entity
//        </th>
//        <th
//          scope='col'
//          className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
//        >
//          {' '}
//          Total Tasks
//        </th>
//        <th
//          scope='col'
//          className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
//        >
//          Completed Tasks
//        </th>
//        <th
//          scope='col'
//          className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
//        >
//          {' '}
//          Upcoming Tasks
//        </th>
//        <th
//          scope='col'
//          className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
//        >
//          {' '}
//          Overdue Tasks
//        </th>
//        <th
//          scope='col'
//          className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
//        >
//          {' '}
//          Actions{' '}
//        </th>
//      </tr>
//    </thead>
//    <tbody>
//      {!entitiesList?.paginatedEntities ||
//      entitiesList?.paginatedEntities?.length === 0 ? (
//        <p className='text-center m-auto'>
//          no entity found{entitiesList?.paginatedEntities.sdfsdf}
//        </p>
//      ) : (
//        entitiesList?.paginatedEntities?.map((item, index) => (
//          <tr
//            key={item.id}
//            className='hover:bg-gray-100 dark:hover:bg-gray-700'
//          >
//            <td className='px-6 py-2 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800'>
//              Kapil Knowledge Hub Private Limited
//            </td>
//            <td className='px-6 py-2 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800'>
//              4000
//            </td>
//            <td className='px-6 py-2 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800'>
//              1000
//            </td>
//            <td className='px-6 py-2 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800'>
//              2000
//            </td>
//            <td className='px-6 py-2 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800'>
//              1000
//            </td>
//            <td className='px-6 py-2 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800'>
//              <div className='flex justify-start'>
//                <GateKeeper
//                  permissionCheck={(permission) =>
//                    permission.module === 'entity' && permission.canRead
//                  }
//                >
//                  <button
//                    type='button'
//                    className='me-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
//                  >
//                    <Link to={`/entitylandingpage/${item.id}`}>
//                      <svg
//                        xmlns='http://www.w3.org/2000/svg'
//                        viewBox='0 0 20 20'
//                        fill='currentColor'
//                        className='w-5 h-5'
//                      >
//                        <path d='M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
//                        <path
//                          fill-rule='evenodd'
//                          d='M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'
//                          clip-rule='evenodd'
//                        />
//                      </svg>
//                    </Link>
//                  </button>
//                </GateKeeper>
//                <GateKeeper
//                  permissionCheck={(permission) =>
//                    permission.module === 'entity' && permission.canUpdate
//                  }
//                >
//                  <button
//                    type='button'
//                    className='me-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
//                  >
//                    <Link to='/entities/new'>
//                      <svg
//                        xmlns='http://www.w3.org/2000/svg'
//                        viewBox='0 0 20 20'
//                        fill='currentColor'
//                        className='w-5 h-5'
//                      >
//                        <path d='m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z' />
//                      </svg>{' '}
//                    </Link>
//                  </button>
//                </GateKeeper>
//                <GateKeeper
//                  permissionCheck={(permission) =>
//                    permission.module === 'entity' && permission.canDelete
//                  }
//                >
//                  <button
//                    type='button'
//                    onClick={() => deleteEntitybyId(item.id)}
//                    className='me-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
//                  >
//                    <svg
//                      xmlns='http://www.w3.org/2000/svg'
//                      viewBox='0 0 20 20'
//                      fill='currentColor'
//                      className='w-5 h-5'
//                    >
//                      <path
//                        fill-rule='evenodd'
//                        d='M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z'
//                        clip-rule='evenodd'
//                      />
//                    </svg>
//                  </button>
//                </GateKeeper>
//                <GateKeeper
//                  permissionCheck={(permission) =>
//                    permission.module === 'entity' && permission.canUpdate
//                  }
//                >
//                  <button
//                    type='button'
//                    className='me-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
//                  >
//                    <div className='flex items-center'>
//                      <input
//                        id='toggle'
//                        type='checkbox'
//                        className='hidden'
//                        checked={isChecked}
//                        onChange={handleToggle}
//                      />
//                      <label
//                        htmlFor='toggle'
//                        className='flex items-center cursor-pointer'
//                      >
//                        <div
//                          className={`w-8 h-4 rounded-full shadow-inner ${
//                            isChecked ? ' bg-[#ea580c]' : 'bg-[#c3c6ca]'
//                          }`}
//                        >
//                          <div
//                            className={`toggle__dot w-4 h-4 rounded-full shadow ${
//                              isChecked ? 'ml-4 bg-white' : 'bg-white'
//                            }`}
//                          ></div>
//                        </div>
//                        {/* <div className={`ml-3 text-sm font-medium ${isChecked ? 'text-gray-400' : 'text--400'}`}>
//                        {isChecked ? 'Enabled' : 'Disabled'}
//                       </div> */}
//                      </label>
//                    </div>
//                  </button>
//                </GateKeeper>
//              </div>
//            </td>
//          </tr>
//        ))
//      )}
//    </tbody>
//  </table>
// </div>

// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Fragment } from 'react';

// import {TeamsDataContext } from '../../../contexts/teamsDataContext/teamsDataContext'
// import { Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';
// import axios from 'axios';
// import { ifStatement } from '@babel/types';
// import useDebounce from '../../../hooks/debounce/useDebounce';
// import GateKeeper from '../../../rbac/GateKeeper';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const tempdata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }
// const userData = JSON.parse(localStorage.getItem('data'));
// const token = userData?.token;
// const role = userData?.role?.name;

// function Teams() {
//   document.title = 'ATBT | Team';
//   const {
//     teamsState: { teams },
//     teamsDispatch,
//     deleteTeamybyId,
//     setFilters,
//   } = useContext(TeamsDataContext);

//   const handleTabClick = (tabNumber) => {
//     setActiveTab(tabNumber);
//   };

//   const [isChecked, setIsChecked] = useState(false);

//   const handleToggle = () => {
//     setIsChecked((pre) => !pre);
//   };
//   const [file, setFile] = useState(null);
//   const handleImage = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };
//   const handleApi = async () => {
//     // Ensure a file is selected
//     if (!file) {
//       alert('Please select a file first.');
//       return;
//     }

//     // Make a POST request to your backend
//     const formData = new FormData();
//     formData.append('image', file);
//     // console.log(formData, 'fd');
//     const data = await axios.post(
//       'https://atbtbeta.infozit.com/upload',
//       formData
//     );
//     // console.log(data);

//     // fetch('http://localhost:3001/upload', {
//     //   method: 'POST',
//     //   body: formData,
//     // })
//     // .then(response => {
//     //   if (response.ok) {
//     //     // Handle successful response
//     //     console.log('Image uploaded successfully.',response.data);
//     //   } else {
//     //     // Handle error response
//     //     console.error('Failed to upload image.');
//     //   }
//     // })
//     // .catch(error => {
//     //   console.error('Error uploading image:', error);
//     // });
//   };
//   const {
//     entitiesState: { entitiesList },
//     entitiesDispatch,
//     deleteEntitybyId,
//   } = useContext(EntitiesDataContext);
//   const { debouncedSetPage, debouncedSetSearch } =
//     useDebounce(entitiesDispatch);
//   // const [toggle, setToggle] = useState(false)
//   const handlePerPageChange = (event) => {
//     const selectedValue = parseInt(event.target.value, 10);
//     entitiesDispatch({
//       type: 'SET_PER_PAGE',
//       payload: {
//         conext: 'ENTITES',
//         data: selectedValue,
//       },
//     });
//   };
//   const [columnsDrawerOpen, setColumnsDrawerOpen] = useState(false);

//   const columnsDrawer = () => {
//     setColumnsDrawerOpen(!columnsDrawerOpen);
//   };
//   const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

//   const filterDrawer = () => {
//     setFilterDrawerOpen(!filterDrawerOpen);
//   };

//   return (
//     <div className=' p-3 bg-[#f8fafc] overflow-hidden'>
//       <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-col-3 gap-2 my-2'>
//         <h1 className='font-semibold text-lg grid1-item'>Teams</h1>
//         <div className='grid1-item  text-start'>
//           <label
//             for='default-search'
//             className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
//           >
//             Search
//           </label>
//           <div className='relative'>
//             <div className='absolute inset-y-0 start-0 flex items-center p-2 pointer-events-none'>
//               <svg
//                 className='w-4 h-4 text-gray-500 dark:text-gray-400'
//                 aria-hidden='true'
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='none'
//                 viewBox='0 0 20 20'
//               >
//                 <path
//                   stroke='currentColor'
//                   stroke-linecap='round'
//                   stroke-linejoin='round'
//                   stroke-width='2'
//                   d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
//                 />
//               </svg>
//             </div>
//             <input
//               type='search'
//               id='default-search'
//               className='block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none '
//               placeholder='Search here...'
//               required
//             />
//           </div>
//         </div>
//         <div className='grid1-item text-end filter_pagination'>
//           <select className='me-3 gap-x-1.5 rounded-md bg-gray-50 px-1 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50'>
//             <option value='10'>10</option>
//             <option value='25'>25</option>
//             <option value='50'>50</option>
//             <option value='100'>100</option>
//             <option value='250'>250</option>
//             <option value='500'>500</option>
//           </select>
//           <button
//             onClick={columnsDrawer}
//             className=' focus:outline-none me-3 gap-x-1.5 rounded-md bg-orange-600 px-4 py-2 text-sm font-[500] text-white shadow-md  hover:shadow-lg'
//           >
//             Columns
//           </button>

//           {/* for coloumns open */}
//           <div
//             className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 ${columnsDrawerOpen ? '' : 'opacity-0 pointer-events-none'
//               }`}
//             style={{ transition: 'opacity 0.3s ease-in-out' }}
//           >
//             <div
//               className='fixed inset-y-0 right-0 w-11/12 md:w-4/12 lg:w-1/5 xl:w-1/5 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out'
//               style={{
//                 transform: `translateX(${columnsDrawerOpen ? '0%' : '100%'})`,
//                 transition: 'transform 0.3s ease-in-out',
//               }}
//             >
//               <div className='flex justify-between px-5 py-4 bg-gray-100'>
//                 <h5 className='font-[500]'>Columns</h5>
//                 <button
//                   onClick={columnsDrawer}
//                   className=''
//                 >
//                   <svg
//                     xmlns='http://www.w3.org/2000/svg'
//                     viewBox='0 0 24 24'
//                     fill='currentColor'
//                     className='w-5 h-5 text-gray-500'
//                   >
//                     <path
//                       fillRule='evenodd'
//                       d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
//                       clipRule='evenodd'
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <hr className='h-1 w-full' />

//               {/* <div className='px-4 py-2.5 h-[615px] overflow-auto flex-wrap'>
//                 {dupTableView &&
//                   Object.keys(dupTableView).map((columnName) => (
//                     <div
//                       key={columnName}
//                       className='flex items-center gap-2'
//                     >
//                       <input
//                         className={classNames(
//                           tableView[columnName].value
//                             ? 'bg-gray-100 text-gray-700 hover:text-black'
//                             : 'text-gray-700 bg-gray-100 hover:text-black',
//                           'appearance-none border border-gray-300 hover:border-gray-900 checked:hover:border-white rounded-md checked:bg-orange-600 checked:border-transparent w-4 h-4 cursor-pointer hover:text-black relative' // added 'relative' class
//                         )}
//                         type='checkbox'
//                         id={columnName}
//                         checked={dupTableView[columnName].value}
//                         onChange={() => handleColumnsCheckboxChange(columnName)}
//                       />

//                       <label
//                         htmlFor={columnName}
//                         className='cursor-pointer text-md py-1'
//                       >
//                         {dupTableView[columnName].label}
//                       </label>
//                     </div>
//                   ))}
//               </div> */}

//               <div className='bg-gray-100 flex justify-between p-3 absolute bottom-0 w-full'>
//                 <button
//                   className='mr-3 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white '
//                   // onClick={handleColumnsApply}
//                 >
//                   Apply
//                 </button>
//                 {/* {role === 'admin' && ( */}
//                   <button
//                     className='mr-3 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white'
//                     // onClick={handleColumnsSave}
//                   >
//                     Save
//                   </button>
//                  {/* )} */}
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={filterDrawer}
//             className='transition-opacity duration-500 focus:outline-none me-3 gap-x-1.5 rounded-md bg-orange-600 px-4 py-2 text-sm font-[500] text-white shadow-md  hover:shadow-lg'
//           >
//             Filters
//           </button>

//           {/* for filter open */}
//           <div
//             className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 ${filterDrawerOpen ? '' : 'opacity-0 pointer-events-none'
//               }`}
//             style={{ transition: 'opacity 0.3s ease-in-out' }}
//           >
//             <div
//               className='fixed inset-y-0 right-0 w-11/12 md:w-4/12 lg:w-1/5 xl:w-w-1/5 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out'
//               style={{
//                 transform: `translateX(${filterDrawerOpen ? '0%' : '100%'})`,
//                 transition: 'transform 0.3s ease-in-out',
//               }}
//             >
//               <div className=' flex justify-between px-5 py-4 bg-gray-100'>
//                 <h5 className='font-[500] '> Filters</h5>
//                 <button
//                   onClick={filterDrawer}
//                   className=''
//                 >
//                   <svg
//                     xmlns='http://www.w3.org/2000/svg'
//                     viewBox='0 0 24 24'
//                     fill='currentColor'
//                     className='w-5 h-5 text-gray-500'
//                   >
//                     <path
//                       fillRule='evenodd'
//                       d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
//                       clipRule='evenodd'
//                     />
//                   </svg>
//                 </button>
//               </div>
//               {/* <div className='h-[615px] overflow-auto'>
//                 <div className='text-start p-3 '>

//                   {filterableInputsInBox?.map((filter, index) => (
//                     <div
//                       key={index}
//                       className=''
//                     >
//                       {filter.options && (
//                         <div>
//                           <label className='mb-4 text-sm text-[#878a99] font-medium'>
//                             {' '}
//                             {filter.label.charAt(0).toUpperCase() +
//                               filter.label.slice(1)}
//                           </label>

//                           <select
//                             id={filter.inputname}
//                             name={filter.inputname}
//                             className='px-3 py-2 my-2 text-xs block w-full bg-gray-50 rounded-md text-gray-900 border border-1 border-[#e9ebec] placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6'
//                             onChange={(e) =>
//                               handleFilterChange(
//                                 filter.inputname,
//                                 e.target.value
//                               )
//                             }
//                             value={selectedFilters[filter.inputname] || ''}
//                           >
//                             <option
//                               value=''
//                               disabled
//                               defaultValue
//                             >
//                               Please select
//                             </option>
//                             {filter.options &&
//                               filter.options.type === 'custom' &&
//                               filter.options.value &&
//                               filter.options.value.map((option, index) => (
//                                 <option
//                                   key={index}
//                                   value={option}
//                                 >
//                                   {option}
//                                 </option>
//                               ))}
//                             {filter.options &&
//                               filter.options.type === 'predefined' &&
//                               filter.options.value &&
//                               fieldsDropDownData[filter.options.value]?.map(
//                                 (option, index) => (
//                                   <option
//                                     key={index}
//                                     value={option}
//                                   >
//                                     {option}
//                                   </option>
//                                 )
//                               )}
//                           </select>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div> */}

//               <div className='bg-gray-100 flex justify-between p-3 absolute bottom-0 w-full'>
//                 <button
//                   // onClick={handleFilterReset}
//                   className='mr-3 px-3 py-2 inline-flex  whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white '
//                 >
//                   Clear
//                 </button>
//                 <button
//                   // onClick={handlefilters}
//                   className='mr-3 px-3 py-2 inline-flex  whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white '
//                 >
//                   Apply
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* <Menu
//             as='div'
//             className='relative inline-block me-2 '
//           >
//             <div className=''>
//               <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50'>
//                 Filters
//                 <ChevronDownIcon
//                   className='-mr-1 h-5 w-5 text-gray-400'
//                   aria-hidden='true'
//                 />
//               </Menu.Button>
//             </div>

//             <Transition
//               as={Fragment}
//               enter='transition ease-out duration-100'
//               enterFrom='transform opacity-0 scale-95'
//               enterTo='transform opacity-100 scale-100'
//               leave='transition ease-in duration-75'
//               leaveFrom='transform opacity-100 scale-100'
//               leaveTo='transform opacity-0 scale-95'
//             >
//               <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
//                 <div className='py-1'>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <Link
//                         to='#'
//                         className={classNames(
//                           active
//                             ? 'bg-gray-100 text-gray-900'
//                             : 'text-gray-700',
//                           'block px-4 py-2 text-sm text-left'
//                         )}
//                       >
//                         Account settings
//                       </Link>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <Link
//                         to='#'
//                         className={classNames(
//                           active
//                             ? 'bg-gray-100 text-gray-900'
//                             : 'text-gray-700',
//                           'block px-4 py-2 text-sm text-left'
//                         )}
//                       >
//                         Support
//                       </Link>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <Link
//                         to='#'
//                         className={classNames(
//                           active
//                             ? 'bg-gray-100 text-gray-900'
//                             : 'text-gray-700',
//                           'block px-4 py-2 text-sm text-left'
//                         )}
//                       >
//                         License
//                       </Link>
//                     )}
//                   </Menu.Item>
//                 </div>
//               </Menu.Items>
//             </Transition>
//           </Menu> */}
//         </div>
//       </div>

//       <div className='max-h-[410px] overflow-y-scroll mt-6'>
//         <table className='w-full divide-gray-200 dark:divide-gray-700 rounded-md'>
//           <thead>
//             <tr>
//               <th
//                 scope='col'
//                 className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'
//               >

//                 Team
//               </th>
//               <th
//                 scope='col'
//                 className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'
//               >
//                 Total Tasks
//               </th>
//               <th
//                 scope='col'
//                 className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'
//               >

//                 Completed Tasks
//               </th>
//               <th
//                 scope='col'
//                 className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'
//               >
//                 Upcoming Tasks
//               </th>
//               <th
//                 scope='col'
//                 className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'
//               >
//                 {' '}
//                 Overdue Tasks
//               </th>
//               <th
//                 scope='col'
//                 className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'
//               >
//                 {' '}
//                 Actions{' '}
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {!entitiesList?.paginatedEntities ||
//               entitiesList?.paginatedEntities?.length === 0 ? (
//               <p className='text-center m-auto'>no entity found</p>
//             ) : (
//               entitiesList?.paginatedEntities?.map((item, index) => (
//                 <tr
//                   key={item.id}
//                   className='hover:bg-gray-100 dark:hover:bg-gray-700'
//                 >
//                   <td className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
//                       style={{ maxWidth: '160px' }}>
//                    <p className='truncate text-xs'> Team</p>
//                   </td>
//                   <td className='px-6 py-2 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800'>
//                   <p className='truncate text-xs'> 700</p>
//                   </td>
//                   <td className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
//                       style={{ maxWidth: '160px' }}
//                       title="">
//                   <p className='truncate text-xs'> 89797</p>
//                   </td>
//                   <td className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
//                       style={{ maxWidth: '160px' }}
//                       title="">
//                   <p className='truncate text-xs'> 4646</p>
//                   </td>
//                   <td className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
//                       style={{ maxWidth: '160px' }}
//                       title="">
//                   <p className='truncate text-xs'> 4543</p>
//                   </td>
//                   <td className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  `}

//                   style={{ maxWidth: '160px' }}>
//                     <div className='flex justify-start gap-3'>
//                       <GateKeeper
//                         permissionCheck={(permission) =>
//                           permission.module === 'team' && permission.canRead
//                         }
//                       >
//                         <button
//                           type='button'
//                           className=' inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
//                         >
//                           <Link to={`/teamslandingpage/${item.id}`}>
//                             {' '}
//                             <svg
//                               xmlns='http://www.w3.org/2000/svg'
//                               viewBox='0 0 20 20'
//                               fill='currentColor'
//                               className='w-4 h-4'
//                             >
//                               <path d='M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
//                               <path
//                                 fill-rule='evenodd'
//                                 d='M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'
//                                 clip-rule='evenodd'
//                               />
//                             </svg>
//                           </Link>
//                         </button>
//                       </GateKeeper>
//                       <GateKeeper
//                         permissionCheck={(permission) =>
//                           permission.module === 'team' && permission.canUpdate
//                         }
//                       >
//                         <button
//                           type='button'
//                           className=' inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
//                         >
//                           <svg
//                             xmlns='http://www.w3.org/2000/svg'
//                             viewBox='0 0 20 20'
//                             fill='currentColor'
//                             className='w-4 h-4'
//                           >
//                             <path d='m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z' />
//                           </svg>
//                         </button>
//                       </GateKeeper>
//                       <GateKeeper
//                         permissionCheck={(permission) =>
//                           permission.module === 'team' && permission.canDelete
//                         }
//                       >
//                         <button
//                           type='button'
//                           onClick={() => deleteEntitybyId(item.id)}
//                           className=' inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
//                         >
//                           <svg
//                             xmlns='http://www.w3.org/2000/svg'
//                             viewBox='0 0 20 20'
//                             fill='currentColor'
//                             className='w-4 h-4'
//                           >
//                             <path
//                               fill-rule='evenodd'
//                               d='M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z'
//                               clip-rule='evenodd'
//                             />
//                           </svg>
//                         </button>
//                       </GateKeeper>
//                       <GateKeeper
//                         permissionCheck={(permission) =>
//                           permission.module === 'team' && permission.canUpdate
//                         }
//                       >
//                         <button
//                           type='button'
//                           className=' inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
//                         >
//                           <div className='flex items-center'>
//                             <input
//                               id='toggle'
//                               type='checkbox'
//                               className='hidden'
//                               checked={isChecked}
//                               onChange={handleToggle}
//                             />
//                             <label
//                               htmlFor='toggle'
//                               className='flex items-center cursor-pointer'
//                             >
//                               <div
//                                 className={`w-6 h-3 rounded-full shadow-inner ${isChecked ? ' bg-[#ea580c]' : 'bg-[#c3c6ca]'
//                                   }`}
//                               >
//                                 <div
//                                   className={`toggle__dot w-3 h-3 rounded-full shadow ${isChecked ? 'ml-4 bg-white' : 'bg-white'
//                                     }`}
//                                 ></div>
//                               </div>
//                               {/* <div className={`ml-3 text-sm font-medium ${isChecked ? 'text-gray-400' : 'text--400'}`}>
//                               {isChecked ? 'Enabled' : 'Disabled'}
//                              </div> */}
//                             </label>
//                           </div>
//                         </button>
//                       </GateKeeper>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className='inset-x-0 bottom-0 mt-5'>
//         <div className='flex justify-between'>
//           <div className=''>
//             {!entitiesList?.paginatedEntities ||
//               entitiesList?.paginatedEntities?.length === 0 ? (
//               'no data to show'
//             ) : entitiesList.loading ? (
//               'Loading...'
//             ) : (
//               <p className='text-sm text-gray-700'>
//                 Showing {entitiesList.startEntity} to {entitiesList.endEntity}{' '}
//                 of{' '}
//                 <span className='font-medium'>
//                   {entitiesList.totalEntities}
//                 </span>
//                 <span className='font-medium'> </span> results
//               </p>
//             )}
//           </div>
//           <section
//             className='isolate inline-flex -space-x-px rounded-md shadow-sm'
//             aria-label='Pagination'
//           >
//             <button
//               href='#'
//               className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-orange-600 hover:text-white focus:z-20 focus:outline-offset-0'
//             >
//               <span className='sr-only'>Previous</span>
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 viewBox='0 0 20 20'
//                 fill='currentColor'
//                 className='w-5 h-5'
//                 aria-hidden='true'
//               >
//                 <path
//                   fill-rule='evenodd'
//                   d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z'
//                   clip-rule='evenodd'
//                 />
//               </svg>
//             </button>
//             <button className='border w-8 border-gray-300'>1</button>
//             <button className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-orange-600 hover:text-white focus:z-20 focus:outline-offset-0'>
//               <span className='sr-only'>Next</span>
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 viewBox='0 0 20 20'
//                 fill='currentColor'
//                 className='w-5 h-5'
//                 aria-hidden='true'
//               >
//                 <path
//                   fill-rule='evenodd'
//                   d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
//                   clip-rule='evenodd'
//                 />
//               </svg>
//             </button>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Teams;
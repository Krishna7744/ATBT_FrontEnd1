import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, Link, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import atbtApi from "../../../serviceLayer/interceptor";
import * as XLSX from 'xlsx';

export async function loader({ request, params }) {
  try {
    let url = new URL(request.url);
    const userData = JSON.parse(localStorage.getItem("data"));
    const userId = userData?.user?.id;

    // const statusName = url.searchParams.get("status");
    // const [reports] = await Promise.all([
    //   // statusName === "master" ? atbtApi.get(`task/list?userId=191`) : atbtApi.get(`task/list?userId=191&status=${statusName}`)
    //   statusName === null || statusName === "master" ? atbtApi.get(`task/list?userId=228`) : atbtApi.get(`task/list?userId=228&status=${statusName}`)
    // ]);

    const [ReportsMaster, ReportsAtbt, ReportsAtr] = await Promise.all([
      atbtApi.get(`task/list?userId=${userId}`),
      atbtApi.get(`task/list?userId=${userId}&status=To-Do`),
      atbtApi.get(`task/list?userId=${userId}&status=In-Progress`)
    ]);


    const CombinedResponse = {
      reportsMaster: ReportsMaster.data,
      reportsAtbt: ReportsAtbt.data,
      reportsAtr: ReportsAtr.data,
    }

    console.log(userId, CombinedResponse, "jdskfsjf");
    // const combinedResponse = {
    //   reports: reports.data,
    // }
    return CombinedResponse;
  }
  catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}


function Reports() {
  document.title = "ATBT | Report";
  const navigate = useNavigate();
  let submit = useSubmit();
  const data = useLoaderData();
  const { reportsMaster, reportsAtbt, reportsAtr } = data;
  const [masterData, setMasterData] = useState();
  const [atbtData, setAtbtData] = useState();
  const [atrData, setAtrData] = useState();
  console.log(data, "atbtData")

  useEffect(() => {
    if (reportsMaster) {
      setMasterData(reportsMaster.map((report, index) => ({
        ...report,
        'S.NO': index + 1
      })));
    }
  }, [reportsMaster]);

  useEffect(() => {
    if (reportsAtbt) {
      setAtbtData(reportsAtbt.map((report, index) => ({
        ...report,
        'S.NO': index + 1
      })));
    }
  }, [reportsAtbt]);

  useEffect(() => {
    if (reportsAtr) {
      setAtrData(reportsAtr.map((report, index) => ({
        ...report,
        'S.NO': index + 1
      })));
    }
  }, [reportsAtr]);

  const headersAtbt = [
    { label: 'S.NO', key: 'S.NO' },
    { label: "Date of Board meeting", key: "date" },
    { label: 'Initial Decision Taken', key: 'decision' },
    { label: 'Person Responsible for implementation', key: 'members' },
    { label: "DueDate", key: "dueDate" },
    { label: "Meeting ID", key: "meetingNumber" }
  ];

  const headerMaster = [
    { label: 'S.NO', key: 'S.NO' },
    { label: "Date of Board meeting", key: "date" },
    { label: 'Decision Taken', key: 'decision' },
    { label: 'Person Responsible for implementation', key: "members" },
    { label: "DueDate", key: "dueDate" },
    { label: "Meeting ID", key: "meetingNumber" },
    // { label: "Ageing of the Decision as per Latest Board Meeting", key: "meetingId" },
    { label: "Updated Decision", key: "updatedbyuser" },
    { label: "Updated Person Responsible", key: "members" },
  ]



  const headerATR = [
    { label: 'S.NO', key: 'S.NO' },
    { label: "Date of Board meeting", key: "date" },
    { label: 'Initial Decision Taken', key: 'decision' },
    { label: 'Person Responsible for implementation', key: "members" },
    { label: "DueDate", key: "dueDate" },
    { label: "Meeting ID", key: "meetingNumber" },
    // { label: "Ageing of the Decision as per Latest Board Meeting", key: "date" },
    { label: "Updated Decision", key: "updatedbyuser" },
    { label: "Updated Person Responsible", key: "members" },
  ]


  const reportdata = [{
    date: "24-06-2024",
    decision: "task-2 ready",
    meetingId: 454,
    comments: [
      { upadatedDecision: "table content", personResponble: "krishna", date: "24-09-2024" },
      { upadatedDecision: "content", personResponble: "sita", date: "14-05-2024" },
      { upadatedDecision: "reporst", personResponble: "david", date: "24-03-2024" },
      { upadatedDecision: "refund ", personResponble: "sai", date: "04-04-2024" },
      { upadatedDecision: "teams", personResponble: "venu", date: "2-05-2024" },
      { upadatedDecision: "tasks", personResponble: "ram", date: "23-09-2024" },
    ]
  },
  ]


  // Extract dynamic   ATR headers
  const dynamicATRHeaders = reportdata[0]?.comments.flatMap((comment, index) => [
    { label: `Updated Decision on ${comment.date}`, key: `updatedDecision${index + 1}` },
    { label: `Person Responsible`, key: `personResponsible${index + 1}` }
  ]);
  const HeadersATR = [...headerATR, ...dynamicATRHeaders]


  // Extract dynamic headers
  const dynamicmasterHeaders = reportdata[0]?.comments.flatMap((comment, index) => [
    { label: `Updated Decision on ${comment.date}`, key: `updatedDecision${index + 1}` },
    { label: `Person Responsible`, key: `personResponsible${index + 1}` }
  ]);
  const HeadersMaster = [...headerMaster, ...dynamicmasterHeaders];
  console.log(HeadersMaster, "HeadersMaster");

  // Transform data to match headers

  const transformData = (data) => {
    return data.map((item, index) => {
      const transformedItem = {
        sNO: index + 1,
        date: item.date,
        decision: item.decision,
        members: item.members,
        dueDate: item.dueDate,
        meetingNumber: item.meetingId,
        meetingId: item.meetingId,
      };

      item.comments.forEach((comment, commentIndex) => {
        console.log(comment, "comments")
        transformedItem[`updatedDecision${commentIndex + 1}`] = comment.upadatedDecision;
        transformedItem[`personResponsible${commentIndex + 1}`] = comment.personResponble;
      });

      return transformedItem;
    });
  };
  const masterTransformedData = transformData(reportdata);
  const atrTransformedData = transformData(reportdata);

  console.log(masterTransformedData, "transformedReportData")

  const getMaxColumnWidth = (data, header) => {
    const headerLength = header.label.length;
    return headerLength + 5;
  };
  const handleDownload = (data, headers) => {
    const worksheetData = [
      headers.map(header => header.label),
      ...data.map(row => headers.map(header => row[header.key])),
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Apply styles to the header row
    headers.forEach((header, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
      if (!worksheet[cellAddress]) {
        worksheet[cellAddress] = { t: 's', v: header.label };
      }
      worksheet[cellAddress].s = {
        font: { bold: true, sz: 20 },
        alignment: { horizontal: 'center', wrapText: true }
      };
    });
    const wscols = headers.map(header => ({ wch: getMaxColumnWidth(data, header) }));
    worksheet['!cols'] = wscols;
    const rowCount = worksheetData.length;
    for (let r = 0; r < rowCount; r++) {
      let maxCellHeight = 0;
      for (let c = 0; c < headers.length; c++) {
        const cellAddress = XLSX.utils.encode_cell({ r, c });
        const cell = worksheet[cellAddress];
        if (cell) {
          const cellTextLength = cell.v ? cell.v.toString().length : 0;
          const cellWidth = wscols[c].wch;
          const lines = Math.ceil(cellTextLength / cellWidth);
          const cellHeight = lines * 20;
          maxCellHeight = Math.max(maxCellHeight, cellHeight);
          cell.s = cell.s || {};
          cell.s.alignment = cell.s.alignment || {};
          cell.s.alignment.wrapText = true;
          worksheet[cellAddress] = cell;
        }
      }
      worksheet['!rows'] = worksheet['!rows'] || [];
      worksheet['!rows'][r] = { hpx: maxCellHeight };
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'reports.xlsx');
  };


  // const handleSVGClick = async (newStatus) => {
  //   setQParams({ status: newStatus })
  // };
  // const [Qparams, setQParams] = useState({});
  // const debouncedParams = useCallback(
  //   debounce((param) => {
  //     console.log(param);
  //     submit(param, { method: "get", action: "." });
  //   }, 500),
  //   [submit]
  // );

  // useEffect(() => {
  //   debouncedParams(Qparams);
  // }, [Qparams, debouncedParams]);

  return (
    <div className="overflow-x-auto p-3">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-col-3 items-center gap-2 mt-2">
        <h1 className="font-semibold text-lg grid1-item">Reports</h1>
        <div className="grid1-item text-start">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center p-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
              // onChange={handleSearch}
              // value={Qparams?.search}
              type="search"
              id="default-search"
              className="block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none "
              placeholder="Search here..."
              required
            />
          </div>
        </div>
        <div className="grid1-item text-end flex justify-end filter_pagination divide-x-2 h-7 mt-2"></div>
      </div>
      {/* table */}

      <div className="max-h-[510px] overflow-y-scroll mt-5">
        <table className="w-full">
          <thead>
            <tr>
              <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                S.no
              </th>
              <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                Report Name
              </th>

              <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody className=" divide-gray-200 dark:divide-gray-700">

            <tr className={`hover:bg-slate-100 dark:hover:bg-gray-700 `}>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
              >
                1
              </td>

              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
              >
                ATBT
              </td>


              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
              >
                {
                  atbtData && atbtData.length > 0 ? (
                    <button
                      type="button"
                      title="xlsx file"
                      className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={() => handleDownload(atbtData, headersAtbt)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>

                    </button>

                  ) : "No Reports Found"
                }
              </td>
            </tr>





            <tr className={`hover:bg-slate-100 dark:hover:bg-gray-700 `}>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
              >
                2
              </td>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
                style={{ maxWidth: "160px" }}
              >
                ATR
              </td>

              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
                style={{ maxWidth: "160px" }}
              >
                {
                  atrData && atrData.length > 0 ? (
                    <button
                      type="button"
                      title="xlsx file"
                      className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={() => handleDownload(atrData, headerATR)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>

                    </button>

                  ) : "No Reports Found"
                }

              </td>
            </tr>




            <tr className={`hover:bg-slate-100 dark:hover:bg-gray-700 `}>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
              >
                3
              </td>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
                style={{ maxWidth: "160px" }}
              >
                ATBT Master
              </td>

              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
                style={{ maxWidth: "160px" }}
              >
                {
                  masterData && masterData.length > 0 ? (
                    <button
                      type="button"
                      title="xlsx file"
                      className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={() => handleDownload(masterData, headerMaster)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>

                    </button>

                  ) : (
                    "No Reports Found"
                  )
                }

              </td>
            </tr>





          </tbody>
        </table>
      </div>
    </div>
  );
}



export default Reports;







// const reportdata = [{

//   decision: "task-2 ready",
//   meetingId: 454,
//   comments: [
//     { upadatedDecision: "table content", personResponble: "krishna" },
//     { upadatedDecision: "content", personResponble: "sita" },
//     { upadatedDecision: "reporst", personResponble: "david" },
//     { upadatedDecision: "refund ", personResponble: "sai" },
//     { upadatedDecision: "teams", personResponble: "venu" },
//     { upadatedDecision: "tasks", personResponble: "ram" },
//   ]
// }]
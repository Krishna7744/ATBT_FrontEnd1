import React from 'react'
import { useNavigate } from "react-router-dom";
import UserChart from '../../charts/UserChart'
function Reports() {
  const navigate = useNavigate();
  document.title = "Page Not Found";
  return (
    <div>
        {/* <UserChart/>
        <h1>reports</h1> */}
      <div className="not-found h-96 flex flex-col justify-center items-center mt-14">
        <div className=" border-2 border-gray-100 px-64   py-10 shadow-lg  mt-40">
          <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-orange-600">
              <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
            </svg>
          </div>
          <div className="text-8xl text-center text-orange-600  font-light mt-5">404</div>
          <div className="text-2xl text-center text-orange-600 mt-5" >  Page Not Found</div>
          <div className="flex justify-center">
            <button className="border border-1 border-gray-100 mt-10 p-3 bg-orange-600 text-white rounded-md " onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
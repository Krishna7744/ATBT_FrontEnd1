import React, { useState, useRef } from 'react';
import defprop from '../../../Images/defprof.svg';
import teams_img from '../../../Images/360_F_201108775_UMAoFXBAsSKNcr53Ip5CTSy52Ajuk1E4.jpg'

const TeamsForm = () => {
    const [imageSrc, setImageSrc] = useState(null);

    //  for binding data
    const [entityform, setEntityForm] = useState({
        entityname: "",
        entityphoto: imageSrc,
        entitydescription: "",
        entitymembers: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntityForm((e) => ({
            ...e, [name]: value
        }))
    }
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const users = ["irshad@gmail.com", "bhavitha@gmail.com", "balu@gmail.com", "anil@gmail.com", "niraj@gmail.com", "irfan@gmail.com", "lashmi@gmail.com", "suma@gmail.com", "vivek@gmail.com"];
    const handleInputChange = (value) => {
        setQuery(value);
        setShowUsers(true);
    };
    const handleClick = (value) => {
        setSelected((e) => [...e, value])
        setQuery('');
        setShowUsers(false);
    };
    //  for add member input remove users
    const handleRemove = (user) => {
        const updatedSelected = selected.filter((selectedUser) => selectedUser !== user);
        setSelected(updatedSelected);
    };
    return (

        <div className='container p-4 bg-[#f8fafc]h-[450px] relative'>
            {/* <p className="font-lg font-semibold p-3">Entity Form</p> */}
            <p className="text-lg font-semibold">New Team</p>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-3  gap-6 mt-4 ">
                <div className="col-span-1 ps-5 pe-8 mt-6">
                    <form className="space-y-3" method="POST">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Team Name</label>
                            <div className="">
                                <input id="name" name="entityname" type="text" autoComplete="name" onChange={handleChange} value={entityform.entityname} required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="name" className=" block text-sm my-2 font-medium leading-6 text-gray-900" >Description</label>
                            <div className=''>
                                <textarea name='entitydescription' onChange={handleChange} value={entityform.entitydescription} className="resize-none bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400"></textarea>
                            </div>
                        </div>

                        <div className='relative'>
                            <label htmlFor="email" className="block text-sm my-2 font-medium leading-6 text-gray-900">Add Member</label>

                            <div className='border border-1 flex flex-wrap gap-1 px-1 py-1 selected-users-container relative z-50 rounded-md'>
                                {selected.map((result) => {
                                    let mail = result.split("@")[0]
                                    return (
                                        <span className='flex gap-1 text-xs my-1 border-2 border-gray-200 rounded-md p-0.5 focus:border-orange-600
                    '>
                                            <img className="w-4 h-4 rounded-lg" src={defprop} alt="Neil image" /> {mail} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                                className="w-4 h-4 " onClick={() => handleRemove(result)}>
                                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                            </svg>
                                        </span>
                                    )
                                })}


                                <input
                                    type="text"
                                    tabindex="0" aria-describedby="lui_5891" aria-invalid="false"
                                    style={{ border: "none" }}
                                    className='bg-[#f8fafc] w-20 h-5 mt-1 focus:outline-none z-40'
                                    value={query}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                />
                            </div>
                            {showUsers && (
                                <ul className="user-list z-50 absolute top-full left-0  bg-gray-50 border border-1 border-gray-200 w-full">

                                    {users
                                        .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
                                        .map((user, index) => (
                                            <li key={index}
                                                className='px-3 pb-0.5 hover:bg-gray-200'

                                                onClick={() => handleClick(user)}>
                                                {user}
                                            </li>
                                        ))}
                                </ul>
                            )}


                        </div>


                        <div className=''>
                            <button type="submit"
                                className="mt-6 flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Create Team</button>
                        </div>
                    </form>
                </div>
                <div className="col-span-2 shadow-md px-6 py-4 border-2 rounded-md bg-[#f8fafc] ">
                    <div className='mb-5 mt-3'>
                        <div className="flex gap-4">
                            <div className="group h-10 ">
                                <img className="w-10 h-10 rounded-lg " src={teams_img} alt="Neil image" />
                            </div>
                            <p className="text-lg font-black text-gray-800 mt-2">{entityform.entityname}</p>
                        </div>
                        <hr className='my-3' />
                        <div className='h-20 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full  '>
                            {/* <textarea className="resize-none h-20 border border-1 border-gray-200 focus:outline-none "> */}
                            {entityform.entitydescription}
                            {/* </textarea> */}
                        </div>
                        <p className='text-md font-semibold my-3' > Members</p>
                        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-5'>
                            <div className='col-span-1 flex justify-start gap-3'>
                                <h5 className='bg-[#f87171] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'> SA</h5>
                                {/* <img
                src="data:image/jpeg;base64,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"
                className="rounded-full w-10 h-10 mr-4"
                alt="Default User Photo"
              /> */}
                                <p className='mt-1.5 font-thin  text-sm'>srilakshmi.a</p>
                            </div>
                            <div className='col-span-1 flex justify-start gap-3'>
                                <h5 className='bg-[#f87171] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'> BY</h5>
                                <p className='mt-1.5 font-thin  text-sm'>Bhavitha.y</p>
                            </div>
                            <div className='col-span-1 flex justify-start gap-3'>
                                <h5 className='bg-[#fb923c] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>IM</h5>
                                <p className='mt-1.5 font-thin  text-sm'>Irshad.md</p>
                            </div>
                            <div className='col-span-1 flex justify-start gap-3'>
                                <h5 className='bg-[#818cf8] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'> SA</h5>
                                <p className='mt-1.5 font-thin  text-sm'>srilakshmi.a</p>
                            </div>
                            <div className='col-span-1 flex justify-start gap-3'>
                                <h5 className='bg-[#fb923c] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'> NN</h5>
                                <p className='mt-1.5 font-thin  text-sm'>Niraj.n</p>
                            </div>
                            <div className='col-span-1 flex justify-start gap-3'>
                                <h5 className='bg-[#f87171] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'> IS</h5>
                                <p className='mt-1.5 font-thin  text-sm'>Irfan.sk</p>
                            </div>
                            <div className='col-span-1 flex justify-start gap-3'>
                                <h5 className='bg-[#fb923c] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'> KN</h5>
                                <p className='mt-1.5 font-thin  text-sm'>Krishna.n</p>
                            </div>
                            <div className='col-span-1 flex justify-start gap-3'>
                                <h5 className='bg-[#f87171] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'> SA</h5>
                                <p className='mt-1.5 font-thin  text-sm'>srilakshmi.a</p>
                            </div>
                            <div className='col-span-1 flex justify-start gap-3'>
                                <h5 className='bg-[#818cf8] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'> SA</h5>
                                <p className='mt-1.5 font-thin  text-sm'>srilakshmi.a</p>
                            </div>
                            <div className='col-span-1 flex justify-start gap-3'>
                                <h5 className='bg-[#f87171] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'> SA</h5>
                                <p className='mt-1.5 font-thin  text-sm'>srilakshmi.a</p>
                            </div>
                            <div className='col-span-1 flex justify-start gap-3'>
                                <h5 className='bg-[#818cf8] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'> SA</h5>
                                <p className='mt-1.5 font-thin  text-sm'>srilakshmi.a</p>
                            </div>
                            <div className='col-span-1 flex justify-start gap-3'>
                                <h5 className='bg-[#fb923c] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'> SA</h5>
                                <p className='mt-1.5 font-thin  text-sm'> +2 more</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>
    )
}

export default TeamsForm
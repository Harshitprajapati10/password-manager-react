import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("password")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showpassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        //console.log(form)

        if(form.site.length >3 && form.username.length >3 &&form.password.length >3){
        setpasswordArray([...passwordArray, {...form, id:uuidv4()}])
        localStorage.setItem("password", JSON.stringify([...passwordArray,  {...form, id:uuidv4()}]))
        console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })

        toast('Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }else{
        toast('Error: Password not saved!');
    }

    }

    const handleChange = e => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const deletePassword = (id)  =>{
        //console.log("deleting" , id)
        let c = confirm("Do you really want to delete this password?")
        if(c){
            setpasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id))) 
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword  = (id) => {
        //console.log("editing" , id)
        setform(passwordArray.filter(i=>i.id===id)[0]) 
        setpasswordArray(passwordArray.filter(item=>item.id!==id)) 
    }
    

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full "><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>

            <div className="mx-auto p-3 md:mycontainer min-h-[88.2vh]">

                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-green-500">Hp/&gt;</span>
                </h1>

                <p className='text-green-900 text-center text-lg'>Your own password Manager</p>

                <div className="text-black flex flex-col gap-8 p-4 items-center">
                    {/* firstInput */}
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        {/* SecondInput */}
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />

                        <div className="relative">
                            {/* ThirdInput */}
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="password" />

                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showpassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" srcset="" />
                            </span>
                        </div>


                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full px-8 gap-2 py-2 w-fit hover:bg-green-300 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords">

                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className='table-auto w-full rounded-md overflow-hidden'>
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>

                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>

                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className="flex items-center justify-center">
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className="cursor-pointer size-7" onClick={() => { copyText(item.site) }}>
                                                    <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className="flex items-center justify-center">
                                                <span>{item.username}</span>
                                                <div className="cursor-pointer size-7" onClick={() => { copyText(item.username) }}>
                                                    <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className="flex items-center justify-center">
                                                <span>{item.password}</span>
                                                <div className=" lordiconcopy cursor-pointer size-7" onClick={() => { copyText(item.password) }}>
                                                    <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" ></lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='py-2 border border-white text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>

                                    </tr>
                                })}

                            </tbody>
                        </table>}

                </div>
            </div>
        </>
    )
}

export default Manager

import React from 'react'

const Navbar = () => {

    
    const openUrl = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
                <div className='logo font-bold text-white text-2xl'>
                    <span className="text-green-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-green-500">Hp/&gt;</span>
                </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href="#">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">Contact</a>
                    </li>
                </ul> */}
                <button className="text-white ring-white ring-1 bg-green-700 my-5 rounded-full flex justify-between items-center" onClick={() => openUrl('https://https://github.com/Harshitprajapati10/password-manager-react')}>
                    <img className='invert w-10 p-1' src="icons/github.svg" alt="Github Logo" />                    
                    <span className="font-bold px-2">GitHub</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar

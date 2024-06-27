import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center md-6 w-full'>
      <div className='logo font-bold text-white text-2xl'>
        <span className="text-green-500">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">Hp/&gt;</span>
      </div>
      <div className='flex justify-center items-center'>
        Created with <img className='w-6 mx-2' src="icons/heart.png" alt="heart" /> by H@rshit
      </div>
    </div>
  )
}

export default Footer

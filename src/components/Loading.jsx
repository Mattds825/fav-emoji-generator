import React from 'react'

const Loading = () => {
  return (
    <div className='loadingDiv absolute flex flex-col items-center justify-center w-[90%] h-[90%] rounded-lg bg-opacity-60 bg-indigo-200 z-50'>
        <span className="emoji-loading hourglass" role="img" aria-label="hourglass"></span>
        <h3 className='text-4xl text-white font-bold'>Loading...</h3>
    </div>
  )
}

export default Loading
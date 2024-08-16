import React from 'react'
import "@/src/app/loading.css";

const Loading = () => {
  return (
    <>
        <div className="loading w-full h-full overflow-hidden bg-offWhite">
          <svg xmlns='http://www.w3.org/2000/svg'  id="preloader" viewBox='0 0 300 150'>
            <linearGradient id="grad1">
                <stop offset="0%" stopColor="#3572EF"/>
                <stop offset="50%" stopColor="#3572EF"/>
                <stop offset="100%" stopColor="#3572EF" stopOpacity="0.2" />
            </linearGradient>
            <path fill='none' stroke='url(#grad1)' strokeWidth='15' strokeLinecap='round' strokeDasharray='300 385' strokeDashoffset='0' d='M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z'>
              <animate attributeName='stroke-dashoffset' calcMode='spline' dur='2' values='685;-685' keySplines='0 0 1 1' repeatCount='indefinite'>              
              </animate>
            </path>
          </svg>
    </div>
    </>
  )
}
export default Loading

import React from 'react'
import Link from 'next/link'

const Main = () => {
  return (
    <>
      <section className="bg-background h-[88vh] flex align-center text-offBlack">
          <div className="px-4 my-auto mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="max-w-2xl mx-auto text-center">
                  <p className="text-3xl font-semibold leading-tight sm:leading-tight sm:text-3xl md:text-5xl lg:leading-tight">
                      <span className="highlight">Electronics</span> and Communication Engineering
                      <span className=" highlight relative inline-flex sm:inline"> Student Society</span>
                  </p>
                  <h1 className=" mt-5 px-6 text-md text-offBlack">The Electronics and Communication Engineering Student Society (EXCESS) is a non-political umbrella type society registered within the IOE Purwanchal campus, Dharan.It was formed in 2070 B.S.</h1>

                  <div className="px-8 mt-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-3 max-[640px]:space-y-2 sm:flex font-bold text-sm">
                      <a href="https://ioepc.edu.np/" title="" className="inline-flex items-center justify-center w-full px-8 py-2  text-white transition-all duration-500 bg-ioeBlue border-2 border-transparent sm:w-auto rounded-md hover:bg-transparent hover:border-ioeBlue hover:text-ioeBlue" role="button"> Purwanchal Campus </a>


                      <a href="https://xtech.ioepc.edu.np/" title="" className="inline-flex items-center justify-center w-full px-8 py-2 text-white transition-all duration-500 bg-xyellow border-2 border-transparent sm:w-auto rounded-md hover:bg-transparent hover:border-xyellow hover:text-xyellow" role="button"> X-Tech </a>


                      <a href="https://cs50xnepal.ioepc.edu.np/" title="" className="inline-flex items-center justify-center w-full px-8 py-2  text-white transition-all duration-500 bg-cs50red border-2 border-transparent sm:w-auto rounded-md hover:bg-transparent hover:border-cs50red hover:text-cs50red" role="button"> CS50xNepal </a>
                  </div>
              </div>
          </div>
      </section>   
    </>
  )
}
export default Main

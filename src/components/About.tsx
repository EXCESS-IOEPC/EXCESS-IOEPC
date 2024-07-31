import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <section className="py-10">
      <div className="flex flex-col-reverse md:flex-row mx-auto m-10 h-4/6 w-4/5 rounded-2xl bg-gradient-to-br from-orange-300 to-white-500 to-white-500 to-white-500 cursor-pointer justify-center">
        <div className="bg-line bg-no-repeat md:w-3/5">
          <h1 className="text-center font-bold text-2xl pt-5 text-primaryBlue">ABOUT US</h1> 
          <p className="text-xs p-5">Electronics and Communication Engineering Student&apos;s Society (EXCESS) is a non-political, non-profit-oriented, umbrella-type society for students pursuing a Bachelor&apos;s degree in Electronics, Communication, and Information Engineering at IOE Purwanchal Campus, Dharan. Since its establishment in 2070 BS, EXCESS has operated independently, free from political or other external influences, dedicating itself to serving students with the utmost dedication and commitment to personal and professional growth. Guided by the Electronics and Computer Department, EXCESS functions as a vital bridge between students and the campus community, fostering a spirit of innovation, collaboration, and excellence. EXCESS has provided transformative experiences for its members, emphasizing the power of teamwork and shared goals. Leaders within the society have introduced groundbreaking initiatives, such as cutting-edge training programs and innovative projects, ensuring that students excel in the digital realm and beyond. The camaraderie and dedication within EXCESS have been sources of inspiration, nurturing lifelong skills and friendships. Members of EXCESS have continually fostered an environment of collaboration and experimentation, developing skills that extend beyond the classroom. This society has become a cornerstone of the university experience, shaping career trajectories and preparing students for real-world challenges in electronics engineering. As a community, EXCESS stands at the forefront of innovation in electronics engineering, steering its members toward new achievements that define the future of technology. The society&apos;s commitment to growth, innovation, and excellence has made it a transformative force, dedicated to preparing students for a successful future in the ever-evolving field of electronics engineering.</p>
        </div>
        <div className="md:w-2/5 border-b-4 md:border-l-4 md:border-b-0 border-primaryBlue">
          <picture>
            <Image width={32} height={32} alt="ERC Image" src="./images/erc-scaled.jpg" className="bg-cover w-full h-full rounded-t-2xl rounded-r-0 md:rounded-r-2xl md:rounded-tl-none brightness-50"/>

          </picture>
        </div>
      </div>
    </section>
    )
}

export default About
import type { NextPage } from 'next';
import React from 'react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';

const DataCamp = ({ isLoading }: { isLoading: boolean }) => {
	const [showForm, setShowForm] = useState(false);

	const handleClick = () => {
		setShowForm(!showForm);
	};

	return (
		<>
			{/* container */}
			<div className="bg-white w-full">
				{/* header */}
				<div className="flex flex-col justify-center items-center mx-auto text-center max-w-auto md:max-w-[80rem]">
					{/* data camp */}
					<div className="justify-center text-transparent mt-16 mx-15 sm:mx-10 bg-clip-text bg-gradient-to-r from-green-400 to-green-900 text-4xl sm:text-5xl font-bold pb-8">
						<h1>DataCamp 2024</h1>
					</div>

					{/* info/logo/image */}
					<div className="image flex flex-1 flex-col min-[990px]:flex-row mt-6 mx-14 sm:ml-28 sm:mr-28">
						<div className="mb-5 flex flex-col">
							<div className="flex flex-row w-48 md:w-60 h-14 mt-4 mb-4">
								{/* Excess Logo */}
								<Image
									src="icon.png"
									alt="Excess Logo"
									className="pr-6 w-20 md:w-[6.5rem]"
								/>
								<div className="h-14 rounded-xl bg-gradient-to-b from-blue-400 to-blue-800">
									{/* logo seperator */}
									<div className="w-0.5"></div>
								</div>
								{/* DAta Camp Logo */}
								<Image
									src="images/datacamp/datacamp donates 1.png"
									className="pl-6"
									alt="Datacamp Donates Logo"
								/>
							</div>
							<div className="text-justify text-xs pt-4 sm:pr-6 ">
								<p>
									We are excited to announce that applications are open for the
									EXCESS Data Fellowship 2024! Organized by{' '}
									<a
										className="text-blue-400 font-semibold"
										href="https://excess.ioepc.edu.np/">
										EXCESS Nepal
									</a>{' '}
									in partership with{' '}
									<a
										href="https://www.datacamp.com/"
										className="text-green-400 font-semibold">
										DataCamp Donates
									</a>
									, this fellowship aims to equip passionate Nepali Students and
									professionals with the skills needed to thrive in today&apos;s
									data-driven world. This initiative provides free access to
									DataCamp&apos;s premium courses, helping learners build and
									enhance their data skills, regardless of their finiancial
									background.
								</p>
								<p className="pt-5">
									This fellowship is ideal for anyone looking to evaluate their
									career, especially those who lack access to high -quality data
									education. Whether you&apos;re a student, professional, or
									aspiring data enthusiast, this program will help you gain the
									skills that can shape your future.
								</p>
							</div>
						</div>

						{/* side Image */}
						{/* hidden till min 768px */}
						<div className="block md:min-w-[24rem] align-center justify-center">
							<Image src="/images/datacamp/Image.png" alt="logo" />
						</div>
					</div>

					<div className="mt-3 flex text-center bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent leading-normal font-bold text-md mb-7">
						<h1>Scroll for more details!!</h1>
					</div>
				</div>

				{/* ABOUT */}
				{/* till 768px h-64 and after 768px h-52  */}
				<div className="text-white w-full h-[17rem] sm:h-64 bg-gray-800 mt-10 mb-10 md:h-64">
					<div className="text-3xl pt-10 font-bold text-center">
						<h1>
							What is{' '}
							<span className="bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent leading-normal">
								datacamp
							</span>
							?
						</h1>
					</div>
					<div className="pt-5 text-xs flex text-center px-10 sm:px-40 md:px-52">
						<p>
							DataCamp is a world-leading online platform providing courses in
							data science,analytics, machine learning, and more. It offers
							training across all skill levels from non-coding business
							essentials to advanced programming all taught by leading industry
							level experts.Companies like Google,Uber, and PayPal use DataCamp
							to upskill their employee, and now, through their partnership,
							we&apos;re bringing that same opportunity to you!{' '}
						</p>
					</div>
				</div>

				{/* Furthur detail */}
				<div className="flex flex-col sm:flex-row w-full mb-20">
					<div className=" ml-10 text-xl w-full sm:w-1/2 pr-14">
						<h1 className="text-2xl font-semibold bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent leading-normal">
							Program Overview
						</h1>
						<div className="pt-4 text-xs text-wrap">
							<p>The Data Fellowship offers:</p>
							<ul className="list-disc pl-5">
								<li className="py-1">
									<b>Premium Access to DataCamp:</b> Full access to
									DataCamp&apos;s premium courses and certifications.{' '}
								</li>
								<li className="py-1">
									<b>Opportunity to Publish:</b> Fellows will have the chance to
									publish visualizations and blog posts through the EXCESS Nepal
									platform.
								</li>
								<li className="py-1">
									<b>Expert Mentorship:</b> Offline and online support from
									experienced data professionals.
								</li>
								<li className="py-1">
									<b>Open Source Projects:</b> Fellows can contribute to
									impactful open-source data projects.
								</li>
								<li className="py-1">
									<b>Certification:</b> Upon successful completion of the
									fellowship, fellows will receive a digital certification from
									EXCESS Nepal.
								</li>
								<li className="py-1">
									<b>Community Engagement:</b> FEllows will become part of the
									EXCESS Nepal community access to exclusive networking and
									professional growth opportunities.
								</li>
							</ul>
						</div>
					</div>
					{/* center line */}
					<div className="h-1 sm:h-28 rounded-2xl sm:bg-gradient-to-b from-blue-400 to-blue-800 mt-1 sm:mt-40 md:mt-20">
						<div className="sm:w-1.5"></div>
					</div>
					{/* More detail */}
					<div className=" sm:ml-10 text-xl sm:w-1/2 pr-10">
						<div className=" ml-10 text-xl">
							<h1 className="text-2xl font-semibold bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent leading-normal">
								Fellowship Phases
							</h1>
							<div className="pt-4 text-xs text-wrap">
								<p className="pb-2">
									<b>Step 1: Complete DataCamp Courses</b>
								</p>
								<p className="pb-2">
									Fellows are required to complete selected DataCamp courses
									within a 3-month period. These courses will help participants
									develop critical data skills, from basic analytics to machine
									learning.
								</p>
								<p className="pb-2">
									<b>Step 2: Submit an Assignment</b>
								</p>
								<p className="pb-2">
									Each fellow must submit a data visualization or a fellowship
									blog post, demonstrating their learning and applying it in a
									rea-world context. Selected works will be featured on the
									EXCESS Nepal platform.
								</p>
								<p className="pb-2">
									<b>Step 3: Continued Support and Opportunities</b>
								</p>
								<p>
									Fellows will have access to post-fellowship opportunities,
									inluding:
								</p>
								<ul className="list-disc pl-5">
									<li>Involvement in organizational data projects.</li>
									<li>Job and internship recommendations.</li>
									<li>Ongoing mentorship and community support.</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* APPLY NOW */}
				<div className="flex justify-center text-xl font-bold text-white active:text-black">
					<button
						onClick={handleClick}
						className="w-60 h-16 text-center content-center rounded-xl bg-gradient-to-r from-green-400 to-green-900 mb-10 active:bg-green-800 active:bg-none">
						{showForm ? 'Hide Form' : 'Apply Now'}
					</button>
				</div>

				{/* Embeded form */}
				{showForm && (
					<div className="flex justify-center w-full bg-gray-900">
						<div className="backdrop-blur-xl my-5 bg-white p-4 rounded-lg">
							<iframe
								src="https://docs.google.com/forms/d/e/1FAIpQLSfAUKkwz14hTtjbNJwPpeNU99HJ7uOF0_cOdO16fdWHPr36xw/viewform?embedded=true"
								className="w-[450px] h-[500px] md:w-[600px] md:h-[900px]"
								frameBorder={0}
								marginHeight={0}
								marginWidth={0}>
								Loading…
							</iframe>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default DataCamp;

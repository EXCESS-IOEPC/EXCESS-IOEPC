import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const DataCamp = ({ isLoading }: { isLoading: boolean }) => {
	return (
		<>
			{/* container */}
			<div className="w-full container mx-auto px-4 sm:px-0">
				{/* header */}
				<div className="flex flex-col justify-center items-center mx-auto text-center max-w-auto">
					{/* data camp */}
					<div className="justify-center text-transparent mt-16 mx-15 sm:mx-10 bg-clip-text bg-gradient-to-r from-green-400 to-green-900 text-4xl sm:text-5xl font-bold pb-8">
						<h1>DataCamp Fellowship 2025/26</h1>
					</div>

					{/* info/logo/image */}
					<div className="flex flex-col min-[990px]:flex-row mt-6">
						<div className="mb-5 flex flex-col">
							<div className="flex flex-row h-14 mt-4 mb-4">
								{/* Excess Logo */}
								<div className="flex-shrink-0 pr-6">
									<Image
										src="/icon.png"
										alt="Excess Logo"
										width={54}
										height={56}
										layout="intrinsic"
									/>
								</div>
								<div className="h-14 rounded-xl bg-gradient-to-b from-blue-400 to-blue-800">
									{/* logo seperator */}
									<div className="w-0.5"></div>
								</div>
								{/* DataCamp Donates Logo */}
								<div className="flex-shrink-0 pl-6">
									<Image
										src="/images/datacamp/datacamp donates 1.png"
										alt="Datacamp Donates Logo"
										width={180}
										height={90}
										layout="intrinsic"
									/>
								</div>
							</div>
							<div className="text-justify text-md pt-4 sm:pr-6 ">
								<p>
									We are excited to announce that applications are open for the
									EXCESS Data Fellowship 2025/26! Organized by{' '}
									<a
										className="text-blue-400 font-semibold"
										href="https://excess.ioepc.edu.np/">
										EXCESS Nepal
									</a>{' '}
									in partership with{' '}
									<a
										href="https://www.datacamp.com/donates"
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
							<div className="flex mt-8 font-bold active:text-black">
								<a
									target="_blank"
									href="https://docs.google.com/forms/d/e/1FAIpQLScWhHxYNFB9rqB06rkIIXgDgxbEN6WIqMF456taZ7vd49gDOg/viewform"
									className="animate-bounce text-xl text-white w-auto h-auto px-20 py-6 text-center content-center rounded-xl bg-gradient-to-r from-green-400 to-green-900 mb-10 active:bg-green-800 active:bg-none">
									Apply Now
								</a>
							</div>
						</div>

						{/* side Image */}
						<div className="block md:min-w-[40rem] align-center justify-center">
							<Image
								src="/images/datacamp/Image.png"
								width={1000}
								height={1000}
								className="w-full h-full"
								quality={100}
								alt="Data Girl"
							/>
						</div>
					</div>

					<div className="mt-3 flex text-center bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent leading-normal font-bold text-lg animate-bounce mb-7">
						<h1>Scroll for more details!!</h1>
					</div>
				</div>

				{/* ABOUT */}
				{/* till 768px h-64 and after 768px h-52  */}
				<div className="text-white w-full rounded-sm bg-offBlack py-16 my-10">
					<div className="text-4xl font-bold text-center">
						<h1>
							What is{' '}
							<span className="bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent leading-normal">
								datacamp
							</span>
							?
						</h1>
					</div>
					<div className="text-md flex text-center max-w-[85%] lg:max-w-[70%] mx-auto mt-2">
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
				<div className="flex flex-col sm:flex-row w-full mb-20 overflow-hidden">
					<div className=" sm:ml-10 text-xl w-full sm:w-1/2 sm:pr-14">
						<h1 className="text-4xl font-semibold bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent leading-normal">
							Program Overview
						</h1>
						<div className="pt-4 text-md text-wrap">
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
					<div className="h-1 sm:h-36 rounded-2xl sm:bg-gradient-to-b from-blue-400 to-blue-800 mt-1 sm:mt-40 md:mt-20">
						<div className="sm:w-1"></div>
					</div>
					{/* More detail */}
					<div className=" sm:ml-10 text-xl sm:w-1/2 sm:pr-10">
						<div className="sm:ml-10 text-xl">
							<h1 className="text-4xl font-semibold bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent leading-normal">
								Fellowship Phases
							</h1>
							<div className="pt-4 text-md text-wrap">
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

				<div className="text-white w-full rounded-sm bg-offBlack py-16 my-10">
					<div className="text-4xl font-bold text-center">
						<h1>
							Past Success of
							<span className="bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent leading-normal">
								{' '}
								EXCESS With DataCamp
							</span>
						</h1>
					</div>
					<div className="text-2xl font-bold text-center">
						<h1>
							<span className="bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent leading-normal">
								{' '}
								DataCamp Cohort 2024/25
							</span>
						</h1>
					</div>
					<div className="text-md flex text-center max-w-[85%] lg:max-w-[70%] mx-auto mt-2">
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
				<div className="mx-auto flex flex-col lg:flex-row items-center pb-16 gap-10">
					{/* Left - Image / Logo */}
					<div className="flex-shrink-0 flex justify-center lg:justify-start w-full lg:w-1/3">
						<div className="flex-shrink-0 pr-6">
							<Image
								src="/icon.png"
								alt="Excess Logo"
								width={54}
								height={56}
								layout="intrinsic"
							/>
						</div>
						<div className="h-14 rounded-xl bg-gradient-to-b from-blue-400 to-blue-800">
							{/* logo seperator */}
							<div className="w-0.5"></div>
						</div>
						{/* DataCamp Donates Logo */}
						<div className="flex-shrink-0 pl-6">
							<Image
								src="/images/datacamp/datacamp donates 1.png"
								alt="Datacamp Donates Logo"
								width={180}
								height={90}
								layout="intrinsic"
							/>
						</div>
					</div>

					{/* Right - Text Content */}
					<div className="text-center lg:text-left w-full lg:w-4/5 space-y-4">
						<h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent leading-normal">
							DataCamp Cohort 2024/25
						</h2>
						<p className="text-gray-700 text-justify text-lg leading-relaxed">
							The{' '}
							<span className="font-semibold text-green-900">
								DataCamp Cohort 2024/25
							</span>
							, initiated through EXCESS Nepal’s partnership with{' '}
							<span className="font-semibold">DataCamp</span>, marked a
							significant step in empowering students with essential skills in
							Artificial Intelligence and Data Science . This collaboration
							provided structured learning resources, mentorship, and real-world
							project exposure to aspiring engineers, enabling them to build a
							strong foundation in data-driven technologies. The cohort’s
							success played a crucial role in supporting{' '}
							<Link
								href="https://cs50xnepal.ioepc.edu.np/"
								className="font-semibold text-primaryBlue hover:underline">
								CS50AI
							</Link>{' '}
							— the second edition of the highly acclaimed{' '}
							<Link
								href="https://cs50xnepal.ioepc.edu.np/"
								className="font-semibold text-primaryBlue hover:underline">
								CS50xNepal
							</Link>{' '}
							— at{' '}
							<Link
								href="https://ioepc.edu.np/"
								className="font-semibold text-primaryBlue hover:underline">
								IOE Purwanchal Campus
							</Link>
							, making it one of the most impactful learning initiatives of the
							year.
						</p>
					</div>
				</div>
				{/* APPLY NOW */}
				<div className="flex flex-col justify-center align-center">
					<div className="mb-2 mx-auto text-justify sm:px-5">
						<p className="font-semibold text-md text-offBlack">
							Take the next step toward mastering data skills and shaping your
							future! Apply for the EXCESS Data Fellowship 2025/26 and join us
							in building a brighter, data-powered Nepal.
						</p>
					</div>
					<div className="flex justify-center items-center font-bold text-white active:text-black">
						<iframe
							src="https://docs.google.com/forms/d/e/1FAIpQLSeJROPPAB1kHb-rxT53S9VNgs96HwDw8mpDZQIQ_F5PHp9D7w/viewform?embedded=true"
							width="100%"
							height="1500"
							className="lg:scale-110 origin-top">
							Loading…
						</iframe>
					</div>
				</div>
			</div>
		</>
	);
};

export default DataCamp;

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			stiffness: 50,
			delayChildren: 0.3, // Delay before child animations start
			staggerChildren: 0.2, // Stagger animations of child elements
		},
	},
};

const childVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0 },
};

const Main = ({ isLoading }: { isLoading: boolean }) => {
	return (
		<>
			<motion.section
				className="bg-background h-[88vh] flex align-center text-offBlack"
				variants={containerVariants}
				initial="hidden"
				animate={isLoading ? 'hidden' : 'visible'} // Trigger animation after loading ends
			>
				<div className="px-4 my-auto mx-auto max-w-7xl sm:px-6 lg:px-8">
					<motion.div className="max-w-2xl mx-auto text-center">
						<motion.p
							className="text-3xl font-semibold leading-tight sm:leading-tight sm:text-3xl md:text-5xl lg:leading-tight"
							variants={childVariants}>
							<span className="highlight">Electronics</span> and Communication
							Engineering
							<span className="highlight relative inline-flex sm:inline">
								{' '}
								Student Society
							</span>
						</motion.p>
						<motion.h1
							className="mt-5 px-6 text-md text-offBlack"
							variants={childVariants}>
							The Electronics and Communication Engineering Student Society
							(EXCESS) is a non-political umbrella type society registered
							within the IOE Purwanchal campus, Dharan. It was formed in 2070
							B.S.
						</motion.h1>
						<div className="px-8 mt-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-3 max-[640px]:space-y-2 sm:flex font-bold text-sm">
							<motion.a
								href="https://ioepc.edu.np/"
								whileHover={{ scale: 1.1 }}
								title=""
								className="inline-flex items-center justify-center w-full px-8 py-2 text-white transition-all duration-500 bg-ioeBlue border-2 border-transparent sm:w-auto rounded-md hover:bg-transparent hover:border-ioeBlue hover:text-ioeBlue"
								role="button"
								variants={childVariants}>
								Purwanchal Campus
							</motion.a>
							<motion.a
								whileHover={{ scale: 1.1 }}
								href="https://excess.ioepc.edu.np/xtech"
								title=""
								className="inline-flex items-center justify-center w-full px-8 py-2 text-white transition-all duration-500 bg-xyellow border-2 border-transparent sm:w-auto rounded-md hover:bg-transparent hover:border-xyellow hover:text-xyellow"
								role="button"
								variants={childVariants}>
								X-Tech
							</motion.a>
							<motion.a
								whileHover={{ scale: 1.1 }}
								href="https://cs50xnepal.ioepc.edu.np/"
								title=""
								className="inline-flex items-center justify-center w-full px-8 py-2 text-white transition-all duration-500 bg-cs50red border-2 border-transparent sm:w-auto rounded-md hover:bg-transparent hover:border-cs50red hover:text-cs50red"
								role="button"
								variants={childVariants}>
								CS50xNepal
							</motion.a>
							<motion.a
								whileHover={{ scale: 1.1 }}
								href="/datacamp"
								title=""
								className="inline-flex items-center justify-center w-full px-8 py-2 text-white transition-all duration-500 bg-datacamp border-2 border-transparent sm:w-auto rounded-md hover:bg-transparent hover:border-datacamp hover:text-datacamp"
								role="button"
								variants={childVariants}>
								DataCamp
							</motion.a>
						</div>
					</motion.div>
				</div>
			</motion.section>
		</>
	);
};

export default Main;

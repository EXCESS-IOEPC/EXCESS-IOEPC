'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Path = ({ d = '', ...props }) => (
	<motion.path
		fill="transparent"
		strokeWidth="3"
		stroke="hsl(0, 20%, 18%)"
		strokeLinecap="round"
		d={d}
		{...props}
	/>
);

const variants = {
	open: {
		opacity: [0, 1],
		x: [20, 0],
		transition: {
			opacity: { duration: 0.3 },
			x: { duration: 0.3 },
		},
	},
	closed: {
		opacity: 0,
		x: 20,
	},
};

const navUL = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.1 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};

const sidebarVariants = {
	open: {
		x: 0,
		transition: {
			type: 'spring',
			stiffness: 300,
			damping: 30,
		},
	},
	closed: {
		x: '100%',
		transition: {
			type: 'spring',
			stiffness: 300,
			damping: 30,
		},
	},
};

function NavBar() {
	const pathname = usePathname();
	const [navbar, setNavbar] = useState(false);

	const navItems = [
		['/', 'Home'],
		['/#about-us', 'About Us'],
		['/#members', 'Members'],
		['/gallery', 'Gallery'],
		['/committee', 'Committee'],
		['/contact-us', 'Contact Us'],
	];

	return (
		<div className="overflow-hidden">
			<nav className="w-full h-auto lg:h-14 bg-offWhite text-offBlack top-0 left-0 right-0 z-10">
				<div className="justify-end align-center h-full lg:items-center lg:flex px-4 sm:px-6 lg:px-9">
					<div className="flex items-center justify-end py-3 lg:py-5 lg:block">
						{/* HAMBURGER BUTTON FOR MOBILE AND TABLET */}
						<div className="lg:hidden flex items-center justify-center align-middle">
							<button
								onClick={() => setNavbar(!navbar)}
								aria-label="Toggle menu"
								className="z-50 relative">
								<motion.svg
									width="23"
									height="23"
									viewBox="0 0 23 23"
									animate={navbar ? 'open' : 'closed'}>
									<Path
										d="M 2 2.5 L 20 2.5"
										initial={{ d: 'M 2 2.5 L 20 2.5' }}
										variants={{
											closed: { d: 'M 2 2.5 L 20 2.5' },
											open: { d: 'M 3 16.5 L 17 2.5' },
										}}
									/>
									<Path
										d="M 2 9.423 L 20 9.423"
										initial={{ opacity: 1, d: 'M 2 9.423 L 20 9.423' }}
										variants={{
											closed: { opacity: 1 },
											open: { opacity: 0 },
										}}
										transition={{ duration: 0.1 }}
									/>
									<Path
										d="M 2 16.346 L 20 16.346"
										initial={{ d: 'M 2 16.346 L 20 16.346' }}
										variants={{
											closed: { d: 'M 2 16.346 L 20 16.346' },
											open: { d: 'M 3 2.5 L 17 16.346' },
										}}
									/>
								</motion.svg>
							</button>
						</div>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden lg:block w-full lg:w-auto">
						<ul className="lg:h-auto items-center justify-center lg:flex font-semibold flex-row">
							{navItems.map(([link, title], index) => (
								<li
									key={index}
									className={`text-sm py-2 px-3 lg:px-4 xl:px-6 overflow-hidden nav-item lg:h-14 h-auto content-center text-center hover:text-primaryBlue ${
										pathname == link ? 'active' : ''
									}`}>
									<Link href={link}>{title}</Link>
								</li>
							))}
							<div className="flex flex-row lg:ml-2 text-sm gap-2 justify-center content-center items-center">
								<li className="w-auto">
									<Link href="/apply" className="block">
										<button className="inline-flex items-center justify-center px-3 xl:px-4 py-2 text-white text-[11px] xl:text-xs transition-all duration-300 bg-gradient-to-r from-primaryBlue to-blue-600 border-2 border-transparent rounded-md hover:from-white hover:to-white hover:border-primaryBlue hover:text-primaryBlue font-bold whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105">
											<svg
												className="w-3 h-3 xl:w-4 xl:h-4 mr-1"
												fill="currentColor"
												viewBox="0 0 20 20">
												<path
													fillRule="evenodd"
													d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
													clipRule="evenodd"
												/>
											</svg>
											Event Registration
										</button>
									</Link>
								</li>
								<li className="w-auto">
									<Link href="https://taranga.ioepc.edu.np/" className="block">
										<button className="inline-flex items-center justify-center px-2 xl:px-3 py-2 text-white text-[11px] xl:text-xs transition-all duration-500 bg-[#3b82f6] border-2 border-transparent rounded-md hover:bg-white hover:border-[#3b82f6] hover:text-[#3b82f6] font-bold whitespace-nowrap">
											Taranga: ACESxEXCESS
										</button>
									</Link>
								</li>
							</div>
						</ul>
					</div>
				</div>
			</nav>

			{/* Mobile Sidebar */}
			<AnimatePresence>
				{navbar && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
							onClick={() => setNavbar(false)}
						/>

						{/* Sidebar Panel */}
						<motion.div
							variants={sidebarVariants}
							initial="closed"
							animate="open"
							exit="closed"
							className="fixed top-0 right-0 h-full w-64 sm:w-80 bg-offWhite shadow-2xl z-50 lg:hidden overflow-y-auto">
							{/* Close Button */}
							<div className="flex justify-end p-4">
								<button
									onClick={() => setNavbar(false)}
									className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
									aria-label="Close menu">
									<svg
										className="w-6 h-6 text-offBlack"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path d="M6 18L18 6M6 6l12 12"></path>
									</svg>
								</button>
							</div>

							<div className="px-6 pb-6">
								<motion.ul
									variants={navUL}
									initial="closed"
									animate="open"
									exit="closed"
									className="flex flex-col space-y-2">
									{navItems.map(([link, title], index) => (
										<motion.li
											key={index}
											variants={variants}
											className={`text-sm py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
												pathname == link
													? 'bg-blue-50 text-primaryBlue font-semibold'
													: 'text-offBlack font-medium'
											}`}>
											<Link
												href={link}
												onClick={() => setNavbar(false)}
												className="block font-semibold w-full">
												{title}
											</Link>
										</motion.li>
									))}

									{/* Registration Button */}
									<motion.li variants={variants} className="pt-4">
										<Link
											href="/apply"
											onClick={() => setNavbar(false)}
											className="block">
											<button className="w-full px-4 py-3.5 text-white text-sm transition-all duration-300 bg-gradient-to-r from-primaryBlue to-blue-600 border-2 border-transparent rounded-lg hover:from-white hover:to-white hover:border-primaryBlue hover:text-primaryBlue font-bold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
												<svg
													className="w-5 h-5"
													fill="currentColor"
													viewBox="0 0 20 20">
													<path
														fillRule="evenodd"
														d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
														clipRule="evenodd"
													/>
												</svg>
												<span>Event Registration</span>
											</button>
										</Link>
									</motion.li>

									{/* Taranga Button */}
									<motion.li variants={variants}>
										<Link
											href="https://taranga.ioepc.edu.np/"
											onClick={() => setNavbar(false)}
											className="block">
											<button className="w-full px-4 py-3 text-white text-sm transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 border-2 border-transparent rounded-lg hover:bg-white hover:border-blue-600 hover:text-blue-600 font-semibold shadow-md hover:shadow-lg">
												Taranga: ACESxEXCESS
											</button>
										</Link>
									</motion.li>
								</motion.ul>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}

export default NavBar;

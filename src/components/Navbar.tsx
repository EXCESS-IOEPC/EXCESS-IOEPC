'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Path = ({ ...props }) => (
	<motion.path
		fill="transparent"
		strokeWidth="3"
		stroke="hsl(0, 20%, 18%)"
		strokeLinecap="round"
		{...props}
	/>
);

const variants = {
	open: {
		opacity: [0, 1],
		y: [50, 0],
		transition: {
			opacity: { duration: 1 },
			y: { stiffness: 1000, velocity: -100, duration: 0.5 },
		},
	},
	closed: {
		y: 0,
		x: 0,
	},
};

const navUL = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
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
			<motion.nav
				animate={navbar ? 'open' : 'closed'}
				className="w-full h-auto lg:h-14 bg-offWhite text-offBlack top-0 left-0 right-0 z-10">
				<div className="justify-end align-center h-full lg:items-center lg:flex px-4 sm:px-6 lg:px-9">
					<div className="flex items-center justify-end py-3 lg:py-5 lg:block">
						{/* HAMBURGER BUTTON FOR MOBILE AND TABLET */}
						<div className="lg:hidden flex items-center justify-center align-middle">
							<button
								onClick={() => setNavbar(!navbar)}
								aria-label="Toggle menu">
								<svg width="23" height="23" viewBox="0 0 23 23">
									<Path
										variants={{
											closed: { d: 'M 2 2.5 L 20 2.5' },
											open: { d: 'M 3 16.5 L 17 2.5' },
										}}
									/>
									<Path
										d="M 2 9.423 L 20 9.423"
										variants={{
											closed: { opacity: 1 },
											open: { opacity: 0 },
										}}
										transition={{ duration: 0.1 }}
									/>
									<Path
										variants={{
											closed: { d: 'M 2 16.346 L 20 16.346' },
											open: { d: 'M 3 2.5 L 17 16.346' },
										}}
									/>
								</svg>
							</button>
						</div>
					</div>
					<div className="w-full lg:w-auto">
						<div
							className={`flex-1 justify-self-center lg:block lg:pb-0 lg:mt-0 ${
								navbar ? 'lg:p-0 block py-4 pb-6' : 'hidden'
							}`}>
							<motion.ul
								variants={navUL}
								className="lg:h-auto items-center justify-center lg:flex font-semibold flex-col lg:flex-row">
								{navItems.map(([link, title], index) => (
									<motion.li
										key={index}
										variants={variants}
										className={`text-sm py-2 px-3 lg:px-4 xl:px-6 overflow-hidden nav-item lg:h-14 h-auto content-center text-center hover:text-primaryBlue ${
											pathname == link ? 'active' : ''
										}`}>
										<Link href={link}>{title}</Link>
									</motion.li>
								))}
								<div className="flex flex-col lg:flex-row lg:ml-2 text-sm gap-2 lg:mt-0 mt-3 justify-center content-center items-center px-3 lg:px-0">
									<motion.li variants={variants} className="w-full lg:w-auto">
										<Link href="/datacamp" className="block">
											<button className="inline-flex items-center justify-center w-full px-2 xl:px-3 py-2 text-offWhite text-[11px] xl:text-xs transition-all duration-500 bg-datacamp border-2 border-transparent lg:w-auto rounded-md hover:bg-transparent hover:border-datacamp hover:text-datacamp font-bold whitespace-nowrap">
												DataCamp
											</button>
										</Link>
									</motion.li>
									<motion.li variants={variants} className="w-full lg:w-auto">
										<Link
											href="https://taranga.ioepc.edu.np/"
											className="block">
											<button className="inline-flex items-center justify-center w-full px-2 xl:px-3 py-2 text-white text-[11px] xl:text-xs transition-all duration-500 bg-[#3b82f6] border-2 border-transparent lg:w-auto rounded-md hover:bg-white hover:border-[#3b82f6] hover:text-[#3b82f6] font-bold whitespace-nowrap animate-bounce">
												Taranga: ACESxEXCESS
											</button>
										</Link>
									</motion.li>
								</div>
							</motion.ul>
						</div>
					</div>
				</div>
			</motion.nav>
		</div>
	);
}

export default NavBar;

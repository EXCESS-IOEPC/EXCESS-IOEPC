'use client';

import React from 'react';
import Image from 'next/image';
import { SocialIcon } from 'react-social-icons';

export default function HeaderTop() {
	return (
		<>
			<div className="fixed top-0 left-0 right-0 z-50 header-top w-full h-11 flex flex-direction-row justify-between px-2 sm:px-9 bg-offBlue">
				<div className="logoContainer flex flex-direction-row items-center py-2 gap-1 sm:gap-2">
					<Image
						src="/images/icon.png"
						quality={100}
						width={35}
						height={35}
						alt="EXCESS ICON Image"
					/>
					<h1 className="font-extrabold text-black text-l">
						{' '}
						<a href="/">EXCESS NEPAL</a>
					</h1>
				</div>
				<div className="icons flex flex-direction-row justify-end items-center py-2 gap-2">
					{[
						['facebook', 'https://www.facebook.com/excessnepal/'],
						['instagram', 'https://www.instagram.com/excess.ioe/'],
						['linkedin', 'https://www.linkedin.com/company/excessioepc/'],
						['github', 'https://github.com/EXCESS-IOEPC/EXCESS-IOEPC'],
					].map(([network, url], index) => (
						<SocialIcon
							key={index}
							url={url}
							className="icon hover:cursor-pointer"
							network={network}
							bgColor="#000000"
							style={{ height: 30, width: 30 }}
						/>
					))}
				</div>
			</div>
			<div aria-hidden="true" className="h-11 w-full" />
		</>
	);
}

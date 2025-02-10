import React from 'react';
import Link from 'next/link';

export default function HackathonBanner() {
	return (
		<>
			<div className="bg-white text-red-600 h-10 flex justify-center items-center">
				<h1>
					Follow our successful completion of{' '}
					<Link
						className="underline font-bold"
						href="https://cs50xnepal.ioepc.edu.np">
						CS50 AI Classes
					</Link>
					,{' '}
					<Link
						className="underline font-bold"
						href="https://cs50xnepal.ioepc.edu.np/hackathon">
						XHack 3.0
					</Link>{' '}
					and{' '}
					<Link className="font-bold underline" href="/gallery">
						CS50 Closing Ceremony
					</Link>
					!!
				</h1>
			</div>
		</>
	);
}

import React from 'react';
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from '@/src/components/Navbar';
import Committee from '@/src/app/committee/committee';

export default function CommitteePage() {
	return (
		<>
			<HeaderTop />
			<Navbar />
			<Committee />
		</>
	);
}

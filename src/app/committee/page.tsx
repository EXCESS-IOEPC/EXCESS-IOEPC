'use client';
import React, { useEffect, useState } from 'react';
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from '@/src/components/Navbar';
import Committee from '@/src/app/committee/committee';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import Loading from '@/src/components/Loading';

export default function CommitteePage() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		window.addEventListener('load', () => {
			setIsLoading(false);
		});
		const timeout = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timeout);
	}, []);

	const router = useRouter();

	useEffect(() => {
		const handleStart = () => setIsLoading(true);
		const handleComplete = () => setIsLoading(false);

		Router.events.on('routeChangeStart', handleStart); // Use Router.events
		Router.events.on('routeChangeComplete', handleComplete);
		Router.events.on('routeChangeError', handleComplete);

		return () => {
			Router.events.off('routeChangeStart', handleStart); // Use Router.events
			Router.events.off('routeChangeComplete', handleComplete);
			Router.events.off('routeChangeError', handleComplete);
		};
	}, [router]);
	return (
		<>
			{isLoading ? <Loading /> : ''}
			<HeaderTop />
			<Navbar />
			<Committee />
		</>
	);
}

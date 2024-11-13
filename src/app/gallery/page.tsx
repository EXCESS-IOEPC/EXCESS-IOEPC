import React from 'react';
import View from '@/src/app/gallery/view';
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from '@/src/components/Navbar';
import '@/src/app/gallery/gallery.css';
import '@/src/app/globals.css';
import ClientSideWrapper from '@/src/components/ClientSideWrapper';
import ErrorComponent from '@/src/app/error';

interface Image {
	width: number;
	height: number;
	asset_folder: string;
	url: string;
	secure_url: string;
}
export default async function Home() {
	let res;
	let response;
	try {
		res = await fetch('https://excess-gallery.vercel.app/api/fetch-images');

		if (!res.ok) {
			throw new Error(
				'There was an error fetching the gallery images. Please check your internet connection or try again later.'
			);
		}
		response = await res.json();
	} catch (error) {
		return (
			<ErrorComponent message="There was an error fetching the gallery images. Please check your internet connection or try again later." />
		);
	}

	const images: Image[] = response.map((value: any) => {
		return {
			width: value.width,
			height: value.height,
			asset_folder: value.asset_folder,
			url: value.url,
			secure_url: value.secure_url,
		};
	});
	return (
		<>
			<section id="header">
				<HeaderTop />
				<Navbar />
			</section>

			<ClientSideWrapper>
				<div className="bg-offWhite top-12">
					<View initialSearch="" images={images} />
				</div>
			</ClientSideWrapper>
		</>
	);
}

import React from 'react';
import View from "@/src/app/gallery/view";
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from '@/src/components/Navbar';
import cloudinary from 'cloudinary';
import '@/src/app/gallery/gallery.css';
import '@/src/app/globals.css';
import ClientSideWrapper from '@/src/components/ClientSideWrapper';
import ErrorComponent from '@/src/app/error';

interface Image {
  public_id: string;
  width: number;
  height: number;
  asset_folder: string;
}
export default async function Home() {
  let res;
  try {
    res = await cloudinary.v2.search
      .expression('resource_type:image')
      .sort_by('public_id', 'desc')
      .max_results(150)
      .execute() as { resources: Image[] };

  } 
  catch (error) {
    return (
      <ErrorComponent message="There was an error fetching the gallery images. Please check your internet connection or try again later." />
    );
  }

  if (!res || res.resources.length === 0) {
    return (
      <ErrorComponent message="No images found. Please check back later." />
    );
  }

  return (
    <>
      <section id="header">
        <HeaderTop />
        <Navbar />
      </section>

      <ClientSideWrapper>
        <View initialSearch="" images={res.resources} />
      </ClientSideWrapper>
    </>
  );
}

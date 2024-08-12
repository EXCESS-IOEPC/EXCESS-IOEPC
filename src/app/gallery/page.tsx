import React from 'react';
import View from "@/src/app/gallery/view";
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from '@/src/components/Navbar';
import cloudinary from 'cloudinary';
import '@/src/app/gallery/gallery.css';
import '@/src/app/globals.css';
import ClientSideWrapper from '@/src/components/ClientSideWrapper';
import ErrorComponent from '@/src/app/error';
import { DynamicServerError, isDynamicServerError } from "next/dist/client/components/hooks-server-context";



interface Image {
  public_id: string;
  width: number;
  height: number;
}

export default async function Home({
  searchParams: { filter },
}: {
  searchParams: {
    filter: string;
  };
}) {

  const expression = filter
    ? `resource_type:image AND folder:"${filter}"`
    : 'resource_type:image';

  let res;
  try {
    res = await cloudinary.v2.search
      .expression(expression)
      .sort_by('public_id', 'desc')
      .execute() as { resources: Image[] };
  } catch (error) {
    if (isDynamicServerError(error)){
      throw error;
    }
    return (
      <ErrorComponent message="There was an error fetching the gallery images. Please check your internet connection or try again later." />
    );
  }

  if (!res || res.resources.length === 0) {
    return (
      <ErrorComponent message="No images found. Please select a different filter or check back later." />
    );
  }

  return (
    <>
      <section id="header">
        <HeaderTop />
        <Navbar />
      </section>

      <ClientSideWrapper>
            <View  initialSearch={filter} images={res.resources} />
      </ClientSideWrapper>
    </>
  );
}

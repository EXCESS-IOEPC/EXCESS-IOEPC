"use client";
import React, { useState } from 'react';
import { CldImage } from "next-cloudinary";
import { FaXmark, FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import '@/src/app/gallery/gallery.css';
import Filter from '@/src/app/gallery/filter';





interface Image {
  public_id: string;
  width: number;
  height: number;
}

const View = ({ images, initialSearch }: { images: Image[], initialSearch: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openImage = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeImage = () => {
        setIsOpen(false);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent closing when clicking the buttons
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent closing when clicking the buttons
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <>
        <section className= {`1w-screen h-auto mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 ${isOpen ? 'hidden' : ''}`}>
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-primaryBlue">Our Story in Picture</h2>
            <p className="mt-4 text-md text-offBlack">Our gallery is a testament to the experiences and milestones that shape us. Delve into a visual narrative that reflects our unique journey.</p>
          </div>
          
          <div className="mt-10 lg:mt-16 gallery">
            <Filter initialSearch={initialSearch} />            
            {images.map((image, idx) => (
                    <CldImage
                        key={idx}
                        className="h-auto max-w-full rounded-lg cursor-pointer"
                        src={image.public_id}
                        alt="Gallery Image"
                        width="300"
                        height="300"
                        crop="fill"
                        loading="eager"
                        onClick={() => openImage(idx)}
                    />
                ))}
          </div>
        </section>

        {isOpen && (
            <section className='w-screen relative h-[100%] top-0 items-center justify-center z-50'>
            <div
                className="m-10 inset-0 z-50 flex items-center justify-center w-[80vh] bg-black bg-opacity-90"
                onClick={closeImage}
                onKeyDown={(e) => e.key === 'Escape' && closeImage()}
                tabIndex={0}>
                <button className="absolute top-0 mt-0 md:mt-4 scroll-button cross z-50" onClick={closeImage}>
                    <FaXmark />
                </button>
                <button className="scroll-button absolute left-0 ml-4 md:ml-14  z-50"  onClick={(e) => {
                        handlePrev(e);
                    }} >
                    <FaArrowLeftLong />
                </button>


                <CldImage
                    className="object-contain"
                    src={images[currentIndex].public_id}
                    alt={`Fullscreen Image ${currentIndex + 1}`}
                    width={1200}
                    height={400}
                    preserveTransformations
                    loading="eager"
                    />

                <button className='scroll-button absolute right-0 mr-4 md:mr-14' onClick={(e) => {
                    handleNext(e);
                }} >
                    <FaArrowRightLong />
                </button>
        </div>
        </section>
        )}
        </>
    );
};

export default View;
